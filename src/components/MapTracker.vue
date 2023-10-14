<script setup lang="ts">
import TrackerPanel from "./TrackerPanel.vue";
import { ref, computed } from "vue";
import { getAreas, allRegions, getBlanks, getChecks } from "../data/map";
import { usePlaythrough } from "../stores/playthrough";

const playthrough = usePlaythrough();

const currentMap = ref("Toad Town");
const currentArea = ref("Main Gate");

const areas = computed(() => getAreas(currentMap.value));

const toadTown: Record<
	string,
	{ col: number; row: number; colSpan?: number; rowSpan?: number }
> = {
	"Castle Ruins": { col: 3, row: 1, rowSpan: 2 },
	"Shooting Star Summit": { col: 4, row: 1 },
	"Mario's House": { col: 2, row: 2 },
	"Merluvlee's House": { col: 4, row: 2 },
	"Outside Toad Town": { col: 1, row: 3 },
	"Main Gate": { col: 2, row: 3 },
	"Central Plaza": { col: 3, row: 3 },
	Harbor: { col: 1, row: 4 },
	"Residential Area": { col: 2, row: 4 },
	"Below Plaza": { col: 3, row: 4 },
	"Forever Forest Entrance": { col: 4, row: 4 },
	"Train Station": { col: 4, row: 5 }
};
</script>

<template>
	<TrackerPanel>
		<div class="map-buttons">
			<button
				class="map-select"
				:class="{
					selected: map === currentMap
				}"
				v-for="map in allRegions"
				:key="map"
				@click="currentMap = map"
			>
				{{ map }}
			</button>
		</div>
		<div class="map-grid">
			<h2>{{ currentMap }}</h2>
			<div class="map-areas">
				<button
					class="map-area"
					v-for="area in Object.getOwnPropertyNames(areas)"
					:key="area"
					:class="{ selected: area === currentArea }"
					@click="currentArea = area"
					:style="{
						gridRow: `${areas[area].row} / span ${areas[area].rowSpan || 1}`,
						gridColumn: `${areas[area].col} / span ${areas[area].colSpan || 1}`
					}"
				>
					{{ area }}
				</button>
			</div>
		</div>
		<div class="map-checks">
			<ul>
				<li
					v-for="[checkName, check] in Object.entries(
						getChecks(currentMap, currentArea)
					)"
					:key="checkName"
					:class="{
						available: playthrough.canCheckLocation(check.reqs)
					}"
				>
					{{ checkName }}
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
}

button:hover {
	background-color: #5fcf80;
}

button:focus {
	background-color: #1e7438;
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
}

button.map-select.complete {
	text-decoration: line-through 5px;
	background-color: #ff818167;
}

button.map-select.complete.selected {
	background-color: #9b1511;
}

button.selected {
	background-color: #1e7438;
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
}

.map-checks li {
	color: #888;
}

.map-checks li.obtained {
	text-decoration: line-through;
}

.map-checks li.available {
	color: #ddd;
}
</style>
