<template>
  <div>
    Time Left: {{ timeRemaining }}

    <div class="center">
      <div class="text-h4">Your Submissions</div>
    </div>

    <v-row justify="center" class="pa-4">
      <v-col v-for="response in promptResponses" :key="response.id" cols="2">
        <DisplayResponse :response="response" />
      </v-col>
    </v-row>

    <div class="center">
      <div class="text-h4">Live Voting Results</div>
    </div>

    <div class="bar-parent"> 
      <div v-for="player in candidates" :key="player.id" class="center voter-bar" :style="`height: ${player.votes}%;`">
        <div class="text-p white--text name-tag">{{ player.player }}</div>
      </div>
    </div>

  </div>
</template>

<script>
import HostMixin from "./HostMixin";
import DisplayResponse from "./HostSubComponents/ResponseDisplayCard.vue";

export default {
  mixins: [HostMixin],
  components: {
    DisplayResponse,
  },
  data() {
    return {
      height: "20",
      // tallies all the votes in ballotBox and returns object. ie { yona: 5 } yona has 5 votes
      voteCount: {},
      // stores ballots submitted by players
      ballotBox: {},
      // candidate = { player: playerName, votes: totalVotes }
      candidates: [],
    };
  },
  destroyed() {
    this.candidates.sort((a, b) => b.votes - a.votes);
    const WINNER = this.candidates[0]?.player ?? "Nobody";
    const THEIR_RESPONSE =
      this.promptResponses[
        this.promptResponses.findIndex((obj) => obj.player === WINNER)
      ]?.response ?? "A response hasnt been given";
    this.$emit("round-winner", {
      player: WINNER,
      response: THEIR_RESPONSE,
    });
  },
  mounted() {
    this.socketInstance.emit(
      "candidate-list",
      this.promptResponses.map((response) => response.player)
    );
  },
  methods: {
    countVotes(playerBallot) {
      // Refactor this mess when there is time!!!

      this.promptResponses
        .map((response) => response.player)
        .forEach((player) => (this.voteCount[player] = 0));

      const PLAYER_NAME = Object.keys(playerBallot)[0];
      this.ballotBox[PLAYER_NAME] = playerBallot[PLAYER_NAME];
      Object.keys(this.ballotBox).forEach((ballotHolder) => {
        const REORDERED_BALLOT = [...this.ballotBox[ballotHolder]].reverse();
        for (let i = 0; i < REORDERED_BALLOT.length; i++) {
          this.voteCount[REORDERED_BALLOT[i]] += i;
        }
      });

      this.candidates = [];
      Object.keys(this.voteCount).forEach((player) => {
        this.candidates.push({
          player,
          votes: this.voteCount[player],
        });
      });
    },
    next() {
      if (this.testMode) return;
      this.$emit("change-view", "recap");
    },
  },
};
</script>

<style scoped>
.voter-bar {
  background-color: purple; 
  width: 75px;
  position: relative; 
  margin-top: auto;
  margin-left: 1.5%;
  transition: 500ms ease-in-out;
}

.name-tag {
  top: 0; 
  position: absolute; 
  font-weight: bold;
}

.bar-parent {
  display: flex; 
  flex-direction: row; 
  align-items: center; 
  justify-content: center;  
  height: 37vh;
  margin: 0px 300px 0px 300px;
  border-bottom: 8px solid black;
}
</style>