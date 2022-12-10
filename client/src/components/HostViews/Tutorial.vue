<template>
  <div class="background-matte center">
    <component :is="tutorialFrame.name" />
    <div 
      :style="voteDisplayColor"
      class="vote-display-container center" 
    >
      <h3 class="skip-vote-text">
        Vote To Skip
      </h3>
      <h2 
        class="vote-display-number"
        style="left: 2.5%"
      >
        {{ votesForSkip }}
      </h2>
      <h2 
        class="vote-display-number"
        style="right: 2.5%"
      >
        {{ votesAgainstSkip }}
      </h2>
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
  emits: [
    'change-view'
  ],
  data() {
    return {
      players: [],
      votesForSkip: 0,
      againstPercentOnDisplay: 100,

      tutorialFrames: [
        {
          name: 'pt1',
          dur: 5000
        },
        {
          name: ''
        }
      ],
      tutorialFrame: {
        name: 'pt1',
        dur: 5000
      }
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
      return `background: linear-gradient(to left, #E23B3B ${this.againstPercentOnDisplay}%, 0%, #4BB526);`
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
    addVotesToDisplay() {
      let totalVotes = this.votesForSkip + this.votesAgainstSkip
      let percentAgainst = Math.round((this.votesAgainstSkip / totalVotes) * 100)
      let diff = percentAgainst - this.againstPercentOnDisplay
      
      if (!diff) return

      // milliseconds per 1/4 percent move on display
      const DELAY = 3

      for (let i = 0; i < Math.abs(diff) * 4; i++) {
        setTimeout(() => {
          this.againstPercentOnDisplay += diff > 0 ? .25 : -.25
        }, i * DELAY)
      }
    },
    next() {
      if (this.testMode) return
      this.$emit('change-view', Views.respond)
    }
  },
  watch: {
    votesForSkip() {
      this.addVotesToDisplay()
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
  .vote-display-container {
    width: 85vw;
    height: 75px;
    bottom: 5%;
    position: fixed;
    border-radius: 50px;
    transition: 500ms;
  }
  .vote-display-number {
    font-weight: 1000;
    color: white;
    font-size: 32pt;
    position: absolute;
  }
  .skip-vote-text {
    color: white;
    font-weight: 1000;
    font-size: 20pt;
    position: relative;
    top: -85%
  }
</style>