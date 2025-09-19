<template>
	<h3 class="text-2xl">{{ action }}</h3>

	<form @submit="send">
		<template v-if="mode !== 'delete'">
			<div v-for="key in editableKeys" :key="key" class="input-group">
				<label class="label">{{ fieldAliases?.[key] || key }}</label>

				<!-- кастомный компонент -->
				<component
					v-if="fieldConfig?.[key]?.component"
					:is="fieldConfig[key].component"
					v-model="formData[key]"
					v-bind="fieldConfig[key].props"
					class="input"
				/>

				<!-- textarea -->
				<textarea
					v-else-if="fieldConfig?.[key]?.type === 'textarea'"
					v-model="formData[key]"
					:placeholder="`Введите ${fieldAliases?.[key] || key}`"
					required
					class="input"
				></textarea>

				<!-- файл с превью -->
				<div v-else-if="fieldConfig?.[key]?.type === 'file'" class="input">
					<input type="file" :required="!formData.img" @change="handleFileChange(key, $event)" />
					<img alt="" v-if="formData[`${key}Preview`]" :src="formData[`${key}Preview`]" class="mt-2 max-w-64" />
				</div>

				<!-- булевое поле -->
				<div class="flex items-center gap-4" v-else-if="fieldConfig?.[key]?.type === 'checkbox'">
					<input
						class="h-5 w-5 rounded-sm border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
						type="checkbox"
						v-model="formData[key]"
						:id="key"
					/>
					<label :for="key">
						{{ fieldConfig[key].labels?.[String(formData[key])] ?? formData[key] }}
					</label>
				</div>

				<!-- float input -->
				<input
					v-else-if="fieldConfig?.[key]?.type === 'float'"
					class="input"
					type="text"
					v-model="formData[key]"
					:placeholder="`Введите ${fieldAliases?.[key] || key}`"
					required
					@blur="formatFloat(key)"
				/>

				<!-- массив -->
				<div v-else-if="fieldConfig?.[key]?.type === 'array'" class="flex flex-col gap-2">
					<div v-for="(item, idx) in formData[key]" :key="idx" class="flex items-center gap-2">
						<input class="input" v-model="formData[key][idx]" required :placeholder="`Введите текст`" />
						<button type="button" @click="removeArrayItem(key, idx)" class="admin-btn red">-</button>
						<button type="button" v-if="idx === formData[key].length - 1" @click="addArrayItem(key)" class="admin-btn">
							+
						</button>
					</div>
				</div>

				<!-- обычный input -->
				<input
					class="input"
					v-else
					:type="fieldConfig?.[key]?.type"
					v-model="formData[key]"
					:placeholder="`Введите ${fieldAliases?.[key] || key}`"
					required
					v-bind="fieldConfig?.[key]?.props"
					@input="fieldConfig?.[key]?.formatter ? fieldConfig[key].formatter(formData, key) : null"
				/>
			</div>
		</template>

		<!-- удаление -->
		<p class="mb-6 font-bold" v-else>
			Вы действительно хотите удалить эту запись?
			<br />
			Данное действие невозможно отменить.
		</p>

		<div class="flex items-center gap-4">
			<button type="submit" class="admin-btn" :class="mode === 'delete' ? 'red' : ''">
				{{ action }}
			</button>
			<LoadingSpinner v-if="loading" class="h-12 w-12 text-blue-500" />
			<p class="text-sm" v-if="msg" :class="msg.type === 'error' ? 'text-red-500' : 'text-green-500'">
				{{ msg.text }}
			</p>
		</div>
	</form>
</template>

<script setup lang="ts">
import LoadingSpinner from '~/components/LoadingSpinner.vue';

type Mode = 'create' | 'update' | 'delete';

interface InputCfg {
	type?: 'text' | 'number' | 'float' | 'file' | 'textarea' | 'array' | 'checkbox';
	component?: any;
	props?: Record<string, any>;
	required?: boolean;
	formatter?: (formData: Record<string, any>, key: string) => void;
	labels?: Record<string, string>;
}

const props = defineProps<{
	item: Record<string, any>;
	mode: Mode;
	endpoint: string;
	fieldAliases?: Record<string, string>;
	fieldConfig?: Record<string, InputCfg>;
}>();

const formData = reactive({ ...props.item });
const msg = ref<{ type: 'error' | 'success'; text: string } | null>(null);
const loading = ref(false);

const config = useRuntimeConfig();
const { backendUrl, bearerToken } = config.public;

let action: string;
let url = `${backendUrl}/${props.endpoint}/`;
let method: 'POST' | 'PUT' | 'DELETE';

if (props.mode !== 'create' && !formData.id) {
	msg.value = { type: 'error', text: 'ID сущности не получен' };
}

switch (props.mode) {
	case 'create':
		action = 'Создание';
		method = 'POST';
		break;
	case 'update':
		action = 'Обновление';
		method = 'PUT';
		url += formData.id;
		break;
	case 'delete':
		action = 'Удаление';
		method = 'DELETE';
		url += formData.id;
		break;
	default:
		action = '';
		break;
}

const editableKeys = computed(() => {
	if (!props.fieldConfig) return [];
	return Object.keys(props.fieldConfig);
});

function addArrayItem(key: string) {
	formData[key].push('');
}

function removeArrayItem(key: string, idx: number) {
	formData[key].splice(idx, 1);
}

function handleFileChange(key: string, event: Event) {
	const target = event.target as HTMLInputElement;
	const file = target.files?.[0] ?? null;
	formData[key] = file;

	if (!file) {
		formData[`${key}Preview`] = '';
		return;
	}

	const reader = new FileReader();
	reader.onload = (e) => {
		formData[`${key}Preview`] = e.target?.result as string;
	};
	reader.readAsDataURL(file);
}

function formatFloat(key: string) {
	const val = formData[key];
	if (val === '' || val === null || val === undefined) return;
	// заменяем запятую на точку и конвертируем в число
	const num = parseFloat(String(val).replace(',', '.'));
	formData[key] = isNaN(num) ? '' : num;
}

async function send(event: Event) {
	event.preventDefault();
	loading.value = true;

	try {
		let body: any;

		// если есть файл → используем FormData
		if (Object.values(props.fieldConfig || {}).some((f: any) => f.type === 'file')) {
			body = new FormData();
			for (const key of Object.keys(formData)) {
				// исключаем превью и id
				if (key.endsWith('Preview') || key === 'id') continue;

				if (formData[key] instanceof File) {
					body.append(key, formData[key]);
				} else if (Array.isArray(formData[key])) {
					formData[key].forEach((val, idx) => body.append(`${key}[${idx}]`, val));
				} else {
					body.append(key, formData[key]);
				}
			}
		} else {
			// обычный объект → тоже исключаем id и превью
			body = Object.fromEntries(Object.entries(formData).filter(([key]) => !key.endsWith('Preview') && key !== 'id'));
		}

		await $fetch(url, {
			method,
			body,
			headers: {
				Authorization: `Bearer ${bearerToken}`,
			},
		});

		msg.value = { type: 'success', text: `${action} успешно выполнено` };
	} catch (e) {
		msg.value = { type: 'error', text: `Ошибка: ${String(e)}` };
	} finally {
		loading.value = false;
	}
}
</script>
