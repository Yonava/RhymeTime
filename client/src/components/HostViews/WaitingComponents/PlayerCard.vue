<template>
  <div 
    class="player-card center" 
    :style="color"
  >
    <div 
      v-if="playerPfp !== 'none'" 
      class="pfp"
      style="width: 30%"
    ></div>
    <div style="width: 60%; text-align: center">
      <h1 :style="`font-weight: 1000; ${nameTxtColor}`">{{ playerName }}</h1>
    </div>
    <div 
      v-if="playerName !== 'Spot Open'"
      class="kick-overlay center"
    >
      <v-btn
        @click.stop="kickPlayer"
        color="red" 
        class="white--text"
        rounded
      >kick</v-btn>
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
      this.$emit('player-kicked')
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
  }
  .pfp {
    height: 120px;
    width: 120px;
    background-color: gray;
    border-radius: 5px;
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
</style>