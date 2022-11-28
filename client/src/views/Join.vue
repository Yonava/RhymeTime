<template>
  <div class="background-matte center">
    <div 
      class="text-h2 mb-4 font-weight-black white--text"
      style="-webkit-text-stroke: black 1px;"
    >
      RhymeTime
    </div>
    <v-card 
      class="fix-to-middle" 
      width="350"
      elevation="10"
      color="#ffebc3"
    >
      <v-card-title class="center pt-4 pb-2">
        <div class="text-h4 font-weight-black">
          Join A Room
        </div>
      </v-card-title>
      <div class="px-5">
        <div
          v-if="errorMessage"
          class="red--text text-h6 font-weight-bold"
          style="line-height: 1.2;"
        >
          {{ errorMessage }}
        </div>
        <div class="font-weight-black text-h6">
          Nickname:
        </div>
        <input 
          v-model="$store.state.nickname"
          class="input-field font-weight-black white--black text-p pa-1"
          type="text" 
          ref="nickname"
        />
        <div class="my-2"></div>
        <div class="font-weight-black text-h6">
          Room Code:
        </div>
        <input 
          v-model="$store.state.roomid"
          class="input-field font-weight-black white--black text-p pa-1"
          type="text"
          ref="roomid"
        />
        <div 
          class="text-h6 font-weight-bold red--text mt-2"
          style="line-height: 1.2"
        >
          {{ inputError }}
        </div>
      </div>
      <div class="center">
        <div 
          @click="play"
          class="ready-button font-weight-black text-h5 mb-3 mt-6 px-4 py-2"
        >
          Ready To Rhyme!
        </div>
      </div>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputError: "",
    }
  },
  mounted() {
    this.$store.state.roomid = this.$route.query.room || ''
  },
  methods: {
    play() {
      // make sure roomid is a number 
      if (isNaN(this.$store.state.roomid)) {
        this.inputError = 'Room code invalid'
        this.$refs.roomid.focus()
        return
      }
      // make sure roomid is a number 
      if (!this.$store.state.roomid) {
        this.inputError = 'Enter a room code'
        this.$refs.roomid.focus()
        return
      }
      // make sure nickname is not empty
      if (!this.$store.state.nickname.length || this.$store.state.nickname.length > 8) {
        this.inputError = 'Nickname must be between 1 and 8 characters'
        this.$refs.nickname.focus()
        return
      }
      this.$router.push({ 
        name: 'play' 
      })
    }
  },
  computed: {
    canJoin() {
      return this.$store.state.nickname && this.$store.state.roomid
    },
    errorMessage() {
      // creating a case and returning a string allows for different 
      // error messages to be displayed to users inside the join card
      switch (this.$route.query.err) {
        case 'nickname_taken':
          return "Someone in the room you joined has the same nickname. Try something unique, original, spunky..."
        case 'audience_no_host':
          return "Unfortunately, we weren't able to find a host. Try joining a different room."
        default:
          return ''
      }
    }
  },
  watch: {
    inputError() {
      if (this.inputError) {
        setTimeout(() => {
          this.inputError = ''
        }, 3000)
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

  .input-field {
    border: 2px solid black; 
    border-radius: 5px; 
    background-color: #ffd98c;
  }

  .ready-button {
    background: #FFB118; 
    border-radius: 10px; 
    width: 90%; 
    text-align: center; 
    cursor: pointer; 
    border: 2px solid black;
  }
</style>