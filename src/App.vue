<template>
  <Home v-if="on('home')" :brand="brand" :slide="initialSlide" :go="go" />
  <Slides v-else-if="on('slides')" :slides="slides" :go="go" />
</template>

<script>
import Home from './components/Home.vue'
import Slides from './components/Slides.vue'
import data from './assets/locales/data.en.json'

const { slides, defaults, brand } = data

export default {
  name: 'edgeryders-form',
  data: () => ({
    page: 'home',
    brand,
    slides: data.slides.map(s => Object.assign({}, defaults[s.type], s))
  }),
  methods: {
    go(page) { this.page = page },
    on(page) { return this.page === page }
  },
  computed: {
    initialSlide() { return this.slides[0] }
  },
  components: { Home, Slides }
}
</script>
