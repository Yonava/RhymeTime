<template>
  <div>
    <Tiebreaker :visible="showTiebreaker" />
    <div style="position: absolute; top: 10%; left: 2%; z-index: 2">
      <Clock title="Polls Close In" />
    </div>
    <div style="position: absolute; top: 10%; right: 2%; z-index: 2">
      <Clock title="Polls Close In" />
    </div>
    <div class="center mt-5">
      <div class="text-h4">Your Submissions</div>
    </div>

    <div class="center">
      <div style="width: 75%;">
        <v-row class="pa-4">
          <v-col v-for="response in responses" :key="response.id">
            <DisplayResponse :response="response" />
          </v-col>
        </v-row>
      </div>
    </div>

    <div class="center">
      <div class="text-h4 mt-5">Live Voting Results</div>
    </div>

    <div class="bar-parent"> 
      <div 
        v-for="player in candidates" 
        :key="player.id" 
        class="center voter-bar" 
        :style="`height: ${player.votes}%;`"
      >
        <div class="text-p white--text name-tag">
          {{ player.playerName }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HostMixin from "./HostMixin"
import DisplayResponse from "./HostSubComponents/ResponseDisplayCard.vue"
import Tiebreaker from "./HostSubComponents/TiebreakerCard.vue"

export default {
  mixins: [
    HostMixin
  ],
  components: {
    DisplayResponse,
    Tiebreaker
  },
  data() {
    return {
      // stores ballots submitted by players
      ballotBox: {},
      // candidate = { player: playerName, votes: totalVotes }
      candidates: [],
      // if true, no ballots are accepted
      pollsClosed: false,
      // is set to promptResponses then widdled down in case of a tiebreaker event
      responses: [],
      // true if tiebreaker card is showing
      showTiebreaker: false
    };
  },
  destroyed() {
    // get winner data
    const WINNER = this.candidates[0].player
    const WINNERS_RESPONSE = this.responses[this.responses
      .findIndex(obj => obj.player === WINNER)].response
    
    // give it to parent for round to round tracking
    this.$emit("round-winner", {
      playerName: WINNER,
      response: WINNERS_RESPONSE,
    })
  },
  mounted() {
    this.responses = this.promptResponses
    this.responses.forEach((response) => {
      this.candidates.push({
        playerName: response.playerName,
        votes: 100
      })
    })
    this.calculatePercentage()

    this.emitCandidateList()
    this.socketInstance.on('broadcast-game-state', () => {
      this.emitCandidateList()
    })
    this.socketInstance.on('ballot-collector', (playerBallot) => {
      if (this.pollsClosed) return
      this.countVotes(playerBallot)
    })
  },
  methods: {
    emitCandidateList() {
      this.socketInstance.emit("candidate-list", this.candidates
        .map((candidate) => candidate.playerName))
    },
    countVotes(playerBallot) {
      // refactoring this cluster fuck of a method
      // should go up as a task on the backlog
      let voteCount = {}
      this.responses
        .map((response) => response.playerName)
        .forEach((player) => (voteCount[player] = 0));

      const PLAYER_NAME = Object.keys(playerBallot)[0];
      this.ballotBox[PLAYER_NAME] = playerBallot[PLAYER_NAME];
      Object.keys(this.ballotBox).forEach((ballotHolder) => {
        const REORDERED_BALLOT = [...this.ballotBox[ballotHolder]].reverse();
        for (let i = 0; i < REORDERED_BALLOT.length; i++) {
          voteCount[REORDERED_BALLOT[i]] += i;
        }
      });

      this.candidates = [];
      Object.keys(voteCount).forEach((playerName) => {
        this.candidates.push({
          playerName,
          votes: voteCount[playerName],
        });
      });

      this.calculatePercentage()
    },
    calculatePercentage() {
      if (!this.candidates.length) return
      const TOTAL_VOTES = this.candidates
        .map(candidate => candidate.votes)
        .reduce((previousValue, currentValue) => previousValue + currentValue);

      this.candidates.forEach(candidate => {
        // gets players' percentage share of the votes cast
        candidate.votes = Math.round((candidate.votes / TOTAL_VOTES) * 100)
        // consolation prize for fewer than 8% of votes 🥺 😂
        if (candidate.votes < 8) candidate.votes = 8
      })
    },
    runTiebreaker() {
      const FIRST_PLACE_VOTES = this.candidates[0].votes
      this.candidates = this.candidates.filter((candidate) => {
        return candidate.votes === FIRST_PLACE_VOTES
      })
      this.responses = this.responses.filter((response) => {
        return this.candidates.map((i) => i.playerName).includes(response.playerName)
      })
      this.ballotBox = {}
      this.pollsClosed = true
      setTimeout(() => this.pollsClosed = false, 500)
      this.emitCandidateList()
      this.tackOnTime()
    },
    tackOnTime() {
      this.showTiebreaker = true
      setTimeout(() => {
        this.$store.state.timeRemaining = 10
        this.startTimer()
      }, 2000)
    },
    next() {
      // no candidate edge case
      if (!this.candidates.length) {
        return this.tackOnTime()
      }

      // tie edge case
      this.candidates.sort((a, b) => b.votes - a.votes);
      if (this.candidates.length > 1) {
        if (this.candidates[0].votes === this.candidates[1].votes) {
          return this.runTiebreaker()
        }
      }

      // no edge case allows game to continue :)
      if (this.testMode) return
      this.$emit("change-view", "recap")
    }
  },
  watch: {
    showTiebreaker(v) {
      if (!v) return
      setTimeout(() => this.showTiebreaker = false, 3000)
    } 
  }
}
</script>

<style scoped>
.voter-bar {
  background-color: purple; 
  width: 75px;
  position: relative; 
  margin-top: auto;
  margin-left: 1.5%;
  transition: 500ms ease-in-out;
}

.name-tag {
  top: 0; 
  position: absolute; 
  font-weight: bold;
}

.bar-parent {
  display: flex; 
  flex-direction: row; 
  align-items: center; 
  justify-content: center;  
  height: 37vh;
  margin: 0px 300px 0px 300px;
  border-bottom: 8px solid black;
}
</style>