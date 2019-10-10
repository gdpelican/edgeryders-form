<template>
  <div class="slides">
    <div class="content">
      <Title class="even" v-bind="slide" />
      <Body class="even" v-bind="slide" :response="response" />
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
  props: { go: Function, slides: Array },
  data() { return { form: {}, currentIndex: 0 } },
  created() {
    this.slides
      .filter(s => s.index)
      .forEach(({ index, fields }) => {
        this.$set(this.form, index, {})
        fields.forEach(({ name }) => {
          this.$set(this.form[index], name, {})
          this.$set(this.form[index][name], 'value', '')
          this.$set(this.form[index][name], 'error', '')
        })
      })
  },
  computed: {
    slide() { return this.slides[this.currentIndex] },
    response() { return this.form[this.slide.index] || {} },
    maxIndex() { return Math.max(...this.slides.map(slide => slide.index || 0)) },
    isValid() { return Object.values(this.response).every(({ error }) => !error) },
    back() {
      return this.currentIndex > 0
        ? () => this.currentIndex -= 1
        : null
    },
    next() {
      return () => {
        this.validate()
        if (!this.isValid) { return }

        this.slide.submit
          ? this.submit().then(this.proceed)
          : this.proceed()
      }
    },
  },
  methods: {
    proceed() { this.currentIndex += 1 },
    validate() {
      const { index, fields } = this.slide
      if (!index || !fields) { return {} }

      fields.forEach(({ name, required, error }) => (
        this.response[name].error = (required && !this.response[name].value) ? error : null
      ))
    },
    submit() {
      console.log(this.form)
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
