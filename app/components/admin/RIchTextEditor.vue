<template>
	<div class="news-editor">
		<div class="toolbar">
			<button
				v-for="level in props.allowedHeadings"
				:key="level"
				type="button"
				@click="setHeading(level)"
				:class="{ active: editor?.isActive('heading', { level }) }"
			>
				Заголовок H{{ level }}
			</button>
			<button type="button" @click="toggleBold" :class="{ active: editor?.isActive('bold') }">Жирный текст</button>
			<button type="button" @click="toggleItalic" :class="{ active: editor?.isActive('italic') }">Курсивный текст</button>
			<button type="button" @click="toggleBulletList" :class="{ active: editor?.isActive('bulletList') }">• Список</button>
			<button type="button" @click="toggleOrderedList" :class="{ active: editor?.isActive('orderedList') }">1. Список</button>
			<button type="button" @click="setLink">Добавить ссылку</button>
		</div>

		<editor-content :editor="editor" class="html-content" />
	</div>
</template>

<script setup lang="ts">
import HardBreak from '@tiptap/extension-hard-break';
import Link from '@tiptap/extension-link';
import StarterKit from '@tiptap/starter-kit';
import { EditorContent, useEditor } from '@tiptap/vue-3';

const props = defineProps({
	modelValue: {
		type: String,
		default: '',
	},
	allowedHeadings: {
		type: Array as () => (2 | 3)[],
		default: () => [2, 3],
	},
});

const emit = defineEmits(['update:modelValue']);

const editor = useEditor({
	extensions: [
		StarterKit.configure({
			heading: { levels: props.allowedHeadings },
			link: false,
			hardBreak: false,
		}),
		Link,
		HardBreak,
	],
	content: props.modelValue || '<p>Начните писать текст...</p>',
	onUpdate({ editor }) {
		emit('update:modelValue', editor.getHTML());
	},
});

watch(
	() => props.modelValue,
	(val) => {
		if (val !== editor.value?.getHTML()) {
			editor.value?.commands.setContent(val || '');
		}
	},
);

// Toolbar функции
function toggleBold() {
	editor.value?.chain().focus().toggleBold().run();
}

function toggleItalic() {
	editor.value?.chain().toggleItalic().run();
}

function setHeading(level: 2 | 3) {
	editor.value?.chain().toggleHeading({ level }).run();
}

function toggleBulletList() {
	editor.value?.chain().toggleBulletList().run();
}

function toggleOrderedList() {
	editor.value?.chain().toggleOrderedList().run();
}

function setLink() {
	const previousUrl = editor.value?.getAttributes('link').href || '';
	const url = prompt('Введите адрес ссылки', previousUrl);
	if (url === null) return;

	if (url === '') {
		editor.value?.chain().focus().unsetLink().run();
	} else {
		editor.value?.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
	}
}
</script>

<style lang="scss">
.news-editor {
	.toolbar {
		@apply mb-2 flex flex-row flex-wrap gap-2 border-b pb-6;

		button {
			@apply rounded bg-gray-200 px-2 py-1 text-sm;

			&.active {
				@apply bg-gray-300;
			}
		}
	}
}
</style>
