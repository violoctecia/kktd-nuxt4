<template>
  <section class="relative mt-16 h-[80vh] min-h-[500px] overflow-hidden">
    <div class="absolute inset-0 bg-primary-dark/70 z-0"></div>

    <div
      v-for="(slide, index) in slides"
      :key="index"
      class="absolute inset-0 transition-opacity duration-1000"
      :class="index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'"
      :style="{ backgroundImage: `url(${slide.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }"
    ></div>

    <div class="relative z-20 flex flex-col items-center justify-center h-full text-center px-4 text-white">
      <h2 class="text-3xl md:text-5xl font-bold mb-4">{{ slides[currentSlide]?.title }}</h2>
      <p class="text-lg md:text-xl max-w-xl mb-6">{{ slides[currentSlide]?.subtitle }}</p>
      <a href="#programs" class="btn bg-primary-light text-primary-dark px-6 py-2 rounded font-bold relative inline-block min-w-[120px] hover:bg-white hover:-translate-y-1 hover:shadow-md transition-all">
        Узнать больше
      </a>
    </div>

    <button
      @click="prevSlide"
      class="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/30 hover:bg-white/70 text-white rounded-full w-10 h-10 flex items-center justify-center z-30"
    >
      ‹
    </button>
    <button
      @click="nextSlide"
      class="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/30 hover:bg-white/70 text-white rounded-full w-10 h-10 flex items-center justify-center z-30"
    >
      ›
    </button>

    <div class="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-30">
      <span
        v-for="(slide, index) in slides"
        :key="index"
        @click="goToSlide(index)"
        :class="index === currentSlide ? 'bg-white w-4 h-4 rounded-full' : 'bg-white/50 w-3 h-3 rounded-full cursor-pointer'"
      ></span>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue'

interface Slide {
  image: string
  title: string
  subtitle: string
}

const slides = ref<Slide[]>([
  {
    image: '/img/programmer.webp',
    title: 'Стань востребованным специалистом',
    subtitle: 'Практико-ориентированное обучение современным технологиям и отраслям мануфактуры'
  },
  {
    image: '/img/collage.webp',
    title: 'Развивай свои навыки',
    subtitle: 'Учись у экспертов и создавай реальные проекты'
  }
])

const currentSlide = ref(0)
let intervalId: number | undefined

const nextSlide = () => {
  if (!slides.value.length) return
  currentSlide.value = (currentSlide.value + 1) % slides.value.length
}

const prevSlide = () => {
  if (!slides.value.length) return
  currentSlide.value = (currentSlide.value - 1 + slides.value.length) % slides.value.length
}

const goToSlide = (index: number) => {
  if (!slides.value.length) return
  currentSlide.value = index
}

onMounted(() => {
  intervalId = window.setInterval(nextSlide, 5000)
})

onUnmounted(() => {
  clearInterval(intervalId)
})
</script>

<style scoped>
.btn::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 5px;
  height: 5px;
  background: rgba(255, 255, 255, 0.5);
  opacity: 0;
  border-radius: 100%;
  transform: scale(1, 1) translate(-50%, -50%);
  transform-origin: 50% 50%;
}
.btn:focus:not(:active)::after {
  animation: ripple 0.6s ease-out;
}
@keyframes ripple {
  0% {
    transform: scale(0, 0);
    opacity: 0.5;
  }
  100% {
    transform: scale(20, 20);
    opacity: 0;
  }
}
</style>
