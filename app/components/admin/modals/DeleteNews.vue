<template>
	<h3 class="text-2xl">Удаление новости</h3>

	<form @submit="send">
		<div class="input-group">
			<label class="label" for="id">Введите ID новости:</label>
			<input class="input" id="id" placeholder="ID новости" v-model="formData.id" required />
		</div>

		<div class="flex items-center gap-4">
			<button type="submit" class="admin-btn red">Удалить</button>
			<LoadingSpinner v-if="formData.loading" class="h-12 w-12 text-blue-500" />
			<p class="text-sm" v-if="msg" :class="msg.type === 'error' ? 'text-red-500' : 'text-green-500'">{{ msg.text }}</p>
		</div>
	</form>
</template>

<script setup lang="ts">
import LoadingSpinner from '~/components/LoadingSpinner.vue';

const props = defineProps<{ id?: number }>();

const config = useRuntimeConfig();
const backendUrl = config.public.backendUrl;

const formData = reactive({
	id: props.id,
	loading: false,
});

const msg = ref<{ type: 'error' | 'success'; text: string } | null>(null);

async function send(event: Event) {
	event.preventDefault();

	if (!formData.id) {
		msg.value = { type: 'error', text: 'Введите ID новости' };
		return;
	}

	try {
		formData.loading = true;

		await $fetch(`${backendUrl}/news/${formData.id}`, {
			method: 'DELETE',
		});

		msg.value = { type: 'success', text: 'Новость успешно удалена' };
		formData.id = '';
	} catch (e) {
		msg.value = { type: 'error', text: `Ошибка при удалении: ${String(e)}` };
	} finally {
		formData.loading = false;
	}
}
</script>
