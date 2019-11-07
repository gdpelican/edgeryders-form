<template>
  <Home v-if="on('home')"
    :locale="locale"
    :locales="locales"
    :setLocale="setLocale"
    :brand="brand"
    :slide="initialSlide"
    :go="go"
  />
  <Slides v-else-if="on('slides')" :messages="messages" :slides="slides" :go="go" />
</template>

<script>
import Home from './components/Home.vue'
import Slides from './components/Slides.vue'

const allLocales = require.context('.', true, /\.\/assets\/data\/.*\.json$/).keys()
  .map(path => path.replace('./assets/data/', '').replace('.json', ''))
  .reduce((result, locale) => (
    { ...result, [locale]: (() => require(`./assets/data/${locale}.json`))() }
  ), {})

export default {
  name: 'edgeryders-form',
  data: () => ({
    locale: 'en',
    page: 'home'
  }),
  methods: {
    go(page) { this.page = page },
    on(page) { return this.page === page },
    setLocale(locale) { this.locale = locale }
  },
  computed: {
    locales() { return Object.keys(allLocales) },
    data() { return allLocales[this.locale] },
    messages() { return this.data.messages },
    brand() { return this.data.brand },
    slides() { return this.data.slides.map(s => Object.assign({}, this.data.slideDefaults, s)) },
    initialSlide() { return this.slides[0] }
  },
  components: { Home, Slides }
}
</script>
