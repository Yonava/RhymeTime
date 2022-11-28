<template>
  <div class="background-matte center">
    <div>
      <div class="welcometo text-h3 font-weight-black">
        Welcome To
      </div>
      <div class="rhymetime text-h1 font-weight-black white--text">
        RhymeTime
      </div>
    </div>
    <div class="sound-bar-container">
      <div 
        v-for="i in 10"
        :key="i"
        class="sound-bar"
        :style="{ height: `${(i * 10)}px` }"
      ></div>
      
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  mounted() {
    // redirects mobile users to /join
    if (!this.$vuetify.breakpoint.mdAndUp) {
      this.$router.push({ 
        name: 'join' 
      })
    }
  },
  methods: {
    host() {
      this.$store.state.roomid = Math
        .random()
        .toString()
        .substring(2, 6)
      
      this.$router.push({ 
        name: 'host' 
      })
    },
    join() {
      this.$router.push({ 
        name: 'join' 
      })
    }
  }
}
</script>

<style scoped>
  .background-matte {
    position: relative;
    width: 100vw;
    height: 100vh;
    background-color: #FFB118;
  }
  .rhymetime {
    cursor: default;
    user-select: none;
    transition: 400ms;
  }
  .rhymetime:hover {
    transform: scale(1.2);
  }
  .welcometo {
    cursor: default;
    user-select: none;
    transition: 400ms;
  }
  .sound-bar-container {
    position: absolute;
    bottom: 0;
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: row;
  }
  .sound-bar {
    width: 75px;
    background-color: #FFD37E;
    border-radius: 10px 10px 0 0;
    margin-left: 6px;
    margin-right: 6px;
    margin-top: auto;
  }
</style>