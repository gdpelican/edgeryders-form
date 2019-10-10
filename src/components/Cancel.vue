<template>
  <button class="cancel primary-background" v-on:click="go('home')">✕</button>
</template>

<script>
export default {
  props: { go: Function }
}
</script>

<style scoped>
  .cancel {
    font-weight: bold;
    font-size: 1rem;
    width: 2.25rem;
    height: 2.25rem;
    cursor: pointer;
    border: 0;
    border-radius: 100%;
  }
</style>
