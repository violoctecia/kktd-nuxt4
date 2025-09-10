<script setup lang="ts">
const year: number = new Date().getFullYear();
</script>

<template>
    <footer id="contacts" class="mt-16 bg-primaryDark py-8 text-white">
        <div class="mx-auto grid w-[95%] max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div class="animate-fade-up translate-y-8 opacity-0 transition-all duration-500 ease-in-out">
                <h3 class="mb-4 text-lg font-semibold text-primaryLight">Казанский Колледж Технологии и Дизайна</h3>
                <p class="text-sm text-gray-300">
                    Профессиональное образование в сфере информационных технологий и легкой промышленности. Готовим специалистов для
                    цифровой экономики.
                </p>
                <div class="mt-4 flex gap-3">
                    <a
                        href="#"
                        class="flex h-9 w-9 transform items-center justify-center rounded-full bg-white/10 transition hover:-translate-y-1 hover:rotate-3 hover:bg-primary"
                    >
                        <i class="fab fa-vk"></i>
                    </a>
                    <a
                        href="https://t.me/KKTDInfoBot"
                        target="_blank"
                        class="flex h-9 w-9 transform items-center justify-center rounded-full bg-white/10 transition hover:-translate-y-1 hover:rotate-3 hover:bg-primary"
                    >
                        <i class="fab fa-telegram"></i>
                    </a>
                    <a
                        href="#"
                        class="flex h-9 w-9 transform items-center justify-center rounded-full bg-white/10 transition hover:-translate-y-1 hover:rotate-3 hover:bg-primary"
                    >
                        <i class="fab fa-youtube"></i>
                    </a>
                </div>
            </div>

            <div class="animate-fade-up translate-y-8 opacity-0 transition-all duration-500 ease-in-out">
                <h3 class="mb-4 text-lg font-semibold text-primaryLight">Контакты</h3>
                <ul class="space-y-2 text-sm">
                    <li>
                        <i class="fas fa-map-marker-alt mr-2"></i>
                        г. Казань ул. Марджани, 26
                    </li>
                    <li>
                        <i class="fas fa-phone mr-2"></i>
                        +7 (495) 123-45-67
                    </li>
                    <li>
                        <i class="fas fa-envelope mr-2"></i>
                        ktlp1@yandex.ru
                    </li>
                </ul>
            </div>

            <div class="animate-fade-up translate-y-8 opacity-0 transition-all duration-500 ease-in-out">
                <h3 class="mb-4 text-lg font-semibold text-primaryLight">Программы</h3>
                <ul class="space-y-2 text-sm">
                    <li>
                        <NuxtLink to="/programs/09-02-07">Программирование</NuxtLink>
                    </li>
                    <li>
                        <NuxtLink to="/programs/09-02-07">Кибербезопасность</NuxtLink>
                    </li>
                    <li>
                        <NuxtLink to="/programs/09-02-07">Анализ данных</NuxtLink>
                    </li>
                    <li>
                        <NuxtLink to="/programs/09-02-07">Сетевые технологии</NuxtLink>
                    </li>
                </ul>
            </div>

            <div class="animate-fade-up translate-y-8 opacity-0 transition-all duration-500 ease-in-out">
                <h3 class="mb-4 text-lg font-semibold text-primaryLight">Абитуриенту</h3>
                <ul class="space-y-2 text-sm">
                    <li>
                        <NuxtLink to="/abiturient">Как поступить</NuxtLink>
                    </li>
                    <li>
                        <NuxtLink to="/specialties">Специальности</NuxtLink>
                    </li>
                    <li>
                        <NuxtLink to="/faq">Частые вопросы</NuxtLink>
                    </li>
                    <li>
                        <NuxtLink to="/rating">Рейтинг абитуриентов</NuxtLink>
                    </li>
                    <li>
                        <NuxtLink to="/enrolled">Список предпочтительных к зачислению</NuxtLink>
                    </li>
                </ul>
            </div>
        </div>

        <div class="mt-8 border-t border-white/10 pt-4 text-center text-sm text-gray-400">
            <p>© {{ year }} Казанский Колледж Технологии и Дизайна. Все права защищены.</p>
        </div>
    </footer>
</template>

<style scoped>
@keyframes fade-up {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-fade-up {
    animation: fade-up 0.8s ease forwards;
}
</style>
