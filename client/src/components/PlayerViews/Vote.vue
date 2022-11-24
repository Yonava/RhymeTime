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
      candidates: []
    }
  },
  mounted() {
    this.socketInstance.on('candidate-list', (newCandidates) => {
      this.candidates = newCandidates
    })
  },
  computed: {
    clientName() {
      return this.$store.state.nickname
    }
  },
  methods: {
    submitBallot() {
      const BALLOT = {}
      BALLOT[this.clientName] = this.candidates.map(candidate => candidate.player.name)
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