<template>
  <div>
    <h1 class="title" v-if="title">{{displayTitle}}</h1>
    <h3 class="subtitle" v-if="subtitle">{{subtitle}}</h3>
  </div>
</template>

<script>
export default {
  props: {
    index: Number,
    title: String,
    subtitle: String,
  },
  computed: {
    displayTitle() { return this.title.replace(/{{index}}/, this.index) }
  }
}
</script>

<style scoped>
  .title {
    margin-top: 0;
    max-width: 25rem;
  }

  .subtitle {
    margin-top: 0;
    max-width: 25rem;
  }
</style>
