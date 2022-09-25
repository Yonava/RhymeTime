<template>
  <v-app>
    <router-view v-if="password === key" />
    <center v-else>
      <h1>RhymeTime Coming Soon</h1>
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
  }
}
</script>

<style>
  @import url('@/styles.css');
</style>
