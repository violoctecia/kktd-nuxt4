<template>
  <main>
    <HeroBlock />
    <AboutBlock />
    <OurPrograms />
    <OurAdvantages />
    <section class="container pt-16 md:pt-24">
      <h2 class="h2">Последние новости</h2>
      <NewsList :items="newsItems" tag="h3" />
      <MainButton href="/news" class="mx-auto mt-8 w-fit">Все новости</MainButton>
    </section>
  </main>
</template>

<script setup lang="ts">
import AboutBlock from '~/components/sections/AboutBlock.vue'
import NewsList from '~/components/sections/NewsList.vue'
import OurAdvantages from '~/components/sections/OurAdvantages.vue'
import OurPrograms from '~/components/sections/OurPrograms.vue'
import MainButton from '~/components/ui/MainButton.vue'
import HeroBlock from '~/components/sections/HeroBlock.vue'

useHead({
  title: 'Казанский Колледж Технологии и Дизайна | Профессиональное образование',
})

const newsItems = [
  {
    img: '/img/hackathon.webp',
    alt: 'Хакатон',
    date: '15 октября 2023',
    title: 'IT-Хакатон "Код будущего"',
    text: 'Приглашаем студентов принять участие в ежегодном хакатоне с призовым фондом 300 000 рублей.',
    href: '/news',
  },
  {
    img: '/img/lecture.webp',
    alt: 'Лекция',
    date: '8 октября 2023',
    title: 'Открытая лекция по квантовым вычислениям',
    text: 'Ведущий исследователь компании QTech проведет лекцию о перспективах квантовых технологий.',
    href: '/news',
  },
  {
    img: '/img/meeting.webp',
    alt: 'Выпускники',
    date: '1 октября 2023',
    title: 'Встреча с успешными выпускниками',
    text: 'Выпускники колледжа поделятся своим опытом построения карьеры в IT-индустрии.',
    href: '/news',
  },
]
</script>
