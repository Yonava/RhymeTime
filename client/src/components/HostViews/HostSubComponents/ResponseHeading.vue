<template>
  <div class="center mt-5 mb-8">
    <span :style="`transition: 1s; opacity: ${subHeadingOpacity};`">
      Find a way to rhyme these {{ words.length }} words together:
    </span>
    <div
      :style="transformEffect"
      class="text-h3 prompt" 
    >
      {{ prompt }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    words: {
      type: Array,
      required: true,
    }
  },
  data() {
    return {
      transformEffect: 'transform: translateY(22vw) scale(2.2);',
      subHeadingOpacity: 0,
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.startUpSequence()
    })
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
    startUpSequence() {
      const MS_BEFORE_TRANSFORMATION = 3000
      const CSS_TRANSITION_DUR = 3000

      // pre transformation
      setTimeout(() => {
        this.transformEffect = ''
        this.$emit('prompt-intro-over')
      }, MS_BEFORE_TRANSFORMATION)

      // post transformation
      setTimeout(() => {
        this.subHeadingOpacity = 1
      }, MS_BEFORE_TRANSFORMATION + CSS_TRANSITION_DUR)
    }
  }
}
</script>

<style scoped>
  .prompt {
    transition: 3s ease-out;
  
  }
</style>