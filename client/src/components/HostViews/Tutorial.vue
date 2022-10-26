<template>
  <div class="center mt-5">
    <div class="text-h4" style="width: 40%; text-align: center">
      just close your eyes and imagine there is a tutorial video now playing in front of you,
      if you really set your mind on it, you may manifest it into reality. 
    </div>
    <v-btn
      @click.stop="next" 
      class="white--text mt-8" 
      color="red"
    >Skip intro</v-btn>
    <br>
    Votes for: {{ votesForSkip }}
    <br>
    Votes aganst: {{ votesAgainstSkip }}
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
      players: [],
      votesForSkip: 0
    }
  },
  mounted() {
    this.playerList.forEach(player => {
      if (!player.occupied) return
      this.players.push({
        playerName: player.name,
        wantsToSkip: false
      })
    })
    this.socketInstance.on('skip-vote', (vote) => {
      for (let i = 0; i < this.players.length; i++) {
        if (this.players[i].playerName === vote.playerName) {
          this.players[i].wantsToSkip = vote.wantsToSkip
          this.reComputeSkipCount()
          break
        }
      }
    })
  },
  computed: {
    votesAgainstSkip() {
      return this.players.length - this.votesForSkip
    }
  },
  methods: {
    reComputeSkipCount() {
      let votesForSkip = 0
      this.players.forEach(player => {
        if (player.wantsToSkip) votesForSkip++
      })
      this.votesForSkip = votesForSkip
    
      // check if everyone is on board to skip
      if (this.players.length === this.votesForSkip) {
        setTimeout(() => this.next(), 1500)
      }
    },
    next() {
      if (this.testMode) return
      this.$emit('change-view', 'respond')
    }
  }
}
</script>