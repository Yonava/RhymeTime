<template>
  <div>
    <div v-if="!submitted">
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
    <div v-else>
      Your response has been submitted. Waiting on other player...
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      responses: [],
      submitted: false
    }
  },
  props: {
    wordsInPrompt: {
      type: Array,
      required: true
    }
  },
  methods: {
    submitResponse() {
      // validation here
      console.log(this.responses)
      this.submitted = true
      this.$emit('response-submitted', this.responses)
    }
  }
}
</script>