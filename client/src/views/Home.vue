<template>
  <div class="background-matte center">
    <div>
      <div class="welcometo text-h3 font-weight-black">
        Welcome To
      </div>
      <div class="rhymetime text-h1 font-weight-black white--text">
        RhymeTime
      </div>
      <div class="button-container mt-4">
        <div class="host-button">
          <div 
            @click.stop="host"
            class="text-h4 font-weight-black"
          >
            Host A Game
          </div>
        </div>
        <v-spacer></v-spacer>
        <div class="join-button">
          <div 
            @click.stop="join"
            class="text-h4 font-weight-black"
          >
            Join A Game
          </div>
        </div>
      </div>
    </div>
    <div class="sound-bar-container">
      <div 
        v-for="i in 14"
        :key="i"
        class="sound-bar"
      ></div> 
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  data() {
    return {
      cursorXPos: 0,
      cursorYPos: 0,
    }
  },
  mounted() {
    // redirects mobile users to /join
    if (!this.$vuetify.breakpoint.mdAndUp) {
      this.$router.push({ 
        name: 'join' 
      })
      return
    }
    document.addEventListener('mousemove', this.updateCursorPos)
  },
  destroyed() {
    document.removeEventListener('mousemove', this.updateCursorPos)
  },
  methods: {
    updateCursorPos(ev) {
      this.cursorXPos = ev.clientX
      this.cursorYPos = Math.abs(ev.clientY - 770)
    },
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
  },
  watch: {
    cursorXPos() {
      const bars = document.getElementsByClassName('sound-bar')
      const heights = []
      for (let i = 0; i < bars.length; i++) {
        const bar = bars[i]
        const barWidth = bar.offsetWidth
        const barXPos = bar.offsetLeft
        const barCenter = barXPos + barWidth / 2
        const distance = Math.abs(barCenter - this.cursorXPos)
        const height = Math.min(200, (this.cursorXPos) / (distance))
        heights.push({
          bar,
          height,
        })
      }
      const tallestBar = heights.reduce((prev, curr) => {
        return prev.height > curr.height ? prev : curr
      })
      heights.forEach(({ bar, height }) => {
        if (height === tallestBar.height) {
          bar.style.height = `${height}px`
          bar.style.backgroundColor = '#fff'
        } else {
          bar.style.height = `${height * 10 * (this.cursorYPos/200)}px`
          bar.style.backgroundColor = '#FFD37E'
        }
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
  .button-container {
    display: flex;
    justify-content: center;
    flex-direction: row;
  }
  .join-button {
    cursor: pointer;
    user-select: none;
    transition: 400ms;
    background-color: #ffc758;
    border-radius: 10px;
    padding: 10px 20px;
  }
  .join-button:hover {
    transform: scale(1.1);
    background: #53cf19;
    box-shadow: 4px 2px 20px 1px black;
  }
  .host-button {
    cursor: pointer;
    user-select: none;
    transition: 400ms;
    background-color: #ffc758;
    border-radius: 10px;
    padding: 10px 20px;
  }
  .host-button:hover {
     transform: scale(1.1);
    background: #9a88d1;
    box-shadow: 4px 2px 20px 1px black;
  }
</style>