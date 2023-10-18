<script setup lang="ts">
import { ref, computed } from "vue";
import TrackableItem from "./TrackableItem.vue";
import { usePlaythrough } from "../stores/playthrough";
import ItemTracker from "./ItemTracker.vue";
import type { TrackableItemInfo } from "../types/items";

const tooltip = ref("");
const playthrough = usePlaythrough();

const props = defineProps<{ allItems: TrackableItemInfo[] }>();

const requiredItems = computed(() =>
	props.allItems.filter((el) =>
		["chapterReward", "partner", "equipment", "required"].includes(el.type)
	)
);

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
		heading="Required Items"
		:tooltip="tooltip"
	>
		<div class="rows">
			<div
				class="gridrow"
				v-for="chapter in [1, 2, 3, 4, 5, 6, 7, 8, 16, 0, -1]"
				:key="chapter"
			>
				<TrackableItem
					v-for="(item, index) in requiredItems.filter(
						(el) => el.chapter === chapter
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
	</ItemTracker>
</template>

<style scoped>
div.grid {
	display: grid;
	grid-template-columns: repeat(7, minmax(0, 1fr));
}

div.rows {
	display: flex;
	flex-direction: column;
	row-gap: 0.5rem;
}

div.gridrow {
	display: grid;
	grid-template-columns: repeat(8, minmax(0, 1fr));
	align-items: center;
}

div.gridrow > div {
	width: 100%;
	height: 5rem;
	position: relative;
}

img.hide {
	display: none;
}
</style>
