<template>
  <div class="slides">
    <div class="content">
      <Title class="even" v-bind="slide" />
      <div class="even">
        <Body v-bind="slide" :response="response" :next="next" />
        <Fields v-bind="slide" :response="response" :next="next" />
        <Error :error="error" />
      </div>
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
import Title      from './Title'
import Body       from './Body'
import Fields     from './Fields'
import Error      from './Error'
import Cancel     from './Cancel'
import Navigation from './Navigation'
import submit     from '../helpers/discourse'

export default {
  props: { go: Function, slides: Array },
  data() { return { form: {}, currentIndex: 0, error: null } },
  created() {
    this.slides.filter(s => s.index).forEach(({ index, body, settings, fields }) => {
      this.$set(this.form, index, { body, settings })
      fields.forEach(({ name, settings = {} }) => {
        this.$set(this.form[index], name, { settings })
        this.$set(this.form[index][name], 'value', '')
        this.$set(this.form[index][name], 'error', '')
      })
    })
  },
  computed: {
    slide()    { return this.slides[this.currentIndex] },
    response() { return this.form[this.slide.index] || {} },
    maxIndex() { return Math.max(...this.slides.map(slide => slide.index || 0)) },
    back()     { return this.currentIndex > 0 ? this.retreat : null },
    next()     { return () => (
      this.slide.submit
        ? this.validate() && submit(this.form).then(this.proceed, this.fail)
        : this.proceed()
    )}
  },
  methods: {
    retreat() { this.currentIndex -= 1 },
    proceed() { this.currentIndex += 1 },
    fail(failure) { this.error = failure },
    validate() {
      const { index, fields } = this.slide
      if (!index || !fields) { return true }

      fields.forEach(({ name, required, error }) => (
        this.response[name].error = (required && !this.response[name].value) ? error : null
      ))

      return Object.values(this.response).every(({ error }) => !error)
    }
  },
  components: { Title, Body, Fields, Error, Cancel, Navigation }
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

  .content {
    display: flex;
  }

  .even {
    flex-basis: 50%;
    margin-right: 2rem;
  }
</style>
