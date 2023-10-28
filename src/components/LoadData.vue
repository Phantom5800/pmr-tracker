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

function loadSaveData(contents: string) {
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
		<p></p>
		<input
			ref="loadButton"
			type="file"
			@change="
				e => {
					const file = (e.target as HTMLInputElement).files;
					if (file && file.length > 0) {
						loadFromFile(file[0]);
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
</style>
