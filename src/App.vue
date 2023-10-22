<script setup lang="ts">
import { ref, computed, reactive } from "vue";
import EnabledSettings from "./components/EnabledSettings.vue";
import InfoBlocks from "./components/InfoBlocks.vue";
import { configKeys, settingsKeys } from "./stores/config";
import MapTracker from "./components/MapTracker.vue";
import ItemTracker from "./components/ItemTracker.vue";
import UserNotes from "./components/UserNotes.vue";
import RequiredTracker from "./components/RequiredTracker.vue";
import { useOptions } from "./stores/config";
import { storeToRefs } from "pinia";
import SettingsModal from "./components/SettingsModal.vue";
import ConfigModal from "./components/ConfigModal.vue";
import { allItems } from "@/data/items";
import { GridLayout, GridItem, Breakpoint, Layout } from "grid-layout-plus";

const breakpoint = ref("lg");

const initialLayouts = {
	lg: [
		{ x: 0, y: 0, w: 40, h: 3, i: "flags", static: false, minH: 3 },
		{
			x: 0,
			y: 3,
			w: 40,
			h: 36,
			i: "required",
			static: false,
			isResizable: false
		},
		{ x: 40, y: 14, w: 80, h: 35, i: "map", static: false },
		// { x: 1, y: 2, w: 60, h: 4, i: "info", static: false },
		{ x: 40, y: 0, w: 40, h: 14, i: "miscitem", static: false },
		{ x: 80, y: 0, w: 40, h: 14, i: "misckey", static: false },
		{ x: 40, y: 50, w: 40, h: 18, i: "letters", static: false },
		{ x: 80, y: 50, w: 40, h: 18, i: "koot", static: false },
		{ x: 0, y: 39, w: 40, h: 28, i: "notes", static: false }
	],
	md: [{ x: 0, y: 1, w: 40, h: 31, i: "map", static: false }]
};

const layout = ref(
	localStorage.getItem("layout")
		? JSON.parse(localStorage.getItem("layout")).lg
		: initialLayouts.lg
);

// const filteredLayout = computed(() => {
// 	if (!layout.value) {
// 		return [];
// 	}
// 	return layout.value.filter(
// 		(el) =>
// 			({
// 				map: options.value.gameMaps,
// 				notes: options.value.userNotes,
// 				info: options.value.howToFields,
// 				flags: options.value.seedFlags,
// 				required: !options.value.compactTracker,
// 				miscitem: !options.value.compactTracker,
// 				misckey: !options.value.compactTracker,
// 				letters: options.value.lettersRandomized,
// 				koot: options.value.koopaKootRandomized,
// 				compact: options.value.compactTracker
// 			})[el.i]
// 	);
// });

const configOpen = ref(false);
const settingsOpen = ref(false);
const moving = ref(false);

const optionsStore = useOptions();

const { options } = storeToRefs(optionsStore);

const year = new Date().getFullYear();

const allItemsFiltered = computed(() =>
	allItems.filter((el) => el.show === undefined || el.show(options.value))
);

function closeConfigDelay() {
	setTimeout(() => (configOpen.value = false), 1);
}
function closeSettingsDelay() {
	setTimeout(() => (settingsOpen.value = false), 1);
}

function saveLayout() {
	localStorage.setItem("layout", JSON.stringify(layout));
}

function resetLayout() {
	if (
		confirm(
			"Are you sure you want to reset your layout? Your saved layout will be lost!"
		)
	) {
		layout.value = initialLayouts.lg;
		localStorage.removeItem("layout");
	}
}

function breakpointChanged(newBreakpoint: Breakpoint, newLayout: Layout) {
	console.info(newBreakpoint, newLayout);
	breakpoint.value = newBreakpoint;
	layout.value = initialLayouts[newBreakpoint];
}
</script>

