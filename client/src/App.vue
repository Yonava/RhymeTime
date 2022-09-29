<template>
  <v-app>
    <div v-if="password === key">  
      <router-view />
      <button class="close-sesame" @click="password = ''">close sesame</button>
    </div>
    <center v-else>
      <h1>RhymeTime Coming Soon</h1>
      <input class="input-box" type="text" v-model="password">
    </center>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      password: localStorage.password,
      key: 'open sesame'
    }
  },
  watch: {
    password(v) {
      localStorage.setItem('password', v)
    }
  }
}
</script>

<style>
  @import url('@/styles.css');
  
  .input-box {
    position: fixed;
    bottom: 10%;
  }
  .close-sesame {
    position: fixed;
    bottom: 0;
  }
</style>
