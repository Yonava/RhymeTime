<template>
  <v-dialog
    v-model="show"
    max-width="500"
  >
    <v-card class="pause-card pa-3">
      <div class="center">
        <div class="center">
          <div class="pause-card-header center px-4 py-3">
            <div 
              class="text-h6 mb-2"
              style="line-height: 1;"
            >
              Playing In Room {{ $store.state.roomid }}
            </div>
            <v-card-title 
              style="word-break: break-word; line-height: 0.8" 
              class="text-h4 font-weight-black pa-0"
            >
              Join The Audience
            </v-card-title>
          </div>
          <div class="triangle-down mb-2"></div>
          <v-img
            :src="qrCodeAPI"
            lazy-src="../../../../assets/extras/lazyQR.png"
            width="200"
            style="mix-blend-mode: multiply"
          ></v-img>
        </div>
        <div class="divider mt-3 mb-2"></div>
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
        <div class="text-h5 font-weight-black mb-2">
          Volume Settings
        </div>
        <div style="width: 85%">
          <div class="text-h6 font-weight-black">
            Music:
          </div>
          <v-slider
            v-model="musicVolume"
            color="green"
            track-color="red"
            min="0"
            max="100"
            thumb-label
          >
            <template #prepend>
              <v-icon
                @click.stop="musicVolume ? musicVolume = 0 : musicVolume = 100"
                color="black"
              >{{ volumeIcon(musicVolume) }}</v-icon>
            </template>
          </v-slider>

          <div class="text-h6 font-weight-black">
            Sound Effects:
          </div>

          <v-slider
            v-model="sfxVolume"
            color="green"
            track-color="red"
            min="0"
            max="100"
            thumb-label
          >
            <template #prepend>
              <v-icon
                @click.stop="sfxVolume ? sfxVolume = 0 : sfxVolume = 100"
                color="black"
              >{{ volumeIcon(sfxVolume) }}</v-icon>
            </template>
          </v-slider>
        </div>
        <v-card-actions> 
          <div 
            @click.stop="exit"
            style="cursor: pointer; position: absolute; left: 0"
            class="ml-3"
          >
            <v-icon color="red">
              mdi-arrow-left-bold-circle
            </v-icon>
            Disband Game
          </div>
        </v-card-actions>
      </div>
    </v-card>
    
  </v-dialog>
</template>

<script>
import { SoundTrack } from '../../../utils/Soundboard'
import { Views } from '../../../utils/Views'

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
    },
    currentView: {
      type: String,
      required: true
    }
  },
  emits: ['unpause'],
  data() {
    return {
      gameProgress: 0,
      Views
    }
  },
  computed: {
    musicVolume: {
      get() {
        return this.$store.state.musicVolume
      },
      set(newVolume) {
        SoundTrack.setVolume(newVolume)
      }
    },
    sfxVolume: {
      get() {
        return this.$store.state.sfxVolume
      },
      set(newVolume) {
        this.$store.state.sfxVolume = newVolume
      }
    },
    playersPresent() {
      const PLAYER_NAMES = this.playerList.map(player => player.name)
      if (!PLAYER_NAMES.length) return 'No Players In Room'
      return PLAYER_NAMES.join(', ')
    },
    url() {
      return `
        ${
          window.location.href.substring(0, window.location.href.length - 5)
        }/audience?room=${
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
    volumeIcon(volume) {
      if (volume > 70) return 'mdi-volume-high'
      if (volume > 20) return 'mdi-volume-medium'
      if (volume > 0) return 'mdi-volume-low'
      return 'mdi-volume-off'
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
.pause-card-header {
  background: #FFB118;
  border-radius: 10px;
}
.pause-card {
  border: 10px solid #FFB118;
  background: #ffe3aa;  
}
.triangle-down {
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
  border-top: 20px solid #FFB118;
}
.divider {
  width: 95%;
  border-radius: 5px;
  height: 4px;
  background-color: rgb(47, 47, 47);
}
</style>