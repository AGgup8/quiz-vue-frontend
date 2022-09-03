<template>
  <ul class="options-list">
    <li
      v-for="option in options"
      :key="option.text"
      class="option-panel"
      :class="{ selected: option.isSelected, locked: lock }"
      @click="
        optionClick(option.text);
        onClick(option.text);
      "
    >
      {{ option.text }}
    </li>
  </ul>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  options: {
    type: Array,
    required: true,
  },
  onClick: {
    type: Function,
  },
  lock: {
    type: Boolean,
  },
});

const options = ref(
  props.options.map((option) => {
    return { text: option, isSelected: false };
  })
);

function optionClick(text) {
  if (!props.lock) {
    const newOptions = options.value.map((option) => {
      if (option.text == text) {
        option.isSelected = true;
      } else {
        option.isSelected = false;
      }
      return option;
    });
    options.value = newOptions;
  }
}
</script>

<style scoped>
.options-list {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 0.8rem;

  margin: 1rem 0;
}

.option-panel {
  padding: 0.8rem;
  border: var(--border-width) solid #000;
  border-radius: var(--border-radius);

  cursor: pointer;
}

.selected {
  background-color: var(--primary-color);
}

.locked {
  background-color: -internal-light-dark(
    rgba(239, 239, 239, 0.3),
    rgba(59, 59, 59, 0.3)
  );
  color: -internal-light-dark(rgb(84, 84, 84), rgb(170, 170, 170));
  border-color: rgba(118, 118, 118, 0.3);
}
</style>
