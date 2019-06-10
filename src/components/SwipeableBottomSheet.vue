<template>
  <div
    ref="wrapper"
    class="wrapper"
    :data-state="isMove ? 'move' : state"
    :style="{ top: `${isMove ? y : calcY()}px` }"
  >
    <div class="pan-area" ref="pan"><div class="bar" ref="bar"></div></div>

    <div>
      <h1> Contents </h1>
    </div>
  </div>
</template>

<script>
import Hammer from "hammerjs"

export default {
  data() {
    return {
      mc: null,
      y: 0,
      startY: 0,
      isMove: false,
      state: "half",
      rect: {}
    }
  },
  mounted () {
    this.rect = this.$refs.wrapper.getBoundingClientRect()

    this.y = this.rect.height * 0.8


    this.mc = new Hammer(this.$refs.pan)
    this.mc.get('pan').set({ direction: Hammer.DIRECTION_ALL })

    this.mc.on("panup pandown", (evt) => {
      this.y = evt.center.y - 16
    })

    this.mc.on("panstart", (evt) => {
      this.startY = evt.center.y
      this.isMove = true
    })

    this.mc.on("panend", (evt) => {
      this.isMove = false

      switch (this.state) {
        case "half":
          if (this.startY - evt.center.y > 120) {
            this.state = "open"
          }

          if (this.startY - evt.center.y < -50) {
            this.state = "close"
          }
          break;
        case "open":
          if (this.startY - evt.center.y < -120) {
            this.state = "half"
          }
          break;
      }
    })
  },
  methods: {
    calcY () {
      switch (this.state) {
        case "close":
          return this.rect.height
        case "open":
          return this.rect.height * 0.13
        case "half":
          return this.rect.height * 0.8
        default:
          return this.y
      }
    },
    setState (state) {
      this.state = state
    }
  }
}
</script>

<style scoped>
.wrapper {
  width: 100%;
  height: 100vh;
  border: 3px solid black;
  position: fixed;
  background: white;
  left: 0;
}

.wrapper[data-state="half"], .wrapper[data-state="open"], .wrapper[data-state="close"] {
  transition: top .3s ease-out;
}

.bar {
  width: 45px;
  height: 12px;
  border-radius: 14px;
  background: rgba(0, 0, 0, .3);
  margin: 14px auto;
  cursor: pointer;
}
</style>
