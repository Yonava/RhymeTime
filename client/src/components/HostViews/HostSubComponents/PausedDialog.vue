<template>
  <v-dialog
    v-model="show"
    max-width="500"
  >
    <v-card class="pause-card pt-2">
      <!-- join audience bubble -->
      <div 
        v-if="currentView !== Views.waiting"
        class="center"
      >
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

        <!-- join audience qr code -->
        <v-img
          :src="qrCodeAPI"
          lazy-src="../../../../assets/extras/lazyQR.png"
          width="175px"
          height="175px"
          style="mix-blend-mode: multiply"
        ></v-img>
      </div>

      <div class="center">
        <div class="divider mt-3 mb-2"></div>
      </div>

      <div class="center">
        <!-- round number & players -->
        <div class="text-h5 font-weight-black mb-2">
          Game Info
        </div>
        <div class="center">
          <div class="text-h6 font-weight-black">
            <span class="mr-3">
              Round:
            </span>
            <v-progress-circular
              :value="gameProgress"
              color="#FFB118"
              size="57"
              width="8"
            >
              <div class="text-h6 font-weight-black black--text">
                {{ roundCount }}/{{ totalRounds }}
              </div>
            </v-progress-circular>
          </div>
          <div class="player-container-parent mt-2 mb-1">
            <div 
              v-for="player in playerList" 
              :key="player.clientId"
            >
              <div 
                :style="backgroundColor(player.color)"
                class="player-container mx-1 my-1"
              >
                <v-img
                  :src="getPlayerPfp(player.pfp)"
                  style="border-radius: 50%;"
                  width="25px"
                  height="25px"
                />
                <div class="text-h6 font-weight-black white--text ml-2 pr-1">
                  {{ player.name }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- adjust round count -->
      <div 
        v-if="currentView === Views.waiting"
        class="text-h2 font-weight-black"
      >
        Settings
      </div>
      <div class="center">
        <div 
          v-if="currentView === Views.waiting" 
          class="divider my-3"
        ></div>
      </div>
      <div 
        v-if="currentView === Views.waiting"
        class="center"
      >
        <div class="text-h5 font-weight-black">
          How Many Rounds?
        </div>
        <div class="text-h1 font-weight-black">
          {{ totalRounds }}
        </div>
        <div>
          <v-btn
            @click.stop="decrementTotalRounds"
            :disabled="totalRounds <= 1"
            class="mx-2"
            color="#FFB118"
            depressed
          >
            <v-icon>mdi-minus</v-icon>
          </v-btn>
          <v-btn
            @click.stop="incrementTotalRounds"
            :disabled="totalRounds >= 9"
            class="mx-2"
            color="#FFB118"
            depressed
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </div>
        <div class="text-h6 font-weight-black mt-3">
          3-5 Recommended
        </div>
      </div>
      
      <div class="center">
        <div class="divider my-3"></div>
      </div>
      
      <!-- Volume Settings -->
      <div class="center">
        <div class="text-h5 font-weight-black">
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
                @click.stop="toggleMusicVolume"
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
                @click.stop="toggleSfxVolume"
                color="black"
              >{{ volumeIcon(sfxVolume) }}</v-icon>
            </template>
          </v-slider>
        </div>
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
  emits: [
    'unpause',
    'update-total-rounds'
  ],
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
      return `https://api.qrserver.com/v1/create-qr-code/?size=125x125&data=${this.url}`
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
    incrementTotalRounds() {
      this.$emit('update-total-rounds', this.totalRounds + 1)
    },
    decrementTotalRounds() {
      this.$emit('update-total-rounds', this.totalRounds - 1)
    },
    getPlayerPfp(pfp) {
      return require(`../../../../assets/pfps/${pfp}.webp`)
    },
    backgroundColor(color) {
      return {
        backgroundColor: color
      }
    },
    calculateGameProgress() {
      // cannot be computed because of progress bar animation
      this.gameProgress = Math.round((this.roundCount / this.totalRounds) * 100)
    },
    toggleMusicVolume() {
      if (this.musicVolume) {
        this.musicVolume = 0
      } else {
        this.musicVolume = 100
      }
    },
    toggleSfxVolume() {
      if (this.sfxVolume) {
        this.sfxVolume = 0
      } else {
        this.sfxVolume = 100
      }
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
.player-container-parent {
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  align-content: center;
  display: flex;
  cursor: default;
}
.player-container {
  display: flex;
  align-items: center;
  padding: 0 7.5px;
  border-radius: 50px;
  height: 35px;
  box-shadow: 2px 4px 5px 0px rgba(0, 0, 0, 0.3);
}
.pause-card-header {
  background: #FFB118;
  border-radius: 10px;
}
.pause-card {
  border: 10px solid #FFB118;
  background: #ffe3aa;  
  position: relative;
}
.triangle-down {
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
  border-top: 20px solid #FFB118;
}
.divider {
  width: 90%;
  border-radius: 5px;
  height: 4px;
  background-color: rgb(47, 47, 47);
}
</style>