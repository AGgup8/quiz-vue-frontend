<script setup>
import { markRaw, computed } from "vue";
import { storeToRefs } from "pinia";
import { usePlayerStore } from "../stores/player";
import { useLobbyStore } from "../stores/lobby";

import JoinQuizView from "./JoinQuizView.vue";
import WaitingRoomView from "./WaitingRoomView.vue";
import PlayerQuestionView from "./PlayerQuestionView.vue";
import PlayerAnswerView from "./PlayerAnswerView.vue";

const playerStore = usePlayerStore();
const { hasJoined } = storeToRefs(playerStore);
const lobbyStore = useLobbyStore();
const { hasQuestionStarted, isShowingAnswer } = storeToRefs(lobbyStore);

const currentView = computed(() => {
  if (!hasJoined.value) {
    return markRaw(JoinQuizView);
  } else if (hasQuestionStarted.value && !isShowingAnswer.value) {
    return markRaw(PlayerQuestionView);
  } else if (isShowingAnswer.value) {
    return markRaw(PlayerAnswerView);
  } else {
    return markRaw(WaitingRoomView);
  }
});
</script>

<template>
  <main id="lobby">
    <component :is="currentView" />
  </main>
</template>
