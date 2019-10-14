<template>
  <p v-if="error" class="error">{{error}}</p>
</template>

<script>
export default {
  props: { error: String }
}
</script>

<style scoped>
  .error {
    color: red;
  }
</style>
