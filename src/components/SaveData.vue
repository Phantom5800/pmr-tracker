<script setup lang="ts">
import { ref } from "vue";
import {
	useOptions,
	configKeys,
	settingsKeys,
	type Options,
} from "@/stores/config";
import { usePlaythrough } from "@/stores/playthrough";
import { safeKeys } from "@/utils/helpers";
import type { Layout } from "grid-layout-plus";
import type { SaveData } from "../types/save";
import { saveAs } from "file-saver";

const optionsStore = useOptions();
const playthroughStore = usePlaythrough();

const { currentLayout } = defineProps<{ currentLayout: Layout }>();

const copied = ref(false);
const saveToggles = ref({
	Playthrough: true,
	"Seed Settings": true,
	"Tracker Config": false,
	"Tracker Layout": false,
});

function generateSaveData(): SaveData {
	let saveData: SaveData = {};
	if (saveToggles.value.Playthrough) {
		saveData.playthrough = playthroughStore.$state;
	}
	if (saveToggles.value["Seed Settings"]) {
		saveData = {
			...saveData,
			...settingsKeys.reduce<Partial<Options>>(
				(a, v) => ({ ...a, [v]: optionsStore.getValue(v) }),
				{}
			),
		};
	}
	if (saveToggles.value["Tracker Config"]) {
		saveData.itemFilters = optionsStore.$state.itemFilters;
		saveData = {
			...saveData,
			...configKeys.reduce<Partial<Options>>(
				(a, v) => ({ ...a, [v]: optionsStore.getValue(v) }),
				{}
			),
		};
	}
	if (saveToggles.value["Tracker Layout"]) {
		saveData.layout = currentLayout;
	}
	return saveData;
}

function downloadSaveData() {
	const dataString = JSON.stringify(generateSaveData());
	const blob = new Blob([dataString], { type: "application/json" });
	saveAs(blob, `pmr-tracker-${new Date().toISOString()}.json`);
}

function copySaveData() {
	const dataString = JSON.stringify(generateSaveData());
	navigator.clipboard
		.writeText(dataString)
		.then(() => {
			copied.value = true;
			setTimeout(() => (copied.value = false), 1000);
		})
		.catch(err => {
			console.error(err);
		});
}
</script>

<template>
	<div class="import">
		<div class="toggle-buttons">
			<button
				v-for="toggle in safeKeys(saveToggles)"
				:key="toggle"
				class="toggle-button"
				:class="{
					checked: saveToggles[toggle],
				}"
				@click="saveToggles[toggle] = !saveToggles[toggle]"
			>
				{{ toggle }}
			</button>
		</div>
		<button @click="downloadSaveData">Download JSON</button>
		<button @click="copySaveData">
			{{ copied ? "Copied!" : "Copy to clipboard" }}
		</button>
	</div>
</template>

<style scoped>
.import {
	font-size: large;
	max-width: 50ch;
	text-align: center;
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
