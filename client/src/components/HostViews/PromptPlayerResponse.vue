<template>
  <div>
    Find a way to put these two rhyming words together!

    <br><br><br>
    Yours Words:
    <br><br>
    Phone and Czech Kron
    <br><br>
    <b>Waiting On:</b>
    <div v-for="player in playerList" :key="player.id">
      <p v-if="!responseArray.includes(player)">{{ player }}</p>
    </div>
    <br>
    <b>Players Who Have Responded:</b> 
    <div v-for="response in responseArray" :key="response.id">
      {{ response }} {{ promptResponses[response] }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      responseArray: []
    }
  },
  props: {
    promptResponses: {
      type: Object,
      required: true
    },
    playerList: {
      type: Array,
      require: true
    }
  },
  watch: {
    promptResponses: {
      immediate: true,
      handler(v) {
        this.responseArray = Object.keys(v)
      }
    }
  }
}
</script>