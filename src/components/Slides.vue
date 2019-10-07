<template>
  <div id="slides">
    <keep-alive>
      <component v-bind:is="component" v-bind="slide" v-bind:maxIndex="maxIndex" />
    </keep-alive>
    <button v-show="canGoBack" v-on:click="back">Back</button>
    <button v-show="canGoNext" v-on:click="next">Next</button>
  </div>
</template>

<script>
import Form from './Form.vue'
import Info from './Info.vue'
import Question from './Question.vue'

export default {
  props: { slides: Array, defaults: Object },
  data() { return { currentIndex: 0 } },
  computed: {
    slide() { return Object.assign({}, this.defaults, this.slides[this.currentIndex]) },
    component() { return this.slide.type },
    canGoBack() { return this.currentIndex > 0 },
    canGoNext() { return this.currentIndex < this.slides.length },
    maxIndex() { return Math.max(...this.slides.map(slide => slide.index || 0)) }
  },
  methods: {
    next() { this.currentIndex += 1 },
    back() { this.currentIndex -= 1 }
  },
  components: { Form, Info, Question },
}
</script>
