<script setup lang="ts">
const year: number = new Date().getFullYear();
</script>

<template>
	<footer id="contacts" class="mt-8 bg-primaryDark py-8 text-white">
		<div class="container grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
			<div>
				<h3 class="mb-4 text-lg font-semibold text-primaryLight">
					Казанский Колледж
					<br />
					Технологии и Дизайна
				</h3>
				<p class="text-sm text-gray-300">
					Профессиональное образование в сфере информационных технологий и легкой промышленности. Готовим специалистов для
					цифровой экономики.
				</p>
				<div class="mt-4 flex gap-3">
					<a href="#" class="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-primary">
						<i class="fab fa-vk"></i>
					</a>
					<a
						href="https://t.me/KKTDInfoBot"
						target="_blank"
						class="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-primary"
					>
						<i class="fab fa-telegram"></i>
					</a>
					<a href="#" class="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-primary">
						<i class="fab fa-youtube"></i>
					</a>
				</div>
			</div>

			<div>
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

			<div>
				<h3 class="mb-4 text-lg font-semibold text-primaryLight">Программы</h3>
				<ul class="space-y-2 text-sm">
					<li>
						<NuxtLink to="/programs/09-02-07">Программирование</NuxtLink>
					</li>
					<li>
						<NuxtLink to="/programs/10-02-04">Кибербезопасность</NuxtLink>
					</li>
					<li>
						<NuxtLink to="/programs/20-02-01">Анализ данных</NuxtLink>
					</li>
					<li>
						<NuxtLink to="/programs/29-02-10">Сетевые технологии</NuxtLink>
					</li>
				</ul>
			</div>

			<div>
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
