<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'AdmissionPlan',
	data() {
		return {
			tableData: [
				{
					funding: 'Бюджет',
					specialty: 'Информационные системы и программирование (09.02.07)',
					qualification: 'специалист по информационным системам',
					base: '9',
					form: 'Очная',
					places: '25',
				},
				{
					funding: 'Бюджет',
					specialty: 'Обеспечение информационной безопасности телекоммуникационных систем (10.02.04)',
					qualification: '-',
					base: '9',
					form: 'Очная',
					places: '25',
				},
				{
					funding: 'Бюджет',
					specialty: 'Конструирование, моделирование и технология изделий легкой промышленности (29.02.10)',
					qualification: '- (мех 25, кожа 25, швейные изделия 50)',
					base: '9',
					form: 'Очная',
					places: '100',
				},
				{
					funding: 'Бюджет',
					specialty: 'Конструирование, моделирование и технология изделий легкой промышленности (29.02.10)',
					qualification: '- (швейные изделия)',
					base: '11',
					form: 'Очная',
					places: '25',
				},
				{
					funding: 'Бюджет',
					specialty: 'Технология кожи и меха (29.02.02)',
					qualification: '-',
					base: '9',
					form: 'Очная',
					places: '20',
				},
				{
					funding: 'Бюджет',
					specialty: 'Технология текстильных изделий (29.02.05)',
					qualification: '-',
					base: '9',
					form: 'Очная',
					places: '20',
				},
				{ funding: 'Бюджет', specialty: 'Торговое дело (38.02.08)', qualification: '-', base: '9', form: 'Очная', places: '25' },
				{ funding: 'Бюджет', specialty: 'Торговое дело (38.02.08)', qualification: '-', base: '11', form: 'Очная', places: '25' },
				{
					funding: 'Бюджет',
					specialty: 'Мастер по изготовлению швейных изделий (29.01.33)',
					qualification: '-',
					base: '-',
					form: '-',
					places: '25',
				},
				{
					funding: 'Не бюджет',
					specialty: 'Информационные системы и программирование (09.02.07)',
					qualification: 'разработчик Web и мультимедийных приложений',
					base: '9',
					form: 'Очная',
					places: '25',
				},
				{
					funding: 'Не бюджет',
					specialty: 'Информационные системы и программирование (09.02.07)',
					qualification: 'Программист',
					base: '9',
					form: 'Очная',
					places: '25',
				},
				{
					funding: 'Не бюджет',
					specialty: 'Бухгалтерский учет (по отраслям) (38.02.01)',
					qualification: '-',
					base: '9',
					form: 'Очная',
					places: '25',
				},
				{
					funding: 'Не бюджет',
					specialty: 'Экологическая безопасность природных комплексов (20.02.01)',
					qualification: '-',
					base: '9',
					form: 'Очная',
					places: '25',
				},
				{
					funding: 'Не бюджет',
					specialty: 'Конструирование, моделирование и технология изделий легкой промышленности (29.02.10)',
					qualification: '- (швейные изделия)',
					base: '9',
					form: 'Очная',
					places: '25',
				},
			],
		};
	},
	methods: {
		apply() {
			this.$emit('apply');
		},
	},
});
</script>

<template>
	<div class="mb-6 rounded-lg bg-white p-6 shadow-lg">
		<h3 class="mb-4 text-xl text-blue-700">План приема</h3>
		<div class="overflow-x-auto rounded-lg shadow-lg">
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
