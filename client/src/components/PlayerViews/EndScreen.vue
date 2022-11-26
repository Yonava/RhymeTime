<template>
  <div>
    <ViewDecorator viewTitle="Thanks For Playing">
      <template #view-content>
        <div class="text-h4 end-screen-content font-weight-bold">
          This game has concluded, thank you for playing
          <br><br>
          Take a look at the final scoreboard on the hosts screen
        </div>
      </template>
    </ViewDecorator>
  </div>
</template>

<script>
import ViewDecorator from './PlayerSubComponents/ViewDecorator.vue'

export default {
  components: {
    ViewDecorator
  }
}
</script>

<style scoped>
.end-screen-content {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  width: 80%;
}
</style>