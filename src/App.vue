<template>
  <Home v-if="on('home')" :slide="initialSlide" :go="go" />
  <Slides v-else-if="on('slides')" :defaults="defaults" :slides="slides" :go="go" />
</template>

<script>
import Home from './components/Home.vue'
import Slides from './components/Slides.vue'
import { defaults, slides } from './assets/locales/form.en.json'

export default {
  name: 'edgeryders-form',
  data: () => ({ defaults, slides, page: 'home' }),
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
