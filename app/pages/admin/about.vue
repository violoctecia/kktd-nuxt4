<template>
	<section>
		<div class="head">
			<h1>Управление разделом "О колледже"</h1>
			<div class="head__tools">
				<button class="admin-btn" @click="data?.[0] ? showEditModal(data[0]) : showCreateModal()">
					{{ data?.[0] ? 'Редактировать' : 'Создать' }}
				</button>
				<button class="admin-btn" @click="refresh()">Перезагрузить</button>
			</div>
		</div>

		<div class="content">
			<div class="html-content w-full max-w-4xl" v-if="data?.[0]" v-html="data[0].content"></div>
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
import type { About } from '#shared/types';
import LoadingSpinner from '~/components/LoadingSpinner.vue';
import ModalUniversalCRUD from '~/components/admin/ModalUniversalCRUD.vue';
import RichTextEditor from '~/components/admin/RIchTextEditor.vue';
import { useModalStore } from '~/store/modalsStore';

const config = useRuntimeConfig();
const { backendUrl } = config.public;

definePageMeta({
	layout: 'admin',
});

const { data, error, pending, refresh } = await useFetch<About[]>(`${backendUrl}/about`, {
	server: false,
	lazy: true,
});

const dataKeyAliases: Record<keyof About, string> = {
	id: 'id',
	content: 'Содержимое раздела',
};

const modal = useModalStore();

function showCreateModal() {
	const item: About = {
		content: '',
	};

	modal.openModal(ModalUniversalCRUD, {
		item,
		mode: 'create',
		endpoint: 'about',
		fieldAliases: dataKeyAliases,
		fieldConfig: {
			content: { component: markRaw(RichTextEditor), props: { class: 'input' } },
		},
	});
}

function showEditModal(item: About) {
	modal.openModal(ModalUniversalCRUD, {
		item,
		mode: 'update',
		endpoint: 'about',
		fieldAliases: dataKeyAliases,
		fieldConfig: {
			content: { component: markRaw(RichTextEditor), props: { class: 'input' } },
		},
	});
}
</script>
