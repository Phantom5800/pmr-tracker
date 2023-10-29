<script setup lang="ts">
import { ref, computed } from "vue";
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

const dataTextarea = ref<HTMLTextAreaElement | null>(null);
const copied = ref(false);
const saveToggles = ref({
	Playthrough: true,
	"Seed Settings": true,
	"Tracker Config": false,
	"Tracker Layout": false,
});

const saveDataString = computed(() => {
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
	return JSON.stringify(saveData);
});

function downloadSaveData() {
	const blob = new Blob([saveDataString.value], { type: "application/json" });
	saveAs(blob, `pmr-tracker-${new Date().toISOString()}.json`);
}

function copySaveData() {
	navigator.clipboard
		.writeText(saveDataString.value)
		.then(() => {
			copied.value = true;
			setTimeout(() => (copied.value = false), 1000);
		})
		.catch(err => {
			console.error(err);
			dataTextarea.value && dataTextarea.value.select();
			document.execCommand("copy");
		});
}
</script>

<template>
	<div class="import">
		<p>
			Select which data you'd like to save. Only that data will be overwritten
			when you load it later.
		</p>
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
		<div class="save-buttons">
			<textarea
				id="saveData"
				ref="dataTextarea"
				v-model="saveDataString"
				readonly
				name="saveData"
				cols="30"
				rows="10"
			></textarea>
			<button @click="copySaveData">
				{{ copied ? "Copied!" : "Copy to clipboard" }}
			</button>
			<button @click="downloadSaveData">Download JSON</button>
		</div>
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
	flex-flow: row wrap;
	gap: 0.5rem;
	padding-block: 1rem;
	justify-content: center;
}

.toggle-button {
	--color: rgb(180, 0, 0);
	padding: 0.25rem 0.25rem;
	line-height: 1rem;
	border: 2px outset var(--color);
	border-radius: 8px;
	box-shadow: inset -2px -2px 4px var(--color);
	width: 9rem;
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
}

.toggle-button.checked::before {
	content: "✓ ";
}

.save-buttons {
	display: flex;
	flex-direction: column;
	width: 100%;
	justify-content: center;
	gap: 0.5rem;
}

.save-buttons > button {
	padding: 0.5rem;
	font-size: large;
	min-width: 12.5rem;
}
</style>
