<template>
  <div class="container">
    <slot />
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;

  height: 100vh;
  box-sizing: border-box;

  margin-left: auto;
  margin-right: auto;
  padding: 2rem 2rem 2rem 2rem;
}
</style>
