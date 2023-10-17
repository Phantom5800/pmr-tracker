<script setup lang="ts">
import { usePlaythrough } from "@/stores/playthrough";
import { ref } from "vue";
import MenuOptions from "./MenuOptions.vue";
// import axios from "axios";
import { vOnClickOutside } from "@vueuse/components";
import type { OptionsValues } from "@/stores/config";

const playthroughStore = usePlaythrough();

const importButton = ref<HTMLInputElement | null>(null);
// const seedToLoad = ref("0");
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

// function fetchSeedSettings(id: string) {
// 	axios
// 		.get(
// 			`https://paper-mario-randomizer-server.ue.r.appspot.com/randomizer_settings/${id}`,
// 			{
// 				headers: {
// 					Accept: "application/json",
// 					Origin: "https://pmr-tracker.phantom-games.com",
// 					Referer: "https://pmr-tracker.phantom-games.com/"
// 				}
// 			}
// 		)
// 		.then((result) => {
// 			console.log(result);
// 		});
// }
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
			<!-- <div class="flex-row">
				<div>Import Seed</div>
				<input type="text" v-model="seedToLoad" />
				<button @click="fetchSeedSettings(seedToLoad)">Load</button>
			</div> -->
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
