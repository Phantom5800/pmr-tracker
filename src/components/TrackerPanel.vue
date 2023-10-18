<script setup lang="ts">
import { useOptions } from "@/stores/config";

const options = useOptions();

const { widthRem, padding } = defineProps<{
	widthRem?: number;
	resizable?: boolean;
	padding?: string;
}>();
</script>

<template>
	<div
		:style="{
			width: `${widthRem}rem !important`,
			padding: padding || '1rem',
			backgroundColor: options.$state.options.sectionColor
		}"
	>
		<slot></slot>
	</div>
</template>

<style scoped>
div {
	margin: 5px;
	border-radius: 10px;
	float: left;
	text-align: center;
	width: 100%;
	height: 100%;
}
</style>
