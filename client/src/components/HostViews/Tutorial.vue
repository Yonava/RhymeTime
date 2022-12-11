<template>
  <div class="background-matte center">
    <component :is="tutorialFrames[frameIndex].name" />
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

import pt1 from './TutorialFrames/pt1'
import pt2 from './TutorialFrames/pt2'
import pt3 from './TutorialFrames/pt3'
import pt4 from './TutorialFrames/pt4'
import pt5 from './TutorialFrames/pt5'
import pt6 from './TutorialFrames/pt6'
import pt7 from './TutorialFrames/pt7'

export default {
  mixins: [
    HostMixin
  ],
  emits: [
    'change-view'
  ],
  components: {
    pt1,
    pt2,
    pt3,
    pt4,
    pt5,
    pt6,
    pt7
  },
  data() {
    return {
      // this is the list of players in the game
      players: [],
      // this is the number of players who have voted to skip
      votesForSkip: 0,
      // this is the percentage of the display that is red
      againstPercentOnDisplay: 100,

      // this is the list of frames to play in the tutorial
      tutorialFrames: [
        {
          name: 'pt1',
          dur: 10000
        },
        {
          name: 'pt2',
          dur: 14000
        },
        {
          name: 'pt3',
          dur: 32000
        },
        {
          name: 'pt4',
          dur: 17000
        },
        {
          name: 'pt5',
          dur: 10000
        },
        {
          name: 'pt6',
          dur: 16000
        },
        {
          name: 'pt7',
          dur: 2000
        }
      ],
      // this is the index of the current frame
      frameIndex: 0,
      // this holds the audio element for the tutorial voiceover
      voAudio: null
    }
  },
  mounted() {
    // add players from player list to local array
    this.playerList.forEach(player => {
      this.players.push({
        playerName: player.name,
        wantsToSkip: false
      })
    })

    // listen for skip votes
    this.socketInstance.on('skip-vote', (vote) => {
      for (let i = 0; i < this.players.length; i++) {
        if (this.players[i].playerName === vote.playerName) {
          this.players[i].wantsToSkip = vote.wantsToSkip
          this.reComputeSkipCount()
          break
        }
      }
    })

    // start the tutorial
    this.playTutorialFrames()
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
    playTutorialFrames() {

      // check if browser has permission to play audio
      if (this.frameIndex === -1) {
        const audio = new Audio()
        audio.play()
        .then(() => {
          audio.pause()
          audio.currentTime = 0
        })
        .catch(() => {
          this.togglePause()
          this.frameIndex = 0;
        })
      }

      // if we've reached the end of the tutorial, move on
      if (this.frameIndex === this.tutorialFrames.length) {
        this.next()
        return
      }
      // otherwise, play the next frame
      setTimeout(() => {
        this.frameIndex++
        this.playTutorialFrames()
      }, this.tutorialFrames[this.frameIndex].dur)
    },
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