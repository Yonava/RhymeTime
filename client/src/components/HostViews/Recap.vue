<template>
  <div
    class="background-matte center"
    :style="border"
  >
    <div 
      style="position: fixed; top: 0; left: 0;"
      class="ma-8"
    >
      <v-btn
        @click.stop="togglePause"
        color="white"
        fab
        small
      >
        <v-icon>
          mdi-pause
        </v-icon>
      </v-btn>
    </div>
    <div class="text-h2 font-weight-black">
      Round Winner
    </div>
    <div class="text-h1 white--text font-weight-black">
      {{ winningResponse.player.name }}
    </div>
    <img
      :src="pfpSource"
      alt="Winner's Profile Picture"
      class="pfp mt-2"
    />
    <div class="response-box-container center">
      <div class="triangle"></div>
      <div class="response-display-box pl-5 pt-3">
        <div class="text-h3 font-weight-black">
          {{ displayedResponse }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HostMixin from './HostMixin'

export default {
  mixins: [
    HostMixin
  ],
  emits: [
    'round-over'
  ],
  data() {
    return {
      displayedResponse: ''
    }
  },
  mounted() {
    let counter = 0;
    this.writeText = setInterval(() => {
      if (this.displayedResponse == this.winningResponse.response) {
        clearInterval(this.writeText)
      } else {
        this.displayedResponse += this.winningResponse.response[counter]
        counter++
      }
    }, 50)
  },
  computed: {
    winningResponse() {
      const LAST_INDEX = this.winningResponses.length - 1
      return this.winningResponses[LAST_INDEX]
    },
    border() {
      return {
        border: `50px solid ${this.winningResponse.player.color}`
      }
    },
    pfpSource() {
      return require(`../../../assets/pfps/${this.winningResponse.player.pfp}.webp`)
    }
  },
  methods: {
    next() {
      if (this.testMode) return
      this.$emit('round-over')
    }
  }
}
</script>

<style scoped>
.background-matte {
  width: 100vw;
  height: 100vh;
  background-color: #FFB118;
}
.pfp {
  width: 175px;
  height: 175px;
  object-fit: cover;
  border-radius: 15px;
}
.triangle {
  height: 0;
  width: 0;
  border: 40px dashed;
  border-color: transparent transparent #FFD37E transparent;
}
.response-box-container {
  transform: translateY(-27.5px);
  width: 100%;
  position: relative;
}
.response-display-box {
  width: 65%;
  height: 240px;
  background-color: #FFD37E;
  border-radius: 15px;
}
</style>