<script setup lang="ts">
import { usePlaythrough } from "@/stores/playthrough";
import { storeToRefs } from "pinia";

const playthroughStore = usePlaythrough();
const { items, checks } = storeToRefs(playthroughStore);
const { item, src, multiple, label, shrink } = defineProps<{
	item: string;
	src: string;
	multiple?: number;
	label?: string;
	shrink?: boolean;
}>();
</script>

<template>
	<div
		:class="{
			fade: !playthroughStore.hasItem(item),
			shrink: shrink
		}"
		@click="playthroughStore.toggleItem(item)"
	>
		<img :src="src" :alt="item" />
		<p class="label" v-if="label">{{ label }}</p>
		<p class="count" v-if="multiple">
			{{ playthroughStore.itemCount(item) + "/" + multiple }}
		</p>
	</div>
</template>

<style scoped>
div {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	image-rendering: crisp-edges;
}

img {
	width: 100%;
	height: 100%;
	object-fit: contain;
}

p.label {
	position: absolute;
	bottom: 4px;
	right: 4px;
}

.shrink > img {
	width: 60%;
	height: 60%;
}
.fade > img {
	filter: grayscale(1) brightness(50%);
}

.glow {
	filter: grayscale(0.6) brightness(80%) drop-shadow(0px 0px 5px white);
}
</style>
