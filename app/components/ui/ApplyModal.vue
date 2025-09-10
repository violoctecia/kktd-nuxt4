<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ApplyModal',
  props: {
    modelValue: Boolean
  },
  emits: ['update:modelValue', 'close'],
  data() {
    return {
      formData: {
        fullName: '',
        email: '',
        phone: '',
        program: '',
        message: ''
      }
    }
  },
  methods: {
    submitForm() {
      console.log('Форма отправлена:', this.formData)
      this.$emit('update:modelValue', false)
    },
    close() {
      this.$emit('close')
      this.formData = { fullName: '', email: '', phone: '', program: '', message: '' }
    }
  }
})
</script>

<template>
  <div v-if="modelValue" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg p-6 w-full max-w-md relative">
      <button @click="close" class="absolute top-2 right-2 text-2xl text-gray-500 hover:text-gray-700">&times;</button>
      <h2 class="text-xl text-blue-900 mb-4">Подать заявку на поступление</h2>
      <form @submit.prevent="submitForm" class="space-y-4">
        <div>
          <label for="full-name" class="block">ФИО</label>
          <input v-model="formData.fullName" id="full-name" type="text" required class="w-full p-2 border rounded">
        </div>
        <div>
          <label for="email" class="block">Email</label>
          <input v-model="formData.email" id="email" type="email" required class="w-full p-2 border rounded">
        </div>
        <div>
          <label for="phone" class="block">Телефон</label>
          <input v-model="formData.phone" id="phone" type="tel" required class="w-full p-2 border rounded">
        </div>
        <div>
          <label for="program" class="block">Программа обучения</label>
          <select v-model="formData.program" id="program" required class="w-full p-2 border rounded">
            <option value="">Выберите программу</option>
            <option value="programming">Программирование и разработка ПО</option>
            <option value="security">Кибербезопасность</option>
            <option value="data-science">Анализ данных и ИИ</option>
            <option value="networks">Сетевые и облачные технологии</option>
          </select>
        </div>
        <div>
          <label for="message" class="block">Дополнительная информация</label>
          <textarea v-model="formData.message" id="message" rows="4" class="w-full p-2 border rounded"></textarea>
        </div>
        <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Отправить заявку</button>
      </form>
    </div>
  </div>
</template>
