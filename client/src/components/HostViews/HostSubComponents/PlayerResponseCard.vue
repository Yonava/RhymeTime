<template>
  <div class="center mx-2">
    <div 
      :style="borderColor"
      class="box"
    >
      <div 
        v-if="hasResponded" 
        class="center"
        style="transform: translateY(50%); left: 0; top: 0; position: relative;"
      >
        <v-icon
          color="green"
          x-large
        >
          mdi-check-circle
        </v-icon>
      </div>
      <div
        v-else
        class="snippet center" 
        style="top: 42.5%; position: relative"
        data-title=".dot-pulse"
      >
        <div class="stage">
          <div class="dot-pulse"></div>
        </div>
      </div>
    </div>
    <div 
      :style="borderColorTriangle"
      class="triangle"
    ></div>
    <v-img
      :src="require(`../../../../assets/pfps/${player.pfp}.webp`)"
      class="pfp"
    ></v-img>
    <h2 class="name-tag">
      {{ player.name }}
    </h2>
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
  width: 400px;
  height: 150px;
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
.name-tag {
  color: black;
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
  background-color: black;
  color: black;
  box-shadow: 9999px 0 0 -5px black;
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
  background-color: black;
  color: black;
}

.dot-pulse::before {
  box-shadow: 9984px 0 0 -5px black;
  animation: dotPulseBefore 1.5s infinite linear;
  animation-delay: 0s;
}

.dot-pulse::after {
  box-shadow: 10014px 0 0 -5px black;
  animation: dotPulseAfter 1.5s infinite linear;
  animation-delay: .5s;
}

@keyframes dotPulseBefore {
  0% {
    box-shadow: 9984px 0 0 -5px black;
  }
  30% {
    box-shadow: 9984px 0 0 2px black;
  }
  60%,
  100% {
    box-shadow: 9984px 0 0 -5px black;
  }
}

@keyframes dotPulse {
  0% {
    box-shadow: 9999px 0 0 -5px black;
  }
  30% {
    box-shadow: 9999px 0 0 2px black;
  }
  60%,
  100% {
    box-shadow: 9999px 0 0 -5px black;
  }
}

@keyframes dotPulseAfter {
  0% {
    box-shadow: 10014px 0 0 -5px black;
  }
  30% {
    box-shadow: 10014px 0 0 2px black;
  }
  60%,
  100% {
    box-shadow: 10014px 0 0 -5px black;
  }
}
</style>