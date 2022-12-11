<template>
  <div>
    Frame 5
  </div>
</template>

<script>
import pt5 from '../../../../assets/voiceovers/tutorial/pt5.mp3'

export default {
  name: 'pt5',
  mounted() {
    new Audio(pt5).play()
  }
}
</script>