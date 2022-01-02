<template>
  <div class="relative border">
    <!-- Toolbar -->
    <div class="absolute top-2 right-2">
      <button @click="randomBackdrop" title="Random Backdrop">
        <Icon name="refresh" class="w-6 h-6 text-white" />
      </button>
    </div>

    <canvas ref="canvas" width="300" height="300"></canvas>
  </div>
</template>

<script>
import { ref, onMounted, watchEffect, onBeforeUnmount } from 'vue'

import Earth from '@/assets/doodles/earth.jpg'
import Tiger from '@/assets/doodles/tiger.jpg'

import Icon from 'vue-heroicon-next'

const backdrops = [Earth, Tiger]

export default {
  components: { Icon },

  setup(props, { emit }) {
    const canvas = ref(null)
    const currentBackdropIndex = ref(0)

    function randomBackdrop() {
      currentBackdropIndex.value = Math.floor(Math.random() * backdrops.length)
    }
    
    onMounted(() => {
      const context = canvas.value.getContext('2d')
      let isDrawing = false
      let x, y = 0

      watchEffect(() => {
        const image = new Image()
        image.src = backdrops[currentBackdropIndex.value]
        image.onload = () => {
          context.drawImage(image, 0, 0, 300, 300)

          emit('finish', canvas.value.toDataURL())
        }
      })

      function draw(x, y, dx, dy) {
        context.beginPath()
        context.strokeStyle = 'pink'
        context.lineWidth = 5
        context.moveTo(x, y)
        context.lineTo(dx, dy)
        context.stroke()
        context.closePath()
      }

      function onMouseDown(e) {
        isDrawing = true
        x = e.offsetX
        y = e.offsetY
      }

      function onMouseMove(e) {
        if (isDrawing) {
          draw(x, y, e.offsetX, e.offsetY)
          x = e.offsetX
          y = e.offsetY
        }
      }

      function onMouseUp() {
        isDrawing = false
        x = y = null

        emit('finish', canvas.value.toDataURL())
      }

      canvas.value.addEventListener('mousedown', onMouseDown)
      canvas.value.addEventListener('mousemove', onMouseMove)
      canvas.value.addEventListener('mouseup', onMouseUp)

      onBeforeUnmount(() => {
        canvas.value.removeEventListener('mousedown', onMouseDown)
        canvas.value.removeEventListener('mousemove', onMouseMove)
        canvas.value.removeEventListener('mouseup', onMouseUp)
      })
    })

    return {
      canvas,
      randomBackdrop
    }
  }
}
</script>