<template>
  <div class="background-matte">
    <div class="background-stripe-1"></div>
    <div class="background-stripe-2"></div>
    <div class="background-stripe-3"></div>
  </div>
</template>

<script>
import HostMixin from './HostMixin'
import { Views } from '@/utils/Views'

export default {
  mixins: [
    HostMixin
  ],
  methods: {
    next() {
      this.$emit('change-view', Views.tutorial)
    },
    kick(clientId) {
      this.$emit('kick', clientId)
    }
  },
  data() {
    return {
      rounds: 3
    }
  },
  computed: {
    url() {
      return `
        ${
          window.location.href.substring(0, window.location.href.length - 5)
        }/join?room=${
          this.$store.state.roomid
        }
      `
    },
    qrCodeAPI() {
      return `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${this.url}`
    }
  },
  watch: {
    rounds(v) {
      const NUM = parseInt(v)
      if (isNaN(NUM) || NUM < 1) return
      this.$emit('round-change', NUM)
    }
  }
}
</script>

<style scoped>
.background-matte {
  width: 100vw;
  height: 100vh;
  background-color: #FFB118;
  position: fixed;
}
.background-stripe-1 {
  height: 150vw;
  width: 175px;
  background-color: #FFD37E;
  transform: translateY(-85vh) translateX(30vw) rotate(80deg);
  position: fixed;
}
.background-stripe-2 {
  height: 150vw;
  width: 175px;
  background-color: #FFD37E;
  transform: translateY(-55vh) translateX(30vw) rotate(40deg);
  position: fixed;
}
.background-stripe-3 {
  height: 150vw;
  width: 175px;
  background-color: #FFD37E;
  transform: translateY(-55vh) translateX(30vw) rotate(130deg);
  position: fixed;
}
</style>