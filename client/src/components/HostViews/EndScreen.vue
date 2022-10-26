<template>
  <div class="center">
    <v-card>
      <v-card-title>{{ scoreCard[0].playerName }} Won!</v-card-title>
      <v-card-text>
        {{ scoreCard[0].playerName }} managed to win a whopping
        {{ scoreCard[0].score }} rounds!
      </v-card-text>
    </v-card>

    <div v-for="bar in song" :key="bar.id">
      <b>{{ bar.playerName }}</b>
      <br />
      <i>{{ bar.response }}</i>
    </div>
    <v-btn 
      @click.stop="$emit('restart-game')" 
      color="green white--text"
    >Play again</v-btn>
    <v-btn 
      @click.stop="$router.push('/')" 
      color="red white--text"
    >end the party</v-btn>
  </div>
</template>

<script>
import HostMixin from "./HostMixin";

export default {
  mixins: [
    HostMixin
  ],
  data() {
    return {
      // player with the most appearances in 'song' aka song credits
      winner: "",
      // stores players along with their respective song credits
      scoreCard: [],
    };
  },
  mounted() {
    const PLAYERS = this.song.map((response) => response.playerName);
    PLAYERS.forEach((playerName) => {
      const INDEX = this.scoreCard.findIndex((obj) => obj.player === player);
      if (INDEX === -1) {
        this.scoreCard.push({
          playerName,
          score: 1,
        });
      } else {
        this.scoreCard[INDEX].score++;
      }
    });

    this.scoreCard.sort((a, b) => b.score - a.score);
  },
};
</script>