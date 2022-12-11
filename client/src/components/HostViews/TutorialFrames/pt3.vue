<template>
  <div class="pt3-parent">
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
</template>

<script>
import frameMixin from './frameMixin.vue'

export default {
  name: 'pt3',
  mixins: [
    frameMixin
  ],
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
</style>