<template>
    <SvgIcon :name="name" />
</template>

<script setup lang="ts">
import { SvgIcon } from '#components';

defineProps<{ name: string }>();
</script>
