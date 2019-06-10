<template>
  <div :data-state="state" class="wrapper" ref="wrapper" :style="{ top: `${y}px`, left: `${x}px` }">
    <div class="card">
      <div class="bar" ref="bar"></div>
    </div>
  </div>
</template>

<script>
import Hammer from "hammerjs"

export default {
  data() {
    return {
      mc: null,
      x: 0,
      y: 0,
      startY: 0,
      state: "half"
    }
  },
  mounted () {
    const rect = this.$refs.wrapper.getBoundingClientRect()
    this.y = rect.height - 120
    this.mc = new Hammer(this.$refs.bar)
    this.mc.get('pan').set({ direction: Hammer.DIRECTION_ALL })
    this.mc.on("panup pandown", (evt) => {
      this.y = evt.center.y
    })

    this.mc.on("panstart", (evt) => {
      console.log(evt)
      this.startY = evt.center.y
      this.state = "move"
    })

    this.mc.on("panend", (evt) => {
      console.log(this.startY - evt.center.y)
      if (this.startY - evt.center.y > 120) {
        this.state = "open"
      }

      if (this.startY - evt.center.y < -120) {
        this.state = "half"
      }

    })
  }
}
</script>

<style>
.wrapper {
  width: 100%;
  height: 100vh;
  border: 3px solid black;
  position: absolute;
}

.wrapper[data-state="open"] {
  top: 30px !important;
  transition: top .3s ease-out;
}

.wrapper[data-state="half"] {
  top: 652px !important;
  transition: top .3s ease-out;
}

.bar {
  width: 45px;
  height: 20px;
  border-radius: 14px;
  background: black;
  margin: 14px auto;
  cursor: pointer;
}
</style>
