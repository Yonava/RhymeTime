<template>
  <div>
    Frame 2
  </div>
</template>

<script>
import pt2 from '../../../../assets/voiceovers/tutorial/pt2.mp3'

export default {
  name: 'pt2',
  mounted() {
    new Audio(pt2).play()
  }
}
</script>