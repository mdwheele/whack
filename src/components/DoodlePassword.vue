<template>
  <div class="relative rounded-lg overflow-hidden">
    <!-- Toolbar -->
    <div class="absolute top-2 right-2">
      <button @click="nextBackdrop" title="Random Backdrop">
        <Icon name="refresh" class="w-6 h-6 text-white" />
      </button>
    </div>

    <canvas ref="canvas" width="300" height="300"></canvas>
  </div>
</template>

<script>
import { ref, computed, onMounted, watchEffect, onBeforeUnmount } from 'vue'

import Earth from '@/assets/doodles/earth.jpg'
import Tiger from '@/assets/doodles/tiger.jpg'

import Icon from 'vue-heroicon-next'

const backdrops = [Earth, Tiger]

export default {
  components: { Icon },
  
  props: {
    coverage: {
      type: Number,
      default: 150
    }
  },

  setup(props, { emit }) {
    const canvas = ref(null)
    const currentBackdropIndex = ref(0)
    const currentCoverage = ref(props.coverage)

    const coverageIsMet = computed(() => currentCoverage.value < 0)

    function nextBackdrop() {
      if (++currentBackdropIndex.value > backdrops.length - 1) {
        currentBackdropIndex.value = 0
      }
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
        }
      })

      function draw(x, y, dx, dy) {
        context.beginPath()

        context.lineWidth = 10
        context.lineCap = 'round'
        context.strokeStyle = 'pink'

        context.moveTo(x, y)
        context.lineTo(dx, dy)
        context.stroke()
        context.closePath()
        currentCoverage.value = currentCoverage.value - 1
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

        if (currentCoverage.value <= 0) {
          emit('finish', canvas.value.toDataURL())
        }
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
      nextBackdrop,
      coverageIsMet
    }
  }
}
</script>