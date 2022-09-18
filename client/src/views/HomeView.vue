<template>
  <div class="home">
    <v-container>
      <v-row align="center" justify="center">
        <v-btn
          @click.once="host"
          color="green"
          class="ma-3"
          dark
        >Host Game</v-btn>
        <v-btn
          @click.once="join"
          color="blue"
          class="ma-3"
          dark
        >Join Active Session</v-btn>
      </v-row>
      <br>
      <center>
        <v-text-field
          v-model="roomid"
          label="Room ID"
          style="width: 200px"
        ></v-text-field>
      </center>
    </v-container>
  </div>
</template>

<script>

export default {
  name: 'HomeView',
  data() {
    return {
      roomid: '1234'
    }
  },
  methods: {
    host() {
      this.$router.push({ name: 'host', query: { room: this.roomid } })
    },
    join() {
      this.$router.push({ name: 'play', query: { room: this.roomid } })
    }
  }
}
</script>
