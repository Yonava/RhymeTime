<template>
  <v-card>
    <v-card-text
      v-for="line in winningResponses"
      :key="line"
      :style="`background: ${line.player.color};`"
    >
      <div class="song-dialog-response-container py-2">
        <img 
          :src="require(`../../../../assets/pfps/${line.player.pfp}.webp`)"
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
</template>

<script>
export default {
  props: {
    winningResponses: {
      type: Array,
      required: true
    }
  },
  emits: [
    'play-again',
    'end-session'
  ],
  methods: {
    playAgain() {
      this.$emit('play-again')
    },
    endSession() {
      this.$emit('end-session')
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
</style>