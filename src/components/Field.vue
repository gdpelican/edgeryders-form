<template>
  <li :class="klass">
    <textarea
      v-if="isTextarea"
      class="textarea"
      :placeholder="placeholder"
      v-model="response[index][name]"
    />
    <input
      v-else
      :id="name"
      class="input"
      :placeholder="placeholder"
      v-model="response[index][name]"
    />
    <label v-if="showLabel" :for="name">{{placeholder}}</label>
    <p v-if="errors[name]" class="error">{{errors[name]}}</p>
  </li>
</template>

<script>
export default {
  props: {
    response: Object,
    errors: Object,
    type: String,
    index: Number,
    name: String,
    half: Boolean,
    type: String,
    placeholder: String
  },
  computed: {
    klass() { return this.half ? `half ${this.type}` : `full ${this.type}` },
    isTextarea() { return this.type === 'textarea' },
    showLabel() { return this.type === 'checkbox' }
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
