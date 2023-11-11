<script setup lang="ts">
import TrackerPanel from "./TrackerPanel.vue";
import { ref, computed } from "vue";
import { allRegions, getRegionData } from "../data/map";
import { usePlaythrough } from "../stores/playthrough";
import { useOptions } from "@/stores/config";

type ItemCounts = {
	has: number;
	available: number;
	total: number;
};

const playthrough = usePlaythrough();
const options = useOptions();

const { moving, removePanel } = defineProps<{
	moving: boolean;
	removePanel: () => void;
}>();

const regions = computed(() =>
	allRegions
		.filter(
			el =>
				el !== "Bowser's Castle" ||
				!options.getValue("fastBowserCastle") ||
				!options.getValue("hideBowsersCastle")
		)
		.filter(
			el => el !== "Peach's Castle" || !options.getValue("hidePeachsCastle")
		)
		.filter(
			el =>
				!options.getValue("limitChapterLogic") ||
				!options.getValue("hideLCLAreas") ||
				!playthrough.getLCLHiddenAreas().includes(el)
		)
);

const currentRegion = ref("Toad Town");
const currentArea = ref("Main Gate");

const currentRegionData = computed(() => getRegionData(currentRegion.value));

const itemCounts = computed(() =>
	allRegions.reduce<Record<string, ItemCounts & Record<string, ItemCounts>>>(
		(a, v) => {
			const data = getRegionData(v);
			const areaCounts = Object.entries(data.areas).reduce<
				Record<string, ItemCounts>
			>(
				(aa, [ak, av]) => ({
					...aa,
					[ak]: Object.entries(av.checks).reduce<ItemCounts>(
						(ca, [ck, cv]) => {
							if (!playthrough.locationIsRandomized(ck)) {
								return { ...ca };
							} else if (playthrough.checkedLocation(ak, ck)) {
								return {
									...ca,
									has: ca.has + 1,
									total: ca.total + 1,
								};
							} else if (playthrough.canCheckLocation(cv.reqs, v)) {
								return {
									...ca,
									available: ca.available + 1,
									total: ca.total + 1,
								};
							} else {
								return {
									...ca,
									total: ca.total + 1,
								};
							}
						},
						{ has: 0, available: 0, total: 0 }
					),
				}),
				{}
			);
			const totalCounts = Object.values(areaCounts).reduce<ItemCounts>(
				(a, v) => ({
					has: a.has + v.has,
					available: a.available + v.available,
					total: a.total + v.total,
				}),
				{ has: 0, available: 0, total: 0 }
			);
			return {
				...a,
				[v]: {
					...totalCounts,
					...areaCounts,
				},
			} as Record<string, ItemCounts & Record<string, ItemCounts>>;
		},
		{}
	)
);

const unshuffledChecks = computed(() =>
	Object.getOwnPropertyNames(
		currentRegionData.value.areas[currentArea.value].checks
	).filter(el => !playthrough.locationIsRandomized(el))
);

const checksToShow = computed(() =>
	Object.entries(
		currentRegionData.value.areas[currentArea.value].checks
	).filter(
		el =>
			!options.getValue("hideNonShuffledChecks") ||
			!unshuffledChecks.value.includes(el[0])
	)
);
</script>

