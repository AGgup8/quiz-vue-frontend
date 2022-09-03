<script setup>
import { ref, reactive } from 'vue';
import { usePackStore } from '../stores/packs';
import Accordion from '../components/Accordion.vue';
const packStore = usePackStore();
const packs = packStore.packs;

const selectedPack = ref(null);
function editPack(pack) {
  selectedPack.value = pack;
}

const isMultipleChoice = ref(false);
function toggleMultiple(e) {
  isMultipleChoice.value = e.target.checked;
}
function saveQuestion(id) {
  console.log("saving question changes: "+id);
  packStore.saveQuestion(id, isMultipleChoice.value);
}
</script>

<template>
  <main id="packs" class="">

    <section class="flex flex-vertical overflow">
      <h1 class="title">Question Packs</h1>
      <div class="content">
        <ul class="packs-list">
          <li class="pack-item" v-for="pack in packs" :key="pack.id">
            <p class="pack-name"><span class="bold">Name: </span>{{ pack.name }}</p>
            <p class="pack-number"><span class="bold"># Of Questions: </span>{{ pack.questions.length }}</p>
            <img class="pack-edit icon" src="../assets/images/edit-pencil.svg" @click="editPack(pack)">
          </li>
        </ul>
      </div>
      <div class="end">
        <button class="btn">Create new pack</button>
      </div>
    </section>

    <section id="edit-pack" class="flex flex-vertical overflow">
      <h1 class="title">Edit Pack</h1>
      <div class="content overflow">
        <p v-if="!selectedPack">Select a pack to edit</p>
        <ul v-if="selectedPack" class="questions-list">
          <Accordion v-for="question in selectedPack.questions" :key="question.id">
            <template v-slot:preview>
              <article class="question-item">
                <p class="question-text"><span class="bold">Question: </span>{{ question.text }}</p>
                <p class="question-answer"><span class="bold">Answer: </span>{{ question.answer }}</p>
                <img class="question-edit icon" src="../assets/images/down-arrow.svg">
              </article>
            </template>
            <template v-slot:content>
              <article class="question-inputs">
                <p class="paragraph-label">Image:</p>
                <input type="file" accept="image/*">
                <p class="paragraph-label">Question:</p>
                <input v-model="question.text" type="text">
                <div>
                  <label for="multiple">Multiple Choice</label>
                  <input @change="toggleMultiple" type="checkbox" name="multiple">
                </div>
                <ul v-if="isMultipleChoice" class="options-list">
                  <p>1</p><input v-model="question.options[0]" type="text" class="option-panel">
                  <p>2</p><input v-model="question.options[1]" type="text" class="option-panel">
                  <p>3</p><input v-model="question.options[2]" type="text" class="option-panel">
                  <p>4</p><input v-model="question.options[3]" type="text" class="option-panel">
                </ul>
                <p class="paragraph-label">Answer:</p>
                <select v-if="isMultipleChoice" v-model="question.answer">
                  <option v-for="option in question.options" :key="option" :value="option">
                    {{ option }}
                  </option>
                </select>
                <input v-if="!isMultipleChoice" v-model="question.answer" type="text">
                <button @click="saveQuestion(question.id)" class="save-btn btn">Save</button>
              </article>
            </template>
          </Accordion>
        </ul>
      </div>
      <div class="end">
        <button v-if="selectedPack" class="btn">New question</button>
      </div>
    </section>

  </main>
</template>

<style scoped>
section {
  border: var(--border-width) solid #000;
  border-radius: var(--border-radius);
  padding: 1rem;
}

.packs-list,
.questions-list {
  display: grid;
  grid-gap: 1rem;
}

.pack-item {
  display: grid;
  grid-template-columns: 4fr 1fr;
  grid-template-areas:
    "name   edit"
    "number edit";
  padding: 1rem 1.5rem;
  border: var(--border-width) solid #000;
  border-radius: var(--border-radius);
}

.pack-name {
  grid-area: name;
}

.pack-number {
  grid-area: number;
}

.pack-edit {
  grid-area: edit;
  align-self: center;
  justify-self: end;
  cursor: pointer;
}

.question-item {
  display: grid;
  grid-template-columns: 4fr 1fr;
  grid-template-areas:
    "text   edit"
    "answer edit";
  padding: 1rem 1.5rem;
}

.question-text {
  grid-area: text;
}

.question-answer {
  grid-area: answer;
}

.question-edit {
  grid-area: edit;
  align-self: center;
  justify-self: end;
  cursor: pointer;
}

.question-inputs {
  display: flex;
  flex-direction: column;
  padding: 1rem 1.5rem;
}

.options-list {
  display: grid;
  grid-template-columns: min-content 4fr;
  grid-gap: 0.2rem;
  align-items: center;
}

.option-panel {
  margin: 0;
  border: var(--border-width) solid #000;
  border-radius: var(--border-radius);
}

.save-btn {
  margin-top: 1rem;
  align-self: start;
}
</style>
