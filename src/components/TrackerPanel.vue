<script setup lang="ts">
import { useOptions } from "@/stores/config";

const options = useOptions();

const { widthRem } = defineProps<{ widthRem?: number; resizable?: boolean }>();
</script>

<template>
	<div
		:style="{
			width: `${widthRem}rem !important`,
			backgroundColor: options.$state.options.sectionColor
		}"
	>
		<slot></slot>
	</div>
</template>

<style scoped>
div {
	margin: 5px;
	padding: 1rem;
	border-radius: 10px;
	float: left;
	text-align: center;
	width: 40rem;
}
</style>
