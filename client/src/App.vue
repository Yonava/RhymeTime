<template>
  <v-app>
    <div v-if="password === key">
      <router-view />
      <button class="close-sesame" @click="password = ''">close sesame</button>
    </div>
    <center v-else>
      <h1>RhymeTime Coming Soon</h1>
      <input class="input-box" type="text" v-model="password" />
    </center>

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
  },
  watch: {
    password(v) {
      localStorage.setItem("password", v);
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
