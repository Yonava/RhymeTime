<template>
  <div>
    Your submissions:
    <br>
    {{ playerSubmissions }}
    <br><br><br>
    Here are the live results!
    <br>
    {{ voteCount }}
  </div>
</template>

<script>
export default {
  props: {
    playerSubmissions: {
      type: Array,
      required: true
    },
    voteCount: {
      type: Object,
      required: true
    }
  }
}
</script>