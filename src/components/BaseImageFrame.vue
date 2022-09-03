<template>
  <div class="image-frame">
    <img :src="url" />
  </div>
</template>

<script setup>
const props = defineProps({
  url: {
    type: String,
    required: true,
  },
});
</script>

<style scoped>
.image-frame {
  align-self: center;
  margin: 0.5rem 0;
}

.image-frame > img {
  display: block;
  max-height: 10rem;
  width: 100%;
  height: auto;
}
</style>
