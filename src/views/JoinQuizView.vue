<script setup>
import { ref, computed } from "vue";
import eventEmitter from "../socket/socketIoService";

import InputGroup from "../components/InputGroup.vue";
import BaseButton from "../components/BaseButton.vue";
import BaseTitle from "../components/BaseTitle.vue";
import NotificationMessage from "../components/NotificationMessage.vue";

const playerName = ref("");
const hasEnteredName = computed(() =>
  playerName.value.length > 0 ? true : false
);

const lobbyName = ref("");
const hasEnteredLobbyName = computed(() =>
  lobbyName.value.length > 0 ? true : false
);

function submitName() {
  eventEmitter.joinLobby({
    lobbyName: lobbyName.value,
    playerName: playerName.value,
  });
}
</script>

<template>
  <main class="container">
    <BaseTitle class="top-margin" text="Join A Quiz" />

    <InputGroup label="Quiz Name:">
      <input v-model="lobbyName" type="text" />
    </InputGroup>

    <InputGroup label="Player Name:">
      <input
        v-model="playerName"
        id="player-name"
        type="text"
        placeholder="max 15 characters"
        maxlength="15"
      />
    </InputGroup>

    <div class="end">
      <NotificationMessage />
      <BaseButton
        v-if="hasEnteredName && hasEnteredLobbyName"
        :onClick="submitName"
        text="Join Quiz"
      />
    </div>
  </main>
</template>
