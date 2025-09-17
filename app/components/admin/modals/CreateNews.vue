<template>
	<h3 class="text-2xl">Создание новости</h3>

	<form @submit="send">
		<div class="input-group">
			<label class="label" for="date">Дата выпуска новости:</label>
			<input class="input" id="date" placeholder="дд.мм.гггг" v-model="formData.date" maxlength="10" @input="onDateInput" required />
		</div>
		<div class="input-group">
			<label class="label" for="title">Заголовок новости:</label>
			<input class="input" id="title" placeholder="Введите название" v-model="formData.title" required />
		</div>
		<div class="input-group">
			<label class="label" for="text">Краткое предисловие до 5 предложений:</label>
			<textarea class="input" id="text" placeholder="Введите текст" v-model="formData.text" required></textarea>
		</div>
		<div class="input-group">
			<label class="label" for="ctg">Категории</label>
			<div class="flex flex-col justify-center gap-2">
				<div class="flex items-center gap-2" v-for="(i, idx) in formData.categories" :key="idx">
					<input class="input category" :id="`id-${idx}`" placeholder="Название категории" v-model="formData.categories[idx]" />
					<div class="flex items-center gap-2">
						<button
							type="button"
							@click="removeCategory(idx)"
							class="h-6 w-6 rounded bg-red-500 font-bold leading-none text-white"
						>
							-
						</button>
						<button
							type="button"
							class="h-6 w-6 rounded bg-blue-400 font-bold leading-none text-white"
							v-if="idx === formData.categories.length - 1"
							@click="addCategory()"
						>
							+
						</button>
					</div>
				</div>
			</div>
		</div>

		<div class="input-group">
			<label class="label" for="file">Выберите изображение</label>
			<input class="input" id="file" type="file" required accept="image/*" @change="handleFileChange" />
			<img alt="" v-if="formData.imgPreview" :src="formData.imgPreview" class="max-w-64" />
		</div>

		<div class="input-group">
			<p class="label">Контент новости:</p>
			<ContentEditor class="input" v-model="formData.content" />
		</div>
		<div class="flex items-center gap-4">
			<button type="submit" class="admin-btn">Создать</button>
			<LoadingSpinner v-if="formData.loading" class="h-12 w-12 text-blue-500" />
			<p class="text-sm" v-if="msg" :class="msg.type === 'error' ? 'text-red-500' : 'text-green-500'">{{ msg.text }}</p>
		</div>
	</form>
</template>

<script setup lang="ts">
import ContentEditor from '~/components/admin/ContentEditor.vue';
import LoadingSpinner from '~/components/LoadingSpinner.vue';

const config = useRuntimeConfig();
const backendUrl = config.public.backendUrl;

const formData = reactive({
	content: '',
	title: '',
	date: '',
	text: '',
	categories: [''],
	img: null as File | null,
	imgPreview: '' as string,
	loading: false,
});

const msg = ref<{ type: 'error' | 'success'; text: string } | null>(null);

async function send(event: Event) {
	event.preventDefault();

	if (formData.date.length !== 10) {
		msg.value = { type: 'error', text: 'Заполните поле даты полностью в формате дд.мм.гггг' };
		return;
	}

	if (formData.content.length < 20) {
		msg.value = { type: 'error', text: 'Пустое поле контента или контент слишком короткий' };
		return;
	}

	try {
		formData.loading = true;

		const fd = new FormData();
		fd.append('title', formData.title);
		fd.append('alt', formData.title);
		fd.append('date', formData.date);
		fd.append('text', formData.text);
		fd.append('content', formData.content);

		formData.categories.forEach((c, idx) => fd.append(`categories[${idx}]`, c));

		if (formData.img) {
			fd.append('img', formData.img);
		}

		await $fetch(`${backendUrl}/news`, {
			method: 'POST',
			body: fd,
		});

		msg.value = { type: 'success', text: 'Новость успешно создана' };
	} catch (e) {
		msg.value = { type: 'error', text: `Произошла какая-то ошибка: ${String(e)}` };
	} finally {
		formData.loading = false;
	}
}

function handleFileChange(event: Event) {
	const target = event.target as HTMLInputElement;
	const file = target.files?.[0] ?? null;
	formData.img = file;

	if (!file) {
		formData.imgPreview = '';
		return;
	}

	const reader = new FileReader();
	reader.onload = (e) => {
		formData.imgPreview = e.target?.result as string;
	};
	reader.readAsDataURL(file);
}

function addCategory() {
	formData.categories.push('');
}

function removeCategory(idx: number) {
	formData.categories.splice(idx, 1);
}

function onDateInput(e: Event) {
	const input = e.target as HTMLInputElement;
	// оставляем только цифры
	let digits = input.value.replace(/\D/g, '');

	// ограничиваем длину до 8 цифр (ддммгггг)
	if (digits.length > 8) digits = digits.slice(0, 8);

	// форматируем с точками
	let formatted = '';
	if (digits.length > 0) formatted += digits.slice(0, 2);
	if (digits.length >= 3) formatted += '.' + digits.slice(2, 4);
	if (digits.length >= 5) formatted += '.' + digits.slice(4, 8);

	formData.date = formatted;
}
</script>
