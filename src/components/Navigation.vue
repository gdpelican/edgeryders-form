<template>
  <div class="navigation flex">
    <div v-if="!allowBack" />
    <button :title="backTitle" class="navigate primary-background" v-if="allowBack" v-on:click="back">{{backText}}</button>
    <Progress :index="index" :maxIndex="maxIndex" />
    <button :title="nextTitle" class="navigate primary-background" v-if="allowNextButton" v-on:click="next">{{nextText}}</button>
    <a class="navigate primary-background" v-if="allowNextLink" :href="nextUrl" target="_blank">{{nextText}}</a>
  </div>
</template>

<script>
import Progress from './Progress'

export default {
  props: {
    back: Function,
    backText: String,
    backTitle: String,
    next: Function,
    nextText: String,
    nextTitle: String,
    nextUrl: String,
    index: Number,
    maxIndex: Number,
  },
  computed: {
    allowBack() { return this.back && this.backText },
    allowNextLink() { return this.next && this.nextText && this.nextUrl },
    allowNextButton() { return this.next && this.nextText && !this.nextUrl }
  },
  components: { Progress }
}
</script>

<style scoped>
  .flex {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
  }

  .navigate {
    border: 0;
    padding: 0.75rem 3rem;
    color: black;
    border-radius: 2rem;
    font-size: 1rem;
    cursor: pointer;
    text-decoration: none;
    font-family: sans-serif;
  }
</style>
