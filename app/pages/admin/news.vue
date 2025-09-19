<template>
	<section>
		<div class="head">
			<h1>Управление новостями</h1>
			<div class="head__tools">
				<button class="admin-btn" @click="showCreateModal">Создать новость</button>
				<button class="admin-btn" @click="refresh()">Перезагрузить список</button>
			</div>
		</div>
		<div class="content">
			<table class="table" v-if="data?.length && !pending">
				<thead>
					<tr>
						<th scope="col" v-for="key in Object.keys(data?.[0] || {})" :key="key">
							{{ dataKeyAliases[key as keyof NewsItemData] || key }}
						</th>
						<th scope="col" class="min-w-56">Страница</th>
						<th scope="col">Управление</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="item in data" :key="item.id">
						<td v-for="(i, idx) in item" :key="idx">{{ i }}</td>
						<td>
							<nuxt-link class="text-blue-600" :to="`/news/${item.slug}`">Перейти на страницу</nuxt-link>
						</td>
						<td>
							<div class="item-tools !flex-nowrap">
								<button class="admin-btn" @click="showEditModal(item)">Редактировать</button>
								<button class="admin-btn red" @click="showDeleteModal(item)">Удалить</button>
							</div>
						</td>
					</tr>
				</tbody>
			</table>
			<LoadingSpinner class="text-blue-500" v-if="pending" />
			<div v-if="error">
				<p>Произошла ошибка:</p>
				<pre>{{ error }}</pre>
			</div>
			<p v-else-if="!data?.length">Записей еще нет</p>
		</div>
	</section>
</template>

<script setup lang="ts">
import type { NewsItem } from '#shared/types';
import LoadingSpinner from '~/components/LoadingSpinner.vue';
import ModalUniversalCRUD from '~/components/admin/ModalUniversalCRUD.vue';
import RichTextEditor from '~/components/admin/RIchTextEditor.vue';
import { useModalStore } from '~/store/modalsStore';

const config = useRuntimeConfig();
const backendUrl = config.public.backendUrl;

definePageMeta({
	layout: 'admin',
});

const { data, error, pending, refresh } = await useFetch<NewsItem[]>(`${backendUrl}/news`, {
	server: false,
	lazy: true,
});

type NewsItemData = Omit<NewsItem, 'slug' | 'iso_date' | 'alt'>;

const dataKeyAliases: Record<keyof NewsItemData, string> = {
	id: 'id',
	content: 'Содержимое новости',
	img: 'Изображение',
	date: 'Дата выпуска',
	title: 'Заголовок',
	text: 'Краткое содержимое',
	categories: 'Категории',
};

const modal = useModalStore();

const fieldConfig = {
	date: {
		type: 'text',
		props: { maxlength: 10, placeholder: 'дд.мм.гггг' },
		formatter: (formData: any, key: any) => {
			let digits = String(formData[key]).replace(/\D/g, '');

			if (digits.length > 8) digits = digits.slice(0, 8);

			let formatted = '';
			if (digits.length > 0) formatted += digits.slice(0, 2);
			if (digits.length >= 3) formatted += '.' + digits.slice(2, 4);
			if (digits.length >= 5) formatted += '.' + digits.slice(4, 8);

			formData[key] = formatted;
		},
	},
	title: { type: 'text' },
	text: { type: 'text' },
	categories: { type: 'array' },
	img: { type: 'file' },
	content: { component: markRaw(RichTextEditor), props: { class: 'input' } },
};

function showCreateModal() {
	const item: NewsItemData = {
		date: '',
		title: '',
		text: '',
		categories: [''],
		img: '',
		content: '',
	};

	modal.openModal(ModalUniversalCRUD, {
		item,
		mode: 'create',
		endpoint: 'news',
		fieldAliases: dataKeyAliases,
		fieldConfig,
	});
}

function showEditModal(item: NewsItem) {
	modal.openModal(ModalUniversalCRUD, {
		item,
		mode: 'update',
		endpoint: 'news',
		fieldAliases: dataKeyAliases,
		fieldConfig,
	});
}

function showDeleteModal(item: NewsItem) {
	modal.openModal(ModalUniversalCRUD, {
		item,
		mode: 'delete',
		endpoint: 'news',
		fieldAliases: dataKeyAliases,
		fieldConfig,
	});
}
</script>
