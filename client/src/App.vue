<template>
  <v-app>
    <div>
      <router-view />
    </div>

    <!-- audio disabled alert -->
    <v-snackbar
      v-model="blockedAudio"
      :multi-line="true"
    >
      Browser Has Block Audio From Playing, Click To Re-Enable Audio
      <template v-slot:action="{ attrs }">
        <v-icon
          v-bind="attrs"
          @click.stop="playBlockedAudio"
          class="mr-2"
        >
          mdi-play
        </v-icon>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script>
import { SoundTrack } from './utils/Soundboard'

export default {
  data() {
    return {
      password: localStorage.password,
      key: "open sesame"
    };
  },
  computed: {
    blockedAudio: {
      get() {
        return this.$store.state.blockedAudio
      },
      set(v) {
        if (!v) this.$store.state.blockedAudio = v
      }
    }
  },
  methods: {
    playBlockedAudio() {
      SoundTrack.playNew(this.blockedAudio)
      this.blockedAudio = undefined
    }
  }
}
</script>

<style>
@import url("@/styles.css");

.input-box {
  position: fixed;
  bottom: 10%;
}
.close-sesame {
  position: fixed;
  bottom: 0;
}
</style>
