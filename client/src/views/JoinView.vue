<template>
  <v-card 
    class="fix-to-middle" 
    width="350"
  >
    <v-card-title>
      Join A Room
    </v-card-title>
    <div class="px-5">
      <v-text-field
        v-model="$store.state.nickname"
        label="Enter a nickname"
      ></v-text-field>
      <v-text-field
        v-model="$store.state.roomid"
        label="Enter a room ID"
      ></v-text-field>
    </div>
    <v-card-actions>
      <v-btn 
        @click="play"
        :disabled="!canJoin"
        color="purple"
        class="white--text"
        block
      >jump in!</v-btn>
    </v-card-actions>
    <v-card-actions>
      <v-btn 
        @click="$router.push('/')"
        block 
        color="red" 
        dark 
      >go back :(</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  mounted() {
    this.$store.state.roomid = this.$route.query.room || ''
  },
  methods: {
    play() {
      this.$router.push({ name: 'play' })
    }
  },
  computed: {
    canJoin() {
      return this.$store.state.nickname && this.$store.state.roomid
    }
  }
}
</script>

<style scoped>
  .fix-to-middle {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>