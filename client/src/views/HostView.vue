<template>  
  <div class="center">   
    <div class="text-h4 mb-5">Host View</div>
    <v-btn text @click="$router.push('/')">Back</v-btn> 
    <p>Socket Connected: {{ connectionStatus }}</p> 
  </div>
</template>

<script>
import { io } from 'socket.io-client'
export default {
  data() {
    return {
      connectionStatus: false
    }
  },
  mounted() {
    const socket = io('/')
    socket.on('connect', () => {
      this.connectionStatus = true
    })
  }
}
</script>

<style>

</style>
