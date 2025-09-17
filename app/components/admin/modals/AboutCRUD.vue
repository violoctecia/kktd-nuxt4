<template>
	<h3 class="text-2xl">{{ mode === 'create' ? 'Создание' : 'Обновление' }} раздела</h3>

	<form @submit="send">
		<div class="input-group">
			<p class="label">Контент раздела:</p>
			<ContentEditor :allowed-headings="[2, 3]" class="input" v-model="formData.content" />
		</div>

		<div class="flex items-center gap-4">
			<button type="submit" class="admin-btn">
				{{ mode === 'create' ? 'Создать' : 'Обновить' }}
			</button>
			<LoadingSpinner v-if="formData.loading" class="h-12 w-12 text-blue-500" />
			<p class="text-sm" v-if="msg" :class="msg.type === 'error' ? 'text-red-500' : 'text-green-500'">{{ msg.text }}</p>
		</div>
	</form>
</template>

<script setup lang="ts">
import type { About } from '#shared/types';
import ContentEditor from '~/components/admin/ContentEditor.vue';
import LoadingSpinner from '~/components/LoadingSpinner.vue';

const config = useRuntimeConfig();
const { backendUrl, bearerToken } = config.public;

const props = defineProps<{ item?: About; mode: 'create' | 'update' }>();

const formData = reactive({
	content: props.item?.content || '',
	id: props.item?.id || '',
	loading: false,
});

const msg = ref<{ type: 'error' | 'success'; text: string } | null>(null);

async function send(event: Event) {
	event.preventDefault();

	if (formData.content.length < 20) {
		msg.value = { type: 'error', text: 'Пустое поле контента или контент слишком короткий' };
		return;
	}

	try {
		formData.loading = true;

		const { loading, id, ...payloadData } = formData;

		if (props.mode === 'create') {
			await $fetch(`${backendUrl}/about`, {
				method: 'POST',
				body: payloadData,
				headers: {
					Authorization: `Bearer ${bearerToken}`,
				},
			});
			msg.value = { type: 'success', text: 'Раздел успешно создан' };
		} else {
			await $fetch(`${backendUrl}/about/${id}`, {
				method: 'PUT',
				body: payloadData,
				headers: {
					Authorization: `Bearer ${bearerToken}`,
				},
			});
			msg.value = { type: 'success', text: 'Раздел успешно обновлён' };
		}
	} catch (e) {
		msg.value = { type: 'error', text: `Произошла ошибка: ${String(e)}` };
	} finally {
		formData.loading = false;
	}
}
</script>
