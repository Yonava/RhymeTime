<template>
  <div>
    <ViewDecorator viewTitle="Round Recap">
      <template #view-content>
        <div class="text-h4 recap-content font-weight-bold">
          Next Round Starting Soon
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
.recap-content {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  width: 75%;
}
</style>