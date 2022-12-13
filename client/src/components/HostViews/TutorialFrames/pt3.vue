<template>
  <div>
    <div 
      v-if="phaseExplanation"
      class="pt3-parent"
    >
      <div
        :style="respondOpacity"
        class="trans-op center"
      >
        <div class="white--text text-h3 font-weight-black"> 
          Response
        </div>
        <v-icon
          color="white"
          size="150"
        >
          mdi-chat-processing-outline
        </v-icon>
      </div>
      <v-spacer></v-spacer>
      <v-icon
        color="white"
        size="220"
      >
        mdi-refresh-circle
      </v-icon>
      <v-spacer></v-spacer>
      <div
        :style="voteOpacity"
        class="trans-op center"
      >
        <div class="white--text text-h3 font-weight-black"> 
          Voting
        </div>
        <v-icon
          color="white"
          size="150"
        >
          mdi-vote-outline
        </v-icon>
      </div>
      <div
        :style="playerCardStyle"
        class="pt3-player-card" 
      >
        <img
          :src="require(`../../../../assets/pfps/${randomPlayer.pfp}.webp`)"
          class="pfp"
        />
        <h1 class="font-weight-black white--text">
          {{ randomPlayer.name }}
        </h1>
      </div>
    </div>
    <div 
      :style="phaseExplanation ? 'opacity: 0; position: absolute' : ''"
      class="d-flex flex-column justify-center align-center"
    >
      <div 
        :style="promptStyle"
        class="text-h2 font-weight-black white--text trans"
      >
        Prompt: Place & Case
      </div>
      <div 
        :style="promptResponseStyle"
        class="d-flex flex-column justify-center align-center trans"
      >
        <div class="text-box px-3 py-2 font-weight-black text-h3">
          {{ promptResponseDisplay }}
        </div>
        <div class="downward-triangle"></div>
      </div>
    </div>
  </div>
</template>

<script>
import frameMixin from './frameMixin.vue'

export default {
  name: 'pt3',
  mixins: [
    frameMixin
  ],
  data() {
    return {
      promptResponseDisplay: '',
      promptResponse: "I'm on my way to take first place, which means second for you is your best case."
    }
  },
  computed: {
    respondOpacity() {
      return {
        opacity: this.timeElapsed > 1_000 ? 1 : 0
      }
    },
    voteOpacity() {
      return {
        opacity: this.timeElapsed > 3_000 ? 1 : 0
      }
    },
    playerCardStyle() {
      const TIME_RANGE = [9_500, 12_000]
      return {
        transform: this.timeElapsed > TIME_RANGE[0] && this.timeElapsed < TIME_RANGE[1] ? 'translate(25px, -42.5vh)' : 'translate(25px, -70vh)',
        backgroundColor: this.randomPlayer.color
      }
    },
    randomPlayer() {
      return this.playerList[Math.floor(Math.random() * this.playerList.length)]
    },
    phaseExplanation() {
      return this.timeElapsed < 20_000
    },
    promptStyle() {
      return {
        opacity: this.timeElapsed > 20_000 ? 1 : 0,
        transform: this.timeElapsed > 23_500 ? 'translate(0, -10px)' : 'translate(0, 100px)'
      }
    },
    promptResponseStyle() {
      return {
        opacity: this.timeElapsed > 24_000 ? 1 : 0,
        transform: this.timeElapsed > 24_000 ? 'translate(0, 0)' : 'translate(0, 100px)'
      }
    }
  },
  watch: {
    timeElapsed(v) {
      if (v === 27_000) {
        // add all words from promptResponse to promptResponseDisplay one by one
        let i = 0
        this.promptResponse = this.promptResponse.split(' ')
        const interval = setInterval(() => {
          this.promptResponseDisplay += this.promptResponse[i] + ' '
          i++
          if (i === this.promptResponse.length) {
            clearInterval(interval)
          }
        }, 250)
      }
    }
  }
}
</script>

<style scoped>
.pt3-parent {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 50vw;
}
.trans-op {
  transition: opacity 1s;
}

.trans {
  transition: 1s;
}

.pt3-player-card {
  margin: 10px;
  width: 250px; 
  height: 100px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  flex-direction: row;
  position: absolute;
  transition: 1s;
}

.pfp {
  margin: 7px;
  margin-right: 10px;
  border-radius: 10px;
  width: 85px;
  height: 85px;
  aspect-ratio: 1/1;
  object-fit: cover;
}

.text-box {
  width: 700px;
  height: 200px;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
}

.downward-triangle {
  border-left: 50px solid transparent;
  border-right: 50px solid transparent;
  border-top: 50px solid rgba(255, 255, 255, 0.2);
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 1s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
.fade-enter-to, .fade-leave {
  opacity: 1;
}
</style>