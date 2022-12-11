<template>
  <div>
    Frame 1
  </div>
</template>

<script>
import pt1 from '../../../../assets/voiceovers/tutorial/pt1.mp3'

export default {
  name: 'pt1',
  mounted() {
    new Audio(pt1).play()
  }
}
</script>
