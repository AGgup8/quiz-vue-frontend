<script setup>
import { markRaw, computed } from "vue";
import { useLobbyStore } from "../stores/lobby";

import LobbyView from "./LobbyView.vue";
import QuestionView from "./QuestionView.vue";
import AnswerView from "./AnswerView.vue";

const lobbyStore = useLobbyStore();

const currentView = computed(() => {
  if (lobbyStore.hasQuestionStarted) {
    return markRaw(AnswerView);
  } else {
    return markRaw(QuestionView);
  }
});
</script>

<template>
  <main id="host">
    <LobbyView />
    <component :is="currentView" />
  </main>
</template>
