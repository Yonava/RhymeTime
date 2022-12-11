<template>
  <div class="background-matte center">
    <transition name="slide-in">
      <component 
        :is="tutorialFrames[frameIndex].name" 
        :isPaused="isPaused"
        :playerList="playerList"
      />
    </transition>
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
import { SoundTrack } from '@/utils/Soundboard'

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
          dur: 11_000
        },
        {
          name: 'pt2',
          dur: 15_000
        },
        {
          name: 'pt3',
          dur: 33_000
        },
        {
          name: 'pt4',
          dur: 18_000
        },
        {
          name: 'pt5',
          dur: 11_000
        },
        {
          name: 'pt6',
          dur: 17_000
        },
        {
          name: 'pt7',
          dur: 3_000
        }
      ],
      // this is the index of the current frame
      frameIndex: 3,
      // this holds the audio element for the tutorial voiceover
      voAudio: null,
      // this is the flag for whether the tutorial has started
      tutorialStarted: false
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
    this.playTutorial()
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
    async playTutorial() {
      let audioLoaded = false
      this.voAudio = new Audio(require(`../../../assets/voiceovers/tutorial/pt${this.frameIndex + 1}.mp3`))
      // play the voiceover for the first frame
      await this.voAudio.play()
        .then(() => {
          this.tutorialStarted = true
          audioLoaded = true
          SoundTrack.setVolume(10)
        })
        .catch(err => {
          console.log(err)
          this.togglePause()
        })
      if (!audioLoaded) return
      let tutorialPlayer = setInterval(() => {
        // check if we're paused
        if (this.isPaused) return
        // check if we're done with the tutorial frame
        if (this.tutorialFrames[this.frameIndex].dur > 0) {
          this.tutorialFrames[this.frameIndex].dur -= 50
        } else {
          // move to the next frame
          this.frameIndex++
          // check if we're done with the tutorial
          if (this.frameIndex === this.tutorialFrames.length) {
            clearInterval(tutorialPlayer)
            SoundTrack.setVolume(100)
            // move to the next view
            setTimeout(() => {
              this.next()
            }, 1_500)
          } else {
            // play the voiceover for the next frame
            let audioFile = require(`../../../assets/voiceovers/tutorial/pt${this.frameIndex + 1}.mp3`)
            this.voAudio = new Audio(audioFile)
            this.voAudio.play()
              .catch(err => {
                console.log(err)
                this.togglePause()
              })
          }
        }
      }, 50)
    },
    reComputeSkipCount() {
      let votesForSkip = 0
      this.players.forEach(player => {
        if (player.wantsToSkip) votesForSkip++
      })
      this.votesForSkip = votesForSkip
    
      // check if everyone is on board to skip
      if (this.players.length === this.votesForSkip) {
        setTimeout(() => this.next(), 1_500)
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
    },
    isPaused(v) {
      // for edge case when audio fails to load
      if (!v && !this.tutorialStarted) {
        this.playTutorial()
      } else if (v && this.tutorialStarted) {
        this.voAudio.pause()
      } else if (this.tutorialStarted) {
        this.voAudio.play()
      }
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
    height: 60px;
    bottom: 5%;
    position: fixed;
    border-radius: 50px;
    transition: 500ms;
  }
  .vote-display-number {
    font-weight: 900;
    color: white;
    font-size: 32pt;
    position: absolute;
  }
  .skip-vote-text {
    color: white;
    font-weight: 900;
    font-size: 20pt;
    position: relative;
    top: -90%;
  }

  
.slide-in-enter, .slide-out-leave-to {
  transform: translateX(-100vw);
}
.slide-in-enter-to, .slide-in-leave-from, .slide-out-enter-to, .slide-out-leave-from {
  transform: translateX(0);
}
.slide-in-enter-active, .slide-in-leave-active, .slide-out-enter-active, .slide-out-leave-active {
  transition: all 300ms;
  position: fixed;
}
.slide-in-leave-to, .slide-out-enter {
  transform: translateX(100vw);
}
  
</style>