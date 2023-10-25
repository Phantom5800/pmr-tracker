<script setup lang="ts">
import axios from "axios";
import { ref, defineEmits, onMounted } from "vue";
import { useOptions } from "@/stores/config";
import { usePlaythrough } from "@/stores/playthrough";
import type { Options } from "@/stores/config";
import type { SettingsApiData } from "@/types/settings";

const optionsStore = useOptions();
const loadingApiResponse = ref(false);
const seedToLoad = ref("");
const errorMessage = ref("");
const seedInput = ref<HTMLInputElement>(null);

const emit = defineEmits(["seedImported"]);

onMounted(() => {
	seedInput.value.focus();
});

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
		}[data.StartingMap.toString()] ?? "Toad Town" // default to Toad Town if Random Pick or unknown
	);
	optionsStore.setValue("superBlocksRandomized", data.ShuffleBlocks);
	optionsStore.setValue("toyboxOpen", data.ToyboxOpen);
	optionsStore.setValue("tradingEventRandomized", data.IncludeRadioTradeEvent);
	optionsStore.setValue("whaleOpen", data.WhaleOpen);
	errorMessage.value = "";
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
				errorMessage.value = `Unknown error - please see the browser console and report this!`;
				console.error(result);
			}
		})
		.catch((err) => {
			if (
				axios.isAxiosError(err) &&
				err.response &&
				err.response.status === 404
			) {
				errorMessage.value = `Could not find seed ${id}. Ensure it is correct and try again.`;
			} else if (
				axios.isAxiosError(err) &&
				err.response &&
				err.response.status.toString().startsWith("5")
			) {
				errorMessage.value = `Server error (code ${err.code})`;
				console.error(err);
			} else {
				errorMessage.value = `Unknown error - please see the browser console and report this!`;
				console.error(err);
			}
		})
		.finally(() => {
			loadingApiResponse.value = false;
		});
}
</script>

<template>
	<div class="import">
		<form @submit.prevent="fetchSeedSettings(seedToLoad)">
			<p>
				Paste the ID from the pm64randomizer.com URL to import the settings to
				the tracker.
			</p>
			<p class="url">
				https://pm64randomizer.com/seed?id=<input
					required
					type="text"
					class="id"
					v-model="seedToLoad"
					placeholder="123456789"
					ref="seedInput"
				/>
			</p>
			<p>
				This will overwrite your current settings, but it will not reset the
				tracker.
			</p>

			<button class="importButton">Import</button>
		</form>
		<p class="error" v-if="errorMessage">{{ errorMessage }}</p>
	</div>
</template>

<style scoped>
.import {
	font-size: large;
	max-width: 50ch;
	text-align: center;
}

.url {
	margin-block: 1rem;
}

.id {
	border-radius: 8px;
	padding: 0.5rem;
	border: 2px solid rgb(255, 0, 0);
	background-color: white;
}

.id:valid {
	border: 2px solid transparent;
}

.importButton {
	font-size: 2rem;
	margin-top: 1rem;
	padding: 0.5rem;
}

.error {
	margin-top: 1rem;
	background-color: rgb(255, 200, 200);
	color: black;
	padding: 1rem;
	border-radius: 8px;
	border: 2px solid red;
}
</style>
