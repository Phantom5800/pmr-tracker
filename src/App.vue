<script setup lang="ts">
import { ref, computed, reactive, onMounted, onBeforeUnmount } from "vue";
import EnabledSettings from "./components/EnabledSettings.vue";
import InfoBlocks from "./components/InfoBlocks.vue";
import Button from "./components/Button.vue";
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
import { GridLayout, GridItem } from "grid-layout-plus";
import type { Breakpoint, Layout } from "grid-layout-plus";
import { throttle } from "lodash";

const breakpoint = ref<Breakpoint>("lg");

const savedLayouts = JSON.parse(localStorage.getItem("layout") ?? "{}");

const initialLayouts: Record<Breakpoint, Layout> = {
	lg: [
		{ x: 0, y: 0, w: 40, h: 3, i: "flags", static: false, minH: 3 },
		{
			x: 0,
			y: 3,
			w: 40,
			h: 36,
			i: "required",
			static: false,
			isResizable: false,
		},
		{ x: 40, y: 14, w: 80, h: 35, i: "map", static: false },
		{ x: 40, y: 0, w: 40, h: 14, i: "miscitem", static: false },
		{ x: 80, y: 0, w: 40, h: 14, i: "misckey", static: false },
		{ x: 40, y: 50, w: 40, h: 18, i: "letters", static: false },
		{ x: 80, y: 50, w: 40, h: 18, i: "koot", static: false },
		{ x: 0, y: 39, w: 40, h: 28, i: "notes", static: false },
	],
	md: [
		{ x: 0, y: 0, w: 50, h: 3, i: "flags", static: false, minH: 3 },
		{
			x: 0,
			y: 3,
			w: 50,
			h: 34,
			i: "required",
			static: false,
			isResizable: false,
		},
		{ x: 0, y: 46, w: 100, h: 35, i: "map", static: false },
		{ x: 50, y: 0, w: 50, h: 13, i: "miscitem", static: false },
		{ x: 0, y: 37, w: 50, h: 9, i: "misckey", static: false },
		{ x: 50, y: 13, w: 50, h: 16, i: "letters", static: false },
		{ x: 50, y: 29, w: 50, h: 13, i: "koot", static: false },
	],
	sm: [
		{ x: 0, y: 0, w: 40, h: 3, i: "flags", static: false, minH: 3 },
		{
			x: 0,
			y: 3,
			w: 40,
			h: 22,
			i: "compact",
			static: false,
		},
		{ x: 40, y: 0, w: 20, h: 21, i: "miscitem", static: false },
		{ x: 40, y: 21, w: 20, h: 9, i: "misckey", static: false },
		{ x: 0, y: 25, w: 40, h: 15, i: "letters", static: false },
		{ x: 40, y: 30, w: 20, h: 18, i: "koot", static: false },
		{ x: 0, y: 48, w: 60, h: 35, i: "map", static: false },
		{ x: 0, y: 40, w: 40, h: 8, i: "notes", static: false },
	],
	xs: [
		{ x: 0, y: 0, w: 40, h: 3, i: "flags", static: false, minH: 3 },
		{
			x: 0,
			y: 3,
			w: 40,
			h: 32,
			i: "everything",
			static: false,
		},
		{ x: 0, y: 35, w: 20, h: 27, i: "letters", static: false },
		{ x: 20, y: 35, w: 20, h: 20, i: "koot", static: false },
		{ x: 0, y: 62, w: 40, h: 35, i: "map", static: false },
	],
	xxs: [
		{ x: 0, y: 0, w: 20, h: 3, i: "flags", static: false, minH: 3 },
		{
			x: 0,
			y: 3,
			w: 20,
			h: 41,
			i: "everything",
			static: false,
		},
		{ x: 0, y: 44, w: 20, h: 17, i: "letters", static: false },
		{ x: 0, y: 45, w: 20, h: 15, i: "koot", static: false },
		{ x: 0, y: 76, w: 20, h: 44, i: "map", static: false },
	],
};

