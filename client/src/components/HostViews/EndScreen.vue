<template>
  <div class="background-matte">
    <div class="background-stripe-1"></div>
    <div class="background-stripe-2"></div>
    <header class="center mt-10">
      <div 
        @click.stop="showSong = !showSong"
        :style="endScreenTitleStyles"
        class="text-h1 end-screen-title font-weight-black white--text px-7 py-5"
      >
        View Finished Song
      </div>
    </header>
    <Podium 
      :scoreCard="scoreCard"
      @update-title-styles="endScreenTitleStyles = $event"
    />
    <v-dialog
      v-model="showSong"
      max-width="600"
    >
      <v-card>
        <v-card-text
          v-for="line in winningResponses"
          :key="line"
          :style="`background: ${line.player.color};`"
        >
          <div class="song-dialog-response-container py-2">
            <img 
              :src="require(`../../../assets/pfps/${line.player.pfp}.webp`)"
              :alt="line.player.name"
              class="song-dialog-pfp"
            />
            <div class="text-h6 font-weight-black white--text">
              {{ line.player.name }} Contributed:
            </div>
          </div>
          <div 
            class="text-h5 white--text"
          >
            {{ line.response }}
          </div>
        </v-card-text>
        <div class="song-dialog-button-container px-5">
          <div 
            @click.stop="playAgain"
            class="text-h5 song-dialog-button"
          >
            Play Again!
          </div>
          <v-spacer></v-spacer>
          <div 
            @click.stop="endSession"
            class="text-h5 song-dialog-button"
          >
            End Session :(
          </div>
        </div>
      </v-card> 
    </v-dialog>
  </div>
</template>

<script>
import HostMixin from './HostMixin'
import Podium from './HostSubComponents/EndScreenPodium.vue'

export default {
  mixins: [
    HostMixin
  ],
  components: {
    Podium
  },
  emits: [
    'restart-game'
  ],
  data() {
    return {
      // stores players along with their respective song credits
      scoreCard: [],
      // 'view finished song' button
      endScreenTitleStyles: {
        opacity: 0,
        cursor: 'default'
      },
      // true if song dialog is open
      showSong: false
    }
  },
  mounted() {
    // initializes the scorecard
    this.playerList.forEach((player) => {
      this.scoreCard.push({
        player,
        score: 0,
      })
    })

    // increments the score of the player who submitted the winning response
    this.winningResponses.forEach((response) => {
      this.scoreCard
        .find((p) => p.player.clientId === response.player.clientId).score += 1
    })

    // sort scorecard by score
    this.scoreCard.sort((a, b) => b.score - a.score)
  },
  methods: {
    endSession() {
      this.$router.push({
        name: 'Home' 
      })
    },
    playAgain() {
      this.$emit('restart-game')
    }
  }
}
</script>

<style scoped>

.song-dialog-button-container {
  position: sticky; 
  bottom: 0; 
  background: rgba(0, 0, 0, 0.75); 
  height: 65px; 
  display: flex; 
  flex-direction: row; 
  align-items: center; 
  justify-content: center;
}

.song-dialog-button {
  cursor: pointer;
  color: white;
  font-weight: 900;
}

.song-dialog-button:hover {
  text-decoration: underline;
}

.song-dialog-pfp {
  width: 40px; 
  height: 40px; 
  border-radius: 50%; 
  margin-right: 10px; 
  object-fit: cover;
}

.song-dialog-response-container {
  display: flex; 
  flex-direction: row; 
  align-items: center;
}

.end-screen-title {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  z-index: 2;
  transition: 3s;
}
.end-screen-title:hover {
  background: rgba(0, 0, 0, 0.5);
}
.background-matte {
  background-color: #303030;
  width: 100vw;
  height: 100vh;
  position: fixed;
}
.background-stripe-2 {
  height: 150vw;
  width: 175px;
  background-color: #414141;
  transform: translateY(-85vh) translateX(30vw) rotate(100deg);
  position: fixed;
}
.background-stripe-1 {
  height: 150vw;
  width: 175px;
  background-color: #414141;
  transform: translateY(-85vh) translateX(30vw) rotate(220deg);
  position: fixed;
}
</style>