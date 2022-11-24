<template>
  <div 
    :style="cardColor"
    class="player-card pa-4"
  >
    <v-img
      :src="pfpSource"
      class="pfp"
      aspect-ratio="1"
      max-width="70"
    ></v-img>
    <h1 class="player-name ml-4">
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
        <v-card-title class="white--text text-h4">
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
    width: 100%;
    border-radius: 10px;
    display: flex;
    align-items: center;
    cursor: grab;
  }
  .pfp {
    border-radius: 10px;
  }
  .player-name {
    color: white;
    font-size: 2.25rem;
    font-weight: 900;
  }
</style>