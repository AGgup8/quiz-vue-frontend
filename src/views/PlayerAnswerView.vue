<script setup>
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useLobbyStore } from "../stores/lobby";
import { usePlayerStore } from "../stores/player";

import Header from "../components/Header.vue";
import BaseTitle from "../components/BaseTitle.vue";
import AnswerCard from "../components/AnswerCard.vue";

const lobbyStore = useLobbyStore();
const { question, players } = storeToRefs(lobbyStore);
const playerStore = usePlayerStore();
const { isCorrect } = storeToRefs(playerStore);

const otherAnswers = computed(() => {
  const playersCopy = [...players.value];
  return playersCopy.sort((a, b) => b.correct - a.correct);
});
</script>

<template>
  <div class="container">
    <Header></Header>
    <BaseTitle text="Answer" />
    <AnswerCard
      :question="question.text"
      :answer="question.correctAnswer"
      :isCorrect="isCorrect"
    />
    <div id="other-answers">
      <a href="#other-answers">
        <h3>
          Other answers<img
            class="icon"
            src="../assets/images/down-arrow.svg"
          />
        </h3>
      </a>
      <ul class="answers-list">
        <li class="answer" v-for="player in otherAnswers" :id="player._id">
          <p class="bold">{{ player.name }}</p>
          <p>{{ player.answer }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
#other-answers {
  margin: 7rem 0 2rem;
}

.answers-list {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 0.8rem;

  margin: 1rem 0;
}

.answers-list > li {
  display: grid;
  grid-template-columns: 1fr 1fr;

  padding: 0.5rem 0.8rem;
  background-color: #ccc;
  border-radius: var(--border-radius);

  font-size: 0.9rem;
}

a {
  text-decoration: none;
}
</style>
