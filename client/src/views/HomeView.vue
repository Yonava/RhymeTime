<template>
  <div class="home">
    <v-container>
      <v-row align="center" justify="center">
        <v-btn
          @click.once="host"
          color="green"
          class="ma-3"
        >Host Game</v-btn>
        <v-btn
          @click.once="join"
          color="blue"
          class="ma-3"
        >Join Active Session</v-btn>
      </v-row>
    </v-container>
  </div>
</template>

<script>

export default {
  name: 'HomeView',
  methods: {
    host() {
      this.$router.push({ name: 'host' })
    },
    join() {
      this.$router.push({ name: 'play' })
    }
  }
}
</script>
