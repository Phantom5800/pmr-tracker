<script setup lang="ts">
import { usePlaythrough } from "@/stores/playthrough";
import { storeToRefs } from "pinia";
import { computed } from "vue";
import { chapterRewardReqs } from "@/data/map";
import type { TrackableItemInfo } from "@/types/items";
import { useOptions } from "../stores/config";
import type { PlaythroughProps } from "../stores/playthrough";

const playthroughStore = usePlaythrough();
const optionsStore = useOptions();
const { info, shrink } = defineProps<{
	info: TrackableItemInfo;
	shrink?: boolean;
	hoverTooltip?: string;
}>();

const { name, image, multiple, label, show, turnInCheck } = info;

const { options } = storeToRefs(optionsStore);

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
		class="tracker-item"
		:class="{
			fade: !bootsOrHammer && !playthroughStore.hasItem(name),
			shrink: shrink,
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
		@click="
			powerStarNum || multiple || bootsOrHammer
				? playthroughStore.addItem(derivedData.adding, powerStarNum || multiple)
				: playthroughStore.toggleItem(name)
		"
		@contextmenu.prevent="
			() => {
				if (name in chapterRewardReqs) {
					playthroughStore.incrementSpiritAnnotation(
						name as keyof PlaythroughProps['spiritAnnotations']
					);
				} else if (turnInCheck) {
					const [checkArea, checkCheck] = turnInCheck.split(':');
					playthroughStore.toggleCheck(checkArea, checkCheck);
				} else if (powerStarNum || multiple || bootsOrHammer) {
					playthroughStore.removeItem(derivedData.removing);
				}
			}
		"
	>
		<img :src="getImageUrl(derivedData.image)" :alt="name" />
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
		<p class="count" v-if="powerStarNum || multiple">
			{{ playthroughStore.itemCount(name) + "/" + (powerStarNum || multiple) }}
		</p>
		<div class="hover-tip" v-if="hoverTooltip && options.recipeTooltips">
			{{ hoverTooltip }}
			<div class="down-arrow"></div>
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
	image-rendering: crisp-edges;
	position: relative;
}

img {
	width: 100%;
	height: 100%;
	object-fit: contain;
}

p.label {
	position: absolute;
	top: 4px;
	right: 4px;
	font-size: 2rem;
	stroke: 1px black;
	-webkit-text-stroke: 1px black;
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

div.tracker-item div.hover-tip {
	position: absolute;
	top: 0;
	translate: 0 -50%;
	scale: 0;
	transition: all 0.15s;
	pointer-events: none;
	background-color: #101020;
	padding: 0.5rem 1rem;
	width: 20rem;
	border-radius: 8px;
	z-index: 10;
}

div.tracker-item:hover div.hover-tip {
	translate: 0 -115%;
	scale: 100%;
}

.down-arrow {
	width: 0;
	height: 0;
	border-left: 20px solid transparent;
	border-right: 20px solid transparent;
	border-top: 20px solid #101020;
	position: absolute;
	left: 50%;
	translate: -50% 0;
}

.shrink > img {
	width: 60%;
	height: 60%;
}
.fade > img {
	filter: grayscale(1) brightness(50%);
}

.glow > img {
	filter: grayscale(0.6) brightness(80%) drop-shadow(0px 0px 5px white);
}
</style>
