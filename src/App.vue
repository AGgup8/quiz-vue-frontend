<script setup>
import { RouterView } from "vue-router";
import { usePlayerStore } from "./stores/player";
import { useLobbyStore } from "./stores/lobby";
import { socket } from "./socket/socketIoClient";

function main() {
  const playerStore = usePlayerStore();
  const lobbyStore = useLobbyStore();

  socket.on("player-joined", (newPlayer) => {
    playerStore.savePlayer(newPlayer);
  });

  socket.on("rejoined", (lobby, player) => {
    playerStore.savePlayer(player);
    lobbyStore.setState(lobby);
  });

  socket.on("joined-lobby", (newLobby) => {
    lobbyStore.setState(newLobby);
  });

  socket.on("updated-lobby", (newLobby) => {
    lobbyStore.setState(newLobby);
    playerStore.updatePlayer(newLobby);
  });

  socket.on("closed-lobby", () => {
    lobbyStore.$reset();
    playerStore.$reset();
    sessionStorage.removeItem("playerId");
  });

  // reload player on page refresh
  if (sessionStorage.getItem("playerId")) {
    socket.emit("rejoin", sessionStorage.getItem("playerId"));
  }
}

main();
</script>

<template>
  <RouterView />
</template>

<style scoped></style>
