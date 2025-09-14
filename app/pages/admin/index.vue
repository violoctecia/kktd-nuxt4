<script setup lang="ts">
// Список JSON файлов, которые можно редактировать
const files = ['about', 'admission-plan', 'enrolled', 'faq', 'news', 'rating'];

// Выбранный файл
const selectedFile = ref(files[0]);

// Данные текущего файла
const data = ref<any[]>([]);

// Загрузка данных выбранного файла
const loadData = async () => {
	data.value = await $fetch(`/api/${selectedFile.value}`);
};

// Сохраняем данные
const saveData = async () => {
	await $fetch(`/api/admin/${selectedFile.value}`, {
		method: 'POST',
		body: data.value,
	});

	alert('Сохранено!');
};

const addItem = () => {
	// Для простоты создаем пустой объект с ключами как у первой записи
	if (data.value.length > 0) {
		const keys = Object.keys(data.value[0]);
		const newItem: Record<string, string> = {};
		keys.forEach((k) => (newItem[k] = ''));
		data.value.push(newItem);
	} else {
		data.value.push({});
	}
};

// Удалить запись
const removeItem = (index: number) => {
	data.value.splice(index, 1);
};

// При смене файла — подгружаем данные
const changeFile = async (file: string) => {
	selectedFile.value = file;
	await loadData();
};

onMounted(() => loadData());
</script>

<template>
	<div class="container p-6">
		<h1 class="mb-4 text-2xl">Админка JSON</h1>

		<div class="mb-4">
			<label>Выберите файл:</label>
			<select v-model="selectedFile" @change="changeFile(selectedFile)">
				<option v-for="f in files" :key="f" :value="f">{{ f }}</option>
			</select>
		</div>

		<div v-for="(item, index) in data" :key="index" class="mb-4 rounded border p-2">
			<div v-for="(value, key) in item" :key="key" class="mb-2">
				<label class="block font-semibold">{{ key }}</label>
				<input v-model="item[key]" class="w-full border p-1" />
			</div>
			<button @click="removeItem(index)" class="rounded bg-red-500 px-2 py-1 text-white">Удалить запись</button>
		</div>

		<button @click="addItem" class="mb-2 rounded bg-green-500 px-4 py-2 text-white">Добавить запись</button>
		<button @click="saveData" class="rounded bg-blue-500 px-4 py-2 text-white">Сохранить</button>
	</div>
</template>
