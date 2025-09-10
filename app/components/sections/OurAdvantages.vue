<template>
    <section class="mt-8 bg-secondary md:mt-12">
        <div class="container py-8 text-background md:py-16">
            <h2 class="h2 !text-background">Почему выбирают нас</h2>
            <div class="flex flex-wrap gap-x-2 gap-y-4">
                <div v-for="(item, idx) in items" :key="idx" class="feature-item flex flex-1 flex-col items-center text-center">
                    <IconSprite :name="item.icon" class="h-12 text-primaryLight" />
                    <h3 class="my-4 text-base font-bold md:text-lg">{{ item.title }}</h3>
                    <p class="max-w-xs text-sm md:text-base">{{ item.text }}</p>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import IconSprite from '~/components/IconSprite.vue';

const items = [
    {
        icon: 'laptop-code-solid-full',
        title: 'Современные технологии',
        text: 'Обучение на актуальном оборудовании с использованием современных технологий и инструментов разработки.',
    },
    {
        icon: 'briefcase-solid-full',
        title: 'Практическая подготовка',
        text: '80% учебного времени посвящено практическим занятиям и реальным проектам.',
    },
    {
        icon: 'user-tie-solid-full',
        title: 'Преподаватели-практики',
        text: 'Занятия ведут действующие IT-специалисты с опытом работы в ведущих компаниях.',
    },
    {
        icon: 'handshake-solid-full',
        title: 'Трудоустройство',
        text: 'Партнерские программы с IT-компаниями и помощь в трудоустройстве после окончания.',
    },
];
</script>

<style scoped></style>
