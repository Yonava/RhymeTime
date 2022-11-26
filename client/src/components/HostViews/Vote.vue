<template>
  <div class="background-matte">
    <header class="page-header center">
      <div 
        style="position: fixed; top: 0; left: 0;"
        class="ma-8"
      >
        <v-btn
          @click.stop="togglePause"
          color="white"
          fab
          small
        >
          <v-icon>
            mdi-pause
          </v-icon>
        </v-btn>
      </div>
      <div 
        class="ma-3"
        style="position: fixed; top: 0; right: 0;"
      >
        <Clock />
      </div>
      <h2 class="sub-title">
        It Is Time To
      </h2>
      <h1 class="title">
        Vote
      </h1>
    </header>
    <div class="response-card-container mt-4">
      <div 
        v-for="response in responses"
        :key="response.player.clientId"
      >
        <ResponseCard
          :response="response.response"
          :player="response.player"
          :showResponse="true"
          :votePercentage="votePercentage(response.player.clientId)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import HostMixin from './HostMixin'
import ResponseCard from './HostSubComponents/PlayerResponseCard.vue'
import { Views } from '@/utils/Views'

export default {
  mixins: [
    HostMixin
  ],
  components: {
    ResponseCard
  },
  emits: [
    'round-winner'
  ],
  data() {
    return {
      // stores ballots submitted by players
      ballotBox: {},
      // candidate = { player: Player, votes: % of vote share }
      candidates: [],
      // if true, no ballots are accepted
      pollsClosed: false,
      // is set to promptResponses then widdled down in case of a tiebreaker event
      responses: []
    };
  },
  mounted() {
    this.responses = this.promptResponses
    this.responses.forEach(response => {
      this.candidates.push({
        player: response.player,
        votes: 100
      })
    })
    this.calculatePercentage()

    this.emitPlayerResponses()
    this.socketInstance.on('broadcast-game-state', () => {
      this.emitPlayerResponses()
    })
    this.socketInstance.on('ballot-collector', (playerBallot) => {
      if (this.pollsClosed) return
      this.countVotes(playerBallot)
    })
  },
  methods: {
    votePercentage(clientId) {
      const CANDIDATE = this.candidates.find(candidate => candidate.player.clientId === clientId)
      return CANDIDATE.votes
    },
    emitPlayerResponses() {
      this.socketInstance.emit('candidate-list', this.responses)
    },
    countVotes(playerBallot) {
      // this function serves to recount all votes in ballotBox
      // playerBallot obj format: { "nickname of sender client" : []string }

      // reset candidate votes for recount
      for (let i = 0; i < this.candidates.length; i++) {
        this.candidates[i].votes = 0
      }

      // stores name of player that the submitted ballot belongs to
      const PLAYER_NAME = Object.keys(playerBallot)[0]

      // replaces their old ballot with their new one, or creates their own
      // entry inside ballotBox if this is first ballot
      this.ballotBox[PLAYER_NAME] = playerBallot[PLAYER_NAME]

      // gets the names of all players who have a ballot on file
      Object.keys(this.ballotBox).forEach(playerName => {
        // counts up the votes on each ballot
        const BALLOT = this.ballotBox[playerName]
        for (let i = 0; i < BALLOT.length; i++) {
          const CAND_INX = this.candidates.findIndex(c => c.player.name === BALLOT[i])
          this.candidates[CAND_INX].votes += (BALLOT.length - 1) - i
        }
      })

      this.calculatePercentage()
    },
    calculatePercentage() {
      // turns candidate votes into percentages
      // 10, 20, 30 -> 16.6, 33.3, 50
      if (!this.candidates.length) return
      const TOTAL_VOTES = this.candidates
        .map(candidate => candidate.votes)
        .reduce((previousValue, currentValue) => previousValue + currentValue);

      this.candidates.forEach(candidate => {
        // gets players' percentage share of the votes cast
        candidate.votes = Math.round((candidate.votes / TOTAL_VOTES) * 100)
      })
    },
    runTiebreaker() {
      const FIRST_PLACE_VOTES = this.candidates[0].votes
      this.candidates = this.candidates.filter((candidate) => {
        return candidate.votes === FIRST_PLACE_VOTES
      })
      this.responses = this.responses.filter((response) => {
        return this.candidates.map((i) => i.player.name).includes(response.player.name)
      })
      this.ballotBox = {}
      this.pollsClosed = true
      setTimeout(() => this.pollsClosed = false, 500)
      this.emitPlayerResponses()
      this.tackOnTime()
    },
    tackOnTime() {
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
        } else {
          const roundWinner = this.candidates[0]
          const winningResponse = this.responses.find(response => {
            return response.player.name === roundWinner.player.name
          })
          this.$emit('round-winner', winningResponse)
        }
      }

      // no edge case allows game to continue :)
      if (this.testMode) return
      this.$emit("change-view", Views.recap)
    }
  }
}
</script>

<style scoped>
  .background-matte {
    width: 100vw;
    height: 100vh;
    background-color: #FFD37E;
  }
  .page-header {
    width: 100%;
    height: 175px;
    background-color: #FFB118;
    position: relative;
  }
  .title {
    color: white;
    font-weight: 900;
    /* scale is a bad way of doing things in this 
    context but font-size is not working for some reason */
    transform: scale(5);
    position: absolute;
    bottom: 27%;
  }
  .sub-title {
    position: absolute;
    top: 0.5%;
    font-size: 35pt;
    font-weight: 900;
  }
  .response-card-container {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
</style>