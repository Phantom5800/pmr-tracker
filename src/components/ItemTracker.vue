<script setup lang="ts">
import TrackerPanel from "./TrackerPanel.vue";
import { ref, computed, toRef, watch, toRefs } from "vue";
import TrackableItem from "./TrackableItem.vue";
import { usePlaythrough } from "../stores/playthrough";
import type { TrackableItemInfo } from "../types/items.ts";

const props = defineProps<{
	heading: string;
	tooltip?: string;
	itemTypes?: string[];
	allItems: TrackableItemInfo[];
}>();

const tooltipRef = ref("");

const playthrough = usePlaythrough();

const { heading, itemTypes } = toRefs(props);

const trackerItems = computed(() => {
	const filteredItems = props.allItems.filter(
		(el) => itemTypes.value && itemTypes.value.includes(el.type)
	);
	return filteredItems.sort(
		(a, b) =>
			Number(b.type === "chapterReward") - Number(a.type === "chapterReward")
	);
});

function equipmentTooltip(item: string) {
	if (item === "Boots" || item === "Hammer") {
		const _ultra = `Ultra ${item}`;
		const _super = `Super ${item}`;
		return playthrough.hasItem(_ultra)
			? _ultra
			: playthrough.hasItem(_super)
			? _super
			: item;
	} else {
		return item;
	}
}
</script>

<template>
	<TrackerPanel>
		<div class="flex-header">
			<h2>{{ heading }}</h2>
			<span>{{ props.tooltip || tooltipRef }}</span>
		</div>
		<slot>
			<div class="grid">
				<div
					class="grid-item"
					v-for="item in trackerItems"
					:key="item.name"
					@click="tooltipRef = equipmentTooltip(item.name)"
					@contextmenu="tooltipRef = equipmentTooltip(item.name)"
					@mouseover="tooltipRef = equipmentTooltip(item.name)"
					@mouseout="tooltipRef = ''"
				>
					<TrackableItem :info="item" :hover-tooltip="item.hoverTooltip" />
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
	/* flex-direction: row; */
	/* flex-wrap: wrap; */
	/* grid-template-columns: repeat(8, minmax(0, 1fr)); */
	grid-template-columns: repeat(auto-fill, minmax(3.6rem, 1fr));
	/* grid-auto-flow: column; */
	gap: 1rem;
	resize: horizontal;
}

div.grid-item {
	aspect-ratio: 1;
	/* min-width: 3.5rem;
	max-width: 4rem; */
	/* flex-grow: 1;
	flex-shrink: 0;
	flex-basis: 0; */
}
</style>
