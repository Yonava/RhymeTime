<template>
  <div 
    class="player-card center" 
    :style="color"
  >
    <div style="width: 30%">
      <transition name="slide-in">
        <component :is="pfpSwitch ? 'PlayerPfp1':'PlayerPfp2'">
          <template>
            <img
              v-if="playerPfp"
              :src="require(`../../../../assets/pfps/${playerPfp}.webp`)"
              class="pfp"
            />
          </template>
        </component>
      </transition>
    </div>
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
import PlayerPfp1 from './PlayerPfp1'
import PlayerPfp2 from './PlayerPfp2'

export default {
  components: {
    PlayerPfp1,
    PlayerPfp2
  },
  props: {
    playerColor: {
      required: false,
      type: String,
      default: 'white'
    },
    playerPfp: {
      required: false,
      type: String,
      default: undefined
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
  data() {
    return {
      pfpSwitch: true,
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
  },
  watch: {
    playerPfp() {
      this.pfpSwitch = !this.pfpSwitch
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
    overflow: hidden;
  }
  .pfp {
    border-radius: 10px;
    width: 120px;
    aspect-ratio: 1/1;
    object-fit: cover;
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
  transform: translateY(300px);
  }
  .slide-in-enter-to, .slide-in-leave-from {
    transform: translateY(-60px);
  }
  .slide-in-enter-active, .slide-in-leave-active {
    transition: all 250ms;
    position: absolute;
  }
  .slide-in-leave-to {
    transform: translateY(-360px);
  }
</style>