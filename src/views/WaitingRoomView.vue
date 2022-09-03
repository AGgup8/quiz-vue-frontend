<script setup>
import { computed } from "vue";
import { useLobbyStore } from "../stores/lobby";

import Header from "../components/Header.vue";
import BaseTitle from "../components/BaseTitle.vue";

const lobbyStore = useLobbyStore();

const waitingPlayers = computed(() => lobbyStore.players.reverse());
</script>

<template>
  <main class="container">
    <Header />

    <BaseTitle text="Waiting Room" />

    <ul class="waiting-room-players-list">
      <li v-for="player in waitingPlayers" :key="player._id">
        {{ player.name }}
      </li>
    </ul>

    <p class="end">Waiting for the quiz to begin...</p>
  </main>
</template>

<style scoped>
.waiting-room-players-list {
  display: flex;
  flex-wrap: wrap;
  overflow-y: auto;
}

.waiting-room-players-list > * {
  margin: 0 2rem 1rem 0;
}
</style>
