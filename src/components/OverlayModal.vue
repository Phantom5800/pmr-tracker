<script setup lang="ts">
import { vOnClickOutside } from "@vueuse/components";
import { defineEmits, defineProps } from "vue";

defineEmits(["close"]);
const { title } = defineProps<{ title?: string }>();
</script>

<template>
	<div class="mask">
		<div v-on-click-outside="() => $emit('close')" class="modal">
			<div class="header">
				<h2>{{ title }}</h2>
				<div class="close" @click="() => $emit('close')">X</div>
			</div>
			<slot></slot>
		</div>
	</div>
</template>

<style scoped>
.mask {
	position: fixed;
	z-index: 9998;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.4);
	transition: opacity 0.3s;
	display: grid;
	place-items: center;
}

.header {
	display: flex;
	flex-flow: row nowrap;
	justify-content: space-between;
	font-size: 1.2rem;
	margin-bottom: 1rem;
}

.close {
	height: 2rem;
	width: 2rem;
	cursor: pointer;
	display: grid;
	font-weight: bold;
	place-items: center;
}

.modal {
	position: relative;
	padding: 2rem;
	min-height: 2rem;
	max-height: 80%;
	max-width: 95%;
	overflow: auto;
	min-width: 2rem;
	background-color: rgb(0, 40, 80);
	border-radius: 12px;
	border: 4px solid rgb(100, 140, 180);
	box-shadow: 0px 0px 20px 12px black;
}
</style>
