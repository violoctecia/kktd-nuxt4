<template>
	<div>
		<h2 class="mb-6 text-3xl font-bold text-gray-900">Рейтинг абитуриентов 2025</h2>
		<div class="mb-6 rounded-lg bg-white p-6 shadow-md">
			<div class="mb-4 flex flex-col gap-4 md:flex-row">
				<input
					v-model="filters.search"
					type="text"
					placeholder="Поиск по ФИО..."
					class="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 md:w-1/3"
				/>
				<select
					v-model="filters.program"
					class="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 md:w-1/3"
				>
					<option value="">Все специальности</option>
					<option v-for="spec in specsRaw" :key="spec.id" :value="spec.id">{{ spec.title }}</option>
				</select>
				<button
					@click="toggleSort"
					class="w-full rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 md:w-auto"
				>
					{{ sortButtonText }}
				</button>
			</div>
		</div>

		<div v-for="spec in filteredSpecs" :key="spec.id" class="mb-6 rounded-lg bg-white p-6 shadow-md">
			<h3 class="mb-4 border-b-2 border-blue-200 pb-2 text-xl font-semibold text-gray-800">{{ spec.title }}</h3>
			<div class="overflow-x-auto">
				<table class="w-full min-w-[800px] text-left">
					<thead>
						<tr class="bg-blue-600 text-white">
							<th class="p-3">№ п/п</th>
							<th class="p-3">Фамилия</th>
							<th class="p-3">Имя</th>
							<th class="p-3">Отчество</th>
							<th class="p-3">Средний балл</th>
							<th class="p-3">Статус</th>
							<th class="p-3">Примечания</th>
						</tr>
					</thead>
					<tbody>
						<tr v-if="spec.data.length === 0">
							<td colspan="7" class="p-4 text-center italic text-gray-500">Данных нет</td>
						</tr>
						<tr v-for="(row, index) in spec.data" :key="index" class="transition-colors hover:bg-blue-50">
							<td class="p-3">{{ index + 1 }}</td>
							<td class="p-3">{{ row['Фамилия'] }}</td>
							<td class="p-3">{{ row['Имя'] }}</td>
							<td class="p-3">{{ row['Отчество'] }}</td>
							<td class="p-3">{{ row['Средний балл'] }}</td>
							<td class="p-3">
								<span
									:class="{
										'bg-green-500': row['Статус'] === 'enrolled',
										'bg-yellow-500': row['Статус'] === 'waiting',
										'bg-red-500': row['Статус'] === 'rejected',
									}"
									class="inline-block rounded-full px-3 py-1 text-xs font-semibold text-white"
								>
									{{
										row['Статус'] === 'enrolled' ? 'Зачислен' : row['Статус'] === 'waiting' ? 'В ожидании' : 'Отклонен'
									}}
								</span>
							</td>
							<td class="p-3">{{ row['Примечания'] }}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';

interface RatingRow {
	Фамилия: string;
	Имя: string;
	Отчество: string;
	'Средний балл': string;
	Статус: 'enrolled' | 'waiting' | 'rejected';
	Примечания: string;
}

interface Specialty {
	id: string;
	title: string;
	data: RatingRow[];
}

interface Filters {
	search: string;
	program: string;
}

const filters = ref<Filters>({ search: '', program: '' });
const isSorted = ref(false);
const sortButtonText = computed(() => (isSorted.value ? 'Отменить сортировку' : 'Сортировать по баллам'));
const specsRaw = ref<Specialty[]>([]);

function normalize(s: string) {
	return (s || '').toLowerCase().replace(/\s+/g, ' ').trim();
}

onMounted(async () => {
	try {
		const res = await fetch('/api/rating');
		const data = (await res.json()) as Specialty[];
		specsRaw.value = data || [];
	} catch (e) {
		console.error(e);
	}
});

const filteredSpecs = computed(() => {
	const q = normalize(filters.value.search);
	return specsRaw.value
		.map((spec) => {
			const originalRows = spec.data || [];
			let rows: RatingRow[] = [];
			if (q) {
				const matched = originalRows
					.map((row, idx) => {
						const fullname = normalize(`${row['Фамилия']} ${row['Имя']} ${row['Отчество']}`);
						const lastFirst = `${normalize(row['Фамилия'])} ${normalize(row['Имя'])}`;
						const avg = parseFloat((row['Средний балл'] || '0').replace(',', '.')) || 0;
						let score = 0;
						if (fullname === q) score = 1000;
						else if (fullname.startsWith(q)) score = 900;
						else if (lastFirst.startsWith(q)) score = 800;
						else if (normalize(row['Фамилия']).startsWith(q)) score = 700;
						else if (fullname.includes(q)) score = 100;
						return { row, idx, score, avg };
					})
					.filter((x) => x.score > 0);
				matched.sort((a, b) => {
					if (b.score !== a.score) return b.score - a.score;
					if (isSorted.value) return b.avg - a.avg;
					return a.idx - b.idx;
				});
				rows = matched.map((m) => m.row);
			} else {
				rows = originalRows.slice();
				if (isSorted.value) {
					rows = rows
						.slice()
						.sort(
							(a, b) =>
								parseFloat((b['Средний балл'] || '0').replace(',', '.')) -
								parseFloat((a['Средний балл'] || '0').replace(',', '.')),
						);
				}
			}
			return { ...spec, data: rows };
		})
		.filter((spec) => {
			if (filters.value.program) return spec.id === filters.value.program;
			if (!q) return true;
			return spec.data.length > 0;
		});
});

function toggleSort() {
	isSorted.value = !isSorted.value;
}
</script>

<style scoped>
.hidden {
	display: none;
}
</style>
