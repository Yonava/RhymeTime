<template>
  <div>
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
          <v-col v-for="response in promptResponses" :key="response.id">
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
          {{ player.player }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HostMixin from "./HostMixin"
import DisplayResponse from "./HostSubComponents/ResponseDisplayCard.vue"

export default {
  mixins: [
    HostMixin
  ],
  components: {
    DisplayResponse,
  },
  data() {
    return {
      // tallies all the votes in ballotBox and returns object. ie { yona: 5 } yona has 5 votes
      voteCount: {},
      // stores ballots submitted by players
      ballotBox: {},
      // candidate = { player: playerName, votes: totalVotes }
      candidates: [],
    };
  },
  destroyed() {
    this.candidates.sort((a, b) => b.votes - a.votes);
    const WINNER = this.candidates[0]?.player ?? "Nobody";
    const THEIR_RESPONSE =
      this.promptResponses[
        this.promptResponses.findIndex((obj) => obj.player === WINNER)
      ]?.response ?? "A response hasnt been given";
    this.$emit("round-winner", {
      player: WINNER,
      response: THEIR_RESPONSE,
    });
  },
  mounted() {
    this.socketInstance.emit(
      "candidate-list",
      this.promptResponses.map((response) => response.player)
    )

    this.promptResponses.forEach((response) => {
      this.candidates.push({
        player: response.player,
        votes: 100
      })
    })
    this.calculatePercentage()
  },
  methods: {
    countVotes(playerBallot) {
      this.promptResponses
        .map((response) => response.player)
        .forEach((player) => (this.voteCount[player] = 0));

      const PLAYER_NAME = Object.keys(playerBallot)[0];
      this.ballotBox[PLAYER_NAME] = playerBallot[PLAYER_NAME];
      Object.keys(this.ballotBox).forEach((ballotHolder) => {
        const REORDERED_BALLOT = [...this.ballotBox[ballotHolder]].reverse();
        for (let i = 0; i < REORDERED_BALLOT.length; i++) {
          this.voteCount[REORDERED_BALLOT[i]] += i;
        }
      });

      this.candidates = [];
      Object.keys(this.voteCount).forEach((player) => {
        this.candidates.push({
          player,
          votes: this.voteCount[player],
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
    next() {
      if (this.testMode) return;
      this.$emit("change-view", "recap");
    },
  },
};
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