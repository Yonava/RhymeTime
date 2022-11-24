<template>
  <div class="background-matte">
    <header class="header center">
      <h1 class="player-view-title">Tutorial Playing</h1>
    </header>
    <div class="center mt-6">
      <div 
        @click.stop="wantsToSkip = !wantsToSkip"
        :style="skipBtnColor"
        class="skip-btn center"
      >
        <span class="skip-btn-text">
          {{ skipBtnText }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'intro',
  props: {
    socketInstance: {
      required: true,
      validator: socket => socket?.connected
    }
  },
  data() {
    return {
      wantsToSkip: false
    }
  },
  computed: {
    playerName() {
      return this.$store.state.nickname
    },
    skipBtnText() {
      return this.wantsToSkip ? 'Take Back Vote' : 'Vote to Skip' 
    },
    skipBtnColor() {
      return `background-color: ${this.wantsToSkip ? '#4BB526' : '#E23B3B'}`
    }
  },
  watch: {
    wantsToSkip(v) {
      const VOTE = {
        playerName: this.playerName,
        wantsToSkip: v
      }
      this.socketInstance.emit('skip-vote', VOTE)
    }
  }
}
</script>

<style scoped>
  .header {
    width: 100%;
    height: 70px;
    background-color: #FFB118;
  }
  .player-view-title {
    font-size: 40px; 
    font-weight: 900;
  }
  .background-matte {
    width: 100vw;
    height: 100vh;
    background-color: #FFD37E;
  }
  .skip-btn {
    width: 85%;
    height: 62px;
    border-radius: 12px;
    cursor: pointer;
  }
  .skip-btn-text {
    color: white;
    font-weight: 1000;
    font-size: 20pt;
  }
</style>