<template>
  <ul>
    <li :class="classFor(field)" v-for="field in fields" :key="field.name">
      <input :id="field.name" class="input" v-bind="field" v-model="field.response" />
      <label v-if="showLabel(field)" :for="field.name">{{field.placeholder}}</label>
    </li>
  </ul>
</template>

<script>
export default {
  props: { fields: Array },
  methods: {
    classFor(field) { return field.half ? `half ${field.type}` : `full ${field.type}` },
    showLabel(field) { return field.type === 'checkbox' }
  }
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
</style>
