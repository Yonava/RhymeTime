<template>
  <v-card
    class="mx-auto"
    max-width="300"
    outlined
  >
    <v-card-title 
      :style="`word-break: break-word; background-color: ${cardTitleColor}`"
      class="white--text"
    > 
      {{ playerName }} {{ suffix }}
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text class="pa-10">
      <div class="center">
        <div v-if="!hasResponded">
          <div style="position: fixed" class="snippet" data-title=".dot-pulse">
            <div class="stage">
              <div class="dot-pulse"></div>
            </div>
          </div>
        </div>
        <v-icon style="position: fixed" v-else large>
          mdi-comment-check-outline
        </v-icon>
      </div>
    </v-card-text>
    
  </v-card>
</template>

<script>
export default {
  props: {
    playerName: {
      type: String,
      required: true
    },
    hasResponded: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    suffix() {
      return this.hasResponded ? ' is ready!' : ' is still thinking...'
    },
    cardTitleColor() {
      return this.hasResponded ? '#228B22' : '#D2042D'
    }
  }
}
</script>

<style scoped>
.list-move /* apply transition to moving elements */ {
  transition: all 0.5s ease;
}
.slide-in-enter, .slide-out-leave-to {
  transform: translateX(-100%);
}
.slide-in-enter-to, .slide-in-leave-from, .slide-out-enter-to, .slide-out-leave-from {
  transform: translateX(0);
}
.slide-in-enter-active, .slide-in-leave-active, .slide-out-enter-active, .slide-out-leave-active {
  transition: all 300ms;
  position: fixed;
}
.slide-in-leave-to, .slide-out-enter {
  transform: translateX(100%);
}

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