<template>
  <div class="home">
    <v-container fluid fill-height>
      <v-row class="mt-1" align="center" justify="center">
        <div class="text-h4">Welcome To RhymeTime</div>
      </v-row>
      <v-row class="mt-5" align="center" justify="center">
        <v-btn
          @click.once="host"
          color="blue"
          class="ma-3"
          dark
          @mouseover="playTune('StereoHearts')"
          @mouseleave="pauseTune"
        >Host A Game</v-btn>
        <v-btn
          @click.once="join"
          color="green"
          class="ma-3"
          dark
        >Join Active Session</v-btn>
      </v-row>
    </v-container>
    <div class="ma-4">
      <v-text-field
        v-model="msg" 
        filled
        style="width: 30%"
      ></v-text-field>
      <v-btn 
        @click="windowSpam" 
        color="black" 
        dark
      >display message</v-btn>
      <br><br>
      <div 
        class="white--text text-p pa-5" 
        style="background-color: red; height: 75px; width: 75px; cursor: crosshair"
        @mouseover="playTune('Kahoot')"
        @mouseleave="pauseTune"
      >music box</div>
      <br>
      <v-btn
        @click="$store.state.blockedAudio = undefined"
        color="red"
        class="white--text"
      >clear blocked Audio from state</v-btn>
    </div>

  </div>
</template>

<script>
import { SoundTrack } from '../utils/Soundboard'

export default {
  name: 'HomeView',
  data() {
    return {
      msg: 'try clicking the button!'
    }
  },
  created() {
    document.title = this.$route.query.word || 'RhymeTime'
    setTimeout(() => window.close(), 5000)
  },
  methods: {
    playTune(track) {
      SoundTrack.playNew(track)
    },
    pauseTune() {
      SoundTrack.pause()
    },
    windowSpam() {
      const sentence = this.msg.split(' ')
      sentence.forEach(word => {
        window.open(`http://localhost:8080?word=${word}`, "_blank")
      })
    },
    host() {
      this.$store.state.roomid = Math
        .random()
        .toString()
        .substring(2, 6)
      
      this.$router.push({ name: 'host' })
    },
    join() {
      this.$router.push({ name: 'join' })
    }
  }
}
</script>