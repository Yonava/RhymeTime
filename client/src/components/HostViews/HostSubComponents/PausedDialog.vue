<template>
  <v-dialog
    v-model="show"
    persistent
    max-width="500"
  >
    <v-card>
      <div class="center">
        <v-card-title style="word-break: break-word" class="text-h5">
          Room {{ $store.state.roomid }}
        </v-card-title>
        <v-img
          :src="qrCodeAPI"
          width="200"
          class="my-4"
        ></v-img>
        <v-card-text style="word-break: break-word">
          Round {{ roundCount }} out of {{ totalRounds }}
          <v-progress-circular
            :value="gameProgress"
            color="blue"
            size="50"
          >
            {{ gameProgress }}%
          </v-progress-circular>
        </v-card-text>
        <v-card-text>
          Players In Room: {{ playersPresent }}
        </v-card-text>
        <v-btn
          @click.stop="$store.state.sfxEnabled = !$store.state.sfxEnabled"
          :color="sfxBtnColor"
          class="white--text"
        >{{ sfxText }}</v-btn>
        <v-card-actions>
          <v-btn
            @click.stop="show = false"
            block
            color="info"
          >
            Unpause Game
          </v-btn>
        </v-card-actions>
      </div>
    </v-card>
    
  </v-dialog>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      require: true
    },
    roundCount: {
      type: Number,
      required: true
    },
    totalRounds: {
      type: Number,
      required: true
    },
    playerList: {
      type: Array,
      required: true
    }
  },
  computed: {
    gameProgress() {
      const PERCENT_COMPLETED = (this.roundCount / this.totalRounds) * 100
      return Math.round(PERCENT_COMPLETED)
    },
    playersPresent() {
      if (!this.playerList.length) return 'No Players In Room'
      if (this.playerList.length === 1) return this.playerList[0]
      let playersInGame = ''
      for (let i = 0; i < this.playerList.length; i++) {
        if (this.playerList.length - 1 === i) playersInGame += ', and '
        else if (i !== 0) playersInGame += ', '
        playersInGame += this.playerList[i]
      }
      return playersInGame
    },
    sfxText() {
      return this.$store.state.sfxEnabled ? 'SFX Enabled' : 'SFX Disabled'
    },
    sfxBtnColor() {
      return this.$store.state.sfxEnabled ? 'green' : 'red'
    },
    url() {
      return `
        ${
          window.location.href.substring(0, window.location.href.length - 5)
        }/join?room=${
          this.$store.state.roomid
        }
      `
    },
    qrCodeAPI() {
      return `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${this.url}`
    },
    show: {
      get() {
        return this.visible
      },
      set(value) {
        if (!value) {
          this.$emit('unpause')
        }
      }
    }
  }
}
</script>