<template>
  <ul :class="className" v-if="index">
    <li v-for="dot in dots" :key="dot">
      <div class="dot complete" v-if="dot < index"></div>
      <div class="dot incomplete" v-else></div>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    index: Number,
    maxIndex: Number,
    mobile: Boolean
  },
  computed: {
    className() { return this.mobile ? 'dots mobile' : 'dots' },
    dots() { return [...Array(this.maxIndex).keys()] }
  }
}
</script>

<style scoped lang="scss">
.dots-mobile { display: none; }

.dots {
  display: flex;

  &.mobile { display: none; }
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

@media (max-width: 768px) {
  .dots {
    display: none;

    &.mobile {
      display: flex;
      padding: 2rem 1rem;
      flex-grow: 1;
      justify-content: center;
      align-items: flex-end;
    }
  }

  .dot {
    width: 1.5rem;
    height: 1.5rem;
  }
}
</style>
