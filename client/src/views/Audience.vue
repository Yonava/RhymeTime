<template>
  <div>
    <component
      :is="currentView"
      :socketInstance="socket"
    ></component>
  </div>
</template>

<script>
import vote from '../components/AudienceViews/Vote.vue'
import respond from '../components/AudienceViews/Respond.vue'
import waiting from '../components/AudienceViews/Waiting.vue'
import tutorial from '../components/AudienceViews/Tutorial.vue'
import recap from '../components/AudienceViews/Recap.vue'
import endScreen from '../components/AudienceViews/EndScreen.vue'

import { Views } from '../utils/Views'

export default {
  components: {
    vote,
    respond,
    waiting,
    tutorial,
    recap,
    endScreen
  },
  data() {
    return {
      currentView: Views.waiting,
      socket: null
    }
  }
}
</script>