<template>
  <ViewDecorator viewTitle="The Room You Joined is Full :(">
    <template #view-content>
      <div 
        style="line-height: 14pt;"
        class="text-p"
      >
        Due to all player slots being filled, 
        we have added you as an audience member
        <br><br>
        Members of the audience get to participate 
        in the voting round, however do not contribute 
        their own prompt responses
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