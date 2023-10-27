<script setup lang="ts">
import { ref, computed } from "vue";
import TrackableItem from "./TrackableItem.vue";
import { usePlaythrough } from "../stores/playthrough";
import { useOptions } from "@/stores/config";
import ItemTracker from "./ItemTracker.vue";
import type { TrackableItemInfo } from "../types/items";

const tooltip = ref("");
const playthrough = usePlaythrough();
const options = useOptions();

const props = defineProps<{
	allItems: TrackableItemInfo[];
	moving: boolean;
	removePanel: () => void;
}>();

const requiredItems = computed(() =>
	props.allItems.filter(el =>
		["chapterReward", "partner", "equipment", "required"].includes(el.type)
	)
);

const chapterRows = computed(() => {
	if (options.getValue("powerStarHunt")) {
		return [1, 2, 3, 4, 5, 6, 7, 16, 0, -1];
	} else {
		return [1, 2, 3, 4, 5, 6, 7, 8, 0, -1];
	}
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
	<ItemTracker
		:all-items="allItems"
		:moving="props.moving"
		heading="Required Items"
		:tooltip="tooltip"
		:item-types="['required', 'chapterReward', 'partner', 'equipment']"
		:removePanel="props.removePanel"
	>
		<div class="container">
			<div class="rows">
				<div class="gridrow" v-for="chapter in chapterRows" :key="chapter">
					<TrackableItem
						v-for="(item, index) in requiredItems.filter(
							el => el.chapter === chapter
						)"
						:key="item.name"
						:info="item"
						:size="1 <= chapter && chapter <= 8 && index > 0 ? '55%' : '100%'"
						@click="tooltip = equipmentTooltip(item.name)"
						@contextmenu="tooltip = equipmentTooltip(item.name)"
						@mouseover="tooltip = equipmentTooltip(item.name)"
						@mouseout="tooltip = ''"
					/>
				</div>
			</div>
		</div>
	</ItemTracker>
</template>

<style scoped>
div.container {
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
}

div.rows {
	display: grid;
	grid-template-rows: repeat(10, 1fr);
	justify-content: center;
	row-gap: 0.5rem;
	height: 100%;
	width: 100%;
}

div.gridrow {
	display: grid;
	grid-template-columns: repeat(8, minmax(0, 1fr));
	align-items: center;
	flex: 1;
	min-height: 0;
}

div.gridrow > div {
	aspect-ratio: 1 / 1;
}
</style>
