<template>
  <div class="home">
    <div class="top">
      <Title v-bind="slide" />
    </div>
    <div class="bottom secondary-background">
      <img class="logo" :src="brand.imageSrc" :alt="brand.title" />
      <Navigation :nextText="brand.beginText" :next="next" />
    </div>
  </div>
</template>

<script>
import Title from './Title'
import Navigation from './Navigation'

export default {
  props: { brand: Object, go: Function, slide: Object },
  computed: {
    next() { return () => this.go('slides') }
  },
  components: { Title, Navigation }
}
</script>

<style scoped>
  .home {
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 100%;
  }

  .top {
    padding: 3rem;
    flex-grow: 1;
  }

  .top-content {
    max-width: 20rem;
  }

  .bottom {
    padding: 3rem;
    display: flex;
    flex-grow: 1;
    align-items: flex-end;
    justify-content: space-between;
    color: white;
  }

  .logo {
    max-width: 20rem;
  }
</style>
