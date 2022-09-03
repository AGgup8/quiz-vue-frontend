<script setup>
const props = defineProps({
  label: {
    type: String,
  },
});
</script>

<template>
  <p v-if="props.label" class="paragraph-label">{{ label }}</p>
  <slot />
</template>

<style scoped>
.paragraph-label {
  margin-top: 1em;
  margin-bottom: 0.3em;
  font-weight: 700;
}
</style>
