<template>
  <div> 
    <div style="position: absolute; top: 10%; left: 2%">
      <Clock />
    </div> 
    <div style="position: absolute; top: 10%; right: 2%">
      <Clock />
    </div> 
    <Prompt 
      :words="words"
      @prompt-intro-over="preIntroResponseStyles = ''"
    />
    <div class="center">
      <div :style="`transition: 3s; width: 60%; ${preIntroResponseStyles}`">
        <v-row align="center" justify="center">
          <v-col
            v-for="player in playerList" :key="player.id"
            cols="6"
          >
            <ResponseCard
              :playerName="player"
              :hasResponded="respondents.includes(player)"
            />
          </v-col>
        </v-row>
      </div>
    </div>
    <!-- <v-btn @click="playOutro = !playOutro" style="z-index: 99">outro</v-btn> -->
    <Outro 
      :show="playOutro" 
      :outroDur="outroDur"
    />
  </div>
</template>

<script>
import HostMixin from './HostMixin'
import ResponseCard from './HostSubComponents/PlayerResponseCard.vue'
import Prompt from './HostSubComponents/ResponseHeading.vue'
import Outro from './HostSubComponents/ResponseOutro.vue'
import { playEffect } from '@/utils/Soundboard'

export default {
  mixins: [
    HostMixin
  ],
  components: {
    ResponseCard,
    Prompt,
    Outro
  },
  data() {
    return {
      // words in current prompt
      words: [],
      // array containing players that have answered the prompt
      respondents: [],
      // for testing
      hasResponded: false,
      // these styles are applied until prompt finishes its intro
      preIntroResponseStyles: 'opacity: 0; transform: translateY(-10%); width: 50%; height: 100%',
      // if false, players responses wont be pushed to promptResponses array
      acceptingSubmissions: true,
      // starts outro
      playOutro: false,
      // how long the outro takes to play
      outroDur: 6000
    }
  },
  mounted() {
    const RHYMING_PAIRS = [
      ['ground', 'pound', 'round'], 
      ['crown', 'grown'], 
      ['paid', 'afraid', 'laid'], 
      ['elaborate', 'vacate']
    ]
    this.words = RHYMING_PAIRS[Math.floor(Math.random() * RHYMING_PAIRS.length)]
    this.socketInstance.emit('new-words', this.words)

    this.socketInstance.on('player-prompt-submission', (playerResponse) => {
      if (!this.acceptingSubmissions) return
      playEffect('responseReceived')
      setTimeout(() => {
        this.promptResponses.push(playerResponse)
      }, 350)
    })

    // for offline testing
    // setTimeout(() => {
    //   playEffect('responseReceived')
    //   setTimeout(() => {
    //     this.promptResponses.push({player: 'Jack', response: 'hi'})
    //   }, 350)
    // }, 5000)
  },
  methods: {
    next() {
      this.acceptingSubmissions = false
      this.playOutro = true
      if (this.testMode) return
      setTimeout(() => {
        this.$emit('change-view', 'vote')
      }, this.outroDur)
    }
  },
  watch: {
    promptResponses: {
      immediate: true,
      handler(v) {
        this.respondents = v.map(response => response.player)
        if (this.respondents.length === this.playerList.length) {
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