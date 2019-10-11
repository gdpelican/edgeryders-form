<template>
  <p class="body" v-if="body" v-html="body" />
</template>

<script>
export default {
  props: { body: String },
}
</script>

<style scoped>
  .body {
    font-size: 1.5rem;
    margin: 0 0 4rem 0;
  }
</style>
