<template>
  <div class="font-sans text-neutral-700">
    <div id="command-bar" class="fixed z-999 bottom-4 right-4">
      <div
        class="bg-neutral-800 text-white flex flex-col items-center justify-center rounded-xl p-1">
        <button @click="() => setScrollStep(scrollStep - 1)">
          <ChevronUpIcon
            class="w-4 h-4"
            :class="[scrollStep < 0 ? 'text-white' : 'text-neutral-700']"
            :style="{ opacity: scrollStep < 0 ? -0.3 * scrollStep : 1 }" />
        </button>
        <button @click="playPauseScroll">
          <PauseCircleIcon
            v-if="scrollStep === 0 && storedScrollStep !== 0"
            class="w-6 h-6" />
          <MouseIcon v-else="scrollStep === 0" class="w-6 h-6" />
        </button>
        <button @click="() => setScrollStep(scrollStep + 1)">
          <ChevronDownIcon
            class="w-4 h-4"
            :class="[scrollStep > 0 ? 'text-white' : 'text-neutral-700']"
            :style="{ opacity: scrollStep > 0 ? 0.3 * scrollStep : 1 }" />
        </button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/vue/16/solid'
import { PauseCircleIcon } from '@heroicons/vue/24/outline'
import { ref } from 'vue'
import MouseIcon from '@/components/MouseIcon.vue'

function handleKey(event: KeyboardEvent) {
  if (event.key === 'ArrowDown') {
    event.preventDefault()
    storedScrollStep.value = 0
    setScrollStep(scrollStep.value + 1)
  } else if (event.key === 'ArrowUp') {
    event.preventDefault()
    storedScrollStep.value = 0
    setScrollStep(scrollStep.value - 1)
  } else if (event.key === ' ') {
    event.preventDefault()
    playPauseScroll()
  } else if (event.key === 'Escape') {
    setScrollStep(0)
  }
}

function playPauseScroll() {
  if (scrollStep.value !== 0) {
    storedScrollStep.value = scrollStep.value
    setScrollStep(0)
  } else {
    setScrollStep(storedScrollStep.value)
  }
}

let interval: any
const scrollStep = ref(0)
const storedScrollStep = ref(0)
function setScrollStep(step: number) {
  scrollStep.value = step
  if (interval) {
    clearInterval(interval)
  }
  if (step !== 0) {
    interval = setInterval(() => {
      window.scrollBy(0, step)
      // Stop when scrolled to top
      if (window.scrollY === 0 && step < 0) {
        setScrollStep(0)
      }
      // Stop when scrolled to bottom
      if (
        window.innerHeight + window.scrollY >= document.body.scrollHeight &&
        step > 0
      ) {
        setScrollStep(0)
      }
    })
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKey)
})

onBeforeUnmount(() => {
  if (interval) clearInterval(interval)
  document.removeEventListener('keydown', handleKey)
})
</script>
