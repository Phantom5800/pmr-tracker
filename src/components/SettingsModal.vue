<script setup lang="ts">
import { usePlaythrough } from "@/stores/playthrough";
import { useOptions } from "@/stores/config";
import { ref } from "vue";
import MenuOptions from "./MenuOptions.vue";
import axios from "axios";
import { vOnClickOutside } from "@vueuse/components";
import type { OptionsValues } from "@/stores/config";
import type { SettingsApiData } from "@/types/settings";

const playthroughStore = usePlaythrough();
const optionsStore = useOptions();

const importButton = ref<HTMLInputElement | null>(null);
const seedToLoad = ref("0");
const showingSeedSettings = ref(false);

const props = defineProps<{
	isOpen: boolean;
	optionsKeys: (keyof OptionsValues)[];
	close: () => void;
}>();

function doWithPrompt(prompt: string, fn: () => void): void {
	if (confirm(prompt)) {
		fn();
	}
}

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
			4294967295: "Toad Town" // default to Toad Town if Random Pick
		}[data.StartingMap.toString()]
	);
	optionsStore.setValue("superBlocksRandomized", data.ShuffleBlocks);
	optionsStore.setValue("toyboxOpen", data.ToyboxOpen);
	optionsStore.setValue("tradingEventRandomized", data.IncludeRadioTradeEvent);
	optionsStore.setValue("whaleOpen", data.WhaleOpen);
}

function fetchSeedSettings(id: string) {
	if (confirm("Are you sure you want to overwrite your randomizer settings?")) {
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
				if (axios.isAxiosError(err) && err.response.status === 404) {
					alert(
						`Could not find seed ${id}. Ensure it is correct and try again.`
					);
				} else if (
					axios.isAxiosError(err) &&
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
			});
	}
}
</script>

<template>
	<div
		:class="[{ 'options-open': props.isOpen }, 'panel']"
		v-on-click-outside="
			() => {
				if (props.isOpen) {
					props.close();
				}
			}
		"
	>
		<div class="flex">
			<div class="flex-row">
				<div>Import Seed</div>
				<input type="text" v-model="seedToLoad" />
				<button @click="fetchSeedSettings(seedToLoad)">Load</button>
			</div>
			<div class="flex-row">
				<div>Reset Tracker</div>
				<button
					@click="
						doWithPrompt(
							'This will reset your current progress! Proceed?',
							playthroughStore.resetPlaythrough
						)
					"
				>
					Reset
				</button>
			</div>
			<div class="flex-row">
				<div>Saved Progress</div>
				<div>
					<button @click="playthroughStore.savePlaythrough()">Export</button>
					<input
						type="file"
						ref="importButton"
						:style="{ display: 'none' }"
						@change="
							(e) => {
								const file = (e.target as HTMLInputElement).files;
								if (file && file.length > 0) {
									doWithPrompt(
										'This will reset your current progress! Proceed?',
										() => playthroughStore.loadPlaythrough(file[0])
									);
								}
							}
						"
					/>
					<button @click="importButton && importButton.click()">Import</button>
				</div>
			</div>
		</div>
		<hr />
		<div @click="showingSeedSettings = !showingSeedSettings">
			{{ showingSeedSettings ? "▼" : "▶" }} Seed Settings
		</div>
		<MenuOptions
			:style="{
				display: showingSeedSettings ? undefined : 'none',
				paddingLeft: '2rem'
			}"
			:options-keys="optionsKeys"
		/>
	</div>
</template>

<style scoped>
div.panel {
	background-color: darkblue;
	color: white;
	margin: 5px 5px 5px 5px;
	padding: 1rem;
	font-size: 1.5em;
	position: absolute;
	left: -40rem;
	top: 58px;
	width: 36rem;
	transition: 0.4s;
}

div.panel.options-open {
	-webkit-transform: translate(40rem);
	transform: translate(40rem);
}

table {
	width: 100%;
}

div.flex {
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
}

div.flex-row {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
}

button {
	min-height: 100%;
	color: black;
	font-weight: bold;
	border-radius: 0;
	background-color: white;
	border: 2px solid black;
	padding-inline: 1rem;
}

input {
	min-height: 100%;
}
</style>
