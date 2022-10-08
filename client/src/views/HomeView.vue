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
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  data() {
    return {

    }
  },
  methods: {
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