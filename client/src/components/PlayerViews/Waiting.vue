<template>
  <div class="center">
    <header 
      :style="headerColor"
      class="player-waiting-header center" 
    >
      <h1 class="player-waiting-title">
        {{ clientName }}
      </h1>
      <v-img
        :src="selectedPfpSource"
        class="selected-pfp"
      ></v-img>
    </header>
    <h2 class="player-waiting-subtitle my-2">
      Choose Your Color
    </h2>
    <div style="width: 85%">
      <div class="flex-container">
        <div 
          v-for="color in colors" 
          :key="color"
        >
          <div style="position: relative;" >
            <v-icon 
              v-if="color === selectedColor"
              class="check-mark"
              dark
            >mdi-check-outline</v-icon>
            <div
              @click.stop="selectedColor = color"
              :style="`background-color: ${color};`"
              class="frame-item ma-3"
            ></div>
          </div>
        </div>
      </div>
    </div>
    <h2 class="player-waiting-subtitle my-2">
      Take Your Pic
    </h2>
    <div style="width: 85%">
      <div class="flex-container">
        <div 
          v-for="i in numOfPfps" 
          :key="i"
        >
          <v-img
            @click.stop="selectedPfp = i"
            :src="require(`../../../assets/pfps/${i}.webp`)"
            :style="pfpSelected(i)"
            class="frame-item ma-3"
          ></v-img>
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
    },
    connectedViaToken: {
      required: true,
      type: Boolean
    }
  },
  created() {
    if (this.connectedViaToken) {
      // ensure all localStorage data is defined
      let name = localStorage.getItem('player-name')
      let color = localStorage.getItem('player-color')
      let pfp = localStorage.getItem('player-pfp')

      if (!name || !color || !pfp) {
        this.$router.push({ 
          name: 'join',
          query: {
            err: 'exception'
          }
        })
      } else {
        this.$store.state.nickname = name
        this.selectedColor = color
        this.selectedPfp = parseInt(pfp)
      }
    } else {
      this.selectedPfp = Math.floor(Math.random() * this.numOfPfps) + 1
      this.selectedColor = this.colors[Math.floor(Math.random() * this.colors.length)]
      this.savePlayerDataLocally()
    }

    this.emitPlayerObject()
  },
  data() {
    return {
      numOfPfps: 8,
      selectedPfp: 1,
      selectedColor: 'orange',
      colors: [
        'orange',
        'red',
        'brown',
        'purple',
        '#d4af37',
        'blue',
        'black',
        'green'
      ]
    }
  },
  computed: {
    clientName() {
      return this.$store.state.nickname
    },
    roomId() {
      return this.$store.state.roomid
    },
    headerColor() {
      return `background-color: ${this.selectedColor}`
    },
    selectedPfpSource() {
      return require(`../../../assets/pfps/${this.selectedPfp}.webp`)
    }
  },
  methods: {
    emitPlayerObject() {
      this.socketInstance.emit('player-object-change', {
        name: this.clientName,
        color: this.selectedColor,
        pfp: this.selectedPfp,
        clientId: this.clientId
      })
    },
    pfpSelected(pfp) {
      if (pfp === this.selectedPfp) {
        return `border: 9px dashed ${this.selectedColor}`
      } else return ''
    },
    savePlayerDataLocally() {
      try {
        localStorage.setItem('player-name', this.clientName)
        localStorage.setItem('player-color', this.selectedColor)
        localStorage.setItem('player-pfp', this.selectedPfp)
      } catch (err) {
        console.log(err)
      }
    }
  },
  watch: {
    selectedColor() {
      this.emitPlayerObject()
      this.savePlayerDataLocally()
    },
    selectedPfp() {
      this.emitPlayerObject()
      this.savePlayerDataLocally()
    }
  }
}
</script>

<style scoped>
.player-waiting-header {
  position: relative;
  top: 0;
  height: 80px;
  width: 100vw;
  color: white;
  transition: 500ms;
}
.player-waiting-title {
  font-size: 27pt;
  font-weight: 1000;
}

.player-waiting-subtitle {
  font-size: 25pt;
  font-weight: 1000;
}
.frame-item {
  height: 50px;
  width: 50px;
  border-radius: 5px;
  cursor: pointer;
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
.check-mark {
  z-index: 2; 
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>