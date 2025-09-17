<template>
	<div>
		<h1>Управление новостями</h1>
		<div class="mb-12 flex w-full flex-row items-center gap-4 overflow-auto">
			<button class="admin-btn" @click="showCreateModal">Создать новость</button>
			<button class="admin-btn" @click="refresh()">Перезагрузить список</button>
		</div>
		<h2>Текущие новости:</h2>
		<div class="flex w-full items-start justify-start">
			<div
				class="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-x-4 sm:gap-y-8 lg:grid-cols-3 xl:grid-cols-4"
				v-if="newsData?.length"
			>
				<MainCard
					v-for="item in newsData"
					:key="item.alt"
					:img-src="item.img"
					:img-alt="item.alt"
					:href-text="item.title"
					:href="`/news/${item.slug}`"
					:title="item.title"
					:card-title-tag="'p'"
					disable-link
				>
					<template #before-title>
						<div class="mb-3 flex flex-wrap items-center gap-2">
							<time class="text-sm text-primary" :datetime="item.iso_date" itemprop="datePublished">
								{{ item.date }}
							</time>
							<ul v-if="item.categories" class="flex items-center gap-2">
								<li
									class="rounded-full bg-primary/70 px-2 py-1 text-xs text-background"
									v-for="ctg in item.categories"
									:key="ctg"
								>
									{{ ctg }}
								</li>
							</ul>
						</div>
					</template>
					<template #content>
						<p class="mt-auto text-sm leading-4 text-black/80 md:text-base md:leading-5" itemprop="description">
							{{ item.text }}
						</p>
						<div class="tools">
							<span class="mb-2">ID новости: {{ item.id }}</span>
							<button class="admin-btn sm" @click="showEditModal(item)">Редактировать новость</button>
							<button class="admin-btn red sm" @click="showDeleteModal(item.id)">Удалить новость</button>
						</div>
					</template>
				</MainCard>
			</div>

			<div class="w-full items-center justify-center" v-else>
				<LoadingSpinner class="text-blue-600" v-if="pending" />
				<p v-if="error">Произошла какая-то ошибка: {{ error }}</p>
				<p v-if="!newsData?.length">Новостей еще нет</p>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import type { NewsItem } from '#shared/types';
import LoadingSpinner from '~/components/LoadingSpinner.vue';
import CreateNews from '~/components/admin/modals/CreateNews.vue';
import DeleteNews from '~/components/admin/modals/DeleteNews.vue';
import EditNews from '~/components/admin/modals/EditNews.vue';
import MainCard from '~/components/ui/MainCard.vue';
import { useModalStore } from '~/store/modalsStore';

const config = useRuntimeConfig();
const backendUrl = config.public.backendUrl;

const modal = useModalStore();

function showCreateModal() {
	modal.openModal(CreateNews);
}

function showDeleteModal(id?: number) {
	modal.openModal(DeleteNews, { id });
}

function showEditModal(item: NewsItem) {
	modal.openModal(EditNews, { item });
}

definePageMeta({
	layout: 'admin',
});

const {
	data: newsData,
	error,
	pending,
	refresh,
} = await useFetch<NewsItem[]>(`${backendUrl}/news`, {
	server: false,
	lazy: true,
});
</script>

<style scoped lang="scss">
.tools {
	@apply mt-8 flex flex-col gap-2 border-t border-gray-300 pt-4;
}
</style>
