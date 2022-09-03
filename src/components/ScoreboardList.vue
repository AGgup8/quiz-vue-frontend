<script setup>
import { computed } from "vue";
import * as socketEmitter from "../socket/lobby";
import ScoreboardItem from "./ScoreboardItem.vue";

const props = defineProps({
  players: {
    type: Array,
    required: true,
  },
});

const scoreboardPlayers = computed(() => {
  return [...props.players].sort((a, b) => b.score - a.score);
});

function removePlayer(id) {
  socketEmitter.removePlayer(id);
}
</script>

<template>
  <ul class="scoreboard">
    <ScoreboardItem
      v-for="(player, index) in scoreboardPlayers"
      :key="player._id"
      :id="player._id"
      :position="index + 1"
      :name="player.name"
      :score="player.score"
      :removeClick="removePlayer"
    />
  </ul>
</template>

<style scoped>
.scoreboard {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  border: 1px solid #000;
  border-radius: var(--border-radius);
}

.scoreboard > li:nth-of-type(odd) {
  background-color: #ccc;
}
</style>
