<script setup lang="ts">
import TrackerPanel from "./TrackerPanel.vue";
import { useOptions } from "@/stores/config";
import { storeToRefs } from "pinia";

const optionsStore = useOptions();
const { options } = storeToRefs(optionsStore);

const settings = [
	{ id: "shopsRandomized", src: "/src/assets/images/flags/HarryTPM.png" },
	{ id: "rowfRandomized", src: "/src/assets/images/flags/Rowf.png" },
	{ id: "merlowRandomized", src: "/src/assets/images/flags/Merlow.png" },
	{ id: "keysRandomized", src: "/src/assets/images/flags/OddKey.gif" },
	{ id: "coinsRandomized", src: "/src/assets/images/flags/coin.png" },
	{ id: "coinBlocksRandomized", src: "/src/assets/images/flags/coinblock.png" },
	{ id: "foliageCoinsRandomized", src: "/src/assets/images/flags/bush.png" },
	{
		id: "lettersRandomized",
		src: "/src/assets/images/flags/PM_Letter_Sprite.png"
	},
	{ id: "panelsRandomized", src: "/src/assets/images/flags/Star_Piece.png" },
	{
		id: "dojoRandomized",
		src: "/src/assets/images/icons/TheMasterFirst_PM.png"
	},
	{
		id: "koopaKootRandomized",
		src: "/src/assets/images/flags/KoopaKoot_PM.png"
	},
	{
		id: "tradingEventRandomized",
		src: "/src/assets/images/flags/TradingEvent_PM.png"
	}
];
</script>

<template>
	<TrackerPanel>
		<img
			v-for="setting in settings"
			:key="setting.id"
			:src="setting.src"
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
