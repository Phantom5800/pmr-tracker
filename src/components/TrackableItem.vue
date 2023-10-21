<script setup lang="ts">
import { usePlaythrough } from "@/stores/playthrough";
import { storeToRefs } from "pinia";
import { computed, ref } from "vue";
import { chapterRewardReqs } from "@/data/map";
import type { TrackableItemInfo } from "@/types/items";
import { useOptions } from "../stores/config";
import type { PlaythroughProps } from "../stores/playthrough";
import {
	useFloating,
	offset,
	arrow,
	flip,
	shift,
	autoUpdate,
	Placement
} from "@floating-ui/vue";

const playthroughStore = usePlaythrough();
const optionsStore = useOptions();
const { info, size, hoverTooltip } = defineProps<{
	info: TrackableItemInfo;
	size: string;
	hoverTooltip?: string;
}>();

const { name, image, multiple, label, show, turnInCheck } = info;

const { options } = storeToRefs(optionsStore);

const hovering = ref(false);
const showStarTooltip = ref(false);

const itemRef = ref(null);
const tooltipRef = ref(null);
const arrowRef = ref(null);

const { floatingStyles, middlewareData, placement } = useFloating(
	itemRef,
	tooltipRef,
	{
		middleware: [flip(), offset(12), shift(), arrow({ element: arrowRef })],
		placement: "top",
		whileElementsMounted: autoUpdate,
		transform: false
	}
);

const powerStarNum = computed(() =>
	name === "Power Stars Found" ? options.value.powerStarNum : null
);

const bootsOrHammer = computed(() => name === "Boots" || name === "Hammer");

const derivedData = computed(
	(): {
		adding: null | string;
		removing: null | string;
		name: string;
		image: string;
	} => {
		if (bootsOrHammer.value) {
			const _ultra = `Ultra ${name}`;
			const _super = `Super ${name}`;
			if (playthroughStore.hasItem(_ultra)) {
				return {
					adding: null,
					removing: _ultra,
					name: _ultra,
					image: `upgrades/PM_${_ultra.replace(" ", "_")}.png`
				};
			} else if (playthroughStore.hasItem(_super)) {
				return {
					adding: _ultra,
					removing: _super,
					name: _ultra,
					image: `upgrades/PM_${_super.replace(" ", "_")}.png`
				};
			} else if (playthroughStore.hasItem(name)) {
				return {
					adding: _super,
					removing: name,
					name: _ultra,
					image: `upgrades/PM_${name}.png`
				};
			} else {
				return {
					adding: name,
					removing: null,
					name: _ultra,
					image: `upgrades/PM_No_${name}.png`
				};
			}
		} else {
			return { adding: name, removing: name, name: name, image: image };
		}
	}
);

const showCheck = computed(() => {
	if (turnInCheck) {
		const [checkArea, checkCheck] = turnInCheck.split(":");
		return playthroughStore.checkedLocation(checkArea, checkCheck);
	} else {
		return false;
	}
});

function getImageUrl(image: string) {
	return new URL(`../assets/images/${image}`, import.meta.url).href;
}
</script>

