<template>
  <div>
    Respond To The Prompt On Screen:
    <div v-for="(word, index) in wordsInPrompt" :key="word.id">
      <v-text-field
        v-model="responses[index]"
        :label="word"
      ></v-text-field>
    </div>
    <br>
    <v-btn @click.once="submitResponse">
      Submit
    </v-btn>
  </div>
</template>

<script>
export default {
  data() {
    return {
      responses: []
    }
  },
  props: {
    wordsInPrompt: {
      type: Array,
      required: true
    }
  },
  methods: {
    submitReponse() {
      // validation here
      this.$emit('response-submitted', this.responses)
    }
  }
}
</script>