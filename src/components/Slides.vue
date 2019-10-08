<template>
  <div class="slides">
    <div class="content">
      <Title class="even" v-bind="slide" />
      <Body class="even" v-bind="slide" />
      <Cancel :cancel="cancel()" />
    </div>
    <Navigation
      :back="back()"
      :next="next()"
      :maxIndex="maxIndex"
      v-bind="slide"
    />
  </div>
</template>

<script>
import Title      from './slideComponents/Title.vue'
import Body       from './slideComponents/Body.vue'
import Cancel     from './slideComponents/Cancel.vue'
import Navigation from './slideComponents/Navigation.vue'

export default {
  props: { slides: Array, defaults: Object },
  data: () => ({ currentIndex: 0 }),
  computed: {
    slide() { return Object.assign({}, this.defaults, this.slides[this.currentIndex]) },
    maxIndex()  { return Math.max(...this.slides.map(slide => slide.index || 0)) },
  },
  methods: {
    cancel() {
      return this.currentIndex > 0
        ? () => this.currentIndex = 0
        : null
    },
    back() {
      return this.currentIndex > 0
        ? () => this.currentIndex -= 1
        : null
    },
    next() {
      return this.currentIndex < this.slides.length - 1
        ? () => this.currentIndex += 1
        : this.submit
    },
    submit() {
      // console.log('hello!')
    }
  },
  components: { Title, Body, Cancel, Navigation },
}
</script>

<style scoped>
  .slides {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .content { display: flex; }

  .even {
    flex-basis: 50%;
    margin-right: 2rem;
  }
</style>