<template>
	<component :is="'style'">
		body { background: {{ options.backgroundColor }}; font-family:
		{{ options.paperMarioFont ? "Paper Mario" : "Open Sans" }};font-size:
		{{ options.paperMarioFont ? "1.1rem" : "1rem" }} }
	</component>
	<header>
		<div style="display: flex">
			<div
				id="options-menu-toggle"
				:class="{ 'options-open': settingsOpen }"
				class="hamburger"
				@click="
					settingsOpen = !settingsOpen;
					configOpen = false;
				"
			>
				<div class="hamburger-1"></div>
				<div class="hamburger-2"></div>
				<div class="hamburger-3"></div>
			</div>
			<button @click="moving = !moving">Edit Layout</button>
			<button @click="resetLayout">Reset Layout</button>
			<img id="logo-img" src="./assets/images/Logo.png" />
		</div>
		<div
			id="settings-menu-toggle"
			:class="{ 'options-open': configOpen }"
			@click="
				if (!configOpen) {
					configOpen = true;
				}
				settingsOpen = false;
			"
		>
			&#x2699;
		</div>
	</header>

	<main>
		<GridLayout
			v-model:layout="layout"
			:vertical-compact="true"
			:auto-size="true"
			:row-height="16"
			:responsive="true"
			:cols="{ lg: 120, md: 100, sm: 60, xs: 40, xxs: 20 }"
			@breakpoint-changed="breakpointChanged"
		>
			<GridItem
				v-for="item in layout"
				:key="item.i"
				:x="item.x"
				:y="item.y"
				:w="item.w"
				:h="item.h"
				:i="item.i"
				drag-allow-from=".drag-handle"
				:is-resizable="moving"
				@moved="saveLayout"
				@resized="saveLayout"
			>
				<EnabledSettings :moving="moving" v-if="item.i === 'flags'" />
				<RequiredTracker
					:moving="moving"
					v-if="item.i === 'required'"
					:all-items="allItemsFiltered"
				/>
				<ItemTracker
					:moving="moving"
					v-if="item.i === 'compact'"
					:all-items="allItemsFiltered"
					:heading="
						options.combineMisc ? 'Basically Everything' : 'Required Items'
					"
					:itemTypes="
						options.combineMisc
							? [
									'required',
									'chapterReward',
									'equipment',
									'partner',
									'miscItem',
									'miscKey'
							  ]
							: ['required', 'chapterReward', 'equipment', 'partner']
					"
				/>
				<UserNotes :moving="moving" v-if="item.i === 'notes'" />
				<MapTracker :moving="moving" v-if="item.i === 'map'" />
				<ItemTracker
					:moving="moving"
					v-if="item.i === 'misckey'"
					:all-items="allItemsFiltered"
					heading="Misc. Keys"
					:itemTypes="['miscKey']"
				/>
				<ItemTracker
					:moving="moving"
					v-if="item.i === 'miscitem'"
					:all-items="allItemsFiltered"
					heading="Misc. Items"
					:itemTypes="['miscItem']"
				/>

				<ItemTracker
					:moving="moving"
					:all-items="allItemsFiltered"
					v-if="item.i === 'letters'"
					heading="Letters"
					:itemTypes="['letter']"
				/>
				<ItemTracker
					:moving="moving"
					:all-items="allItemsFiltered"
					v-if="item.i === 'koot'"
					heading="Koopa Koot Favors"
					:itemTypes="['kootFavor']"
				/>
				<InfoBlocks v-if="item.i === 'info'" />
			</GridItem>
		</GridLayout>
	</main>

	<ConfigModal
		:isOpen="configOpen"
		:optionsKeys="configKeys"
		:close="closeConfigDelay"
	/>
	<SettingsModal
		:isOpen="settingsOpen"
		:optionsKeys="settingsKeys"
		:close="closeSettingsDelay"
	/>

	<footer>
		<a href="https://twitter.com/Phantom5800" target="_blank"
			><img
				:width="15"
				src="https://resources.phantom-games.com/TwitterLogo.png"
			/>
			@Phantom5800</a
		>
		&bull;
		<a href="https://www.twitch.tv/phantom5800" target="_blank"
			><img
				:width="15"
				src="https://resources.phantom-games.com/TwitchLogo.png"
			/>
			Phantom5800</a
		>
		&bull;
		<a href="https://www.youtube.com/@PhantomVODs" target="_blank"
			><img
				:width="15"
				src="https://resources.phantom-games.com/YoutubeLogo.png"
			/>
			@PhantomVODs</a
		>
		&bull;
		<a href="https://github.com/Phantom5800" target="_blank">Github</a>
		&bull;&copy;
		<a href="https://phantom-games.com/" target="_blank"
			>Phantom Games {{ year }}</a
		>
	</footer>
</template>

<style scoped>
.vgl-layout {
	--vgl-resizer-border-color: white;
}

header {
	padding-top: 5px;
	margin: 5px 5px 5px 5px;
	display: flex;
	flex-direction: row;
	width: 100%;
	display: flex;
	justify-content: space-between;
}

footer {
	width: 100%;
	display: inline-block;
	text-align: center;
	color: white;
	font-size: 0.8em;
}

#logo-img {
	height: 40px;
	cursor: unset;
	padding-left: 7.5em;
}

#settings-menu-toggle {
	cursor: pointer;
	padding-right: 1em;
	color: black;
	font-size: 35px;
	font-weight: bold;
	-webkit-text-stroke-width: 0.125px;
	-webkit-text-stroke-color: gainsboro;
}

#settings-menu-toggle.options-open {
	color: gainsboro;
	-webkit-text-stroke-color: black;
}

.hamburger {
	cursor: pointer;
	width: 40px;
}

.hamburger-1,
.hamburger-2,
.hamburger-3 {
	width: 35px;
	height: 3px;
	background-color: black;
	margin: 6px 0;
	transition: 0.4s;
	border-color: gainsboro;
	border-width: 1px;
	border-style: solid;
}

.options-open .hamburger-1 {
	-webkit-transform: rotate(-45deg) translate(-9px, 6px);
	transform: rotate(-45deg) translate(-9px, 6px);
}

.options-open .hamburger-2 {
	opacity: 0;
}

.options-open .hamburger-3 {
	-webkit-transform: rotate(45deg) translate(-8px, -8px);
	transform: rotate(45deg) translate(-8px, -8px);
}

div.flex-col {
	display: flex;
	flex-direction: column;
	float: left;
}
</style>
