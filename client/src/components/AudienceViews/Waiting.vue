<template>
  <ViewDecorator viewTitle="The Room You Joined is Full :(">
    <template #view-content>
      <div class="text-p audience-text-content">
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

<style scoped>
.audience-text-content {
  line-height: 15pt;
}
</style>