<template>
  <div>
    <p class="body" v-if="body" v-html="body" />
    <Fields v-bind="$attrs" />
  </div>
</template>

<script>
import Fields from './Fields.vue'

export default {
  props: { body: String, type: String },
  components: { Fields }
}
</script>

<style scoped>
  .body {
    font-size: 1.5rem;
    margin: 0 0 4rem 0;
  }
</style>
