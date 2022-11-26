<template>
  <div class="center">
    <header 
      :style="headerColor"
      class="center" 
    >
      <h1>
        {{ clientName }}
      </h1>
      <v-img
        :src="selectedPfpSource"
        class="selected-pfp"
      ></v-img>
    </header>
    <h2 class="my-2">
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
    <h2 class="my-2">
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
    connectedToRoom: {
      required: true,
      type: Boolean
    },
    socketOnline: {
      required: true,
      type: Promise
    }
  },
  emits: [
    'connected-to-room'
  ],
  data() {
    return {
      // loading until player is connected to room
      loading: true,
      numOfPfps: 8,
      selectedPfp: 1,
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
    connectToRoom() {
      // if client is already connected to a room
      if (this.connectedToRoom) return

      // selects random starting color
      const RAND_INDEX = Math.floor(Math.random() * this.colors.length)
      this.selectedColor = this.colors[RAND_INDEX]

      // selects random starting pfp (ranged 1-8)
      this.selectedPfp = Math.floor(Math.random() * this.numOfPfps) + 1
      this.socketInstance.emit('player-join', {
        name: this.clientName,
        color: this.selectedColor,
        pfp: this.selectedPfp,
        clientId: this.clientId
      })
      this.$emit('connected-to-room')
    },
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
    }
  },
  watch: {
    selectedColor() {
      this.emitPlayerObject()
    },
    selectedPfp() {
      this.emitPlayerObject()
    },
    socketOnline(v) {
      if (v) {
        this.connectToRoom()
      }
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