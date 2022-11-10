<template>
  <div class="background-matte center">
    <h1>Tutorial Animation</h1>
    <v-btn @click="forSkip++">vote for skip {{ forSkip }}</v-btn>
    <v-btn @click="againstSkip++">vote against skip {{ againstSkip }}</v-btn>
    <div 
      :style="voteDisplayColor"
      class="vote-display-container" 
    >

    </div>
  </div>
</template>

<script>
import HostMixin from './HostMixin'
import { Views } from '@/utils/Views'

export default {
  mixins: [
    HostMixin
  ],
  data() {
    return {
      players: [],
      votesForSkip: 0,
      againstSkip: 1,
      forSkip: 1
    }
  },
  mounted() {
    this.playerList.forEach(player => {
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
    },
    voteDisplayColor() {
      let nayPercent = this.againstSkip/(this.againstSkip + this.forSkip) * 100
      return `background: linear-gradient(to left, #E23B3B ${nayPercent}%, 0%, #4BB526);`
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
      this.$emit('change-view', Views.respond)
    }
  }
}
</script>

<style scoped>
  .background-matte {
    background-color: rgb(26, 26, 26);
    height: 100vh;
    width: 100vw;
    position: fixed;
  }
  h1 {
    color: white;
    font-size: 60pt;
    font-weight: 1000;
  }
  .vote-display-container {
    width: 85vw;
    height: 75px;
    bottom: 5%;
    position: fixed;
    border-radius: 50px;
    transition: 500ms;
  }
</style>