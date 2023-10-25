<script setup lang="ts">
import { vOnClickOutside } from "@vueuse/components";
import { defineEmits } from "vue";

defineEmits(["close"]);
</script>

<template>
	<div class="mask">
		<div class="modal" v-on-click-outside="() => $emit('close')">
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

.modal {
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
