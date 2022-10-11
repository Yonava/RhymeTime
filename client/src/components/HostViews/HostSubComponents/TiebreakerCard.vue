<template>
  <v-card
    class="outro-card"
    color="green"
    width="65%"
    height="9%"
    elevation="8"
    :style="`top: ${visible ? '0' : '-50'}%`"
  >
    <v-row align="center" justify="center">
      <v-card-title class="text-h3 white--text mt-3">
        Lets Break The Tie!
      </v-card-title>
    </v-row>
  </v-card>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      required: true
    }
  }
}
</script>

<style scoped>
  .outro-card {
    position: fixed;
    left: 50%;
    transform: translate(-50%, 0);
    border-radius: 0px 0px 25px 25px;
    transition: 750ms
  }
</style>