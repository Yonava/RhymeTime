<template>
  <v-dialog
    v-model="show"
    persistent
    max-width="290"
  >
    <v-card color="orange">
      <div
        class="text-h5 font-weight-black white--text d-flex justify-center align-center flex-row py-5 px-5"
        style="word-break: break-word; line-height: 1.1;"
      >
        <v-icon large color="white" class="mr-2">
          {{ cardContent.icon }}
        </v-icon>
        {{ cardContent.title }}
      </div>
      <v-card-text 
        class="text-h6"
        style="line-height: 1.2; color: black"
      >
        {{ cardContent.text }}
      </v-card-text>
      <v-card-actions>
        <v-btn
          @click.stop="backOut"
          color="orange lighten-3"
          class="black--text font-weight-black"
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
          Ask your host to create a new room to keep playing.`,
          icon: 'mdi-account-arrow-left'
        }
      } else {
        return {
          title: 'Can\'t Connect to Host',
          text: `Sorry, but we couldn't connect you to the 
          host. Double check your room code.`,
          icon: 'mdi-lan-disconnect'
        }
      }
    }
  },
  methods: {
    backOut() {
      localStorage.removeItem('room-token')
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