<template>
  <div>
    <h1 v-if="title">{{title}}</h1>
    <h3 v-if="subtitle">{{subtitle}}</h3>
    <p v-if="body">{{body}}</p>
  </div>
</template>

<script>
import common from './common.js'

export default Object.assign({}, common, {
  props: {
    title: String,
    subtitle: String,
    body: String
  }
})
</script>