<template>
	<component :is="'style'">
		button { font-weight:
		{{ options.$state.options.paperMarioFont ? "normal" : "bold" }};}
	</component>
	<TrackerPanel :moving="moving" :remove-panel="removePanel">
		<div class="map-buttons">
			<button
				v-for="region in regions"
				:key="region"
				class="map-select"
				:class="{
					selected: region === currentRegion,
					fullCleared: itemCounts[region].has >= itemCounts[region].total,
					checksInLogic: itemCounts[region].available > 0,
				}"
				@click="
					currentRegion = region;
					currentArea = Object.getOwnPropertyNames(currentRegionData.areas)[0];
				"
				@contextmenu.prevent="playthrough.checkRegion(region)"
			>
				{{ region }} {{ itemCounts[region].available || "" }}
			</button>
		</div>
		<div class="map-grid">
			<h2>
				{{ currentRegion }} ({{ itemCounts[currentRegion].has }}/{{
					itemCounts[currentRegion].available
				}}/{{ itemCounts[currentRegion].total }})
			</h2>
			<div class="map-areas">
				<button
					v-for="area in Object.getOwnPropertyNames(currentRegionData.areas)"
					:key="area"
					class="map-area"
					:class="{
						selected: area === currentArea,
						checksInLogic: itemCounts[currentRegion][area].available > 0,
						fullCleared:
							itemCounts[currentRegion][area].has >=
							itemCounts[currentRegion][area].total,
					}"
					:style="{
						gridRow: `${currentRegionData.areas[area].row} / span ${
							currentRegionData.areas[area].rowSpan || 1
						}`,
						gridColumn: `${currentRegionData.areas[area].col} / span ${
							currentRegionData.areas[area].colSpan || 1
						}`,
					}"
					@click="currentArea = area"
					@contextmenu.prevent="playthrough.checkArea(currentRegion, area)"
				>
					{{ area }}
				</button>
				<button
					v-for="blank in currentRegionData.blanks"
					:key="blank.row * 100 + blank.col"
					class="map-area"
					:style="{
						gridRow: `${blank.row} / span ${blank.rowSpan || 1}`,
						gridColumn: `${blank.col} / span ${blank.colSpan || 1}`,
					}"
				></button>
				<div
					v-for="label in currentRegionData.labels"
					:key="label.row * 100 + label.col"
					class="map-label"
					:style="{
						gridRow: `${label.row} / span ${label.rowSpan || 1}`,
						gridColumn: `${label.col} / span ${label.colSpan || 1}`,
					}"
				>
					{{ label.content }}
				</div>
			</div>
		</div>
		<div class="map-checks">
			<ul>
				<li
					v-for="[checkName, check] in checksToShow"
					:key="checkName"
					:class="{
						available: playthrough.canCheckLocation(check.reqs, currentRegion),
						obtained: playthrough.checkedLocation(currentArea, checkName),
						disabled: unshuffledChecks.includes(checkName),
					}"
				>
					<input
						:id="checkName"
						type="checkbox"
						:name="checkName"
						:disabled="unshuffledChecks.includes(checkName)"
						:checked="playthrough.checkedLocation(currentArea, checkName)"
						@change="playthrough.toggleCheck(currentArea, checkName)"
					/>
					<label :for="checkName">
						{{ checkName }}
					</label>
				</li>
			</ul>
		</div>
	</TrackerPanel>
</template>

<style scoped>
button {
	height: 100%;
	border-radius: 5px;
}

button.map-select {
	width: auto;
	height: 2em;
	font-size: 1rem;
}

.map-buttons {
	text-align: center;
	margin: 0em 1em 1em 1em;
	padding: 0.25em 0.25em 0.25em 0.25em;
	border-radius: 5px;
	background-color: #00000044;
}

.map-buttons button {
	margin-bottom: 0.25em;
	background-color: #ff818167;
}

button.map-select.complete {
	text-decoration: line-through 5px;
	background-color: #ff818167;
}

button.map-select.complete.selected {
	background-color: #9b1511;
}

button.selected {
	background-color: #3aad5d !important;
	border-color: black;
}

.map-areas {
	display: grid;
	gap: 2px;
	justify-content: center;
	grid-auto-columns: minmax(5.3rem, min-content);
	grid-auto-rows: minmax(3.7rem, min-content);
	grid-auto-flow: column;
}

button.map-area {
	width: 100%;
	height: 100%;
	background-color: #ff818167;
	font-size: 1rem;
	border: 4px solid black;
	border-radius: 8px;
	padding: 0.2rem 0.5rem;
	word-wrap: normal;
}

button {
	background-color: #ff818167;
	font-size: 1rem;
	border: 4px solid black;
	border-radius: 8px;
}

button:hover {
	background-color: #966666;
}

button.checksInLogic:hover {
	background-color: #acdfc8;
}

button.checksInLogic {
	background-color: white;
}

button.fullCleared {
	text-decoration: line-through;
	color: #333;
}

div.map-label {
	display: flex;
	justify-content: center;
	align-items: center;
}

.map-checks {
	width: fit-content;
	margin-inline: auto;
}

.map-checks ul {
	list-style-type: none;
	display: flex;
	flex-direction: column;
	align-items: start;
}

.map-checks li {
	color: #888;
}

.map-checks li.available {
	color: #e8e8e8;
}

.map-checks li:not(.disabled):hover {
	color: #b0b0b0;
}

.map-checks li.available:not(.disabled):hover {
	color: white;
}

.map-checks li.disabled {
	color: #666;
	text-decoration: line-through;
}

.map-checks li input[type="checkbox"] {
	margin-right: 1rem;
	cursor: pointer;
}

.map-checks li label {
	cursor: pointer;
}
</style>
