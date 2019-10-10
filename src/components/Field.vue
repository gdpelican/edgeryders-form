<template>
  <li :class="klass">
    <textarea
      v-if="isTextarea"
      class="textarea"
      :placeholder="placeholder"
      v-model="response[name].value"
    />
    <label class="label" v-else>
      <input
        :id="name"
        class="input"
        :placeholder="placeholder"
        :type="type"
        v-model="response[name].value"
      />
      <span v-if="showLabel">{{placeholder}}</span>
    </label>
    <p v-if="error" class="error">{{error}}</p>
  </li>
</template>

<script>
export default {
  props: {
    response: Object,
    type: String,
    name: String,
    half: Boolean,
    placeholder: String
  },
  computed: {
    error() { return this.response[this.name].error },
    klass() { return `${this.half ? 'half' : 'full'} ${this.type}` },
    isTextarea() { return this.type === 'textarea' },
    showLabel() { return this.type === 'checkbox' }
  }
}
</script>

<style lang="scss" scoped>
  .half {
    float: left;
    width: 50%;

    &:nth-child(2) .input { border-left: 1px solid; }
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
    display: block;

    .label { display: flex; }
    .input {
      width: auto;
      margin-right: 1rem;
    }
  }

  .error {
    color: red;
  }
</style>
