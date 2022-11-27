<template>
  <div 
    :style="cardColor"
    class="player-card pa-2"
  >
    <div class="pfp-container">
      <img
        :src="pfpSource"
        :alt="player.name"
        class="pfp"
      />
    </div>
    <h1 class="player-name text-h5 ml-3">
      {{ player.name }}
    </h1>
    <v-spacer></v-spacer>
    <v-dialog>
      <template v-slot:activator="{ on }">
        <div
          v-on="on"
          class="view-response"
        >
          <v-icon
            color="white"
            large
          >mdi-eye</v-icon>
          <p class="view-response-text">
            View Response
          </p>
        </div>
      </template>
      <v-card
        :color="player.color"
      >
        <v-card-title 
          style="word-break: break-word;" 
          class="white--text text-h4"
        >
          {{ player.name }}'s Response
        </v-card-title>
        <v-card-text class="white--text text-h5">
          {{ response }}
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    player: {
      type: Object,
      required: true
    },
    response: {
      type: String,
      required: true
    }
  },
  computed: {
    cardColor() {
      return {
        backgroundColor: this.player.color
      }
    },
    pfpSource() {
      return require(`../../../../assets/pfps/${this.player.pfp}.webp`)
    },
  }
}
</script>

<style scoped>
  .view-response-text {
    margin: 0;
    font-size: .75rem;
    color: white;
    font-weight: 900;
  }
  .view-response {
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
  }
  .player-card {
    width: 95%;
    max-width: 400px;
    height: 70px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    flex-direction: row;
    cursor: grab;
    position: relative; 
  }
  .pfp-container {
    height: 55px;
    width: 55px;
    position: relative;
  }
  .pfp {
    border-radius: 7px;
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
  .player-name {
    color: white;
    font-weight: 900;
  }
</style>