<script setup lang="ts">
import type { AdmissionPlan } from '#shared/types';

const {
	data: tableData,
	pending,
	error,
} = await useFetch<Required<AdmissionPlan>[]>('/admission-plan?year=2025&withSpecialty=true', {
	baseURL: useRuntimeConfig().public.backendUrl,
});
console.log(tableData.value);
const apply = () => {
	alert('Заявка отправлена!');
};
</script>

<template>
	<section class="rounded-lg bg-gray-100 p-6 shadow-lg">
		<h2 class="h2">План приема</h2>

		<div v-if="pending" class="p-4 text-center text-gray-500">Загружаем данные...</div>

		<div v-else-if="error" class="p-4 text-center text-red-500">Ошибка загрузки данных.</div>

		<div v-else-if="!tableData || tableData.length === 0" class="p-4 text-center text-gray-500">Данные отсутствуют.</div>

		<div v-else class="overflow-x-auto rounded-lg shadow-lg">
			<table class="w-full border-collapse">
				<thead>
					<tr class="bg-blue-900 text-white">
						<th class="p-3 text-start">Спецаильность</th>
						<th class="p-3 text-start">Квалификация</th>
						<th class="p-3 text-start">Код</th>
						<th class="p-3 text-start">Источник финансирования</th>
						<th class="p-3 text-start">Цена</th>
						<th class="p-3 text-start">Кол-во мест</th>

						<th class="p-3 text-start">База</th>
						<th class="p-3 text-start">Форма</th>
					</tr>
				</thead>
				<tbody>
					<tr
						v-for="(row, index) in tableData"
						:key="index"
						:class="index % 2 === 0 ? 'bg-gray-50' : ''"
						class="transition-colors hover:bg-blue-50"
					>
						<td class="border-b p-3">{{ row.specialty.name }}</td>
						<td class="border-b p-3">{{ row.specialty.qualification }}</td>
						<td class="border-b p-3">{{ row.specialty.code }}</td>
						<td class="border-b p-3">{{ row.funding === 'BUDGET' ? 'Бюджет' : 'Не бюджет' }}</td>
						<td class="border-b p-3">{{ row.price || '-' }}</td>
						<td class="border-b p-3">{{ row.places }}</td>
						<td class="border-b p-3">{{ row.specialty.base }}</td>
						<td class="border-b p-3">{{ row.specialty.form }}</td>
					</tr>
				</tbody>
			</table>
		</div>

		<div class="mt-4 rounded-lg bg-blue-50 p-4">
			<p class="font-semibold">Итого бюджет: 290 мест</p>
			<p class="font-semibold">Итого не бюджет: 125 мест</p>
		</div>

		<button @click="apply" class="mt-6 rounded bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700">
			Подать заявку
		</button>
	</section>
</template>
