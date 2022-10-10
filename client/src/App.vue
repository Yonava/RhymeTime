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
      v-model="showAudioSnackbar"
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
      key: "open sesame",
      showAudioSnackbar: false
    };
  },
  mounted() {
    this.$watch(() => this.$store.state.blockedAudio, (v) => {
      this.showAudioSnackbar = !!v;
    });
  },
  methods: {
    playBlockedAudio() {
      SoundTrack.playNew(this.$store.state.blockedAudio)
      this.showAudioSnackbar = false
    }
  },
  watch: {
    password(v) {
      localStorage.setItem("password", v);
    },
    showAudioSnackbar(v) {
      if (!v) this.$store.state.blockedAudio = undefined;
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
