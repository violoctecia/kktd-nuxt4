<template>
	<h2 class="mb-8 w-11/12 text-xl">Подать заявку на поступление</h2>

	<form @submit.prevent="submitForm" class="flex flex-col gap-4">
		<div>
			<label for="full-name" class="block">ФИО</label>
			<input
				v-model="formData.fullName"
				id="full-name"
				type="text"
				placeholder="Иванов Иван Иванович"
				class="w-full rounded border p-2 placeholder:text-gray-400 focus:border-blue-500 focus:ring focus:ring-blue-200"
			/>
			<p v-if="errors.fullName" class="mt-1 text-sm text-red-500">{{ errors.fullName }}</p>
		</div>

		<div>
			<label for="email" class="block">Email</label>
			<input
				v-model="formData.email"
				id="email"
				type="email"
				placeholder="example@mail.com"
				class="w-full rounded border p-2 placeholder:text-gray-400 focus:border-blue-500 focus:ring focus:ring-blue-200"
			/>
			<p v-if="errors.email" class="mt-1 text-sm text-red-500">{{ errors.email }}</p>
		</div>

		<div>
			<label for="phone" class="block">Телефон</label>
			<input
				v-model="formData.phone"
				@input="formatPhone"
				id="phone"
				type="tel"
				placeholder="+7 912 345 67 89"
				inputmode="numeric"
				class="w-full rounded border p-2 placeholder:text-gray-400 focus:border-blue-500 focus:ring focus:ring-blue-200"
			/>
			<p v-if="errors.phone" class="mt-1 text-sm text-red-500">{{ errors.phone }}</p>
		</div>

		<div>
			<label for="program" class="block">Программа обучения</label>
			<select
				v-model="formData.program"
				id="program"
				class="w-full rounded border p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
			>
				<option value="">Выберите программу</option>
				<option value="programming">Программирование и разработка ПО</option>
				<option value="security">Кибербезопасность</option>
				<option value="data-science">Анализ данных и ИИ</option>
				<option value="networks">Сетевые и облачные технологии</option>
			</select>
			<p v-if="errors.program" class="mt-1 text-sm text-red-500">{{ errors.program }}</p>
		</div>

		<div>
			<label for="message" class="block">Дополнительная информация</label>
			<textarea
				v-model="formData.message"
				id="message"
				rows="4"
				placeholder="Например: у меня есть опыт работы с Python и SQL"
				class="w-full rounded border p-2 placeholder:text-gray-400 focus:border-blue-500 focus:ring focus:ring-blue-200"
			></textarea>
		</div>

		<MainButton type="submit" class="mx-auto mt-4 w-full max-w-xs">Отправить заявку</MainButton>
	</form>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import MainButton from '~/components/ui/MainButton.vue';

const formData = reactive({
	fullName: '',
	email: '',
	phone: '',
	program: '',
	message: '',
});

const errors = reactive({
	fullName: '',
	email: '',
	phone: '',
	program: '',
});

function formatPhone() {
	if (formData.phone.startsWith('8')) {
		formData.phone = '+7' + formData.phone.slice(1);
	}
}

function validate() {
	let valid = true;

	const nameRegex = /^[А-Яа-яЁё\s-]+$/;
	if (!formData.fullName.trim()) {
		errors.fullName = 'ФИО обязательно для заполнения';
		valid = false;
	} else if (!nameRegex.test(formData.fullName.trim())) {
		errors.fullName = 'ФИО может содержать только буквы и пробелы';
		valid = false;
	} else {
		errors.fullName = '';
	}

	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!formData.email.trim()) {
		errors.email = 'Email обязателен';
		valid = false;
	} else if (!emailRegex.test(formData.email)) {
		errors.email = 'Введите корректный email';
		valid = false;
	} else {
		errors.email = '';
	}

	const phoneRegex = /^\+?\d{10,15}$/;
	const phoneNumber = formData.phone.replace(/\D/g, '');
	if (!formData.phone.trim()) {
		errors.phone = 'Телефон обязателен';
		valid = false;
	} else if (!phoneRegex.test('+' + phoneNumber)) {
		errors.phone = 'Введите корректный телефон';
		valid = false;
	} else {
		errors.phone = '';
	}

	if (!formData.program) {
		errors.program = 'Выберите программу';
		valid = false;
	} else {
		errors.program = '';
	}

	return valid;
}

function submitForm() {
	if (validate()) {
		alert('Форма успешно отправлена!');
		console.log({ ...formData });
	}
}
</script>
