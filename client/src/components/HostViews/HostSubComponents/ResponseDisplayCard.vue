<template>
  <v-card>
    <div 
      class="center" 
      style="word-break: break-word; background-color: purple"
    >
      <v-card-title class="white--text"> 
        {{ response.player.name }}
      </v-card-title>
    </div>
    <v-card-text>
      <div class="text-p">
        {{ response.response }}
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    response: {
      type: Object,
      required: true
    }
  }
}
</script>