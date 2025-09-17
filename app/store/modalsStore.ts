import { defineStore } from 'pinia';
import { markRaw, ref } from 'vue';

type ModalContent = {
	component: any;
	props?: Record<string, any>;
};

export const useModalStore = defineStore('modal', () => {
	const isOpen = ref(false);
	const content = ref<ModalContent | null>(null);

	function openModal(component: any, props?: Record<string, any>) {
		content.value = { component: markRaw(component), props };
		isOpen.value = true;
	}

	function closeModal() {
		isOpen.value = false;
		content.value = null;
	}

	return {
		isOpen,
		content,
		openModal,
		closeModal,
	};
});