const panels = {
	flags: { name: "Seed Settings", h: 3, w: 30 },
	required: { name: "Required Items", h: 40, w: 40 },
	compact: { name: "Required Compact", h: 20, w: 20 },
	everything: { name: "Basically Everything", h: 30, w: 40 },
	miscitem: { name: "Misc. Items", h: 20, w: 20 },
	misckey: { name: "Misc. Keys", h: 20, w: 20 },
	letters: { name: "Letters", h: 20, w: 20 },
	koot: { name: "Koopa Koot Favors", h: 20, w: 20 },
	map: { name: "Map Tracker", h: 20, w: 20 },
	notes: { name: "User Notepad", h: 20, w: 20 },
};

const layouts = reactive(
	(["xxs", "xs", "sm", "md", "lg"] as Breakpoint[]).reduce(
		(a, bp) => {
			if (bp in savedLayouts) {
				return { ...a, [bp]: savedLayouts[bp] };
			} else {
				return { ...a, [bp]: initialLayouts[bp] };
			}
		},
		{} as Record<Breakpoint, Layout>
	)
);

const mainRef = ref<HTMLElement>();
const gridLayout = ref<InstanceType<typeof GridLayout>>();

onMounted(() => {
	document.addEventListener("dragover", syncMousePosition);
});

onBeforeUnmount(() => {
	document.removeEventListener("dragover", syncMousePosition);
});

const mouseAt = { x: -1, y: -1 };

function syncMousePosition(event: MouseEvent) {
	mouseAt.x = event.clientX;
	mouseAt.y = event.clientY;
}

const layout = computed(() => layouts[breakpoint.value]);
const currentPanels = computed(() => layout.value.map((el) => el.i));

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
	const savedLayoutsStr = localStorage.getItem("layout");
	let savedLayouts = {} as Record<Breakpoint, Layout>;
	if (savedLayoutsStr) {
		savedLayouts = JSON.parse(savedLayoutsStr);
	}
	localStorage.setItem(
		"layout",
		JSON.stringify({ ...savedLayouts, [breakpoint.value]: layout.value })
	);
}

function resetLayout() {
	if (
		confirm(
			"Are you sure you want to reset your layout? Your saved layout will be lost!"
		)
	) {
		layouts[breakpoint.value] = initialLayouts[breakpoint.value];
		const savedLayoutsStr = localStorage.getItem("layout");
		let savedLayouts = {} as Record<Breakpoint, Layout>;
		if (savedLayoutsStr) {
			savedLayouts = JSON.parse(savedLayoutsStr);
		}
		localStorage.setItem(
			"layout",
			JSON.stringify({ ...savedLayouts, [breakpoint.value]: undefined })
		);
	}
}

function breakpointChanged(newBreakpoint: Breakpoint, newLayout: Layout) {
	breakpoint.value = newBreakpoint;
}

function removePanel(idx: number) {
	layouts[breakpoint.value].splice(idx, 1);
	saveLayout();
}

const dragItem = { x: -1, y: -1 };
const dropId = "drop";

const dragFromMenu = throttle((panelKey: keyof typeof panels) => {
	const parentRect = mainRef.value?.getBoundingClientRect();

	if (!parentRect || !gridLayout.value) return;

	const mouseInGrid =
		mouseAt.x > parentRect.left &&
		mouseAt.x < parentRect.right &&
		mouseAt.y > parentRect.top &&
		mouseAt.y < parentRect.bottom;

	if (mouseInGrid && !layout.value.find((item) => item.i === dropId)) {
		layout.value.push({
			x: (layout.value.length * 2) % 12,
			y: layout.value.length + 12, // puts it at the bottom
			w: panels[panelKey].w,
			h: panels[panelKey].h,
			i: dropId,
		});
	}

	const index = layout.value.findIndex((item) => item.i === dropId);

	if (index !== -1) {
		const item = gridLayout.value.getItem(dropId);

		if (!item) return;

		try {
			item.wrapper.style.display = "none";
		} catch (e) {
			console.error(e);
		}

		Object.assign(item.state, {
			top: mouseAt.y - parentRect.top,
			left: mouseAt.x - parentRect.left,
		});
		const newPos = item.calcXY(
			mouseAt.y - parentRect.top,
			mouseAt.x - parentRect.left
		);

		if (mouseInGrid) {
			gridLayout.value.dragEvent(
				"dragstart",
				dropId,
				newPos.x,
				newPos.y,
				panels[panelKey].h,
				panels[panelKey].w
			);
			dragItem.x = layout.value[index].x;
			dragItem.y = layout.value[index].y;
		} else {
			gridLayout.value.dragEvent(
				"dragend",
				dropId,
				newPos.x,
				newPos.y,
				panels[panelKey].h,
				panels[panelKey].w
			);
			layouts[breakpoint.value] = layout.value.filter(
				(item) => item.i !== dropId
			);
		}
	}
}, 33);

