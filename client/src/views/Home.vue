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
        v-for="i in 18"
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
      cursorYPos: 0
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
  computed: {
    documentHeight() {
      return document.documentElement.scrollHeight
    }
  },
  methods: {
    updateCursorPos(ev) {
      this.cursorXPos = ev.clientX
      // inverts cursor Y so that the higher the cursor is on the page,
      // the higher cursorYPos will be
      this.cursorYPos = this.documentHeight - ev.clientY
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

      // iterates through all the bars and stores each bars respective distance
      // from the cursors X position
      const distances = []
      for (let i = 0; i < bars.length; i++) {
        const bar = bars[i]
        const barWidth = bar.offsetWidth
        const barXPos = bar.offsetLeft
        const barCenter = barXPos + barWidth / 2

        // determine bar closest to cursorXPos
        distances.push(Math.abs(barCenter - this.cursorXPos))
      }

      // finds bar closest to cursorX
      let closestBar = distances.indexOf(Math.min(...distances))
      
      // uses percentage of cursorY height as a multiplier for max height
      const CURSOR_Y_PERCENT = this.cursorYPos / this.documentHeight
      // ensures that the highest bar is at least 60px below the cursor
      // as to not interfere with cursor behavior
      const MAX_HEIGHT = (this.documentHeight * CURSOR_Y_PERCENT) - 60

      // sets the bar closest to the cursor to max height and full opacity
      bars[closestBar].style.height = `${MAX_HEIGHT}px`
      bars[closestBar].style.opacity = 1

      // iterates down to all other bars
      let [left, right] = [closestBar - 1, closestBar + 1]
      let [maxLeft, maxRight] = [false, false]
      
      while (!maxLeft || !maxRight) {
        
        if (left === -1) maxLeft = true
        if (right === bars.length) maxRight = true

        if (!maxLeft) {
          bars[left].style.height = `${MAX_HEIGHT - ((closestBar - left) * 14)}px`
          bars[left].style.opacity = `${1 - (Math.abs(closestBar - left) / 15) - .2}`
          left--
        }
        if (!maxRight) {
          bars[right].style.height = `${MAX_HEIGHT - ((right - closestBar) * 14)}px`
          bars[right].style.opacity = `${1 - (Math.abs(closestBar - right) / 15) - .2}`
          right++
        }
      }
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
    border-radius: 10px 10px 0 0;
    margin-left: 6px;
    margin-right: 6px;
    margin-top: auto;
    height: 20px;
    transition: 200ms;
    background-color: white;
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