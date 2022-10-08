<template>
  <v-dialog
    v-model="show"
    persistent
    max-width="290"
  >
    <v-card>
      <v-card-title class="text-h5">
        Host Jumped Ship!
      </v-card-title>
      <v-card-text>
        It looks like the host of your session left. Ask your host to create a new session to keep playing.
      </v-card-text>
      <v-card-actions>
        <v-btn
          @click.stop="$router.push('/')"
          color="red white--text"
          block
        >Leave session</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    show() {
      return this.visible
    }
  }
}
</script>