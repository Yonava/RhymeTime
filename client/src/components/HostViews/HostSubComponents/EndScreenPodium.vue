<template>
  <div class="center">
    <div 
      class="podium-container" 
      style="display: flex;"
    >
      <div class="podium-width-occupier">
        <div 
          :style="podiumColor[2]"
          class="third-place-podium center"
        >
          <div class="text-h1 placement-title">
            3rd
          </div>
        </div>
        <div class="center">
          <div 
            :style="playerCardYOffset[2]"
            class="third-player-card" 
          >
            <PlayerCard :player="scoreCard[2].player" />
          </div>
        </div>
      </div>
      <div class="podium-width-occupier">
        <div 
          :style="podiumColor[0]"
          class="first-place-podium center"
        >
          <div class="text-h1 placement-title">
            1st
          </div>
        </div>
        <div class="center">
          <div 
            :style="playerCardYOffset[0]"
            class="first-player-card" 
          >
            <img src="../../../../assets/extras/crown.svg" />
            <PlayerCard :player="scoreCard[0].player" />
          </div>
        </div>
      </div>
      <div class="podium-width-occupier">
        <div 
          :style="podiumColor[1]"
          class="second-place-podium center"
        >
          <div class="text-h1 placement-title">
            2nd
          </div>
        </div>
        <div class="center">
          <div 
            :style="playerCardYOffset[1]"
            class="second-player-card" 
          >
            <PlayerCard :player="scoreCard[1].player" />
          </div>
        </div>
      </div>
    </div>
    <div 
      :style="`left: 0; ${bottomCardYOffset}`" 
      class="bottom-container"
    >
      <div 
        v-if="scoreCard[3]" 
        class="center"
        style="position: absolute; right: 0"
      >
        <div class="text-p font-weight-black white--text">
          {{ scoreCard[3].player.name }} (4th)
        </div>
        <img 
          :src="require(`../../../../assets/pfps/${scoreCard[3].player.pfp}.webp`)"
          :alt="scoreCard[3].player.name"
          style="width: 50px; height: 50px; object-fit: cover; border-radius: 5px;"
        />
      </div>
      <div 
        v-if="scoreCard[5]" 
        class="center"
      >
        <div class="text-p font-weight-black white--text">
          {{ scoreCard[5].player.name }} (6th)
        </div>
        <img 
          :src="require(`../../../../assets/pfps/${scoreCard[5].player.pfp}.webp`)"
          :alt="scoreCard[5].player.name"
          style="width: 50px; height: 50px; object-fit: cover; border-radius: 5px;"
        />
      </div>
    </div>
    <div 
      :style="`right: 0; ${bottomCardYOffset}`" 
      class="bottom-container"
    >
      <div 
        v-if="scoreCard[4]" 
        class="center"
        style="position: absolute; left: 0"
      >
        <div class="text-p font-weight-black white--text">
          {{ scoreCard[4].player.name }} (5th)
        </div>
        <img 
          :src="require(`../../../../assets/pfps/${scoreCard[4].player.pfp}.webp`)"
          :alt="scoreCard[4].player.name"
          style="width: 50px; height: 50px; object-fit: cover; border-radius: 5px;"
        />
      </div>
    </div>
  </div>
</template>

<script>
import PlayerCard from './EndScreenPlayer.vue'

export default {
  components: {
    PlayerCard
  },
  props: {
    scoreCard: {
      type: Array,
      required: true
    }
  },
  emits: ['update-title-styles'],
  data() {
    return {
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
      ],
      // bottom card y offset
      bottomCardYOffset: 'transform: translateY(80px)',
      podiumColor: [
        'background: #FFD700',
        'background: #C0C0C0',
        'background: #CD7F32'
      ]
    }
  },
  async mounted() {
    const LIFT_DELAY = 750
    const DELAY_BETWEEN_LIFTS = 1000

    // lift player cards above podium
    for (let i = 2; i >= 0; i--) {
      // leaves breathing room in between reveals
      await new Promise((resolve) => setTimeout(() => resolve(), DELAY_BETWEEN_LIFTS))

      // colors the podium
      setTimeout(() => {
        this.podiumColorTransition(i)
      }, LIFT_DELAY * (2 - i))

      // lifts the player card
      setTimeout(() => {
        this.playerCardYOffset[i].transform = 'translateY(-170px)'
      }, LIFT_DELAY * (3 - i))
    }

    // lift bottom cards
    setTimeout(() => {
      this.bottomCardYOffset = 'transform: translateY(0px)'

      this.$emit('update-title-styles', {
        opacity: 1,
      })

      // delays transition to allow for default class transition
      setTimeout(() => {
        this.$emit('update-title-styles', {
          cursor: 'pointer',
          transition: '300ms'
        })
      }, 100)
    }, LIFT_DELAY * 4)
  },
  methods: {
    podiumColorTransition(index) {
      const STARTING_COLOR = this.podiumColor[index].split(' ')[1]
      // increments color by .125% each iteration until it reaches 100%
      for (let i = 0; i < 802; i++) {
        setTimeout(() => {
          this.podiumColor[index] = `background: linear-gradient(to top, ${this.scoreCard[index].player.color} ${i / 4}%, 0%, ${STARTING_COLOR})`
          this.$forceUpdate()
        }, i * 1.5)
      }
    }
  },
}
</script>

<style scoped>
.bottom-container {
  width: 350px; 
  height: 80px; 
  position: absolute; 
  bottom: 0; 
  display: flex; 
  flex-direction: row; 
  justify-content: center;
  transition: 750ms ease;
}
.third-player-card {
  position: absolute;
  bottom: -10px;
  transition: 750ms ease;
}
.second-player-card {
  position: absolute;
  bottom: 80px;
  transition: 750ms ease;
}
.first-player-card {
  position: absolute;
  bottom: 190px;
  transition: 750ms ease;
}

.placement-title {
  position: absolute;
  top: 2.5%;
  color: white;
  font-weight: 900;
  -webkit-text-stroke: 3px black;
}
.third-place-podium {
  position: absolute;
  bottom: 0;
  width: 200px;
  height: 150px;
  z-index: 2;
}
.second-place-podium {
  position: absolute;
  bottom: 0;
  width: 200px;
  height: 240px;
  z-index: 2;
}
.first-place-podium {
  position: absolute;
  bottom: 0;
  width: 200px;
  height: 350px;
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
</style>