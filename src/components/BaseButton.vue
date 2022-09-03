<template>
  <button @click="click()" class="btn" :class="{ 'inactive-btn': disabled }">
    {{ text }}
  </button>
</template>

<script setup>
const props = defineProps({
  text: {
    type: String,
  },
  onClick: {
    type: Function,
  },
  disabled: {
    type: Boolean,
  },
});

function click() {
  if (!props.disabled) {
    props.onClick();
  }
}
</script>

<style scoped>
.btn {
  padding: 0.5rem;
  border: 0;
  border-radius: var(--border-radius);
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
  background-color: var(--primary-color);
  color: var(--text-color);
  font-size: 1.1em;
  font-family: var(--default-font);
  text-decoration: none;
  text-align: center;
  font-weight: 600;
  cursor: pointer;
}

.btn:hover {
  background-color: var(--text-color);
  color: var(--primary-color);
}

.inactive-btn {
  background-color: rgb(170, 170, 170);
  cursor: default;
}

.inactive-btn:hover {
  background-color: rgb(170, 170, 170);
  color: var(--text-color);
}
</style>
