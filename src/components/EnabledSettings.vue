<script setup lang="ts">
import TrackerPanel from "./TrackerPanel.vue";
import { useOptions } from "@/stores/config";
import { storeToRefs } from "pinia";
import type { Options } from "@/stores/config";

const optionsStore = useOptions();
const { options } = storeToRefs(optionsStore);

const settings: { id: keyof Options; src: string }[] = [
	{ id: "shopsRandomized", src: "flags/HarryTPM.png" },
	{ id: "rowfRandomized", src: "flags/Rowf.png" },
	{ id: "merlowRandomized", src: "flags/Merlow.png" },
	{ id: "keysRandomized", src: "flags/OddKey.gif" },
	{ id: "coinsRandomized", src: "flags/coin.png" },
	{ id: "coinBlocksRandomized", src: "flags/coinblock.png" },
	{ id: "foliageCoinsRandomized", src: "flags/bush.png" },
	{
		id: "lettersRandomized",
		src: "flags/PM_Letter_Sprite.png",
	},
	{ id: "panelsRandomized", src: "flags/Star_Piece.png" },
	{
		id: "dojoRandomized",
		src: "icons/TheMasterFirst_PM.png",
	},
	{
		id: "koopaKootRandomized",
		src: "flags/KoopaKoot_PM.png",
	},
	{
		id: "tradingEventRandomized",
		src: "flags/TradingEvent_PM.png",
	},
	{
		id: "superBlocksRandomized",
		src: "icons/UltraStone.gif",
	},
	{
		id: "multicoinBlocksRandomized",
		src: "flags/brick.png",
	},
];

function getImageUrl(image: string) {
	return new URL(`../assets/images/${image}`, import.meta.url).href;
}

const { moving, removePanel } = defineProps<{
	moving: boolean;
	removePanel: () => void;
}>();
</script>

<template>
	<TrackerPanel
		padding="0.4rem 1rem"
		:moving="moving"
		:remove-panel="removePanel"
	>
		<div class="wrapper">
			<div class="flex">
				<img
					v-for="setting in settings"
					:key="setting.id"
					:src="getImageUrl(setting.src)"
					:class="{ hide: !options[setting.id] }"
				/>
			</div>
		</div>
	</TrackerPanel>
</template>

<style scoped>
div.wrapper {
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
}

div.flex {
	display: flex;
	flex-direction: row;
	justify-content: center;
	gap: 1px;
	width: 100%;
}

img {
	object-fit: contain;
	/* aspect-ratio: 1; */
	/* height: 100%; */
	height: 3rem;
}

img.hide {
	display: none;
}
</style>
