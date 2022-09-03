<script setup>
import { ref } from "vue";

import { socket } from "../socket/socketIoClient";

const notification = ref("");

socket.on("message", (message) => {
  notification.value = message;
  setTimeout(() => {
    notification.value = "";
  }, 2000);
});
</script>

<template>
  <Transition name="fade">
    <p class="notification text-center">{{ notification }}</p>
  </Transition>
</template>

<style scoped>
.fade-leave-active {
  transition: 0.5s ease;
}

.fade-leave-to {
  opacity: 0;
}
</style>
