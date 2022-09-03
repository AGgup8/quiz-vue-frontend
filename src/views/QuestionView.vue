<script setup>
import { storeToRefs } from "pinia";
import { ref } from "vue";
import eventEmitter from "../socket/socketIoService";
import { useLobbyStore } from "../stores/lobby";

import BaseButton from "../components/BaseButton.vue";
import InputGroup from "../components/InputGroup.vue";
import BaseTitle from "../components/BaseTitle.vue";
import MultipleChoiceInput from "../components/MultipleChoiceInput.vue";

const lobbyStore = useLobbyStore();
const { isLobbyActive } = storeToRefs(lobbyStore);

const imageName = ref();
const image = ref();
function selectImage(e) {
  const file = e.target.files[0];
  if (file) {
    imageName.value = file.name;
    const reader = new FileReader();
    reader.onload = function () {
      image.value = reader.result;
    };
    reader.readAsDataURL(file);
  } else {
    imageName.value = null;
    image.value = null;
  }
}

const isMultipleChoice = ref(false);
const options = ref([]);
function checkMultiple(e) {
  isMultipleChoice.value = e.target.checked;
  if (!e.target.checked) {
    options.value = null;
  }
}

function updateOptions(newOptions) {
  options.value = newOptions;
}

const answerInput = ref();
function saveAnswer(answer) {
  answerInput.value = answer;
}

const questionInput = ref();
function showQuestion() {
  eventEmitter.showQuestion({
    question: questionInput.value,
    answer: answerInput.value,
    imageData: image.value,
    imageName: imageName.value,
    options: options.value,
  });
}
</script>

<template>
  <section class="">
    <BaseTitle text="Question" />
    <div class="content overflow">
      <p v-if="!isLobbyActive">Join a lobby</p>

      <div v-if="isLobbyActive">
        <InputGroup label="Options">
          <div class="flex flex-center">
            <label>Timer</label>
            <input @change="checkTimer" type="checkbox" />
          </div>
          <div class="flex flex-center">
            <label>Multiple Choice</label>
            <input @change="checkMultiple" type="checkbox" />
          </div>
        </InputGroup>

        <InputGroup label="Image">
          <input @change="selectImage" type="file" accept="image/*" />
        </InputGroup>

        <InputGroup label="Question">
          <input v-model.laxy="questionInput" type="text" />
        </InputGroup>

        <InputGroup v-if="!isMultipleChoice" label="Answer">
          <input v-model.lazy="answerInput" type="text" />
        </InputGroup>

        <div v-if="isMultipleChoice">
          <InputGroup label="Options">
            <MultipleChoiceInput
              :onSelect="saveAnswer"
              :onChange="updateOptions"
            />
          </InputGroup>
        </div>
      </div>
    </div>
    <div v-if="isLobbyActive" class="end">
      <BaseButton text="Show question" :onClick="showQuestion" />
    </div>
  </section>
</template>

<style scoped>
section {
  display: flex;
  flex-direction: column;

  padding: 1rem;
  /* border: var(--border-width) #000 solid; */
  border-radius: var(--border-radius);
  background-color: white;

  overflow-y: auto;
}
</style>
