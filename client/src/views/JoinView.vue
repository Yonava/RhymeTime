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
        label="Nickname"
      ></v-text-field>
      <v-text-field
        v-model="$store.state.roomid"
        label="Room ID"
      ></v-text-field>
    </div>
    <v-card-actions>
      <v-btn block color="purple" dark @click="play">jump in!</v-btn>
    </v-card-actions>
    <v-card-actions>
      <v-btn block color="red" dark @click="$router.push('/')">go back :(</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  methods: {
    play() {
      this.$router.push({ name: 'play' })
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