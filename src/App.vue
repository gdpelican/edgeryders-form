<template>
  <div id="app">
    <Slides v-bind:defaults="defaults" v-bind:slides="slides" />
  </div>
</template>

<script>
import Slides from './components/Slides.vue'
import { defaults, slides } from './assets/locales/form.en.json'

export default {
  name: 'edgeryders-form',
  components: { Slides },
  data: () => ({ defaults, slides })
}
</script>
