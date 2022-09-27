<template>
  <div>
    Time Left: {{ timeRemaining }}
    <br>
    {{ prompt }}
    <br>
    <b>Waiting On:</b>
    <div v-for="player in notAnswered" :key="player.id">
      {{ player }}
    </div>
    <br>
    <b>Players Who Have Responded:</b> 
    <div v-for="player in respondents" :key="player.id">
      {{ player }}
    </div>
    <br><br>
    <v-btn @click.stop="next">Start Voting</v-btn>
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
      // words in current prompt
      words: [],
      // array containing players that have answered the prompt
      respondents: [],
      // array containing players that have not answered the prompt
      notAnswered: []
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
    // for experimental purposes
    // this.words = ['gvvd', 'cwd', 'cw','cw','dcvv', 'sdcvfeve', 'vwsve']
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
      return `Find a way to rhyme these ${this.words.length} words together: ${wordsInPrompt}`
    }
  },
  methods: {
    next() {
      this.$emit('change-view', 'vote')
    }
  },
  watch: {
    promptResponses: {
      immediate: true,
      handler(v) {
        this.respondents = v.map((response) => response.player)
        this.notAnswered = this.playerList.filter((player) => {
          return !this.respondents.includes(player)
        })
      }
    }
  }
}
</script>

<style scoped>
.word {
  color: red;
  font-style: italic;
}
</style>