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
    </div>
  </div>
</template>

<script>
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