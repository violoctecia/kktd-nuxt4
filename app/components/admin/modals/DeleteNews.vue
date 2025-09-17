<template>
	<h3 class="text-2xl">Удаление новости</h3>

	<form @submit="send">
		<div class="input-group">
			<label class="label" for="id">Введите ID новости:</label>
			<input class="input" id="id" placeholder="ID новости" v-model="formData.id" required />
		</div>

		<div class="flex items-center gap-4">
			<button type="submit" class="send-btn red">Удалить</button>
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

<style scoped lang="scss">
h3 {
	@apply mb-6 text-lg font-medium;
}

.input-group {
	@apply mb-6 flex flex-col gap-2;

	.label {
		@apply text-base;
	}

	.input {
		@apply block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500;

		&.category {
			@apply w-fit;
		}
	}
}

.send-btn {
	@apply flex items-center justify-center rounded bg-blue-500 px-4 py-2 text-center text-white transition-colors duration-200 hover:bg-blue-600;

	&.red {
		@apply bg-red-500 hover:bg-red-600;
	}
}
</style>
