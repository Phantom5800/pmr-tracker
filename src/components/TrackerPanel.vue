<script setup lang="ts">
const { widthRem } = defineProps<{ widthRem?: number }>();
</script>

<template>
	<div :style="{ width: `${widthRem}rem !important` }">
		<slot></slot>
	</div>
</template>

<style scoped>
div {
	background-color: rgb(35, 35, 59);
	margin: 5px;
	padding: 1rem;
	border-radius: 10px;
	float: left;
	text-align: center;
	width: 40rem;
}
</style>
