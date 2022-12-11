<template>
  <div>
    Frame 3
  </div>
</template>

<script>
import pt3 from '../../../../assets/voiceovers/tutorial/pt3.mp3'

export default {
  name: 'pt3',
  mounted() {
    new Audio(pt3).play()
  }
}
</script>