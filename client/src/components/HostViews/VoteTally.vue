<template>
  <div>
    Time Left: {{ timeRemaining }}
    <br>
    <div class="center">
      <div class="text-h4">Your submissions:</div>
    </div>
    <v-row class="pa-5">
      <v-col
        v-for="response in promptResponses" :key="response.id"
        cols="5"
      >
        <DisplayResponse
          :response="response"
        />
      </v-col>
    </v-row>
    Here are the live results!
    <br>
    <div v-for="candidate in candidates" :key="candidate.id">
      {{ candidate.player }} - Votes: {{ candidate.votes }}
    </div>
    <br>
    <v-btn @click.stop="next">Skip</v-btn>
  </div>
</template>

<script>
import HostMixin from './HostMixin'
import DisplayResponse from './HostSubComponents/ResponseDisplayCard.vue'

export default {
  mixins: [
    HostMixin,
  ],
  components: {
    DisplayResponse
  },
  data() {
    return {
      // tallies all the votes in ballotBox and returns object. ie { yona: 5 } yona has 5 votes
      voteCount: {},
      // stores ballots submitted by players
      ballotBox: {},
      // candidate = { name: playerName, votes: totalVotes }
      candidates: []
    }
  },
  destroyed() {
    const WINNER = this.candidates[0]?.player ?? 'Nobody'
    const THEIR_RESPONSE = this.promptResponses[this.promptResponses.findIndex((obj) => obj.player === WINNER)]?.response ?? 'A response hasnt been given'
    this.$emit('round-winner', {
      player: WINNER,
      response: THEIR_RESPONSE
    })
  },
  mounted() {
    this.socketInstance.emit(
      'candidate-list', 
      this.promptResponses.map((response) => response.player)
    )
  },
  methods: {
    countVotes(playerBallot) {

      // Refactor this mess when there is time!!!

      this.promptResponses
        .map((response) => response.player)
        .forEach((player) => this.voteCount[player] = 0)

      const PLAYER_NAME = Object.keys(playerBallot)[0]
      this.ballotBox[PLAYER_NAME] = playerBallot[PLAYER_NAME]
      Object.keys(this.ballotBox).forEach((ballotHolder) => {
        const REORDERED_BALLOT = [...this.ballotBox[ballotHolder]].reverse()
        for (let i = 0; i < REORDERED_BALLOT.length; i++) {
          this.voteCount[REORDERED_BALLOT[i]] += i
        }
      })

      this.candidates = []
      Object.keys(this.voteCount).forEach((player) => {
        this.candidates.push({
          player,
          votes: this.voteCount[player]
        })
      })

      this.candidates.sort((a, b) => b.votes - a.votes)
    },
    next() {
      if (this.testMode) return
      this.$emit('change-view', 'recap')
    }
  }
}
</script>