<template>
  <div>
    Find a way to put these two rhyming words together!
    <br>
    Yours Words:
    <br>
    <span v-for="word in words" :key="word.id">
      <span v-if="words[words.length - 1] === word">{{ ', and ' }}</span>
      <span v-else-if="words[0] !== word">{{ ', ' }}</span>
      <span class="word">{{ word }}</span>
    </span>
    <br>
    <b>Waiting On:</b>
    <div v-for="player in playerList" :key="player.id">
      <p v-if="!responseArray.includes(player)">{{ player }}</p>
    </div>
    <br>
    <b>Players Who Have Responded:</b> 
    <div v-for="response in responseArray" :key="response.id">
      {{ response }} {{ promptResponses[response] }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // list of players who have responded
      responseArray: [],
      // words in current prompt
      words: []
    }
  },
  destroyed() {
    this.$parent.promptResponses = {}
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
    this.socketInstance.emit('new-words', this.words)
  },
  props: {
    promptResponses: {
      type: Object,
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
        this.responseArray = Object.keys(v)
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