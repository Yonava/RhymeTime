<template>
  <div class="background-matte">
    <div class="background-stripe-1"></div>
    <div class="background-stripe-2"></div>
    <header class="center mt-10">
      <div class="text-h1 end-screen-title font-weight-black white--text px-7 py-5">
        View Finished Song
      </div>
    </header>
    <div class="center">
      <div class="podium-container" style="display: flex;">
        <div class="podium-width-occupier">
          <div class="third-place-podium"></div>
          <div class="center">
            <div class="third-player-card" :style="playerCardYOffset[2]">
              <PlayerCard :player="scoreCard[2].player" />
            </div>
          </div>
        </div>
        <div class="podium-width-occupier">
          <div class="first-place-podium"></div>
          <div class="center">
            <div class="first-player-card" :style="playerCardYOffset[0]">
              <PlayerCard :player="scoreCard[0].player" />
            </div>
          </div>
        </div>
        <div class="podium-width-occupier">
          <div class="second-place-podium"></div>
          <div class="center">
            <div class="second-player-card" :style="playerCardYOffset[1]">
              <PlayerCard :player="scoreCard[1].player" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HostMixin from './HostMixin'
import PlayerCard from './HostSubComponents/EndScreenPlayer.vue'

export default {
  mixins: [
    HostMixin
  ],
  components: {
    PlayerCard
  },
  data() {
    return {
      // stores players along with their respective song credits
      scoreCard: [],
      // stores the y offset of the player card
      playerCardYOffset: [
        {
          transform: 'translateY(0px)'
        },
        {
          transform: 'translateY(0px)'
        },
        {
          transform: 'translateY(0px)'
        }
      ]
    }
  },
  mounted() {
    // initializes the scorecard
    this.playerList.forEach((player) => {
      this.scoreCard.push({
        ...player,
        score: 0,
      });
    })

    // increments the score of the player who submitted the winning response
    this.winningResponses.forEach((response) => {
      this.scoreCard
        .find((p) => p.player.clientId === response.player.clientId).score += 1
    })

    // sort scorecard by score
    this.scoreCard.sort((a, b) => b.score - a.score)

    // lift player cards above podium
    setTimeout(() => {
      for (let i = 0; i < 3; i++) {
        this.playerCardYOffset[i].transform = `translateY(-170px)`
      }
    }, 1000)
  },
};
</script>

<style scoped>
.third-player-card {
  position: absolute;
  bottom: -10px;
  transition: 750ms ease;
}
.second-player-card {
  position: absolute;
  bottom: 90px;
  transition: 750ms ease;
}
.first-player-card {
  position: absolute;
  bottom: 240px;
  transition: 750ms ease;
}

.end-screen-title {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  cursor: pointer;
  z-index: 2;
  transition: 300ms;
}
.end-screen-title:hover {
  background: rgba(0, 0, 0, 0.5);
}
.third-place-podium {
  position: absolute;
  bottom: 0;
  width: 200px;
  height: 150px;
  background: #CD7F32;
  z-index: 2;
}
.second-place-podium {
  position: absolute;
  bottom: 0;
  width: 200px;
  height: 250px;
  background: #C0C0C0;
  z-index: 2;
}
.first-place-podium {
  position: absolute;
  bottom: 0;
  width: 200px;
  height: 400px;
  background: #FFD700;
  z-index: 2;
}
.podium-width-occupier {
  width: 200px;
  position: relative;
}

.podium-container {
  position: absolute;
  bottom: 0;
}
.background-matte {
  background-color: #303030;
  width: 100vw;
  height: 100vh;
  position: fixed;
}
.background-stripe-2 {
  height: 150vw;
  width: 175px;
  background-color: #414141;
  transform: translateY(-85vh) translateX(30vw) rotate(100deg);
  position: fixed;
}
.background-stripe-1 {
  height: 150vw;
  width: 175px;
  background-color: #414141;
  transform: translateY(-85vh) translateX(30vw) rotate(220deg);
  position: fixed;
}
</style>