<template>
  <div class="center">
    <header class="center" :style="headerColor">
      <h1>{{ name || 'Yona' }}</h1>
      <v-img
        :src="require(`../../../assets/pfps/${selectedPfp}.webp`)"
        class="selected-pfp"
      ></v-img>
    </header>
    <h2 class="my-2">Choose Your Color</h2>
    <div style="width: 85%">
      <div class="flex-container">
        <div v-for="color in colors" :key="color">
          <div
            @click.stop="selectedColor = color"
            :style="`background-color: ${color}`"
            class="frame-item mx-3" 
          ></div>
          <div>
            <v-icon color="white">mdi-check-outline</v-icon>
          </div>
        </div>
      </div>
    </div>
    <h2 class="my-2">Take Your Pic</h2>
    <div style="width: 85%">
      <div class="flex-container">
        <div v-for="i in numOfPfps" :key="i">
          <v-img
            @click.stop="selectedPfp = i"
            :src="require(`../../../assets/pfps/${i}.webp`)"
            class="frame-item mx-3"
          ></v-img>
          <div>
            <v-icon color="white">mdi-check-outline</v-icon>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    socketInstance: {
      required: true,
      type: Object
    },
    clientId: {
      required: true,
      type: Number
    }
  },
  mounted() {
    // selects random starting color
    const RAND_INX = Math.floor(Math.random() * this.colors.length)
    this.selectedColor = this.colors[RAND_INX]

    // selects random starting pfp
    this.selectedPfp = Math.floor(Math.random() * (this.numOfPfps + 1))
  },
  data() {
    return {
      numOfPfps: 8,
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
      ],
      selectedPfp: 1
    }
  },
  computed: {
    name() {
      return this.$store.state.nickname
    },
    headerColor() {
      return `background-color: ${this.selectedColor}`
    }
  },
  methods: {
    emitPlayerObject() {
      this.socketInstance.emit('player-object-change', {
        name: this.name,
        color: this.selectedColor,
        pfp: this.selectedPfp,
        clientId: this.clientId
      })
    }
  },
  watch: {
    selectedColor() {
      this.emitPlayerObject()
    },
    selectedPfp() {
      this.emitPlayerObject()
    }
  }
}
</script>

<style scoped>
header {
  position: relative;
  top: 0;
  height: 80px;
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
.frame-item {
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
.selected-pfp {
  width: 60px;
  height: 60px;
  border-radius: 10px;
  position: absolute;
  right: 0;
  margin-right: 12px;
}
</style>