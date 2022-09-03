<script setup>
import eventEmitter from "../socket/socketIoService";
import { usePlayerStore } from "../stores/player";

const playerStore = usePlayerStore();

function logout() {
  eventEmitter.logout();
}
</script>

<template>
  <div class="header">
    <div class="flex">
      <p>{{ playerStore.name }}</p>
      <img @click="logout()" class="icon" src="../assets/images/logout.svg" />
      <p class="float-right">Score: {{ playerStore.score }}</p>
    </div>
  </div>
</template>

<style scoped>
.header {
  font-size: 0.8rem;
}
.icon {
  cursor: pointer;
}
</style>
