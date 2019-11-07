<template>
  <div :class="{ slides: true, 'primary-background': slide.settings.invert }">
    <div class="content">
      <Title class="even" v-bind="slide" />
      <div class="even">
        <Body v-bind="slide" :response="response" :next="next" />
        <Diagram v-bind="slide.diagram" />
        <Fields v-bind="slide" :response="response" :next="next" />
        <Error v-for="error in errors" :key="error" :error="error" />
      </div>
      <Cancel :go="go" :title="slide.cancelTitle" :invert="slide.settings.invert" />
    </div>
    <Progress :index="slide.index" :maxIndex="maxIndex" mobile />
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
import Diagram    from './Diagram'
import Fields     from './Fields'
import Error      from './Error'
import Cancel     from './Cancel'
import Progress   from './Progress'
import Navigation from './Navigation'
import submit     from '../helpers/discourse'

export default {
  props: { go: Function, slides: Array, messages: Object },
  data() { return { form: {}, currentIndex: 0, errors: [] } },
  created() {
    this.slides.filter(s => s.index).forEach(({ index, body, settings, fields }) => {
      this.$set(this.form, index, { body, settings })
      fields.forEach(({ name, settings = {} }) => {
        this.$set(this.form[index], name, { settings })
        this.$set(this.form[index][name], 'value', '')
        this.$set(this.form[index][name], 'error', '')
      })
    })

    document.addEventListener('keyup', ({ keyCode }) => {
      switch(keyCode) {
        case 37: return this.back ? this.back() : null
        case 39: return this.next ? this.next() : null
      }
    })
  },
  computed: {
    slide()    { return this.slides[this.currentIndex] },
    response() { return this.form[this.slide.index] || {} },
    maxIndex() { return Math.max(...this.slides.map(slide => slide.index || 0)) },
    back()     { return this.currentIndex > 0 ? this.retreat : null },
    next()     { return () => (
      this.slide.submit
        ? this.validate() && submit(this.form, this.messages).then(this.proceed, this.fail)
        : this.validate() && this.proceed()
    )}
  },
  methods: {
    retreat() { this.currentIndex -= 1 },
    proceed() { this.currentIndex += 1 },
    fail(errors) { this.errors = errors },
    validate() {
      this.errors = []
      const { index, fields } = this.slide
      if (!index || !fields) { return true }

      fields.forEach(({ name, required, error }) => (
        this.response[name].error = (required && !this.response[name].value) ? error : null
      ))

      return Object.values(this.response).every(({ error }) => !error)
    }
  },
  components: { Title, Body, Diagram, Fields, Error, Cancel, Progress, Navigation }
}
</script>

<style scoped lang="scss">
  .slides {
    padding: 3rem;
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

  @media (max-width: 768px) {
    .slides { padding: 2rem; }

    .content { flex-direction: column; }

    .cancel {
      position: absolute;
      top: 2rem;
      right: 2rem;
    }
  }
</style>
