<template>
  <div class="slides">
    <div class="content">
      <Title class="even" v-bind="slide" />
      <Body class="even" v-bind="slide" :errors="errors" :response="response" />
      <Cancel :go="go" />
    </div>
    <Navigation
      :back="back"
      :next="next"
      :maxIndex="maxIndex"
      v-bind="slide"
    />
  </div>
</template>

<script>
import Title      from './Title.vue'
import Body       from './Body.vue'
import Cancel     from './Cancel.vue'
import Navigation from './Navigation.vue'

export default {
  props: { go: Function, slides: Array, defaults: Object },
  data() { return { response: {}, errors: {}, currentIndex: 0 } },
  created() {
    this.slides
      .filter(s => s.index)
      .forEach(({ index, fields }) => {
        this.$set(this.response, index, {})
        fields.forEach(({ name }) => this.$set(this.response[index], name, ''))
      })
  },
  computed: {
    slide() { return Object.assign({}, this.defaults, this.slides[this.currentIndex]) },
    maxIndex() { return Math.max(...this.slides.map(slide => slide.index || 0)) },
    back() {
      return this.currentIndex > 0
        ? () => this.currentIndex -= 1
        : null
    },
    next() {
      return response => {
        this.errors = this.validate(response)
        if (Object.keys(this.errors).length > 0) { return }

        this.slide.submit
          ? this.submit().then(this.proceed)
          : this.proceed()
      }
    },
  },
  methods: {
    proceed() { this.currentIndex += 1 },
    validate() {
      const { index, fields, messages } = this.slide
      const response = this.response[index]
      if (!index || !fields) { return {} }

      return fields
        .filter(({ required, name }) => required && !response[name])
        .reduce((hash, { name }) => ({ ...hash, [name]: messages.empty }), {})
    },
    submit() {
      console.log(this.response)
      return new Promise(() => {})
    }
  },
  components: { Title, Body, Cancel, Navigation }
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
