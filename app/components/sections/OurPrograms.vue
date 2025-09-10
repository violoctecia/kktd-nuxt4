<template>
    <section id="programs" class="container pt-16 md:pt-24">
        <h2 class="h2">Наши программы</h2>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-x-4 sm:gap-y-8 lg:grid-cols-3">
            <MainCard
                v-for="item in items"
                :key="item.alt"
                :img-src="item.img"
                :img-alt="item.alt"
                :href-text="item.title"
                :href="item.href"
                :title="item.title"
                card-title-tag="h3"
            >
                <template #content>
                    <p class="mt-auto text-sm leading-4 text-black/80 md:text-base md:leading-5" itemprop="description">
                        {{ item.text }}
                    </p>
                </template>
            </MainCard>
        </div>
    </section>
</template>

<script setup lang="ts">
import MainCard from '~/components/ui/MainCard.vue';

interface Program {
    img: string;
    alt: string;
    title: string;
    text: string;
    href: string;
}

const items: Program[] = [
    {
        img: '/img/image_04.webp',
        alt: 'Конструирование',
        title: 'Конструирование, моделирование и технология изделий легкой промышленности (29.02.10)',
        text: 'Обучение современным языкам программирования и методологиям разработки программного обеспечения.',
        href: '/09-02-07/#specialty-2910',
    },
    {
        img: '/img/418.webp',
        alt: 'Кибербезопасность',
        title: 'Обеспечение информационной безопасности телекоммуникационных систем (10.02.04)',
        text: 'Подготовка специалистов по защите информации и противодействию киберугрозам.',
        href: '/09-02-07/#specialty-100204',
    },
    {
        img: '/img/negr.webp',
        alt: 'Анализ данных',
        title: 'Торговое дело (38.02.08)',
        text: 'Обучение методам анализа больших данных, машинного обучения и искусственного интеллекта.',
        href: '/09-02-07/#specialty-380208',
    },
    {
        img: '/img/bugalter.webp',
        alt: 'Экономика и бухучет',
        title: 'Экономика и бухгалтерский учет (по отраслям) (38.02.01)',
        text: 'Подготовка специалистов по бухгалтерскому учету и финансовому анализу.',
        href: '/09-02-07/#specialty-380201',
    },
    {
        img: '/img/prog.webp',
        alt: 'Программирование',
        title: 'Информационные системы и программирование (09.02.07)',
        text: 'Подготовка специалистов по разработке и поддержке информационных систем.',
        href: '/09-02-07/#specialty-090207',
    },
    {
        img: '/img/koja.webp',
        alt: 'Технология кожи и меха',
        title: 'Технология кожи и меха (29.02.02)',
        text: 'Обучение технологиям обработки кожи и меха для производства высококачественных изделий.',
        href: '/09-02-07/#specialty-290202',
    },
    {
        img: '/img/tekstil.webp',
        alt: 'Технология текстильных изделий',
        title: 'Технология текстильных изделий (29.02.05)',
        text: 'Подготовка специалистов по производству и обработке текстильных материалов.',
        href: '/09-02-07/#specialty-290205',
    },
    {
        img: '/img/stanok.webp',
        alt: 'Оператор швейного производства',
        title: 'Оператор оборудования швейного производства (по видам) (29.01.34)',
        text: 'Обучение работе на швейном оборудовании и производству одежды.',
        href: '/09-02-07/#specialty-290134',
    },
    {
        img: '/img/ecology.webp',
        alt: 'Экологическая безопасность',
        title: 'Экологическая безопасность природных комплексов (20.02.01)',
        text: 'Подготовка специалистов по охране окружающей среды и экологии.',
        href: '/09-02-07#specialty-200201',
    },
];
</script>

<style scoped></style>
