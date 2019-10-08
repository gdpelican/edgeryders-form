<template>
  <div>
    <p class="body" v-if="body" v-html="body" />
    <component v-if="type != 'info'" v-bind="$attrs" :is="type" />
  </div>
</template>

<script>
import Inputs   from '../formComponents/Inputs.vue'
import Question from '../formComponents/Question.vue'

export default {
  props: { body: String, type: String },
  components: { Inputs, Question }
}
</script>

<style scoped>
  .body {
    font-size: 1.5rem;
    margin: 0 0 4rem 0;
  }
</style>
