<template>
  <div class="center">
    <header class="center" :style="headerColor">
      <h1>{{ name || 'Yona' }}</h1>
    </header>
    <h2 class="my-2">Choose Your Color</h2>
    <div style="width: 85%">
      <div class="flex-container">
        <div v-for="color in colors" :key="color">
          <div
            @click.stop="selectedColor = color"
            :style="`background-color: ${color}`"
            class="color mx-3" 
          ></div>
          <div>
            <v-icon color="white">mdi-check-outline</v-icon>
          </div>
        </div>
      </div>
    </div>
    <h2 class="my-2">Take Your Pic</h2>
  </div>
</template>

<script>
export default {
  mounted() {
    const RAND_INX = Math.floor(Math.random() * this.colors.length)
    this.selectedColor = this.colors[RAND_INX]
  },
  data() {
    return {
      selectedColor: 'orange',
      colors: [
        'orange',
        'red',
        'brown',
        'purple',
        'yellow',
        'blue',
        'black',
        'green'
      ]
    }
  },
  computed: {
    name() {
      return this.$store.state.nickname
    },
    headerColor() {
      return `background-color: ${this.selectedColor}`
    }
  }
}
</script>

<style scoped>
header {
  position: relative;
  top: 0;
  height: 75px;
  width: 100vw;
  color: white;
  transition: 500ms;
}
h1 {
  font-size: 27pt;
  font-weight: 1000;
}
h2 {
  font-size: 25pt;
  font-weight: 1000;
}
div.color {
  height: 50px;
  width: 50px;
  border-radius: 5px;
}
.flex-container {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-flow: wrap;
}
</style>