<template>
  <div>
    <ViewDecorator viewTitle="Drag to Vote">
      <template #view-content>
        <div class="center mt-6">
          <div 
            class="content-container"
            :style="{ opacity: canVote ? 1 : 0.5 }"
          >
            <draggable 
              v-model="candidates"
              :disabled="!canVote"
              @change="submitBallot"
            >
              <TransitionGroup name="list">
                <div 
                  v-for="candidate in candidates" 
                  :key="candidate.player.clientId"
                  class="center"
                >
                  <PlayerCard
                    :player="candidate.player"
                    :response="candidate.response"
                  />
                </div>
              </TransitionGroup>
            </draggable>
          </div>
          <div>
            <v-btn 
              @click="finalizeBallot"
              :disabled="!canVote"
              class="mt-8"
              rounded
            >
              Finalize Ballot
            </v-btn>
          </div>
        </div>
      </template>
    </ViewDecorator>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import PlayerCard from './PlayerSubComponents/PlayerCard.vue'
import ViewDecorator from './PlayerSubComponents/ViewDecorator.vue'

export default {
  components: {
    draggable,
    PlayerCard,
    ViewDecorator
  },
  props: {
    clientId: {
      type: Number,
      required: true
    },
    socketInstance: {
      required: true
    }
  },
  data() {
    return {
      // contains response objects of players 
      // that have submitted a response { player: Player, response: string }
      candidates: [
        // test data
        /*
        { player: { name: 'Yona', color: 'blue', pfp: '2', clientId: 1 }, response: 'test1' },
        { player: { name: 'Josh', color: 'green', pfp: '4', clientId: 2 }, response: 'test1' },
        { player: { name: 'Jack', color: 'red', pfp: '3', clientId: 3 }, response: 'test1' },
        */
      ],
      canVote: true
    }
  },
  mounted() {
    this.socketInstance.on('candidate-list', (newCandidates) => {
      // remove self from candidate list
      this.candidates = newCandidates
        // .filter(candidate => candidate.player.clientId !== this.clientId)
      this.canVote = true
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
    },
    finalizeBallot() {
      this.socketInstance.emit('finalize-ballot')
      this.canVote = false
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
    transition: 300ms;
  }
  /* for transition group component */
  .list-move {
    transition: all 0.5s ease;
  }
</style>