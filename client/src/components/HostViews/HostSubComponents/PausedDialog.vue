<template>
  <v-dialog
    v-model="show"
    persistent
    max-width="500"
  >
    <v-card>
      <div class="center">
        <v-card-title style="word-break: break-word" class="text-h5 pa-0 mt-2">
          Room {{ $store.state.roomid }}
        </v-card-title>
        <v-img
          :src="qrCodeAPI"
          width="200"
          class="my-4"
        ></v-img>
        <div class="divider ma-2"></div>
        Round
        <v-progress-circular
          :value="gameProgress"
          color="blue"
          size="50"
        >
          {{ roundCount }}/{{ totalRounds }}
        </v-progress-circular>
        <div class="ma-2">
          Players In Room: {{ playersPresent }}
        </div>
        <div class="divider ma-2"></div>
        <div class="text-h6 mb-2">Volume Settings</div>
        <div style="width: 85%">
          <v-row dense align="center" justify="center">
            <v-col cols="10">
              <v-slider
                v-model="$store.state.sfxVolume"
                :prepend-icon="sfxVolumeIcon"
                color="green"
                track-color="red"
                min="0"
                max="100"
              ></v-slider>   
            </v-col>
            <v-col 
              cols="2"
              class="mb-5"
            >SFX</v-col>
          </v-row>
          <v-row dense align="center" justify="center">
            <v-col cols="10">
              <v-slider
                v-model="$store.state.musicVolume"
                :prepend-icon="musicVolumeIcon"
                color="green"
                track-color="red"
                min="0"
                max="100"
              ></v-slider>
            </v-col>
            <v-col 
              cols="2"
              class="mb-5"
            >Music</v-col>
          </v-row>
        </div>
        <v-card-actions> 
          <div 
            @click.stop="exit"
            style="cursor: pointer; position: absolute; left:0"
            class="ml-3"
          >
            <v-icon color="red">
              mdi-arrow-left-bold-circle
            </v-icon>
            Disband Game
          </div>
          <div 
            @click.stop="show = false"
            style="cursor: pointer"
          >
            <v-icon x-large>
              mdi-play
            </v-icon> 
          </div>
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
  data() {
    return {
      gameProgress: 0
    }
  },
  computed: {
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
    sfxVolumeIcon() {
      const VOLUME = this.$store.state.sfxVolume
      switch (true) {
        case VOLUME > 70:
          return 'mdi-volume-high'
        case VOLUME > 20:
          return 'mdi-volume-medium'
        case VOLUME > 0:
          return 'mdi-volume-low'
        default: 
          return 'mdi-volume-off'
      }
    },
    musicVolumeIcon() {
      const VOLUME = this.$store.state.musicVolume
      switch (true) {
        case VOLUME > 70:
          return 'mdi-volume-high'
        case VOLUME > 20:
          return 'mdi-volume-medium'
        case VOLUME > 0:
          return 'mdi-volume-low'
        default: 
          return 'mdi-volume-off'
      }
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
  },
  methods: {
    calculateGameProgress() {
      const PERCENT_COMPLETED = (this.roundCount / this.totalRounds) * 100
      this.gameProgress = Math.round(PERCENT_COMPLETED)
    },
    exit() {
      this.$parent.forceDisconnect()
      this.$router.push('/')
    }
  },
  watch: {
    visible(v) {
      if (v) setTimeout(() => this.calculateGameProgress(), 250)
      else this.gameProgress = 0
    }
  }
}
</script>

<style scoped>
.divider {
  width: 90%;
  height: 1px;
  background-color: rgb(47, 47, 47);
}
</style>