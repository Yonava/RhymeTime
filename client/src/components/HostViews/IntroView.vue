<template>
  <div>
    HEY EVERYBODY, WELCOME TO RHYMETIME. 
    just close your eyes and imagine there is a tutorial video now playing in front of you,
    if you really set your mind on it, you may manifest it into reality.
  </div>
</template>

<script>
import HostMixin from './HostMixin'

export default {
  mixins: [
    HostMixin
  ],
  mounted() {
    setTimeout(() => {
      this.$emit('change-view', 'respond')
    }, 3000)
  }
}
</script>