<template>
  <div>
    Your submissions:
    <br>
    {{ promptResponses }}
    <br><br><br>
    Here are the live results!
    <br>
    <div v-for="candidate in candidates" :key="candidate.id">
      {{ candidate.player }} - Votes: {{ candidate.votes }}
    </div>
    <br>
    <v-btn @click.stop="$emit('change-view', 'respond')">Continue to next round</v-btn>
  </div>
</template>

<script>
import HostMixin from './HostMixin'

export default {
  mixins: [
    HostMixin
  ],
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
    // resets parent state for new round
    this.$parent.promptResponses = []
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
    }
  }
}
</script>