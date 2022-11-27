<template>
  <div class="background-matte">
    <header class="player-view-header center">
      <h1 class="player-view-title">
        {{ viewTitle }}
      </h1>
    </header>
    <slot name="view-content"></slot>
  </div>
</template>

<script>
export default {
  props: {
    viewTitle: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
.player-view-title {
  font-size: 40px; 
  font-weight: 900;
}
.background-matte {
  width: 100vw;
  height: 100vh;
  background-color: #FFD37E;
}
.player-view-header {
  width: 100%;
  height: 70px;
  background-color: #FFB118;
  z-index: 2;
}
</style>