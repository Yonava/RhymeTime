<template>
  <div>
    Your submissions:
    <br>
    {{ promptResponses }}
    <br><br><br>
    Here are the live results!
    <br>
    {{ voteCount }}
  </div>
</template>

<script>
export default {
  props: {
    promptResponses: {
      type: Object,
      required: true
    },
    voteCount: {
      type: Object,
      required: true
    }
  },
  destroyed() {
    this.$parent.promptResponses = {}
  },
  
}
</script>