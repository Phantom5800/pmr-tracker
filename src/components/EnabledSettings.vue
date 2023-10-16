<script setup lang="ts">
import TrackerPanel from "./TrackerPanel.vue";
import { useOptions } from "@/stores/config";
import { storeToRefs } from "pinia";

const optionsStore = useOptions();
const { options } = storeToRefs(optionsStore);

const settings = [
	{ id: "shopsRandomized", src: "flags/HarryTPM.png" },
	{ id: "rowfRandomized", src: "flags/Rowf.png" },
	{ id: "merlowRandomized", src: "flags/Merlow.png" },
	{ id: "keysRandomized", src: "flags/OddKey.gif" },
	{ id: "coinsRandomized", src: "flags/coin.png" },
	{ id: "coinBlocksRandomized", src: "flags/coinblock.png" },
	{ id: "foliageCoinsRandomized", src: "flags/bush.png" },
	{
		id: "lettersRandomized",
		src: "flags/PM_Letter_Sprite.png"
	},
	{ id: "panelsRandomized", src: "flags/Star_Piece.png" },
	{
		id: "dojoRandomized",
		src: "icons/TheMasterFirst_PM.png"
	},
	{
		id: "koopaKootRandomized",
		src: "flags/KoopaKoot_PM.png"
	},
	{
		id: "tradingEventRandomized",
		src: "flags/TradingEvent_PM.png"
	}
];

function getImageUrl(image: string) {
	const relativeUrl = `../assets/images/${image}`;
	return new URL(relativeUrl, import.meta.url).href;
}
</script>

<template>
	<TrackerPanel>
		<img
			v-for="setting in settings"
			:key="setting.id"
			:src="getImageUrl(setting.src)"
			:class="{ hide: !options[setting.id] }"
		/>
	</TrackerPanel>
</template>

<style scoped>
img {
	height: 45px;
}

img.hide {
	display: none;
}
</style>
