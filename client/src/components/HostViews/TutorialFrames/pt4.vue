<template>
  <div>
    Frame 4
  </div>
</template>

<script>
import pt4 from '../../../../assets/voiceovers/tutorial/pt4.mp3'

export default {
  name: 'pt4',
  mounted() {
    new Audio(pt4).play()
  }
}
</script>