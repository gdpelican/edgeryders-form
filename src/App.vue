<template>
  <Slides :defaults="defaults" :slides="slides" />
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
