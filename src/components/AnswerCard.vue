<script setup>
import { ref } from "vue";

const props = defineProps({
  question: {
    type: String,
  },
  answer: {
    type: String,
  },
  isCorrect: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <div
    class="answer-card flex flex-vertical flex-center"
    :class="{ correct: isCorrect }"
  >
    <img
      v-if="isCorrect"
      class="large-icon"
      src="../assets/images/correct.svg"
    />
    <!-- <img v-else class="large-icon" src="../assets/images/incorrect.svg" /> -->
    <p class="question-text">{{ question }}</p>
    <p class="answer-text">{{ answer }}</p>
  </div>
</template>

<style scoped>
.answer-card {
  height: auto;
  padding: 2em;

  background-color: var(--primary-color);
  border-radius: var(--border-radius);
  margin-bottom: 2rem;
}

.correct {
  background-color: rgb(41, 163, 41);
}

.incorrect {
  background-color: red;
}

.question-text {
  font-size: 1.1rem;
  text-align: center;
}

.answer-text {
  font-size: 1.3rem;
  font-weight: 700;
}
</style>
