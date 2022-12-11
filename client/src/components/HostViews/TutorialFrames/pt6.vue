<template>
  <div>
    Frame 6
  </div>
</template>

<script>
import pt6 from '../../../../assets/voiceovers/tutorial/pt6.mp3'

export default {
  name: 'pt6',
  mounted() {
    new Audio(pt6).play()
  }
}
</script>