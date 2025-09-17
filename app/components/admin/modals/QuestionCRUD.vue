<template>
	<h3 class="text-2xl">{{ mode === 'create' ? 'Создание' : mode === 'update' ? 'Обновление' : 'Удаление' }} вопроса</h3>

	<form @submit="send">
		<template v-if="mode !== 'delete'">
			<div class="input-group">
				<label class="label" for="title">Название вопроса</label>
				<input class="input" id="title" placeholder="Введите название" v-model="formData.question" required />
			</div>

			<div class="input-group">
				<p class="label">Котент ответа:</p>
				<ContentEditor :allowed-headings="[3]" class="input" v-model="formData.content" />
			</div>
		</template>

		<div class="input-group" v-else>
			<label class="label" for="title">ID вопроса:</label>
			<input class="input" id="title" placeholder="Введите ID" v-model="formData.id" required />
		</div>

		<div class="flex items-center gap-4">
			<button type="submit" class="admin-btn" :class="mode === 'delete' ? 'red' : ''">
				{{ mode === 'create' ? 'Создать' : mode === 'update' ? 'Обновить' : 'Удалить' }}
			</button>
			<LoadingSpinner v-if="formData.loading" class="h-12 w-12 text-blue-500" />
			<p class="text-sm" v-if="msg" :class="msg.type === 'error' ? 'text-red-500' : 'text-green-500'">{{ msg.text }}</p>
		</div>
	</form>
</template>

<script setup lang="ts">
import type { Faq } from '#shared/types';
import ContentEditor from '~/components/admin/ContentEditor.vue';
import LoadingSpinner from '~/components/LoadingSpinner.vue';

const config = useRuntimeConfig();
const backendUrl = config.public.backendUrl;

const props = defineProps<{ item?: Faq; mode: 'create' | 'update' | 'delete' }>();

const formData = reactive({
	content: props.item?.content || '',
	question: props.item?.question || '',
	id: props.item?.id?.toString() || '',
	loading: false,
});

const msg = ref<{ type: 'error' | 'success'; text: string } | null>(null);

async function send(event: Event) {
	event.preventDefault();

	if (props.mode !== 'delete' && formData.content.length < 20) {
		msg.value = { type: 'error', text: 'Пустое поле контента или контент слишком короткий' };
		return;
	}

	try {
		formData.loading = true;

		const { loading, id, ...payloadData } = formData;

		if (props.mode === 'create') {
			await $fetch(`${backendUrl}/faq`, {
				method: 'POST',
				body: payloadData,
			});
			msg.value = { type: 'success', text: 'Вопрос успешно создан' };
		} else if (props.mode === 'update') {
			await $fetch(`${backendUrl}/faq/${id}`, {
				method: 'PUT',
				body: payloadData,
			});
			msg.value = { type: 'success', text: 'Вопрос успешно обновлён' };
		} else if (props.mode === 'delete') {
			await $fetch(`${backendUrl}/faq/${id}`, {
				method: 'DELETE',
			});
			msg.value = { type: 'success', text: 'Вопрос успешно удалён' };
		}
	} catch (e) {
		msg.value = { type: 'error', text: `Произошла ошибка: ${String(e)}` };
	} finally {
		formData.loading = false;
	}
}
</script>
