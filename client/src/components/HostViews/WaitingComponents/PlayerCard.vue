<template>
  <div 
    class="player-card center" 
    :style="color"
  >
    <!-- <transition name="slide"> -->
      <v-img
        v-if="playerPfp !== 'none'"
        :src="require(`../../../../assets/pfps/${playerPfp}.webp`)"
        class="pfp"
        aspect-ratio="1"
        max-width="125px"
      ></v-img>
    <!-- </transition> -->
    <div style="width: 60%; text-align: center">
      <h1 :style="`font-weight: 1000; ${nameTxtColor}`">{{ playerName }}</h1>
    </div>
    <div 
      v-if="playerClientId"
      class="kick-overlay center"
    >
      <v-btn
        @click.stop="kickPlayer"
        color="red" 
        class="white--text"
        rounded
        large
      >
        kick
        <v-icon class="ml-2">mdi-alert-remove</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    playerColor: {
      required: false,
      type: String,
      default: 'white'
    },
    playerPfp: {
      required: false,
      type: String,
      default: 'none'
    },
    playerName: {
      required: false,
      type: String,
      default: 'Spot Open'
    },
    playerClientId: {
      required: false,
      type: Number,
      default: 0
    }
  },
  computed: {
    color() {
      return `background-color: ${this.playerColor}`
    },
    nameTxtColor() {
      return `color: ${this.playerColor === 'white' ? 'black' : 'white'}`
    }
  },
  methods: {
    kickPlayer() {
      this.$emit('player-kicked', this.playerClientId)
    }
  }
}
</script>

<style scoped>
  .player-card {
    width: 370px;
    height: 150px;
    position: relative;
    flex-direction: row;
    border-radius: 10px;
    transition: 500ms;
  }
  .pfp {
    border-radius: 10px;
  }
  .kick-overlay {
    position: absolute;
    width: 370px;
    height: 150px;
    opacity: 0;
    transition: 350ms ease;
    border-radius: 10px;
    background-color: rgba(255, 155, 155, 0.5);

  }
  .player-card:hover .kick-overlay {
    opacity: 1;
  }


  .slide-in-enter, .slide-out-leave-to {
    transform: translateX(-100vw);
  }
  .slide-in-enter-to, .slide-in-leave-from, .slide-out-enter-to, .slide-out-leave-from {
    transform: translateX(0);
  }
  .slide-in-enter-active, .slide-in-leave-active, .slide-out-enter-active, .slide-out-leave-active {
    transition: all 1s;
    position: fixed;
  }
  .slide-in-leave-to, .slide-out-enter {
    transform: translateX(100vw);
  }
</style>