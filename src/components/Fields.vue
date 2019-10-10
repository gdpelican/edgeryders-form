<template>
  <ul v-if="fields">
    <Field
      v-for="field in fields"
      :key="field.name"
      :response="response"
      :next="next"
      v-bind="field"
    />
  </ul>
</template>

<script>
import Field from './Field'

export default {
  props: { response: Object, fields: Array, next: Function },
  components: { Field }
}
</script>