function dragEnd(panelKey: keyof typeof panels) {
	const parentRect = mainRef.value?.getBoundingClientRect();

	if (!parentRect || !gridLayout.value) return;

	const mouseInGrid =
		mouseAt.x > parentRect.left &&
		mouseAt.x < parentRect.right &&
		mouseAt.y > parentRect.top &&
		mouseAt.y < parentRect.bottom;

	if (mouseInGrid) {
		gridLayout.value.dragEvent(
			"dragend",
			dropId,
			dragItem.x,
			dragItem.y,
			panels[panelKey].h,
			panels[panelKey].w
		);
		layouts[breakpoint.value] = layout.value.filter(
			(item) => item.i !== dropId
		);
	} else {
		return;
	}

	layouts[breakpoint.value].push({
		x: dragItem.x,
		y: dragItem.y,
		w: panels[panelKey].w,
		h: panels[panelKey].h,
		i: panelKey,
	});
	gridLayout.value.dragEvent(
		"dragend",
		panelKey,
		dragItem.x,
		dragItem.y,
		panels[panelKey].h,
		panels[panelKey].w
	);

	const item = gridLayout.value.getItem(dropId);

	if (!item) return;

	try {
		item.wrapper.style.display = "";
	} catch (e) {
		console.error(e);
	}

	saveLayout();
}

const dragEndTimeout = (panelKey: keyof typeof panels) =>
	setTimeout(() => dragEnd(panelKey), 100);
</script>

