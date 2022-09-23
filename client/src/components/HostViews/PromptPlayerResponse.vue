<template>
  <div>
    Find a way to put these {{ words.length }} rhyming words together!
    <br>
    Your Words:
    <br>
    <span v-for="word in words" :key="word.id">
      <span v-if="words[words.length - 1] === word">{{ ', and ' }}</span>
      <span v-else-if="words[0] !== word">{{ ', ' }}</span>
      <span class="word">{{ word }}</span>
    </span>
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
    <br>
    <v-btn 
      @click.stop="$emit('change-view', 'vote')" 
      :disabled="!!notAnswered.length"
    >Start Voting</v-btn>
  </div>
</template>

<script>
export default {
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
      ['elaborate', 'vacate'],
      ['fvmo', 'w', 'sdf', 'fw', 'wwv']
    ]
    this.words = RHYMING_PAIRS[Math.floor(Math.random() * RHYMING_PAIRS.length)]
    // for experimental purposes
    // this.words = ['gvvd', 'cwd', 'cw','cw','dcvv', 'sdcvfeve', 'vwsve']
    this.socketInstance.emit('new-words', this.words)
  },
  props: {
    promptResponses: {
      type: Array,
      required: true
    },
    playerList: {
      type: Array,
      require: true
    },
    socketInstance: {
      required: true
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