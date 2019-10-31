<template>
  <button :class="{
    cancel: true,
    'primary': this.invert,
    'primary-background': !this.invert,
    'secondary': !this.invert,
    'secondary-background': this.invert
  }" :title="title" v-on:click="go('home')">✕</button>
</template>

<script>
export default {
  props: { go: Function, title: String, invert: Boolean }
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
    margin: 0;
    padding: 0;
    border-radius: 100%;
  }
</style>
