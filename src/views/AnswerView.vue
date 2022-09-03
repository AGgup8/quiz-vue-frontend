<script setup>
import { storeToRefs } from "pinia";
import { computed } from "vue";
import { useLobbyStore } from "../stores/lobby";
import eventEmitter from "../socket/socketIoService";

import BaseTitle from "../components/BaseTitle.vue";
import BaseButton from "../components/BaseButton.vue";
import AnswerCard from "../components/AnswerCard.vue";

const lobbyStore = useLobbyStore();
const { hasQuestionEnded, question, players, isShowingAnswer } =
  storeToRefs(lobbyStore);

const answerPlayers = computed(() => {
  const newOrder = [...players.value];
  return newOrder.sort((a, b) => (a.name < b.name ? -1 : 1));
});

function endQuestion() {
  eventEmitter.endQuestion();
}

function showAnswer() {
  eventEmitter.showAnswer();
}

function nextQuestion() {
  eventEmitter.nextQuestion();
}

function toggleCorrect(playerId, correct) {
  eventEmitter.toggleCorrect({
    playerId,
    correct,
  });
}

// function hideAnswer() {
//   eventEmitter.hideAnswer();
// }
</script>

<template>
  <section>
    <BaseTitle text="Question" />

    <AnswerCard :question="question.text" :answer="question.correctAnswer" />

    <h3 class="paragraph-label">Answers</h3>
    <div class="content overflow">
      <div class="flex flex-vertical">
        <ul class="answers-list">
          <li
            :class="{ correct: player.correct }"
            class="answer"
            @click="toggleCorrect(player._id, player.correct)"
            v-for="player in answerPlayers"
            :key="player._id"
          >
            <p class="bold">{{ player.name }}</p>
            <p>{{ player.answer }}</p>
          </li>
        </ul>
      </div>
    </div>
    <div class="end">
      <BaseButton
        v-if="!hasQuestionEnded"
        text="End question"
        :onClick="endQuestion"
      />
      <BaseButton
        v-if="hasQuestionEnded && !isShowingAnswer"
        text="Show answer"
        :onClick="showAnswer"
      />
      <!-- <BaseButton
        v-if="isShowingAnswer"
        text="Hide answer"
        :onClick="hideAnswer"
      /> -->
      <p class="text-center" v-if="isShowingAnswer">Showing answer</p>
      <BaseButton
        v-if="hasQuestionEnded"
        text="Next question"
        :onClick="nextQuestion"
      />
    </div>
  </section>
</template>

<style scoped>
section {
  display: flex;
  flex-direction: column;

  padding: 1rem;
  border-radius: var(--border-radius);
  background-color: white;

  overflow-y: auto;
}

.answers-list {
  display: grid;
  grid-template-columns: 1fr;

  border: 1px solid #000;
  border-radius: var(--border-radius);

  font-size: 0.7rem;
}

.answers-list > li {
  display: grid;
  grid-template-columns: 1fr 1fr;

  padding: 0.2rem 1rem;
}

.answers-list > li:first-child {
  border-radius: var(--border-radius) var(--border-radius) 0 0;
}

.answers-list > li:last-child {
  border-radius: 0 0 var(--border-radius) var(--border-radius);
}

.answers-list > li:nth-of-type(odd) {
  background-color: #ccc;
}
.answer-text {
  font-size: 1.3rem;
  font-weight: 700;
}

.correct {
  background-color: rgb(41, 163, 41) !important;
}
</style>
