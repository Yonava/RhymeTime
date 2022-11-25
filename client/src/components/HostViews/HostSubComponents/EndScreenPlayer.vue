<template>
  <div class="center">
    <img
      :src="pfp"
      :alt="player.name"
      class="pfp mb-1"
    />
    <div class="text-h3 white--text font-weight-black">
      {{ player.name }}
    </div>
  </div>
</template>

<script>

export default {
  name: 'EndScreenPlayer',
  props: {
    player: {
      type: Object,
      required: true
    }
  },
  computed: {
    // returns the player's pfp
    pfp() {
      return require(`../../../../assets/pfps/${this.player.pfp}.webp`)
    }
  }
}

</script>

<style scoped>
.pfp {
  width: 100px;
  height: 100px;
  border-radius: 10px;
  object-fit: cover;
}
</style>