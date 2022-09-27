<template>
  <v-card>
    <v-card-title 
      style="word-break: break-word; background-color: purple"
      class="white--text"
    > 
      {{ response.player }}
    </v-card-title>
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