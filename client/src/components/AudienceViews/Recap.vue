<template>
  <div>
    <ViewDecorator viewTitle="Round Recap">
      <template #view-content>
        <div 
          style="line-height: 16pt;"
          class="text-p"
        >
          Next round starting soon...
        </div>
      </template>
    </ViewDecorator>
  </div>
</template>

<script>
import ViewDecorator from './AudienceSubComponents/ViewDecorator.vue'

export default {
  components: {
    ViewDecorator
  }
}
</script>