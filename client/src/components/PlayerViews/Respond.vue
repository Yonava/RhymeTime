<template>
  <div class="background-matte">
    <header class="header center">
      <h1 class="player-view-title">Respond</h1>
    </header>
    <div class="center">
      <div class="content-container">
        <textarea 
          v-model="response"
          :placeholder="responseBoxPlaceholder"
          class="response-text-area text-h5 mt-7" 
        ></textarea>
        <div
          :style="includesPrompt ? 'opacity: 0;' : ''"
          class="prompt-requirements pl-1 mt-2"
          ref="promptRequirements"
        >
          <v-icon 
            color="white"
            class="mr-1"
          >mdi-alert-circle</v-icon>
          {{ promptRequirements }}
        </div>
        <div 
          @click.stop="submitResponse"
          :style="sendBtn.color"
          class="send-btn center mt-12"
        >
          <span class="send-btn-text">
            {{ sendBtn.text }}
          </span>
        </div>
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
    wordDisplay() {
      // turns array of words into a string that can be neatly displayed: 
      // ['its', 'rhyme', 'time'] -> 'its, rhyme, and time'
      let wordsInPrompt = ''
      for (let i = 0; i < this.wordsInPrompt.length; i++) {
        if (this.wordsInPrompt.length - 1 === i) wordsInPrompt += ', and '
        else if (i !== 0) wordsInPrompt += ', '
        wordsInPrompt += this.wordsInPrompt[i]
      }
      return wordsInPrompt
    },
    responseBoxPlaceholder() {
      return `What's the best way to rhyme ${this.wordDisplay} together?`
    },
    includesPrompt() {
      // returns true if response includes all words in the prompt
      return this.wordsInPrompt.every(word => {
        return this.response.toLowerCase().includes(word.toLowerCase())
      })
    },
    promptRequirements() {
      return `${this.wordDisplay} must be included`
    },
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
    highlightPromptRequirements() {
      // highlights prompt requirements if response does not include all words in prompt
      if (!this.includesPrompt) {
        this.$refs.promptRequirements.classList.add('highlight')
        setTimeout(() => {
          this.$refs.promptRequirements.classList.remove('highlight')
        }, 500)
      }
    },
    submitResponse() {
      if (this.submitted) return
      if (!this.includesPrompt) return this.highlightPromptRequirements()
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

      // if server does not respond within 5 seconds, assume submission was not received
      setTimeout(() => {
        if (!this.submissionReceived) {
          this.submitted = false
        }
      }, 5000)
    },
  }
}
</script>

<style scoped>
  .highlight {
    background: rgb(135, 65, 65) !important;
  }
  .prompt-requirements {
    position: relative;
    color: white;
    background-color: #FF0000;
    border-radius: 10px;
    font-weight: 800;
    font-size: 1.2rem;
    transition: 300ms ease;
    display: flex;
    align-items: center;
    cursor: default;
  }
  .content-container {
    position: relative;
    width: 80%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: left;
  }
  .response-text-area {
    width: 100%;
    height: 200px;
    background: rgba(255,255,255,0.5);
    border-radius: 5px;
    padding: 10px;
    font-size: 1.2rem;
    resize: none;
    font-weight: 300;
  }
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
    width: 100%;
    height: 62px;
    border-radius: 7px;
    cursor: pointer;
  }
  .send-btn-text {
    color: white;
    font-weight: 900;
    font-size: 2.25rem;
  }
</style>