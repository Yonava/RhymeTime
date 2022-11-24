<template>
  <div class="background-matte">
    <header class="header center">
      <h1 class="player-view-title">
        Drag To Vote
      </h1>
    </header>
    <div class="center mt-6">
      <div class="content-container">
        <draggable 
          v-model="candidates"
          @change="submitBallot"
        >
          <TransitionGroup name="list">
            <div v-for="candidate in candidates" :key="candidate.player.clientId">
              <PlayerCard
                :player="candidate.player"
                :response="candidate.response"
              />
            </div>
          </TransitionGroup>
        </draggable>
      </div>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import PlayerCard from './PlayerSubComponents/PlayerCard.vue'

export default {
  components: {
    draggable,
    PlayerCard
  },
  props: {
    socketInstance: {
      required: true
    }
  },
  data() {
    return {
      // contains response objects of players 
      // that have submitted a response { player: Player, response: string }
      candidates: [
        {
          response: 'hello',
          player: {
            name: 'Yona',
            color: 'rgb(26, 24, 53)',
            pfp: '5',
            clientId: 1
          }
        },
        {
          response: 'this is josh is respond',
          player: {
            name: 'Josh',
            color: 'green',
            pfp: '2',
            clientId: 2
          }
        },
        {
          response: 'hello2',
          player: {
            name: 'Jack',
            color: 'blue',
            pfp: '8',
            clientId: 3
          }
        }
      ]
    }
  },
  mounted() {
    this.socketInstance.on('candidate-list', (newCandidates) => {
      this.candidates = newCandidates
    })
  },
  methods: {
    submitBallot() {
      const BALLOT = {}
      BALLOT[this.$store.state.nickname] = this.candidates
      this.socketInstance.emit('submit-ballot', BALLOT)
    }
  }
}
</script>

<style scoped>
  .content-container {
    position: relative;
    width: 85%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: left;
  }
  .header {
    width: 100%;
    height: 70px;
    background-color: #FFB118;
  }
  .player-view-title {
    font-size: 40px; 
    font-weight: 900;
  }
  .background-matte {
    width: 100vw;
    height: 100vh;
    background-color: #FFD37E;
  }

  /* for transition group component */
  .list-move {
    transition: all 0.5s ease;
  }
</style>