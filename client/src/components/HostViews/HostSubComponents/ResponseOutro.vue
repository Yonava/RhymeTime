<template>
  <v-card
    class="outro-card pa-10"
    :width="width"
    :height="height"
    elevation="8"
    color="red"
    :style="outroStyles"
  >
    <v-row align="center" justify="center">
      <v-card-title class="text-h3 white--text">Responses Have Closed</v-card-title>
    </v-row>
  </v-card>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      width: 800,
      height: 150,
      outroStyles: 'top: -20%;'
    }
  },
  watch: {
    show(v) {
      if (v) {
        this.outroStyles = ''
        setTimeout(() => {
          this.width = 5000
          this.height = 5000
        }, 2000)
      } else {
        this.width = 800,
        this.height = 150,
        this.outroStyles = 'top: -20%;'
      }
    }
  }
}
</script>

<style scoped>
  .outro-card {
    position: fixed;
    top: 0%;
    left: 50%;
    transform: translate(-50%, 0);
    border-radius: 0px 0px 25px 25px;
    transition: 3s;
  }
</style>