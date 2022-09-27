<template>
  <div>
    Time Left: {{ timeRemaining }}
    <br>
    <div class="center mb-2">
      Find a way to rhyme these {{ words.length }} words together: 
      <div class="text-h4 ma-2">{{ prompt }}</div>
    </div>
    <v-row>
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
</template>

<script>
import HostMixin from './HostMixin'
import ResponseCard from './HostSubComponents/PlayerResponseCard.vue'

export default {
  mixins: [
    HostMixin
  ],
  components: {
    ResponseCard
  },
  data() {
    return {
      // words in current prompt
      words: [],
      // array containing players that have answered the prompt
      respondents: [],
      // for testing
      hasResponded: false
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
  computed: {
    prompt() {
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