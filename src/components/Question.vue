<template>
  <div>
    <h1 v-if="displayTitle">{{displayTitle}}</h1>
    <h3 v-if="subtitle">{{subtitle}}</h3>
    <p v-if="body">{{body}}</p>
    <textarea :name="fieldName" :placeholder="placeholder" />
    <ul>
      <li v-for="dot in dots">
        <span v-if="dot < index">*</span>
        <span v-else>·</span>
      </li>
    </ul>
  </div>
</template>

<script>
import common from './common.js'

export default Object.assign({}, common, {
  props: {
    title: String,
    subtitle: String,
    body: String,
    placeholder: String,
    index: Number,
    maxIndex: Number,
  },
  computed: {
    displayTitle() { return this.title.replace(/{{index}}/, this.index) },
    fieldName() { return `question${this.index}` },
    dots() { return [...Array(this.maxIndex).keys()] }
  }
})
</script>
