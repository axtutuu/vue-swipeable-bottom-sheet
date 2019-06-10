<template>
  <div>
    <h1>Example</h1>
    <button @click="open">Open</button>
    <button @click="half">Half</button>
    <button @click="close">Close</button>
    <swipeable-bottom-sheet ref="swipeableBottomSheet" />
  </div>
</template>

<script>
import { SwipeableBottomSheet } from '../src';

export default {
  components: {
    SwipeableBottomSheet
  },
  methods: {
    half () {
      this.$refs.swipeableBottomSheet.setState("half")
    },
    open () {
      this.$refs.swipeableBottomSheet.setState("open")
    },
    close () {
      this.$refs.swipeableBottomSheet.setState("close")
    }
  }
}
</script>
