<script setup lang="ts">
import { useOptions } from "@/stores/config";

const options = useOptions();

const { padding } = defineProps<{
	padding?: string;
	moving: boolean;
}>();
</script>

<template>
	<section
		:style="{
			padding: padding || '1rem',
			backgroundColor: options.$state.options.sectionColor,
			scale: moving ? 1.01 : undefined,
			boxShadow: moving ? 'rgba(0, 0, 0, 0.5) 0 0 1em 0.2em' : undefined
		}"
	>
		<header v-if="$slots.header || moving">
			<div v-if="moving" class="drag-handle">
				<div class="circle" v-for="_ in Array(6)"></div>
			</div>
			<slot name="header"></slot>
		</header>
		<div
			class="content"
			:style="{
				opacity: moving ? 0.5 : 1,
				pointerEvents: moving ? 'none' : undefined
			}"
		>
			<slot></slot>
		</div>
	</section>
</template>

<style scoped>
section {
	overflow: hidden;
	border-radius: 10px;
	text-align: center;
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
	transition:
		scale 0.5s,
		box-shadow 0.5s;
}

header {
	display: flex;
	flex-direction: row;
	gap: 1rem;
	padding: 0.5rem;
	flex-grow: 0;
}

div.drag-handle {
	/* background-color: red; */
	width: 1rem;
	height: 2rem;
	display: grid;
	grid-template-columns: 1fr 1fr;
}

div.circle {
	border-radius: 9999px;
	aspect-ratio: 1;
	background: #ffffff;
	width: 4px;
	height: 4px;
}

div.content {
	width: 100%;
	flex-grow: 1;
}
</style>
