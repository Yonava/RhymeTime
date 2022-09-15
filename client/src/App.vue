<template>
  <div id="app">

    <button @click="toggleChallenge = !toggleChallenge">toggle challenge</button>
    <br><br>
    <div v-if="toggleChallenge">
      <challenge />
    </div>

    <div v-else>
      <p>name has changed {{ numberOfTimesNameChanges }} time(s)</p>
      <input type="text" v-model="name" placeholder="enter a name">

      <div v-if="validateName">
        <div>
          <p>Hi, this is {{ name }}</p>
        </div>
      </div>
      <div v-else>
        <bad-names :name="name" />
      </div>

      <button @click="play">play achtung reichelt</button>
      <button @click="pause">pause achtung reichelt</button>
      <button @click="stop">reset achtung reichelt</button>

      <button @click="name = ''">clear txt</button>
      <button @click="incrementNameChangeCount">increment</button>
      <br><br>
      <p>{{ notValidAt }}</p>
      <input v-model="notValidAt" type="range" min="1" max="15">
    </div>

  </div>
</template>

<script>
import badNames from './components/badNames.vue'
import Challenge from './components/challengeActivity.vue';

export default {
  data() {
    return {
      name: 'yona',
      numberOfTimesNameChanges: 0,
      notValidAt: 5,
      audio: new Audio( require('./assets/achtungreichelt.mp3') ),
      toggleChallenge: false
    }
  },
  components: {
    badNames,
    Challenge
  },
  computed: {
    validateName() {
      return this.name.length >= this.notValidAt;
    }
  },
  methods: {
    incrementNameChangeCount() {
      if (this.validateName) {
        this.numberOfTimesNameChanges += this.name.length;
      }
    },
    play() { this.audio.play() },
    pause() { this.audio.pause() },
    stop() { this.audio.pause(); this.audio.currentTime = 0 }
  },
  watch: {
    name() {
      // this.incrementNameChangeCount()
      // this.incrementNameChangeCount()
      // this.incrementNameChangeCount()
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
