<template>
  <img class="diagram" v-if="src" :src="src" :alt="alt" />
</template>

<script>
export default {
  props: { src: String, alt: String }
}
</script>

<style lang="scss">
  .diagram {
    max-width: 100%;
    margin: 1rem 0;
  }
</style>
