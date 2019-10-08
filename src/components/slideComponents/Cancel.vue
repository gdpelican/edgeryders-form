<template>
  <button class="cancel primary-background" v-if="cancel" v-on:click="cancel">✕</button>
</template>

<script>
export default {
  props: { cancel: Function }
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
