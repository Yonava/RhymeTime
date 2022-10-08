<template>
  <v-dialog
    v-model="show"
    persistent
    max-width="290"
  >
    <v-card>
      <v-card-title class="text-h5">
        {{ display.title }}
      </v-card-title>
      <v-card-text>
        {{ display.text }}
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    reason: {
      type: String,
      required: true
    }
  },
  computed: {
    display() {
      switch (this.reason) {
        case 'not-visible':
          return {
            title: 'Host Not Visible',
            text: 'Gameplay will resume once the hosts screen becomes visible.'
          }
        case 'paused': 
          return {
            title: 'Host Paused The Game',
            text: 'Gameplay will resume once host unpauses.'
          }
        default:
          return {
            title: 'Game Paused',
            text: 'Gameplay shall resume in a moment.'
          }
      }
    },
    show() {
      return this.visible
    }
  }
}
</script>