<template>
  <div>
    <ViewDecorator viewTitle="Tutorial Playing">
      <template #view-content>
        <div 
          style="line-height: 16pt;"
          class="text-p"
        >
          Game will begin momentarilty...
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