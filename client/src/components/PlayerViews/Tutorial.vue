<template>
  <div>
    <ViewDecorator viewTitle="Tutorial Playing">
      <template #view-content>
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
      </template>
    </ViewDecorator>
  </div>
</template>

<script>
import ViewDecorator from '@/components/PlayerViews/PlayerSubComponents/ViewDecorator'

export default {
  components: {
    ViewDecorator
  },
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