<template>
  <div>
    <div v-if="!submitted">
      Come up with a rhyme using these {{ wordsInPrompt.length }} words {{ wordsInPrompt }}:
      <v-textarea
        v-model="response"
        :rules="[includesPrompt]"
        label="Your Response"
        no-resize
        maxlength="1000"
      ></v-textarea>
      <br>
      <v-btn @click.once="submitResponse">
        Submit
      </v-btn>
    </div>
    <div v-else>
      <div v-if="submissionReceived === true">
        Your response has been submitted. Waiting on other player...
      </div>
      <div v-else-if="submissionReceived === false">
        Error encountered while sending your response to the host. This could be an internet connectivity issue
        <br>
        <v-btn text @click.stop="sendResponseToHost">Try Again</v-btn>
      </div>
      <div v-else>
        Sending Response To Host...
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // stores the text that user enters
      response: '',
      // true when player submits on their end
      submitted: false,
      // true when server verifies it has received the submission
      submissionReceived: undefined,
      // used for vuetify text-field validation
      includesPrompt: v => this.wordsInPrompt.every(word => v.toLowerCase().indexOf(word) !== -1) || "Include Every Word Given In Prompt"
    }
  },
  props: {
    wordsInPrompt: {
      type: Array,
      required: true
    },
    socketInstance: {
      required: true,
      validator: socket => socket?.connected
    }
  },
  methods: {
    submitResponse() {
      // validation here
      this.submitted = true
      this.sendResponseToHost()
    },
    sendResponseToHost() {
      const RESPONSE_OBJ = {
        playerName: this.$store.state.nickname,
        response: this.response
      }

      this.socketInstance.emit('player-prompt-response', RESPONSE_OBJ, (callback) => {
        // callback responds with 'sent' if response was successfully transmitted
        this.submissionReceived = callback === 'sent'
      })
    },
  }
}
</script>