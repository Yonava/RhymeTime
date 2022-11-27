<template>
  <ViewDecorator viewTitle="Players Responding">
    <template #view-content>
      <div 
        style="line-height: 14pt;"
        class="text-p"
      >
        Players are currently responding to the on screen prompt
        <br><br>
        Voting will commense once all responses are in
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