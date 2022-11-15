<template>
  <div class="center mx-2">
    <div 
      :style="borderColor"
      class="box"
    >
      
    </div>
    <div 
      :style="borderColorTriangle"
      class="triangle"
    ></div>
    <v-img
      :src="require(`../../../../assets/pfps/${player.pfp}.webp`)"
      class="pfp"
    ></v-img>
    <h2>{{ player.name }}</h2>
  </div>
</template>

<script>
export default {
  props: {
    player: {
      type: Object,
      required: true
    },
    hasResponded: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    borderColor() {
      return `border-color: ${this.player.color}`
    },
    borderColorTriangle() {
      return `border-color: ${this.player.color} transparent transparent transparent`
    }
  }
}
</script>

<style scoped>

.triangle {
  height: 0;
  width: 0;
  border: 16px dashed;
  border-color: red transparent transparent transparent;
}
.box {
  width: 300px;
  height: 100px;
  border-radius: 10px;
  background-color: white;
  border: 5px solid;
}
.center {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
h2 {
  color: white;
  margin: 0%;
  transform: translateY(-10px)
}
html {
  background-color: rgb(30,40,50);
  margin: 0%;
  padding: 0%;
}
.pfp {
  height: 75px;
  width: 75px;
  object-fit: cover;
  border-radius: 10px;
  transform: translateY(-10px);
}
p {
  margin: 0%;
  padding-left: 2%;
  font-size: 20pt;
  font-weight: bold;
}

/* DOT PULSE EFFECT */

.dot-pulse {
  position: relative;
  left: -9999px;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: #777777;
  color: #777777;
  box-shadow: 9999px 0 0 -5px #777777;
  animation: dotPulse 1.5s infinite linear;
  animation-delay: .25s;
}

.dot-pulse::before, .dot-pulse::after {
  content: '';
  display: inline-block;
  position: absolute;
  top: 0;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: #777777;
  color: #777777;
}

.dot-pulse::before {
  box-shadow: 9984px 0 0 -5px #777777;
  animation: dotPulseBefore 1.5s infinite linear;
  animation-delay: 0s;
}

.dot-pulse::after {
  box-shadow: 10014px 0 0 -5px #777777;
  animation: dotPulseAfter 1.5s infinite linear;
  animation-delay: .5s;
}

@keyframes dotPulseBefore {
  0% {
    box-shadow: 9984px 0 0 -5px #777777;
  }
  30% {
    box-shadow: 9984px 0 0 2px #777777;
  }
  60%,
  100% {
    box-shadow: 9984px 0 0 -5px #777777;
  }
}

@keyframes dotPulse {
  0% {
    box-shadow: 9999px 0 0 -5px #777777;
  }
  30% {
    box-shadow: 9999px 0 0 2px #777777;
  }
  60%,
  100% {
    box-shadow: 9999px 0 0 -5px #777777;
  }
}

@keyframes dotPulseAfter {
  0% {
    box-shadow: 10014px 0 0 -5px #777777;
  }
  30% {
    box-shadow: 10014px 0 0 2px #777777;
  }
  60%,
  100% {
    box-shadow: 10014px 0 0 -5px #777777;
  }
}
</style>