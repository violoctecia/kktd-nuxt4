<template>
	<section>
		<div class="head">
			<h1>Управление планами приемов</h1>
			<div class="head__tools">
				<button class="admin-btn" @click="showCreateModal">Создать запись</button>
				<button class="admin-btn" @click="refresh()">Перезагрузить список</button>
			</div>
		</div>
		<div class="content">
			<table class="table" v-if="data?.length && !pending">
				<thead>
					<tr>
						<th scope="col" v-for="key in Object.keys(data?.[0] || {})" :key="key">
							{{ dataKeyAliases[key as keyof AdmissionPlan] || key }}
						</th>
						<th scope="col">Управление</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="item in data" :key="item.id">
						<td v-for="(i, idx) in item" :key="idx">{{ i || '-' }}</td>

						<td>
							<div class="item-tools !flex-nowrap">
								<button class="admin-btn" @click="showEditModal(item)">Редактировать</button>
								<button class="admin-btn red" @click="showDeleteModal(item)">Удалить</button>
							</div>
						</td>
					</tr>
				</tbody>
			</table>
			<LoadingSpinner class="text-blue-500" v-if="pending" />
			<div v-if="error">
				<p>Произошла ошибка:</p>
				<pre>{{ error }}</pre>
			</div>
			<p v-else-if="!data?.length">Записей еще нет</p>
		</div>
	</section>
</template>

<script setup lang="ts">
import type { AdmissionPlan } from '#shared/types';
import LoadingSpinner from '~/components/LoadingSpinner.vue';
import ModalUniversalCRUD from '~/components/admin/ModalUniversalCRUD.vue';
import { useModalStore } from '~/store/modalsStore';

definePageMeta({
	layout: 'admin',
});

const config = useRuntimeConfig();
const backendUrl = config.public.backendUrl;

const { data, error, pending, refresh } = await useFetch<AdmissionPlan[]>(`${backendUrl}/admission-plan`, {
	server: false,
	lazy: true,
});

const dataKeyAliases: Record<keyof AdmissionPlan, string> = {
	id: 'id',
	specialtyId: 'id специальности',
	year: 'Год',
	funding: 'Финансирование',
	price: 'Цена ₽',
	places: 'Кол-во мест',
};

const modal = useModalStore();

const fieldConfig = {
	specialtyId: { type: 'number' },
	year: { type: 'number' },
	funding: { type: 'text' },
	price: { type: 'number' },
	places: { type: 'number' },
};

function showCreateModal() {
	const item: AdmissionPlan = {
		specialtyId: 0,
		year: 2025,
		funding: 'BUDGET',
		price: 0,
		places: 0,
	};

	modal.openModal(ModalUniversalCRUD, {
		item,
		mode: 'create',
		endpoint: 'admission-plan',
		fieldAliases: dataKeyAliases,
		fieldConfig,
	});
}

function showEditModal(item: AdmissionPlan) {
	modal.openModal(ModalUniversalCRUD, {
		item,
		mode: 'update',
		endpoint: 'admission-plan',
		fieldAliases: dataKeyAliases,
		fieldConfig,
	});
}

function showDeleteModal(item: AdmissionPlan) {
	modal.openModal(ModalUniversalCRUD, {
		item,
		mode: 'delete',
		endpoint: 'admission-plan',
		fieldAliases: dataKeyAliases,
		fieldConfig,
	});
}
</script>

<style scoped></style>
