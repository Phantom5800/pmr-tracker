<script setup lang="ts">
import axios from "axios";
import { ref, defineEmits } from "vue";
import { useOptions } from "@/stores/config";
import { usePlaythrough } from "@/stores/playthrough";
import type { Options } from "@/stores/config";
import type { SettingsApiData } from "@/types/settings";

const optionsStore = useOptions();
const loadingApiResponse = ref(false);
const seedToLoad = ref("");

const emit = defineEmits(["seedImported"]);

function setRandomizerSettingsFromApiResponse(data: SettingsApiData) {
	optionsStore.setValue("blueHouseOpen", data.BlueHouseOpen);
	optionsStore.setValue("coinBlocksRandomized", data.IncludeCoinsBlocks);
	optionsStore.setValue("coinsRandomized", data.IncludeCoinsOverworld);
	optionsStore.setValue("dojoRandomized", data.IncludeDojo);
	optionsStore.setValue("fastBowserCastle", data.BowsersCastleMode >= 1);
	optionsStore.setValue("foliageCoinsRandomized", data.IncludeCoinsFoliage);
	optionsStore.setValue("forestOpen", data.ForeverForestOpen);
	optionsStore.setValue("keysRandomized", data.KeyitemsOutsideDungeon);
	optionsStore.setValue("koopaKootRandomized", data.IncludeFavorsMode >= 1);
	optionsStore.setValue("kootCoinsRandomized", data.IncludeCoinsFavors);
	optionsStore.setValue("lettersRandomized", data.IncludeLettersMode >= 1);
	optionsStore.setValue("merlowRandomized", data.ProgressionOnMerlow);
	optionsStore.setValue("mtRuggedOpen", data.MtRuggedOpen);
	optionsStore.setValue("multicoinBlocksRandomized", data.ShuffleBlocks);
	optionsStore.setValue("panelsRandomized", data.IncludePanels);
	optionsStore.setValue("powerStarHunt", data.StarHunt);
	optionsStore.setValue("powerStarNum", data.StarHuntRequired);
	optionsStore.setValue("prologueOpen", data.PrologueOpen);
	optionsStore.setValue("rowfRandomized", data.ProgressionOnRowf);
	optionsStore.setValue("sSkip", data.StarHuntEndsGame);
	optionsStore.setValue("seedsRequired", data.MagicalSeedsRequired);
	optionsStore.setValue("shiverBridgeVisible", data.Ch7BridgeVisible);
	optionsStore.setValue("shopsRandomized", data.IncludeShops);
	optionsStore.setValue(
		"startingLocation",
		{
			65796: "Toad Town",
			257: "Goomba Village",
			590080: "Dry Dry Outpost",
			1114882: "Yoshi Village",
			4294967295: "Toad Town", // default to Toad Town if Random Pick
		}[data.StartingMap.toString()] as string
	);
	optionsStore.setValue("superBlocksRandomized", data.ShuffleBlocks);
	optionsStore.setValue("toyboxOpen", data.ToyboxOpen);
	optionsStore.setValue("tradingEventRandomized", data.IncludeRadioTradeEvent);
	optionsStore.setValue("whaleOpen", data.WhaleOpen);
	emit("seedImported");
}

function fetchSeedSettings(id: string) {
	if (loadingApiResponse.value) {
		return;
	}
	loadingApiResponse.value = true;
	axios
		.get(
			`https://paper-mario-randomizer-server.ue.r.appspot.com/randomizer_settings/${id}`
		)
		.then((result) => {
			if (result && result.data) {
				setRandomizerSettingsFromApiResponse(result.data);
			} else {
				alert(
					`Unknown error - please see the browser console and report this!`
				);
				console.error(result);
			}
		})
		.catch((err) => {
			if (
				axios.isAxiosError(err) &&
				err.response &&
				err.response.status === 404
			) {
				alert(`Could not find seed ${id}. Ensure it is correct and try again.`);
			} else if (
				axios.isAxiosError(err) &&
				err.response &&
				err.response.status.toString().startsWith("5")
			) {
				alert(`Server error (code ${err.code})`);
				console.error(err);
			} else {
				alert(
					`Unknown error - please see the browser console and report this!`
				);
				console.error(err);
			}
		})
		.finally(() => {
			loadingApiResponse.value = false;
		});
}
</script>

<template>
	<input type="text" name="importSeed" id="importSeed" v-model="seedToLoad" />
	<button @click="fetchSeedSettings(seedToLoad)">Import</button>
</template>

<style scoped></style>
