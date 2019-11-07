<template>
  <button v-on:click="setLocale(locale)" :class="{
    'locale': true,
    'primary-background': active,
    'secondary-background': !active,
    'primary': !active,
    'secondary': active,
    active
  }">{{locale}}</button>
</template>

<script>
export default {
  props: { locale: String, current: String, setLocale: Function },
  computed: {
    active() { return this.locale === this.current }
  }
}
</script>

<style scoped lang="scss">
  .locale {
    &:first-of-type {
      border-radius: 0.25rem 0 0 0.25rem;
    }
    &:last-of-type {
      border-radius: 0 0.25rem 0.25rem 0;
    }

    border: 0;
    border-radius: 0.25rem;
    text-transform: uppercase;
    font-size: 0.8rem;
    padding: 1rem;
    opacity: 0.15;
    cursor: pointer;
  }

  .active {
    opacity: 1;
  }
</style>
