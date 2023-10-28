<script setup lang="ts">
import { ref } from "vue";
import { useOptions, configKeys, settingsKeys } from "@/stores/config";
import { usePlaythrough } from "@/stores/playthrough";
import type { Layout } from "grid-layout-plus";
import type { SaveData } from "../types/save";

const optionsStore = useOptions();
const playthroughStore = usePlaythrough();

const { setLayout } = defineProps<{ setLayout: (layout: Layout) => void }>();
const emit = defineEmits(["close"]);

const jsonPaste = ref("");
const errorMessage = ref("");

function loadSaveData(contents: string) {
	try {
		const saveData = JSON.parse(contents) as SaveData;

		if (saveData.playthrough) {
			playthroughStore.loadPlaythrough(saveData.playthrough);
		}
		for (const key of [...configKeys, ...settingsKeys]) {
			if (saveData[key] !== undefined) {
				optionsStore.setValue(key, saveData[key]);
			}
		}
		if (saveData.itemFilters) {
			optionsStore.resetItemFilters(saveData.itemFilters);
		}
		if (saveData.layout) {
			setLayout(saveData.layout);
		}
		emit("close");
	} catch (err) {
		console.error(err);
		if (err instanceof Error) {
			errorMessage.value = err.message;
		} else if (typeof err === "string") {
			errorMessage.value = err;
		} else {
			errorMessage.value =
				"Unknown error - please see the browser console and report this!";
		}
	}
}

function loadFromFile(file: File) {
	const reader = new FileReader();
	reader.onload = e => {
		const contents = e.target?.result;
		if (typeof contents === "string") {
			loadSaveData(contents);
		}
	};
	reader.readAsText(file);
}
</script>

<template>
	<div class="import">
		<p>
			Loading data will overwrite the data that was saved, but it will leave
			everything else alone - e.g., if you saved only the playthrough and seed
			settings, your tracker config will not be affected.
		</p>
		<input
			ref="loadButton"
			type="file"
			@change="
				e => {
					const file = (e.target as HTMLInputElement).files;
					if (file && file.length > 0) {
						if (file[0].size < 5000000) {
							loadFromFile(file[0]);
						} else {
							errorMessage = `The file is too big (${file[0].size} bytes)! If you're sure this is a file obtained from the Save Tracker Data function, please report this.`;
						}
					}
				}
			"
		/>
		<p>or</p>
		<textarea
			id="jsonPaste"
			v-model="jsonPaste"
			name="jsonPaste"
			cols="30"
			rows="10"
			placeholder="paste copied save data"
		></textarea>
		<button @click="loadSaveData(jsonPaste)">Load</button>
		<p v-if="errorMessage" class="error">{{ errorMessage }}</p>
	</div>
</template>

<style scoped>
.import {
	font-size: large;
	max-width: 50ch;
	text-align: center;
	display: flex;
	flex-direction: column;
	gap: 1rem;
}

.toggle-buttons {
	display: flex;
	gap: 0.5rem;
	padding-block: 1rem;
	justify-content: center;
}

.toggle-button {
	--color: rgb(180, 0, 0);
	padding: 0.25rem 0.5rem;
	line-height: 1rem;
	border: 2px outset var(--color);
	border-radius: 8px;
	box-shadow: inset -2px -2px 4px var(--color);
}

.toggle-button:active,
.toggle-button.checked:active {
	box-shadow: none;
	border-style: solid;
	box-shadow: inset 0px 0px 4px var(--color);
}

.toggle-button.checked {
	--color: green;
	border-style: inset;
	border-color: var(--color);
	box-shadow: inset 2px 2px 4px var(--color);
}

.toggle-button::before {
	content: "X ";
	color: var(--color);
	width: 1rem;
}

.toggle-button.checked::before {
	content: "✓ ";
}

.error {
	background-color: rgb(255, 200, 200);
	color: black;
	padding: 1rem;
	border-radius: 8px;
	border: 2px solid red;
}
</style>
