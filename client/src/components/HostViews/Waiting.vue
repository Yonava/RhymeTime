<template>
  <div class="background-matte">
    <div class="background-stripe-1"></div>
    <div class="background-stripe-2"></div>
    <div class="background-stripe-3"></div>
    <div class="main-qr-box center">
      <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nihil eveniet, distinctio soluta quia qui harum natus fugiat necessitatibus. Vel cum saepe nulla id omnis harum quo, iste natus nemo labore maxime praesentium, libero, atque facere doloribus laboriosam voluptate. Nam fuga et eius asperiores nulla laborum aliquam voluptatem consectetur debitis corrupti, repellendus ex veritatis atque cumque. Eveniet vero fugit accusamus iure voluptate nulla aliquam quis laudantium autem! Vero delectus quas, reprehenderit odit, maxime rerum cupiditate ad neque deserunt ipsum quae facere minima nobis sed dolores impedit labore itaque, accusamus suscipit. Nihil facere quidem ex soluta fugiat distinctio cupiditate nisi praesentium totam.</p>
    </div>
    <div class="left-side-box">
      <p>Lorem ipsum dolor sit amet consec</p>
    </div>
    <div class="right-side-box">
      <p>Lorem ipsum dolor sit ame</p>
    </div>
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
.main-qr-box {
  background-color: white;
  position: fixed;
  width: 30vw;
  top: 0;
  left: 50%;
  transform: translate(-50%);
  border-radius: 0px 0px 25px 25px;
}
.left-side-box {
  top: 0;
  left: 0;
  position: fixed;
  background-color: white;
  border-radius: 0px 0px 10px 0px;
}
.right-side-box {
  top: 0;
  right: 0;
  position: fixed;
  background-color: white;
  border-radius: 0px 0px 0px 10px;
}
</style>