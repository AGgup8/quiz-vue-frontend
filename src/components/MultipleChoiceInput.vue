<script setup>
import { reactive, watch } from "vue";

const props = defineProps({
  onSelect: {
    type: Function,
  },
  onChange: {
    type: Function,
  },
});

const options = reactive([{ text: "", correct: false }]);
watch(options, (newValue) => {
  const strippedOptions = newValue.map((option) => {
    return option.text;
  });
  props.onChange(strippedOptions);
});

function addOption() {
  options.push({ text: "", correct: false });
}

function removeOption() {
  options.pop();
}

function highlightOption(text) {
  options.map((option) => {
    if (option.text == text) {
      option.correct = true;
    } else {
      option.correct = false;
    }
  });
}
</script>

<template>
  <ul class="options-list">
    <li v-for="(option, index) in options" :id="index">
      <div class="option-panel" :class="{ selected: option.correct }">
        <input v-model.lazy="option.text" type="text" />
        <img
          @click="
            highlightOption(option.text);
            onSelect(option.text);
          "
          class="icon"
          src="../assets/images/correct.svg"
        />
      </div>
    </li>
  </ul>
  <img @click="addOption()" class="icon" src="../assets/images/plus.svg" />
  <img @click="removeOption()" class="icon" src="../assets/images/minus.svg" />
</template>

<style scoped>
.options-list {
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
  grid-gap: 0.25rem;
  margin-bottom: 0.25rem;
}
.option-panel {
  display: grid;
  align-items: center;
  grid-template-columns: 1fr min-content;
  margin: 0;
  border: var(--border-width) solid #000;
  border-radius: var(--border-radius);
  padding: 0.3rem;
}

.option-panel > input {
  margin: 0;
  border: 0;
  outline: none;
  padding: 0;
}

.selected {
  border: var(--border-width) solid rgb(41, 163, 41);
}
</style>
