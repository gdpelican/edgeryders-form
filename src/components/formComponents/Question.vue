<template>
  <textarea
    class="textarea"
    :name="fieldName"
    :placeholder="placeholder"
    v-model="response"
  />
</template>

<script>

export default {
  props: {
    placeholder: String,
    fieldName: String,
    response: String
  }
}
</script>

<style scoped>
  .textarea {
    padding: 0.4rem;
    width: 100%;
    box-sizing: border-box;
    font-size: 16px;
    border-radius: 2px;
    min-height: 10rem;
  }
</style>
