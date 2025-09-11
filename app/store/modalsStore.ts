import type { ModalType } from '#shared/types';
import { defineStore } from 'pinia';

export const useModalStore = defineStore('modal', () => {
	const currentModal = ref<ModalType | null>(null);

	function open(type: ModalType) {
		currentModal.value = type;
	}

	function close() {
		currentModal.value = null;
	}

	return { open, close, currentModal };
});
