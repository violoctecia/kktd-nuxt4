<template>
	<div class="my-8 md:my-12">
		<ul itemscope itemtype="https://schema.org/BreadcrumbList" class="flex items-center gap-2">
			<li
				v-for="(i, idx) in items"
				:key="idx"
				itemprop="itemListElement"
				itemscope
				itemtype="https://schema.org/ListItem"
				class="breadcrumbs__item"
			>
				<template v-if="idx !== items.length - 1">
					<nuxt-link :to="i.href" itemprop="item">
						<span itemprop="name">{{ i.label }}</span>
						<meta itemprop="position" :content="`${idx + 1}`" />
					</nuxt-link>
				</template>
				<template v-else>
					<div class="current">
						<span itemprop="name">{{ i.label }}</span>
						<meta itemprop="position" :content="`${idx + 1}`" />
					</div>
				</template>
			</li>
		</ul>
	</div>
</template>

<script setup lang="ts">
interface BreadcrumbItem {
	label: string;
	href?: string;
}

defineProps<{ items: BreadcrumbItem[] }>();
</script>

<style lang="scss">
.breadcrumbs__item {
	@apply relative block max-w-[400px] overflow-hidden text-ellipsis whitespace-nowrap text-black hover:text-primary;
}

.breadcrumbs__item {
	.current {
		color: $primary;
	}

	&:not(:first-child) {
		padding-left: 14px;

		&::before {
			content: '';
			position: absolute;
			width: 3px;
			height: 3px;
			background-color: $primary;
			border-radius: 50%;
			left: 3px;
			top: 12px;
		}
	}
}
</style>
