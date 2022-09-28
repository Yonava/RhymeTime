<template>
  <div class="center mt-5">
    <div class="text-h4" style="width: 40%; text-align: center">
      just close your eyes and imagine there is a tutorial video now playing in front of you,
      if you really set your mind on it, you may manifest it into reality. 
    </div>
    <v-btn
      @click.stop="next" 
      class="white--text mt-8" 
      color="red"
    >Skip intro</v-btn>
  </div>
</template>

<script>
import HostMixin from './HostMixin'

export default {
  mixins: [
    HostMixin
  ],
  methods: {
    next() {
      if (this.testMode) return
      this.$emit('change-view', 'respond')
    }
  }
}
</script>