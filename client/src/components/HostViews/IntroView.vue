<template>
  <div>
    HEY EVERYBODY, WELCOME TO RHYMETIME. 
    just close your eyes and imagine there is a tutorial video now playing in front of you,
    if you really set your mind on it, you may manifest it into reality.
  </div>
</template>

<script>
export default {
  mounted() {
    setTimeout(() => {
      this.$emit('intro-over')
    }, 10000)
  }
}
</script>