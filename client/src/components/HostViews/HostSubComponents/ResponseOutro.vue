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
      <v-card-title class="text-h3 white--text">
        Responses Have Closed
      </v-card-title>
    </v-row>
  </v-card>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      required: true
    },
    outroDur: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      width: 800,
      height: 150,
      outroStyles: 'top: -100%;'
    }
  },
  watch: {
    show(v) {
      if (v) {
        const COVER_SCREEN_IN = 2000
        this.outroStyles = ''
        setTimeout(() => {
          this.outroStyles = `transition: ${this.outroDur - COVER_SCREEN_IN}ms`
          this.width = 3000
          this.height = 3000
        }, COVER_SCREEN_IN)
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
    transition: 250ms
  }
</style>