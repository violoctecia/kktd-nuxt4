<template>
	<transition name="modal-fade">
		<div
			v-if="modal.isOpen"
			@click="modal.closeModal()"
			class="fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-[10px] transition-all duration-300"
		>
			<div class="flex min-h-full w-full items-center justify-center sm:p-6">
				<div class="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-lg bg-background p-4 md:p-6" @click.stop>
					<button @click="modal.closeModal()" class="absolute right-0 top-0 pr-4 pt-4 hover:text-primary md:pr-6 md:pt-6">
						<IconSprite name="close" class="h-8 w-8 cursor-pointer" />
					</button>
					<component :is="modal.content?.component" v-bind="modal.content?.props" />
				</div>
			</div>
		</div>
	</transition>
</template>

<script setup lang="ts">
import IconSprite from '~/components/IconSprite.vue';
import { useModalStore } from '~/store/modalsStore';

const modal = useModalStore();
</script>
