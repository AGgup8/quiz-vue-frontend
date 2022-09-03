<template>
  <li class="player-row">
    <p>{{ position }}</p>
    <p>{{ name }}</p>
    <p>{{ score }}</p>
    <img
      @click="removeClick(id)"
      class="icon"
      src="../assets/images/remove.svg"
    />
  </li>
</template>

<script setup>
const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  position: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  removeClick: {
    type: Function,
  },
});
</script>

<style scoped>
.player-row {
  display: grid;
  grid-template-columns: 1fr 5fr 2fr auto;
  align-items: center;

  padding: 0.2rem 1rem;

  font-size: 0.8em;
}

.player-row {
  border-radius: var(--border-radius);
}

.player-row:first-child {
  border-radius: var(--border-radius) var(--border-radius) 0 0;
}

.player-row:last-child {
  border-radius: 0 0 var(--border-radius) var(--border-radius);
}

.player-row > p {
  margin: 0.4rem 0;
}
</style>
