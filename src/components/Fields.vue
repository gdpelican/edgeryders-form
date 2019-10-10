<template>
  <ul v-if="fields">
    <Field
      v-for="field in fields"
      :key="field.name"
      :errors="errors"
      :response="response"
      :index="index"
      v-bind="field"
    />
  </ul>
</template>

<script>
import Field from './Field'

export default {
  props: {
    response: Object,
    errors: Object,
    index: Number,
    fields: Array
  },
  components: { Field }
}
</script>

<style scoped>
  .half {
    float: left;
    width: 50%;
  }

  .half:nth-child(2) .input {
    border-left: 1px solid;
  }

  .textarea {
    padding: 0.4rem;
    width: 100%;
    box-sizing: border-box;
    font-size: 16px;
    border-radius: 2px;
    min-height: 10rem;
  }

  .input {
    width: 100%;
    padding: 1rem 0.5rem;
    border: 0px solid black;
    border-top: 1px solid;
    border-bottom: 1px solid;
    font-size: 14px;
    margin-bottom: -1px;
  }

  .checkbox {
    margin: 2rem 0;
    display: flex;
    justify-content: flex-end;
  }

  .input[type=checkbox] {
    width: auto;
  }

  .error {
    color: red;
  }
</style>
