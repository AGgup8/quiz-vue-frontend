<script setup>
const props = defineProps({
  text: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <h1 class="title">{{ text }}</h1>
</template>

<style scoped>
.title {
  margin: 1rem 0 1.2rem;
  color: var(--text-color);
  font-size: 3em;
  font-weight: bold;
}

.top-margin {
  margin-top: 3rem;
}
</style>