<template>
	<div
		v-if="show === undefined || show(options)"
		@mouseover="hovering = true"
		@mouseout="hovering = false"
		tabindex="0"
		ref="itemRef"
		class="tracker-item"
		:class="{
			fade: !bootsOrHammer && !playthroughStore.hasItem(name),
			glow:
				!playthroughStore.hasItem(name) &&
				((info.type === 'required' &&
					options.highlightKey &&
					info.chapter &&
					1 <= info.chapter &&
					info.chapter <= 8) ||
					(name in chapterRewardReqs &&
						options.trackerLogic &&
						playthroughStore.canCheckLocation(chapterRewardReqs[name])))
		}"
		@blur="showStarTooltip = false"
		@click="
			powerStarNum || multiple || bootsOrHammer
				? playthroughStore.addItem(derivedData.adding, powerStarNum || multiple)
				: playthroughStore.toggleItem(name)
		"
		@contextmenu.prevent="
			() => {
				if (name in chapterRewardReqs) {
					// playthroughStore.incrementSpiritAnnotation(
					// 	name as keyof PlaythroughProps['spiritAnnotations']
					// );
					showStarTooltip = !showStarTooltip;
				} else if (turnInCheck) {
					const [checkArea, checkCheck] = turnInCheck.split(':');
					playthroughStore.toggleCheck(checkArea, checkCheck);
				} else if (powerStarNum || multiple || bootsOrHammer) {
					playthroughStore.removeItem(derivedData.removing);
				} else if (info.type === 'partner') {
					playthroughStore.cycleUpgrade(name);
				}
			}
		"
	>
		<img
			:src="getImageUrl(derivedData.image)"
			:alt="name"
			:style="{
				marginBottom: powerStarNum || multiple ? '1.5rem' : 0,
				width: size,
				height: size
			}"
		/>
		<p
			class="label"
			v-if="
				(label && options.colorblind) ||
				(name in chapterRewardReqs &&
					playthroughStore.getSpiritAnnotation(
						name as keyof PlaythroughProps['spiritAnnotations']
					) > 0)
			"
		>
			{{
				label ||
				playthroughStore.getSpiritAnnotation(
					name as keyof PlaythroughProps["spiritAnnotations"]
				)
			}}
		</p>
		<p class="checkmark" v-if="showCheck">✔</p>
		<div class="upgrades" v-if="info.type === 'partner'">
			<img
				:src="getImageUrl('koopa-koot-favors/Crystal_Ball_PM.png')"
				alt=""
				v-if="playthroughStore.hasItem(`${name}:super`)"
			/>
			<img
				:src="getImageUrl('icons/UltraStone.gif')"
				alt=""
				v-if="playthroughStore.hasItem(`${name}:ultra`)"
			/>
		</div>
		<p class="count" v-if="powerStarNum || multiple">
			{{ playthroughStore.itemCount(name) + "/" + (powerStarNum || multiple) }}
		</p>
		<div
			class="hover-tip"
			ref="tooltipRef"
			:style="{
				...floatingStyles,
				transformOrigin: placement === 'bottom' ? 'top center' : 'bottom center'
			}"
			v-if="hovering && hoverTooltip && options.recipeTooltips"
		>
			{{ hoverTooltip }}
			<div
				class="down-arrow"
				:style="{
					left: middlewareData.arrow
						? `${middlewareData.arrow.x}px`
						: undefined,
					top: placement === 'bottom' ? 0 : undefined,
					bottom: placement === 'top' ? 0 : undefined,
					translate: placement === 'bottom' ? '0 -50%' : '0 50%'
				}"
				ref="arrowRef"
			></div>
		</div>
		<div
			class="hover-tip star-tooltip"
			ref="tooltipRef"
			:style="{
				...floatingStyles,
				transformOrigin:
					placement === 'bottom' ? 'top center' : 'bottom center',
				width: 'max-content'
			}"
			v-if="info.type === 'chapterReward' && showStarTooltip"
		>
			<div
				class="down-arrow"
				:style="{
					left: middlewareData.arrow
						? `${middlewareData.arrow.x}px`
						: undefined,
					top: placement === 'bottom' ? 0 : undefined,
					bottom: placement === 'top' ? 0 : undefined,
					translate: placement === 'bottom' ? '0 -50%' : '0 50%'
				}"
				ref="arrowRef"
			></div>
			<h3>Chapter Scaling</h3>
			<button class="scaling" v-for="num in [1, 2, 3, 4, 5, 6, 7]">
				{{ num }}
			</button>
			<h3>Dungeon Entrances</h3>
			<button
				class="entrance"
				v-for="star in Object.getOwnPropertyNames(chapterRewardReqs)"
			>
				<img
					v-if="star !== 'Star Rod'"
					:src="getImageUrl(`icons/${star}_PM.png`)"
					alt=""
				/>
			</button>
		</div>
	</div>
</template>

<style scoped>
div.tracker-item {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	position: relative;
}

img {
	width: 100%;
	height: 100%;
	object-fit: contain;
}

p.label {
	position: absolute;
	top: 0;
	right: 4px;
	font-size: 2rem;
	stroke: 1px black;
	-webkit-text-stroke: 1px black;
	font-weight: bold;
}

p.count {
	font-size: 1.75rem;
	stroke: 1px black;
	-webkit-text-stroke: 1px black;
	position: absolute;
	bottom: 0;
	font-weight: bold;
}

p.checkmark {
	position: absolute;
	bottom: 0px;
	right: 4px;
	font-size: 2rem;
	color: #00dd00;
	stroke: 1px black;
	-webkit-text-stroke: 1px black;
}

div.upgrades {
	position: absolute;
	bottom: 0px;
	right: 0px;
	width: 35%;
	display: flex;
	flex-direction: column-reverse;
}

div.upgrades > img {
	margin-top: -50%;
}

div.tracker-item div.hover-tip {
	/* position: absolute;
	 top: 0; */
	/* translate: 0 -50%; */
	/* scale: 0; */
	/* transition: all 0.15s; */
	transform-origin: bottom center;
	pointer-events: none;
	background-color: #101020;
	padding: 0.5rem 1rem;
	width: 20rem;
	border-radius: 8px;
	z-index: 10;
	animation: forwards tooltip-grow 0.15s;
}

@keyframes tooltip-grow {
	0% {
		transform: scale(0%);
	}
	100% {
		transform: scale(100%);
	}
}

button {
	pointer-events: all;
	background-color: transparent;
	padding: 0;
	margin: 0;
	border: 0;
}

button.scaling {
	font-size: 3rem;
	color: white;
	stroke: 1px black;
	-webkit-text-stroke: 1px black;
}

div.star-tooltip {
	display: grid;
	place-items: center;
	grid-template-columns: repeat(7, 1fr);
}

div.star-tooltip > h3 {
	opacity: 0.6;
	font-size: 1rem;
	text-align: left;
	width: 100%;
	grid-column: 1 / 8;
}

.down-arrow {
	width: 0;
	height: 0;
	padding: 0.6rem;
	rotate: 45deg;
	background-color: #101020;
	z-index: -10;
	/* border-left: 20px solid transparent;
	border-right: 20px solid transparent;
	border-top: 20px solid #101020; */
	position: absolute;
	/* left: 50%; */
	/* translate: -50% 0; */
}

.shrink > img {
	width: 70%;
	height: 70%;
}
.fade > img {
	filter: grayscale(1) brightness(50%);
}

.glow > img {
	filter: grayscale(0.6) brightness(80%) drop-shadow(0px 0px 5px white);
}
</style>
