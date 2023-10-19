<script setup lang="ts">
import { useOptions } from "@/stores/config";

const options = useOptions();

const { padding } = defineProps<{
	padding?: string;
}>();
</script>

<template>
	<div
		class="container"
		:style="{
			padding: padding || '1rem',
			backgroundColor: options.$state.options.sectionColor
		}"
	>
		<div class="drag-handle"></div>
		<slot></slot>
	</div>
</template>

<style scoped>
div.container {
	overflow: hidden;
	border-radius: 10px;
	text-align: center;
	width: 100%;
	height: 100%;
}

div.drag-handle {
	background-color: red;
	width: 2rem;
	height: 2rem;
}
</style>
