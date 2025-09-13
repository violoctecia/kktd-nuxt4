<template>
  <div class="container">
    <h1 class="h1 mb-8">Зачисленные студенты 2025</h1>
    <div class="bg-white p-6 rounded-xl shadow mb-8">
      <div class="grid md:grid-cols-3 gap-6 mb-6">
        <div class="flex flex-col">
          <label for="specialty" class="font-semibold text-primary-dark mb-2">Специальность</label>
          <select v-model="filters.specialty" id="specialty" class="p-3 border-2 border-gray-200 rounded-lg focus:border-primary outline-none">
            <option value="all">Все специальности</option>
            <option value="090207">09.02.07 - Информационные системы</option>
            <option value="2910">29.02.10 - Конструирование</option>
            <option value="100204">10.02.04 - Информационная безопасность</option>
            <option value="380201">38.02.01 - Экономика</option>
          </select>
        </div>
        <div class="flex flex-col">
          <label for="group" class="font-semibold text-primary-dark mb-2">Группа</label>
          <select v-model="filters.group" id="group" class="p-3 border-2 border-gray-200 rounded-lg focus:border-primary outline-none">
            <option value="all">Все группы</option>
            <option v-for="g in groups" :key="g" :value="g">{{ g }}</option>
          </select>
        </div>
        <div class="flex flex-col">
          <label for="status" class="font-semibold text-primary-dark mb-2">Основа обучения</label>
          <select v-model="filters.status" id="status" class="p-3 border-2 border-gray-200 rounded-lg focus:border-primary outline-none">
            <option value="all">Все</option>
            <option value="budget">Бюджет</option>
            <option value="contract">Внебюджет</option>
          </select>
        </div>
      </div>
      <div class="flex flex-col">
        <label for="search" class="font-semibold text-primary-dark mb-2">Поиск по ФИО</label>
        <input v-model="filters.search" id="search" type="text" placeholder="Введите фамилию студента..." class="p-3 border-2 border-gray-200 rounded-lg focus:border-primary outline-none">
      </div>
    </div>
    <div class="text-center text-gray-600 mb-6">{{ resultsInfo }}</div>
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="group in filteredGroups" :key="group.name" class="bg-white p-6 rounded-xl shadow">
        <div class="flex justify-between items-center border-b-2 border-gray-100 pb-3 mb-4">
          <h3 class="text-lg font-semibold text-primary-dark">{{ group.name }}</h3>
          <span class="bg-primary text-white text-sm font-medium px-3 py-1 rounded-full">{{ group.students.length }} студентов</span>
        </div>
        <ul class="space-y-3">
          <li v-for="student in group.students" :key="student.name" class="p-4 bg-background rounded-lg border-l-4" :class="{'border-primary': student.status === 'budget', 'border-orange-500': student.status === 'contract'}">
            <div class="font-semibold text-primary-dark">{{ student.name }}</div>
            <div class="text-sm text-gray-600">{{ student.specialty }}</div>
            <span class="inline-block text-xs font-medium px-3 py-1 rounded-full mt-2" :class="{'bg-blue-600 text-white': student.status === 'budget', 'bg-orange-500 text-white': student.status === 'contract'}">
              {{ student.status === 'budget' ? 'Бюджет' : 'Внебюджет' }}
            </span>
          </li>
        </ul>
      </div>
      <div v-if="filteredGroups.length === 0" class="text-center py-12 text-gray-500 col-span-full">Нет результатов по вашему запросу</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue';

interface Student { name: string; specialty: string; status: 'budget' | 'contract'; }
interface Group { name: string; specialty: string; students: Student[]; }

const groups = ['ИСП-101', 'ИСП-102', 'КМТ-201', 'КМТ-202', 'ИБ-301', 'ЭК-401'];
const allGroups = [
  { name: 'ИСП-101', specialty: '090207', students: [{ name: 'Иванов Иван Иванович', specialty: '09.02.07 - Информационные системы', status: 'budget' }, { name: 'Петрова Анна Сергеевна', specialty: '09.02.07 - Информационные системы', status: 'budget' }, { name: 'Сидоров Петр Алексеевич', specialty: '09.02.07 - Информационные системы', status: 'contract' }] },
  { name: 'КМТ-201', specialty: '2910', students: [{ name: 'Васильева Екатерина Андреевна', specialty: '29.02.10 - Конструирование', status: 'budget' }, { name: 'Григорьев Артем Сергеевич', specialty: '29.02.10 - Конструирование', status: 'contract' }] }
];

const filters = reactive({ specialty: 'all', group: 'all', status: 'all', search: '' });

const filteredGroups = computed(() => allGroups
  .filter(g => filters.specialty === 'all' || g.specialty === filters.specialty)
  .filter(g => filters.group === 'all' || g.name === filters.group)
  .map(g => ({ ...g, students: g.students.filter(s => (filters.status === 'all' || s.status === filters.status) && s.name.toLowerCase().includes(filters.search.toLowerCase())) }))
  .filter(g => g.students.length > 0));

const resultsInfo = computed(() => filteredGroups.value.length > 0 ? `Показаны ${filteredGroups.value.length} групп(ы)` : 'По вашему запросу ничего не найдено');
</script>

<style scoped>
</style>