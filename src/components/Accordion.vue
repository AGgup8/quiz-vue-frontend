<script setup>
import { ref } from 'vue';
const isOpen = ref(false);
function toggle() {
    isOpen.value = !isOpen.value;
}
</script>

<template>
    <div class="accordion">
        <div @click="toggle()" class="cursor" :class="{ 'border-bottom': isOpen }">
            <slot name="preview" />
        </div>
        <transition name="slide">
            <div v-show="isOpen">
                <slot name="content" />
            </div>
        </transition>
    </div>
</template>

<style scoped>
.accordion {
    border: var(--border-width) solid #000;
    border-radius: var(--border-radius);
}

.border-bottom {
    border-bottom: var(--border-width) solid #000;
}

.slide-enter-active,
.slide-leave-active {
  transition: max-height 0.8s ease;
}

.slide-enter-to,
.slide-leave-from {
  overflow: hidden;
  max-height: 1000px;
}

.slide-enter-from,
.slide-leave-to {
  overflow: hidden;
  max-height: 0;
}
</style>