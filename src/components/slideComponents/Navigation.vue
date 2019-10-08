<template>
  <div class="flex">
    <div v-if="!allowBack" />
    <button class="navigate primary-background" v-if="allowBack" v-on:click="back">{{backText}}</button>
    <ul class="dots" v-if="index">
      <li v-for="dot in dots" :key="dot">
        <div class="dot complete" v-if="dot < index"></div>
        <div class="dot incomplete" v-else></div>
      </li>
    </ul>
    <button class="navigate primary-background" v-if="allowNextButton" v-on:click="next">{{nextText}}</button>
    <a class="navigate primary-background" v-if="allowNextLink" :href="nextUrl" target="_blank">{{nextText}}</a>
  </div>
</template>

<script>
export default {
  props: {
    back: Function,
    backText: String,
    next: Function,
    nextText: String,
    nextUrl: String,
    index: Number,
    maxIndex: Number,
  },
  computed: {
    allowBack() { return this.back && this.backText },
    allowNextLink() { return this.nextText && this.nextUrl },
    allowNextButton() { return this.next && this.nextText && !this.nextUrl },
    dots() { return [...Array(this.maxIndex).keys()] }
  }
}
</script>

<style scoped lang="scss">
  .flex {
    display: flex;
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

  .dots {
    display: flex;
  }

  .dot {
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    margin: 0 0.5rem;
  }

  .completed {
    background: black;
  }
</style>
