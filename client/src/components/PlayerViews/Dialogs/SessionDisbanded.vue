<template>
  <v-dialog
    v-model="show"
    persistent
    max-width="290"
  >
    <v-card>
      <v-card-title class="text-h5">
        {{ cardContent.title }}
      </v-card-title>
      <v-card-text>
        {{ cardContent.text }}
      </v-card-text>
      <v-card-actions>
        <v-btn
          @click.stop="backOut"
          color="red white--text"
          block
        >
          Back Out
        </v-btn>
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
    },
    hasHostResponded: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    show() {
      return this.visible
    },
    cardContent() {
      if (this.hasHostResponded) {
        return {
          title: 'Host Jumped Ship!',
          text: `It looks like the host of your room left. 
          Ask your host to create a new room to keep playing.`
        }
      } else {
        return {
          title: 'Can\'t Connect to Host',
          text: `Sorry, but we couldn't connect you to the 
          host of rooom ${this.$store.state.roomid}. Double check
          all the digits are correct and try again.`
        }
      }
    }
  },
  methods: {
    backOut() {
      if (this.hasHostResponded) {
        this.$router.push({ 
          name: 'join' 
        })
      } else {
        this.$router.push({ 
          name: 'join',
          query: {
            room: this.$store.state.roomid
          }
        })
      }
    }
  }
}
</script>