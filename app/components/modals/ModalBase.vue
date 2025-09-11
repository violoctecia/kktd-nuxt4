<template>
	<transition name="modal-fade">
		<div
			v-if="store.currentModal"
			@click="store.close()"
			class="fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-[10px] transition-all duration-300"
		>
			<div class="flex min-h-full w-full items-center justify-center sm:p-6">
				<div class="relative w-full max-w-xl rounded-lg bg-background p-4 md:p-6" @click.stop>
					<button @click="store.close()" class="absolute right-0 top-0 pr-4 pt-4 hover:text-primary">
						<IconSprite name="close" class="h-8 w-8 cursor-pointer" />
					</button>
					<ModalAdmission v-if="store.currentModal === 'admission'" />
				</div>
			</div>
		</div>
	</transition>
</template>

<script setup lang="ts">
import IconSprite from '~/components/IconSprite.vue';
import ModalAdmission from '~/components/modals/ModalAdmission.vue';
import { useModalStore } from '~/store/modalsStore';

const store = useModalStore();
</script>
