<template>
  <div class="background-matte">
    <header class="page-header center">
      
      <div 
        class="ma-3"
        style="position: absolute; top: 0; right: 0;"
      >
        <Clock />
      </div>
      <h2 class="sub-title">
        Rhyme These {{ words.length }} Words with Eachother
      </h2>
      <h1 class="title text-capitalize">
        {{ wordDisplay }}
      </h1>
    </header>
    <div class="response-card-container mt-4">
      <div 
        v-for="player in playerList"
        :key="player.clientId"
      >
        <ResponseCard
          :response="response(player.clientId)"
          :player="player"
        />
      </div>
    </div>
  </div>
</template>

<script>
import HostMixin from './HostMixin'
import ResponseCard from './HostSubComponents/PlayerResponseCard.vue'
import { playEffect } from '@/utils/Soundboard'
import { Views } from '@/utils/Views'
import Clock from './HostSubComponents/ClockDisplay.vue'
import { getWordPair } from '@/utils/wordPairs'

export default {
  mixins: [
    HostMixin
  ],
  components: {
    ResponseCard,
    Clock
  },
  data() {
    return {
      // words in current prompt
      words: [],
      // if false, players responses wont be pushed to promptResponses array
      acceptingSubmissions: true
    }
  },
  mounted() {
    this.words = getWordPair()
    this.socketInstance.emit('new-words', this.words)

    this.socketInstance.on('broadcast-game-state', () => {
      this.socketInstance.emit('new-words', this.words)
    })

    this.socketInstance.on('player-prompt-submission', (playerResponse) => {
      // playerResponse obj { clientId: number, response: string }
      const playerObject = this.playerList
        .find(player => player.clientId === playerResponse.clientId)
      const promptResponse = {
        response: playerResponse.response,
        player: playerObject
      }
      if (!this.acceptingSubmissions) return
      playEffect('responseReceived')
      setTimeout(() => {
        this.promptResponses.push(promptResponse)
      }, 350)
    })
  },
  computed: {
    timeRemaining() {
      return this.$store.state.timeRemaining
    },
    wordDisplay() {
      // turns array of words into a string that can be neatly displayed: 
      // ['its', 'rhyme', 'time'] -> 'its, rhyme, and time'
      let wordsInPrompt = ''
      for (let i = 0; i < this.words.length; i++) {
        if (this.words.length - 1 === i) wordsInPrompt += ', and '
        else if (i !== 0) wordsInPrompt += ', '
        wordsInPrompt += this.words[i]
      }
      return wordsInPrompt
    }
  },
  methods: {
    response(clientId) {
      const playerResponse = this.promptResponses.find(response => response.player.clientId === clientId)
      if (playerResponse) return playerResponse.response
      return ''
    },
    next() {
      this.acceptingSubmissions = false
      this.playOutro = true
      if (this.testMode) return
      setTimeout(() => {
        this.$emit('change-view', Views.vote)
      }, this.outroDur)
    }
  },
  watch: {
    promptResponses: {
      immediate: true,
      handler() {
        const NUM_OF_PLAYERS = this.playerList.length
        if (this.promptResponses.length === NUM_OF_PLAYERS) {
          this.stopTimer()
          setTimeout(() => {
            this.next()
          }, 3000)
        }
      }
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