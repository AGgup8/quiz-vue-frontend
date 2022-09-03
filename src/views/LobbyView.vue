<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import eventEmitter from "../socket/socketIoService";
import { useLobbyStore } from "../stores/lobby";

import NotificationMessage from "../components/NotificationMessage.vue";
import InputGroup from "../components/InputGroup.vue";
import BaseTitle from "../components/BaseTitle.vue";
import BaseButton from "../components/BaseButton.vue";
import ScoreboardList from "../components/ScoreboardList.vue";

const lobbyStore = useLobbyStore();
const { name, players, isLobbyActive } = storeToRefs(lobbyStore);

const lobbyInput = ref();
function joinLobby() {
  if (lobbyInput) {
    eventEmitter.createLobby({
      name: lobbyInput.value,
    });
  }
}

function closeLobby() {
  eventEmitter.removeLobby();
}
</script>

<template>
  <section id="lobby-view">
    <BaseTitle text="Lobby" />
    <InputGroup v-if="!isLobbyActive" label="Lobby name:">
      <input
        v-model="lobbyInput"
        type="text"
        placeholder="max 20 characters"
        maxlength="20"
      />
    </InputGroup>
    <p v-if="isLobbyActive">Name: {{ name }}</p>
    <div class="content overflow">
      <ScoreboardList v-if="isLobbyActive" :players="players" />
    </div>
    <div class="end">
      <NotificationMessage />
      <BaseButton
        v-if="!isLobbyActive"
        :onClick="joinLobby"
        :disabled="!lobbyInput"
        text="Join lobby"
      />
      <BaseButton v-else :onClick="closeLobby" text="Close lobby" />
    </div>
  </section>
</template>

<style scoped>
#lobby-view {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  background-color: white;
  border-radius: var(--border-radius);
  overflow-y: auto;
}
</style>
