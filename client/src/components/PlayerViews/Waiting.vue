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
import Tokens from '../../api/tokens'

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
    connectedViaToken: {
      required: true,
      type: Boolean
    }
  },
  emits: [
    'connected-to-room'
  ],
  created() {
    this.selectedPfp = Math.floor(Math.random() * this.numOfPfps) + 1
    this.selectedColor = this.colors[Math.floor(Math.random() * this.colors.length)]
    if (!this.connectedToRoom) {
      this.connectToRoom()
    }
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
    connectToRoom() {
      
      // true if client is rejoining
      if (this.connectedViaToken) return
      
      console.log('asking host to join!')

      this.socketInstance.emit('player-join', {
        name: this.clientName,
        color: this.selectedColor,
        pfp: this.selectedPfp,
        clientId: this.clientId
      })

      Tokens.generate(this.roomId, this.clientId)
        .then(token => {
          localStorage.setItem('room-token', token)
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => {
          this.$emit('connected-to-room')
        })
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