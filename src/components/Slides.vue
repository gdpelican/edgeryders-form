<template>
  <div class="slides">
    <div class="content">
      <Title class="even" v-bind="slide" />
      <Body class="even" v-bind="slide" />
      <Cancel :go="go" />
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
  props: { go: Function, slides: Array, defaults: Object },
  data: () => ({ currentIndex: 0 }),
  computed: {
    slide() { return Object.assign({}, this.defaults, this.slides[this.currentIndex]) },
    maxIndex() { return Math.max(...this.slides.map(slide => slide.index || 0)) }
  },
  methods: {
    back() {
      return this.currentIndex > 0
        ? () => this.currentIndex -= 1
        : null
    },
    next() {
      return this.slide.submit
        ? () => this.submit()
        : () => this.currentIndex += 1
    },
    submit() {
      console.log('hello!')
      this.currentIndex += 1
    }
  },
  components: { Title, Body, Cancel, Navigation },
}
</script>

<style scoped>
  .slides {
    margin: 3rem;
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
