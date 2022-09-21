<template>
  <div>
    Vote For The Most 🔥 Bar
    <draggable>
      <div v-for="player in playerList" :key="player.id">
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
    candidates: {
      type: Array,
      required: true
    }
  }
}
</script>