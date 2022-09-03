<template>
  <div class="countdown">
    <p>{{ countdown }}</p>
  </div>
</template>

<script setup>
import { watch, ref } from "vue";

const props = defineProps({
  duration: {
    type: Number,
  },
  onEnd: {
    type: Function,
  },
});

const countdown = ref(props.duration);

const timer = setInterval(() => {
  countdown.value--;
  if (countdown.value == 0) {
    stopCountdown();
  }
}, 1000);

function stopCountdown() {
  clearInterval(timer);
  props.onEnd();
}
</script>

<style scoped>
.countdown {
  display: flex;
  align-items: center;
  justify-content: center;

  height: 10rem;
  width: 10rem;
  margin: 10% auto;
  border-radius: 50%;
  background: var(--primary-color);

  font-size: 2.5em;
  font-weight: 600;
  vertical-align: middle;
}
</style>
