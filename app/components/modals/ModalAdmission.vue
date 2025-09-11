<template>
	<h2 class="mb-8 w-11/12 text-xl">Подать заявку на поступление</h2>

	<!--TODO: валидация-->
	<form @submit.prevent="submitForm" class="flex flex-col gap-4">
		<div>
			<label for="full-name" class="block">ФИО</label>
			<input v-model="formData.fullName" id="full-name" type="text" required class="w-full rounded border p-2" />
		</div>
		<div>
			<label for="email" class="block">Email</label>
			<input v-model="formData.email" id="email" type="email" required class="w-full rounded border p-2" />
		</div>
		<div>
			<label for="phone" class="block">Телефон</label>
			<input v-model="formData.phone" id="phone" type="tel" inputmode="numeric" required class="w-full rounded border p-2" />
		</div>
		<div>
			<label for="program" class="block">Программа обучения</label>
			<select v-model="formData.program" id="program" required class="w-full rounded border p-2">
				<option value="">Выберите программу</option>
				<option value="programming">Программирование и разработка ПО</option>
				<option value="security">Кибербезопасность</option>
				<option value="data-science">Анализ данных и ИИ</option>
				<option value="networks">Сетевые и облачные технологии</option>
			</select>
		</div>
		<div>
			<label for="message" class="block">Дополнительная информация</label>
			<textarea v-model="formData.message" id="message" rows="4" class="w-full rounded border p-2"></textarea>
		</div>
		<MainButton type="submit" class="mx-auto mt-4 w-full max-w-xs">Отправить заявку</MainButton>
	</form>
</template>

<script setup lang="ts">
import MainButton from '~/components/ui/MainButton.vue';

const formData = reactive({
	fullName: '',
	email: '',
	phone: '',
	program: '',
	message: '',
});

function submitForm() {
	alert(`Форма отправлена:, ${formData}`);
}
</script>
