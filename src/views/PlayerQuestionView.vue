<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import eventEmitter from "../socket/socketIoService";
import { useLobbyStore } from "../stores/lobby";
import { usePlayerStore } from "../stores/player";

import Header from "../components/Header.vue";
import BaseTitle from "../components/BaseTitle.vue";
import BaseButton from "../components/BaseButton.vue";
import BaseImageFrame from "../components/BaseImageFrame.vue";
import InputGroup from "../components/InputGroup.vue";
import MultipleChoiceList from "../components/MultipleChoiceList.vue";
import UserCountdown from "../components/UserCountdown.vue";

const lobbyStore = useLobbyStore();
const { question, hasQuestionEnded } = storeToRefs(lobbyStore);
const playerStore = usePlayerStore();
const { answer } = storeToRefs(playerStore);
const fullImageUrl =
  import.meta.env.VITE_IMAGE_SERVER + question.value.pictureUrl;

let start;
const isDisplayingQuestion = ref(false);
function showQuestion() {
  isDisplayingQuestion.value = true;
  start = Date.now();
}

const options = question.value.options;
function selectOption(selectedOption) {
  if (!hasSubmit.value && !hasQuestionEnded.value) {
    answer.value = selectedOption;
  }
}

const hasSubmit = ref(answer.value !== null);
function submit() {
  const end = Date.now();
  eventEmitter.submitAnswer({
    answer: answer.value,
    timeElapsed: end - start,
  });
  hasSubmit.value = true;
}
</script>

<template>
  <div class="container">
    <Header />

    <BaseTitle text="Question" />

    <UserCountdown
      v-if="!isDisplayingQuestion"
      :duration="3"
      :onEnd="showQuestion"
    />

    <section v-if="isDisplayingQuestion" class="content overflow">
      <BaseImageFrame
        v-if="question.pictureUrl && question.pictureUrl.length > 0"
        :url="fullImageUrl"
      />

      <p class="question-text">{{ question.text }}</p>

      <MultipleChoiceList
        v-if="options && options.length > 0"
        :options="options"
        :lock="hasSubmit || hasQuestionEnded"
        :onClick="selectOption"
      />

      <InputGroup v-else>
        <input
          v-model="answer"
          type="text"
          :disabled="hasSubmit || hasQuestionEnded"
        />
      </InputGroup>
    </section>

    <section v-if="isDisplayingQuestion" class="end">
      <BaseButton
        v-if="!hasQuestionEnded && !hasSubmit"
        :disabled="!answer"
        text="Submit"
        :onClick="submit"
      />
      <p v-else-if="hasSubmit" class="text-center">
        Waiting for host to show answers...
      </p>
      <p v-else-if="hasQuestionEnded" class="text-center">
        Question has ended. Waiting for host to show answers...
      </p>
    </section>
  </div>
</template>

<style scoped>
.question-text {
  font-size: 1.1rem;
  line-height: 1.5;
  font-weight: 500;
  margin-bottom: 0.5rem;
}
</style>
