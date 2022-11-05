<template>
  <div>
    Vote For The Most 🔥 Bar
    <draggable v-model="$parent.candidates">
      <div v-for="player in $parent.candidates" :key="player.clientId">
        <h3>{{ player }}</h3>
      </div>
    </draggable>
  </div>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  components: {
    draggable
  },
  props: {
    socketInstance: {
      required: true
    }
  },
  mounted() {
    setTimeout(() => this.watchCandidates(), 1000)
  },
  methods: {
    watchCandidates() {
      this.$watch(() => this.$parent.candidates, (newValue) => {
        const BALLOT = {}
        BALLOT[this.$store.state.nickname] = newValue
        this.socketInstance.emit('submit-ballot', BALLOT)
      })
    }
  }
}
</script>