<template>
	<component :is="'style'">
		body { background: {{ options.backgroundColor }}; font-family:
		{{ options.paperMarioFont ? "Paper Mario" : "Open Sans" }};font-size:
		{{ options.paperMarioFont ? "1.1rem" : "1rem" }} }
	</component>
	<header>
		<div style="display: flex; gap: 8px">
			<Button
				name="Tracker Config"
				@click="
					if (!configOpen) {
						configOpen = true;
					}
					settingsOpen = false;
				"
				><svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
					/>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
					/></svg
			></Button>
			<Button
				name="Seed Settings"
				@click="
					settingsOpen = !settingsOpen;
					configOpen = false;
				"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-6 h-6"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
					/>
				</svg>
			</Button>
			<Button name="Edit Layout" @click="moving = !moving">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-6 h-6"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 002.25-2.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v2.25A2.25 2.25 0 006 10.5zm0 9.75h2.25A2.25 2.25 0 0010.5 18v-2.25a2.25 2.25 0 00-2.25-2.25H6a2.25 2.25 0 00-2.25 2.25V18A2.25 2.25 0 006 20.25zm9.75-9.75H18a2.25 2.25 0 002.25-2.25V6A2.25 2.25 0 0018 3.75h-2.25A2.25 2.25 0 0013.5 6v2.25a2.25 2.25 0 002.25 2.25z"
					/>
				</svg>
			</Button>
			<Button name="Reset Layout" @click="resetLayout"
				><svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-6 h-6"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M9 9l6-6m0 0l6 6m-6-6v12a6 6 0 01-12 0v-3"
					/>
				</svg>
			</Button>
			<img id="logo-img" src="./assets/images/Logo.png" />
		</div>
		<div
			class="add-panels"
			:style="{
				translate: moving ? undefined : '0 -10rem',
			}"
		>
			<Button name="Lock Layout" @click="moving = false"
				><svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-6 h-6"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
					/>
				</svg>
			</Button>
			<div
				v-for="[key, panel] in Object.entries(panels).filter(
					([k, v]) => !currentPanels.includes(k)
				)"
				:key="panel.name"
				draggable="true"
				unselectable="on"
				@drag="dragFromMenu(key as keyof typeof panels)"
				@dragend="dragEndTimeout(key as keyof typeof panels)"
			>
				{{ panel.name }}
			</div>
		</div>
	</header>

	<main
		ref="mainRef"
		:style="{
			translate: moving ? '0 5rem' : undefined,
		}"
	>
		<GridLayout
			ref="gridLayout"
			v-model:layout="layout"
			:responsive-layouts="layouts"
			:vertical-compact="true"
			:auto-size="true"
			:row-height="16"
			:responsive="true"
			:cols="{ lg: 120, md: 100, sm: 60, xs: 40, xxs: 20 }"
			@breakpoint-changed="breakpointChanged"
		>
			<GridItem
				v-for="(item, idx) in layout"
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
				<EnabledSettings
					:moving="moving"
					v-if="item.i === 'flags'"
					:remove-panel="() => removePanel(idx)"
				/>
				<RequiredTracker
					:moving="moving"
					v-if="item.i === 'required'"
					:all-items="allItemsFiltered"
					:remove-panel="() => removePanel(idx)"
				/>
				<ItemTracker
					:moving="moving"
					v-if="item.i === 'compact'"
					:all-items="allItemsFiltered"
					:heading="'Required Items'"
					:itemTypes="['required', 'chapterReward', 'equipment', 'partner']"
					:remove-panel="() => removePanel(idx)"
				/>
				<ItemTracker
					:moving="moving"
					v-if="item.i === 'everything'"
					:all-items="allItemsFiltered"
					:heading="'Basically Everything'"
					:itemTypes="[
						'required',
						'chapterReward',
						'equipment',
						'partner',
						'miscItem',
						'miscKey',
					]"
					:remove-panel="() => removePanel(idx)"
				/>
				<UserNotes
					:moving="moving"
					v-if="item.i === 'notes'"
					:remove-panel="() => removePanel(idx)"
				/>
				<MapTracker
					:moving="moving"
					v-if="item.i === 'map'"
					:remove-panel="() => removePanel(idx)"
				/>
				<ItemTracker
					:moving="moving"
					v-if="item.i === 'misckey'"
					:all-items="allItemsFiltered"
					heading="Misc. Keys"
					:itemTypes="['miscKey']"
					:remove-panel="() => removePanel(idx)"
				/>
				<ItemTracker
					:moving="moving"
					v-if="item.i === 'miscitem'"
					:all-items="allItemsFiltered"
					heading="Misc. Items"
					:itemTypes="['miscItem']"
					:remove-panel="() => removePanel(idx)"
				/>

				<ItemTracker
					:moving="moving"
					:all-items="allItemsFiltered"
					v-if="item.i === 'letters'"
					heading="Letters"
					:itemTypes="['letter']"
					:remove-panel="() => removePanel(idx)"
				/>
				<ItemTracker
					:moving="moving"
					:all-items="allItemsFiltered"
					v-if="item.i === 'koot'"
					heading="Koopa Koot Favors"
					:itemTypes="['kootFavor']"
					:remove-panel="() => removePanel(idx)"
				/>
				<!-- <InfoBlocks
					v-if="item.i === 'info'"
					:remove-panel="() => removePanel(idx)"
				/> -->
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
	padding: 1rem;
	display: flex;
	flex-direction: row;
	width: 100%;
	display: flex;
	justify-content: space-between;
	position: relative;
	flex-grow: 0;
}

div.add-panels {
	background-color: #2273a4;
	position: absolute;
	border-bottom: 4px solid #1e3140;
	top: 0;
	left: 0;
	right: 0;
	height: 8rem;
	padding: 1rem;
	z-index: 20;
	transition: translate 0.2s;
	display: flex;
	flex-direction: row;
	gap: 4px;
	padding-block: 4px;
}

div.add-panels > div {
	height: 100%;
	width: 8rem;
	text-align: center;
	padding-inline: 4px;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 8px;
	background-color: #1e3140;
	cursor: move;
}

main {
	transition: translate 0.2s;
	flex-grow: 1;
}

footer {
	width: 100%;
	display: inline-block;
	text-align: center;
	color: white;
	font-size: 1rem;
	padding-bottom: 1rem;
	flex-grow: 0;
}

#logo-img {
	height: 40px;
	cursor: unset;
	padding-left: 7.5em;
}

div.flex-col {
	display: flex;
	flex-direction: column;
	float: left;
}
</style>
