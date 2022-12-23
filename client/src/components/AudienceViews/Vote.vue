<template>
  <div>
    <div class="background-blend"></div>
    <div class="top-background"></div>
    <div class="my-5"></div>
    <div style="position: fixed">
      <ViewDecorator viewTitle="Boost A Player">
        <template #view-content>
          <div 
            :style="boostButtonOpacity"
            class="audience-vote-content pa-3"
          >
            <div 
              v-for="player in candidates"
              :key="player.clientId"
            >
              <div 
                @click.stop="vote(player)"
                :style="playerColor(player)"
                class="circle-vote-button"
              >
                {{ player.name }}
              </div>
            </div>
          </div>
          <div v-if="boostedPlayer">
            <div 
              :style="boostedPlayerColor"
              class="boosted-player-display pa-3 mx-7"
            >
              <img 
                :src="require(`../../../assets/pfps/${boostedPlayer.pfp}.webp`)"
                :alt="`${boostedPlayer.name}'s profile picture`"
                class="boosted-player-pfp"
              />
              <div class="text-h5 font-weight-black white--text ml-2">
                {{ boostedPlayer.name }} Boosted
              </div>
              <v-spacer></v-spacer>
            </div>
          </div>
        </template>
      </ViewDecorator>
    </div>
  </div>
</template>

<script>
import ViewDecorator from '../PlayerViews/PlayerSubComponents/ViewDecorator.vue'

export default {
  components: {
    ViewDecorator
  },
  props: {
    socketInstance: {
      required: true
    }
  },
  data() {
    return {
      candidates: [
        /*
        {
          name: 'Yona',
          clientId: 123,
          pfp: '2',
          color: 'blue'
        },
        {
          name: 'Josh',
          clientId: 123,
          pfp: '4',
          color: 'green'
        },
        {
          name: 'Jack',
          clientId: 123,
          pfp: '3',
          color: 'red'
        }
        */
      ],
      // player user has selected to boost
      boostedPlayer: null
    }
  },
  mounted() {
    this.socketInstance.on('candidate-list', (newCandidates) => {
      // right now, boosterPlayer gets incorrectly reset in the edge case
      // were a player rejoins mid-match and pings 'get-game-state'
      this.boostedPlayer = null

      // remove response property from candidates
      this.candidates = newCandidates.map((candidate) => {
        return {
          name: candidate.player.name,
          clientId: candidate.player.clientId,
          pfp: candidate.player.pfp,
          color: candidate.player.color
        }
      })
    })
  },
  computed: {
    boostButtonOpacity() {
      return {
        opacity: this.boostedPlayer ? 0.5 : 1
      }
    },
    boostedPlayerColor() {
      return {
        backgroundColor: this.boostedPlayer.color
      }
    }
  },
  methods: {
    playerColor(player) {
      return {
        'background-color': player.color
      }
    },
    vote(player) {
      if (!this.boostedPlayer) {
        // TODO: implement socket endpoint for audience boosts
        // this.socketInstance.emit('audience-boost', player.clientId)
        this.boostedPlayer = player
      }
    }
  }
}
</script>

<style scoped>
.circle-vote-button {
  width: 135px;
  height: 135px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  margin: 10px;
  cursor: pointer;
}
.audience-vote-content {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  transition: 750ms;
}
.boosted-player-display {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  border-radius: 15px;
}
.boosted-player-pfp {
  width: 60px;
  height: 60px;
  border-radius: 10px;
  object-fit: cover;
}

.top-background {
  position: fixed;
  top: 0;
  background-color: #FFB118 ;
  width: 100%;
  height: 35px;
  z-index: 1;
}
</style>