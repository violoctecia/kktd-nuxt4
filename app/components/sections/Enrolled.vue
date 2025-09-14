<template>
	<div class="py-8">
		<h1 class="mb-8 text-center text-3xl font-bold">Зачисленные студенты 2025</h1>

		<div class="mb-6 rounded-xl bg-white p-6 shadow-md">
			<div class="grid gap-6 md:grid-cols-3">
				<div class="flex flex-col">
					<label class="mb-2 font-semibold text-gray-700">Специальность</label>
					<select v-model="filters.specialty" class="rounded-lg border p-2 focus:border-blue-500 focus:outline-none">
						<option value="all">Все</option>
						<option v-for="s in specialties" :key="s.code" :value="s.code">{{ s.title }}</option>
					</select>
				</div>

				<div class="flex flex-col">
					<label class="mb-2 font-semibold text-gray-700">Группа</label>
					<select v-model="filters.group" class="rounded-lg border p-2 focus:border-blue-500 focus:outline-none">
						<option value="all">Все</option>
						<option v-for="g in groupsList" :key="g" :value="g">{{ g }}</option>
					</select>
				</div>

				<div class="flex flex-col">
					<label class="mb-2 font-semibold text-gray-700">Основа обучения</label>
					<select v-model="filters.status" class="rounded-lg border p-2 focus:border-blue-500 focus:outline-none">
						<option value="all">Все</option>
						<option value="budget">Бюджет</option>
						<option value="contract">Внебюджет</option>
					</select>
				</div>
			</div>

			<div class="mt-4 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
				<div class="flex-1">
					<label class="mb-2 block font-semibold text-gray-700">Поиск по ФИО</label>
					<input
						v-model="filters.search"
						type="text"
						placeholder="Введите фамилию студента..."
						class="w-full rounded-lg border p-2 focus:border-blue-500 focus:outline-none"
					/>
				</div>

				<button @click="toggleSort" class="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
					{{ sortLabel }}
				</button>
			</div>
		</div>

		<div v-if="errorMessage" class="py-6 text-center text-red-500">{{ errorMessage }}</div>

		<div v-if="filteredGroups.length" class="overflow-x-auto">
			<table class="w-full border-collapse text-left">
				<thead>
					<tr class="bg-blue-100">
						<th class="border p-3">Группа</th>
						<th class="border p-3">Специальность</th>
						<th class="border p-3">ФИО студента</th>
						<th class="border p-3">Основа обучения</th>
						<th class="border p-3 text-center">Действие</th>
					</tr>
				</thead>
				<tbody>
					<template v-for="group in filteredGroups" :key="group.id">
						<tr v-for="(student, idx) in group.students" :key="student.fullName">
							<!-- Группа и специальность только для первой строки -->
							<td v-if="idx === 0" :rowspan="group.students.length" class="border p-3 align-top font-semibold">
								{{ group.name }}
							</td>
							<td v-if="idx === 0" :rowspan="group.students.length" class="border p-3 align-top">
								{{ group.specialtyTitle }}
							</td>

							<!-- Студент -->
							<td class="border p-3">{{ student.fullName }}</td>
							<td class="border p-3">
								<span
									:class="
										student.status === 'budget'
											? 'rounded bg-blue-600 px-2 py-1 text-white'
											: 'rounded bg-orange-500 px-2 py-1 text-white'
									"
								>
									{{ student.status === 'budget' ? 'Бюджет' : 'Внебюджет' }}
								</span>
							</td>

							<!-- Кнопка PDF только для первой строки -->
							<td v-if="idx === 0" :rowspan="group.students.length" class="border p-3 text-center">
								<button @click="downloadPdf(group)" class="rounded bg-green-600 px-3 py-1 text-white hover:bg-green-700">
									Скачать PDF
								</button>
							</td>
						</tr>
					</template>
				</tbody>
			</table>
		</div>

		<div v-else class="py-12 text-center text-gray-500">Нет результатов по вашему запросу</div>
	</div>
</template>

<script setup lang="ts">
interface Student {
	fullName: string;
	status: 'budget' | 'contract';
	specialtyTitle?: string;
}

interface Group {
	id: string;
	name: string;
	specialty: string;
	specialtyTitle: string;
	students: Student[];
}

const filters = reactive({ specialty: 'all', group: 'all', status: 'all', search: '' });
const isAsc = ref(true);
const errorMessage = ref<string | null>(null);

function normalize(s: string) {
	return (s || '').toLowerCase().replace(/\s+/g, ' ').trim();
}

const { data } = await useFetch<Group[]>('/api/enrolled');
const dataRaw = data.value!;

const specialties = computed(() => {
	const map = new Map<string, string>();
	dataRaw.forEach((g) => map.set(g.specialty, g.specialtyTitle));
	return Array.from(map.entries()).map(([code, title]) => ({ code, title }));
});

const groupsList = computed(() => dataRaw.map((g) => g.name));

const filteredGroups = computed(() => {
	const q = normalize(filters.search);
	return dataRaw
		.filter((g) => filters.specialty === 'all' || g.specialty === filters.specialty)
		.filter((g) => filters.group === 'all' || g.name === filters.group)
		.map((g) => {
			let students = g.students.slice();
			if (filters.status !== 'all') students = students.filter((s) => s.status === filters.status);

			if (q) {
				students = students.filter((s) => normalize(s.fullName).includes(q));
			} else {
				students.sort((a, b) => {
					const an = normalize(a.fullName);
					const bn = normalize(b.fullName);
					return isAsc.value ? an.localeCompare(bn) : bn.localeCompare(an);
				});
			}
			return { ...g, students };
		})
		.filter((g) => g.students.length > 0);
});

function toggleSort() {
	isAsc.value = !isAsc.value;
}

const sortLabel = computed(() => (isAsc.value ? 'Сортировка: A→Z' : 'Сортировка: Z→A'));

function downloadPdf(group: Group) {
	fetch('/api/enrolled-pdf', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(group),
	})
		.then((res) => res.blob())
		.then((blob) => {
			const url = URL.createObjectURL(blob);
			const a = document.createElement('a');
			a.href = url;
			a.download = `${group.name}.pdf`;
			a.click();
			URL.revokeObjectURL(url);
		});
}
</script>
