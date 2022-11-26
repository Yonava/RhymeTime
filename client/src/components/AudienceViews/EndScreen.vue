<template>
  <ViewDecorator viewTitle="Thanks For Playing">
    <template #view-content>
      <div 
        style="line-height: 14pt;"
        class="text-p"
      >
        This game has concluded, thank you for playing
        <br><br>
        Take a look at the final scoreboard on the hosts screen
      </div>
    </template>
  </ViewDecorator>
</template>

<script>
import ViewDecorator from './AudienceSubComponents/ViewDecorator.vue'

export default {
  components: {
    ViewDecorator
  }
}
</script>