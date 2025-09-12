<script setup lang="ts">
interface AdmissionRow {
	funding: string;
	specialty: string;
	qualification: string;
	base: string;
	form: string;
	places: string;
}

const { data: tableData, pending, error } = await useFetch<AdmissionRow[]>('/api/admission-plan');

const apply = () => {
	alert('Заявка отправлена!');
};
</script>

<template>
	<div class="mb-6 rounded-lg bg-white p-6 shadow-lg">
		<h3 class="mb-4 text-xl text-blue-700">План приема</h3>

		<div v-if="pending" class="p-4 text-center text-gray-500">Загружаем данные...</div>

		<div v-else-if="error" class="p-4 text-center text-red-500">Ошибка загрузки данных.</div>

		<div v-else-if="!tableData || tableData.length === 0" class="p-4 text-center text-gray-500">Данные отсутствуют.</div>

		<div v-else class="overflow-x-auto rounded-lg shadow-lg">
			<table class="w-full min-w-[800px] border-collapse">
				<thead>
					<tr class="bg-blue-900 text-white">
						<th class="p-3">Источник финансирования</th>
						<th class="p-3">Специальность/профессия</th>
						<th class="p-3">Квалификация</th>
						<th class="p-3">База (классы)</th>
						<th class="p-3">Форма</th>
						<th class="p-3">Мест</th>
					</tr>
				</thead>
				<tbody>
					<tr
						v-for="(row, index) in tableData"
						:key="index"
						:class="index % 2 === 0 ? 'bg-gray-50' : ''"
						class="transition-colors hover:bg-blue-50"
					>
						<td class="border-b p-3">{{ row.funding }}</td>
						<td class="border-b p-3">{{ row.specialty }}</td>
						<td class="border-b p-3">{{ row.qualification }}</td>
						<td class="border-b p-3">{{ row.base }}</td>
						<td class="border-b p-3">{{ row.form }}</td>
						<td class="border-b p-3">{{ row.places }}</td>
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
	</div>
</template>
