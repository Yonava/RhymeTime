<template>
  <div>
    <v-btn 
      @click.stop="wantsToSkip = !wantsToSkip"
      :color="skipBtnColor"
      class="white--text"
    >{{ skipBtnText }}</v-btn>
  </div>
</template>

<script>
export default {
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
      return this.wantsToSkip ? 'take back vote' : 'vote to skip' 
    },
    skipBtnColor() {
      return this.wantsToSkip ? 'green' : 'red'
    }
  },
  methods: {
    
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