<template>
  <div class="background-matte">
    <header class="header center">
      <h1 class="player-view-title">Respond</h1>
    </header>
    <div class="center mt-6">
      <div 
        @click.stop="submitResponse"
        :style="sendBtn.color"
        class="send-btn center"
      >
        <span class="send-btn-text">
          {{ sendBtn.text }}
        </span>
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
      submissionReceived: undefined
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
    },
    clientId: {
      type: Number,
      required: true
    },
  },
  computed: {
    sendBtn() {
      // sent but not received by host
      if (this.submitted && !this.submissionReceived) {
        return {
          color: 'background: #FFB118',
          text: 'Sending...'
        }
      // sent and received by host
      } else if (this.submitted && this.submissionReceived) {
        return {
          color: 'background: #4BB526',
          text: 'Sent!'
        }
      // not sent
      } else {
        return {
          color: 'background: #FFB118',
          text: 'Send'
        }
      }
    }
  },
  methods: {
    submitResponse() {
      if (this.submitted) return
      let includesPrompt = response => {
        return this.wordsInPrompt.every(word => response.toLowerCase().indexOf(word) !== -1)
      }
      if (!includesPrompt(this.response)) return this.highlightPromptRequirements()
      this.submitted = true
      this.sendResponseToHost()
    },
    sendResponseToHost() {
      const RESPONSE_OBJ = {
        clientId: this.clientId,
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

<style scoped>
  .header {
    width: 100%;
    height: 70px;
    background-color: #FFB118;
  }
  .player-view-title {
    font-size: 40px; 
    font-weight: 900;
  }
  .background-matte {
    width: 100vw;
    height: 100vh;
    background-color: #FFD37E;
  }
  .send-btn {
    width: 85%;
    height: 62px;
    border-radius: 12px;
    cursor: pointer;
  }
  .send-btn-text {
    color: white;
    font-weight: 1000;
    font-size: 20pt;
  }
</style>