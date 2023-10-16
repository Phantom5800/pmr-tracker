<script setup lang="ts">
import TrackerPanel from "./TrackerPanel.vue";
import { ref, computed, toRef, watch, toRefs } from "vue";
import TrackableItem from "./TrackableItem.vue";
import { usePlaythrough } from "../stores/playthrough";
import type { TrackableItemInfo } from "../types/items.ts";
import { allItems } from "@/data/items";

const props = defineProps<{
	heading: string;
	tooltip?: string;
	itemTypes?: string[];
}>();

const tooltipRef = ref("");

const { heading, tooltip, itemTypes } = toRefs(props);

const trackerItems = computed(() => {
	const filteredItems = allItems.filter(
		(el) => itemTypes.value && itemTypes.value.includes(el.type)
	);
	return filteredItems.sort(
		(a, b) =>
			Number(b.type === "chapterReward") - Number(a.type === "chapterReward")
	);
});
</script>

<template>
	<TrackerPanel>
		<div class="flex-header">
			<h2>{{ heading }}</h2>
			<span>{{ tooltip || tooltipRef }}</span>
		</div>
		<slot>
			<div class="grid">
				<div
					class="grid-item"
					v-for="item in trackerItems"
					:key="item.name"
					@mouseover="tooltip = item.name"
					@mouseout="tooltip = ''"
				>
					<TrackableItem :info="item" />
				</div>
			</div>
		</slot>
	</TrackerPanel>
</template>

<style scoped>
div.flex-header {
	color: white;
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 1rem;
}

h2 {
	margin: 0;
}

div.grid {
	display: grid;
	grid-template-columns: repeat(8, minmax(0, 1fr));
	gap: 1rem;
}

div.grid-item {
	height: 4rem;
}
</style>
