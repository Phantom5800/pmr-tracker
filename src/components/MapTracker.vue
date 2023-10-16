<script setup lang="ts">
import TrackerPanel from "./TrackerPanel.vue";
import { ref, computed } from "vue";
import { allRegions, getChecks, getRegionData } from "../data/map";
import { usePlaythrough } from "../stores/playthrough";

const playthrough = usePlaythrough();

const currentMap = ref("Toad Town");
const currentArea = ref("Main Gate");

const region = computed(() => getRegionData(currentMap.value));

function areaHasChecksInLogic(pRegion: string, area: string): boolean {
	const checks = getRegionData(pRegion).areas[area].checks;
	return Object.entries(checks).some(
		([checkName, check]) =>
			playthrough.locationIsRandomized(checkName) &&
			!playthrough.checkedLocation(area, checkName) &&
			playthrough.canCheckLocation(check.reqs, pRegion)
	);
}

function areaFullCleared(pRegion: string, area: string): boolean {
	const checks = getRegionData(pRegion).areas[area].checks;
	return Object.entries(checks).every(
		([checkName, check]) =>
			!playthrough.locationIsRandomized(checkName) ||
			playthrough.checkedLocation(area, checkName)
	);
}

function regionHasChecksInLogic(pRegion: string): boolean {
	return Object.getOwnPropertyNames(getRegionData(pRegion).areas).some((el) =>
		areaHasChecksInLogic(pRegion, el)
	);
}

function regionFullCleared(pRegion: string): boolean {
	return Object.getOwnPropertyNames(getRegionData(pRegion).areas).every((el) =>
		areaFullCleared(pRegion, el)
	);
}

const unshuffledChecks = computed(() =>
	Object.getOwnPropertyNames(
		region.value.areas[currentArea.value].checks
	).filter((el) => !playthrough.locationIsRandomized(el))
);
</script>

<template>
	<TrackerPanel :width-rem="60">
		<div class="map-buttons">
			<button
				class="map-select"
				:class="{
					selected: map === currentMap,
					fullCleared: regionFullCleared(map),
					checksInLogic: regionHasChecksInLogic(map)
				}"
				v-for="map in allRegions"
				:key="map"
				@click="
					currentMap = map;
					currentArea = Object.getOwnPropertyNames(region.areas)[0];
				"
			>
				{{ map }}
			</button>
		</div>
		<div class="map-grid">
			<h2>{{ currentMap }}</h2>
			<div class="map-areas">
				<button
					class="map-area"
					v-for="area in Object.getOwnPropertyNames(region.areas)"
					:key="area"
					:class="{
						selected: area === currentArea,
						checksInLogic: areaHasChecksInLogic(currentMap, area),
						fullCleared: areaFullCleared(currentMap, area)
					}"
					@click="currentArea = area"
					:style="{
						gridRow: `${region.areas[area].row} / span ${
							region.areas[area].rowSpan || 1
						}`,
						gridColumn: `${region.areas[area].col} / span ${
							region.areas[area].colSpan || 1
						}`
					}"
				>
					{{ area }}
				</button>
				<button
					class="map-area"
					v-for="blank in region.blanks"
					:key="blank.row * 100 + blank.col"
					:style="{
						gridRow: `${blank.row} / span ${blank.rowSpan || 1}`,
						gridColumn: `${blank.col} / span ${blank.colSpan || 1}`
					}"
				></button>
			</div>
		</div>
		<div class="map-checks">
			<ul>
				<li
					v-for="[checkName, check] in Object.entries(
						region.areas[currentArea].checks
					)"
					:key="checkName"
					:class="{
						available: playthrough.canCheckLocation(check.reqs, currentMap),
						obtained: playthrough.checkedLocation(currentArea, checkName),
						disabled: unshuffledChecks.includes(checkName)
					}"
				>
					<input
						type="checkbox"
						:name="checkName"
						:id="checkName"
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
	font-family: "Paper Mario";
}

button.map-select {
	width: auto;
	height: 2em;
	font-size: 0.9rem;
}

button:hover {
	background-color: #5fcf80;
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
	background-color: #1e7438 !important;
	border-color: black;
}

.map-areas {
	display: grid;
	justify-content: center;
	grid-auto-rows: minmax(3rem, max-content);
	grid-template-columns: repeat(auto-fit, minmax(0, 1fr));
}

button.map-area {
	width: 100%;
	background-color: #ff818167;
	font-size: 1rem;
}

button.checksInLogic {
	background-color: white;
}

button.fullCleared {
	text-decoration: line-through;
	color: #333;
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
	color: white;
}

.map-checks li.disabled {
	color: #666;
	text-decoration: line-through;
}

.map-checks li input[type="checkbox"] {
	margin-right: 1rem;
}
</style>
