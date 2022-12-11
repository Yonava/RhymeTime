<template>
  <div>
    Frame 7
  </div>
</template>

<script>
import pt7 from '../../../../assets/voiceovers/tutorial/pt7.mp3'

export default {
  name: 'pt7',
  mounted() {
    new Audio(pt7).play()
  }
}
</script>