<template>
  <div class="container mx-auto py-6">
    <h2 class="text-3xl font-bold text-gray-900 mb-6">Рейтинг абитуриентов 2025</h2>
    <div class="bg-white p-6 rounded-lg shadow-md mb-6">
      <div class="flex flex-col md:flex-row gap-4 mb-4">
        <input v-model="filters.search" type="text" placeholder="Поиск по ФИО..." class="w-full md:w-1/3 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
        <select v-model="filters.program" class="w-full md:w-1/3 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="">Все специальности</option>
          <option value="2910-kozha">29.02.10 - Кожа</option>
          <option value="2910-meh">29.02.10 - Мех</option>
          <option value="2910-shveya-11">29.02.10 - Швейные изделия (11 кл., бюджет)</option>
          <option value="2910-shveya-9">29.02.10 - Швейные изделия (9 кл., бюджет)</option>
          <option value="2910-shveya-9-vneb">29.02.10 - Швейные изделия (9 кл., внебюджет)</option>
          <option value="100204">10.02.04 - Информационная безопасность</option>
          <option value="380208-11">38.02.08 - Торговое дело (11 кл., внебюджет)</option>
          <option value="380208-9">38.02.08 - Торговое дело (9 кл.)</option>
          <option value="090207-programmist">09.02.07 - Программист (внебюджет)</option>
          <option value="090207-razrabotchik">09.02.07 - Разработчик веб-приложений (внебюджет)</option>
          <option value="090207-specialist">09.02.07 - Специалист по ИС (бюджет)</option>
          <option value="290202">29.02.02 - Технология кожи и меха</option>
          <option value="290205">29.02.05 - Технология текстильных изделий</option>
          <option value="290133">29.01.33 - Мастер по изготовлению швейных изделий</option>
        </select>
        <button @click="toggleSort" class="w-full md:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
          {{ sortButtonText }}
        </button>
      </div>
    </div>
    <div v-for="spec in filteredSpecs" :key="spec.id" class="bg-white rounded-lg shadow-md p-6 mb-6" :class="{ 'hidden': filters.program && spec.id !== filters.program }">
      <h3 class="text-xl font-semibold text-gray-800 mb-4 border-b-2 border-blue-200 pb-2">{{ spec.title }}</h3>
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
              <td colspan="7" class="p-4 text-center text-gray-500 italic">Данные загружаются...</td>
            </tr>
            <tr v-for="(row, index) in spec.data" :key="index" class="hover:bg-blue-50 transition-colors">
              <td class="p-3">{{ index + 1 }}</td>
              <td class="p-3">{{ row['Фамилия'] }}</td>
              <td class="p-3">{{ row['Имя'] }}</td>
              <td class="p-3">{{ row['Отчество'] }}</td>
              <td class="p-3">{{ row['Средний балл'] }}</td>
              <td class="p-3">
                <span :class="{'bg-green-500': row['Статус'] === 'enrolled', 'bg-yellow-500': row['Статус'] === 'waiting', 'bg-red-500': row['Статус'] === 'rejected'}" class="inline-block px-3 py-1 text-xs font-semibold text-white rounded-full">
                  {{ row['Статус'] === 'enrolled' ? 'Зачислен' : row['Статус'] === 'waiting' ? 'В ожидании' : 'Отклонен' }}
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
import { ref, computed, onMounted } from 'vue';

const filters = ref({ search: '', program: '' });
const isSorted = ref(false);
const sortButtonText = computed(() => isSorted.value ? 'Отменить сортировку' : 'Сортировать по баллам');

const specs = ref([
  { id: '2910-kozha', title: 'Конструирование, моделирование и технология изделий легкой промышленности (29.02.10) - Кожа (28 мест)', data: [] },
  { id: '2910-meh', title: 'Конструирование, моделирование и технология изделий легкой промышленности (29.02.10) - Мех (26 мест)', data: [] },
  { id: '2910-shveya-11', title: 'Конструирование, моделирование и технология изделий легкой промышленности (29.02.10) - Швейные изделия (11 класс, бюджет, 118 мест)', data: [] },
  { id: '2910-shveya-9', title: 'Конструирование, моделирование и технология изделий легкой промышленности (29.02.10) - Швейные изделия (9 класс, бюджет, 194 места)', data: [] },
  { id: '2910-shveya-9-vneb', title: 'Конструирование, моделирование и технология изделий легкой промышленности (29.02.10) - Швейные изделия (9 класс, внебюджет, 11 мест)', data: [] },
  { id: '100204', title: 'Обеспечение информационной безопасности телекоммуникационных систем (10.02.04) - 126 мест', data: [] },
  { id: '380208-11', title: 'Торговое дело (38.02.08) - 11 класс, внебюджет, 32 места', data: [] },
  { id: '380208-9', title: 'Торговое дело (38.02.08) - 9 класс, 342 места', data: [] },
  { id: '090207-programmist', title: 'Информационные системы и программирование (09.02.07) - Программист, внебюджет, 149 мест', data: [] },
  { id: '090207-razrabotchik', title: 'Информационные системы и программирование (09.02.07) - Разработчик веб и мультимедийных приложений, внебюджет, 99 мест', data: [] },
  { id: '090207-specialist', title: 'Информационные системы и программирование (09.02.07) - Специалист по информационным системам, бюджет, 297 мест', data: [] },
  { id: '290202', title: 'Технология кожи и меха (29.02.02) - 48 мест', data: [] },
  { id: '290205', title: 'Технология текстильных изделий (29.02.05) - 74 места', data: [] },
  { id: '290133', title: 'Мастер по изготовлению швейных изделий (29.01.33) - 61 место', data: [] },
]);

async function loadData() {
  try {
    const response = await fetch('/data');
    const data = await response.json();
    specs.value.forEach(spec => {
      spec.data = data[spec.title] || [];
      if (filters.value.search) {
        spec.data = spec.data.filter(row => 
          `${row['Фамилия']} ${row['Имя']} ${row['Отчество']}`.toLowerCase().includes(filters.value.search.toLowerCase())
        );
      }
      if (isSorted.value) {
        spec.data.sort((a, b) => parseFloat(b['Средний балл']) - parseFloat(a['Средний балл']));
      }
    });
  } catch (error) {
    console.error('Ошибка загрузки данных:', error);
  }
}

const filteredSpecs = computed(() => {
  return specs.value.map(spec => ({
    ...spec,
    data: spec.data.filter(row => !filters.value.search || 
      `${row['Фамилия']} ${row['Имя']} ${row['Отчество']}`.toLowerCase().includes(filters.value.search.toLowerCase())
    )
  }));
});

const toggleSort = () => {
  isSorted.value = !isSorted.value;
  loadData();
};

onMounted(() => {
  loadData();
});
</script>

<style scoped>
.hidden { display: none; }
</style>