<template>
  <div> 
    <div style="position: absolute; top: 10%; left: 2%">
      <Clock
        :timeLeft="timeRemaining"
        :totalTime="totalTime"
      />
    </div> 
    <div style="position: absolute; top: 10%; right: 2%">
      <Clock
        :timeLeft="timeRemaining"
        :totalTime="totalTime"
      />
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
  </div>
</template>

<script>
import HostMixin from './HostMixin'
import ResponseCard from './HostSubComponents/PlayerResponseCard.vue'
import Prompt from './HostSubComponents/ResponseHeading.vue'

export default {
  mixins: [
    HostMixin
  ],
  components: {
    ResponseCard,
    Prompt
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
      preIntroResponseStyles: 'opacity: 0; transform: translateY(-10%); width: 50%; height: 100%'
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
  },
  methods: {
    next() {
      if (this.testMode) return
      this.$emit('change-view', 'vote')
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