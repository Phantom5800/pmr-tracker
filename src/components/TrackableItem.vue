<script setup lang="ts">
import { usePlaythrough } from "@/stores/playthrough";
import { storeToRefs } from "pinia";
import { computed, toRefs } from "vue";
import { chapterRewardReqs } from "@/data/map";
import type { TrackableItemInfo } from "@/types/items";
import { useOptions } from "../stores/config";

const playthroughStore = usePlaythrough();
const optionsStore = useOptions();
const { info, shrink } = defineProps<{
	info: TrackableItemInfo;
	shrink?: boolean;
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
		:class="{
			fade: !bootsOrHammer && !playthroughStore.hasItem(name),
			shrink: shrink,
			glow:
				name in chapterRewardReqs &&
				!playthroughStore.hasItem(name) &&
				playthroughStore.canCheckLocation(chapterRewardReqs[name])
		}"
		@click="
			powerStarNum || multiple || bootsOrHammer
				? playthroughStore.addItem(derivedData.adding, powerStarNum || multiple)
				: playthroughStore.toggleItem(name)
		"
		@contextmenu.prevent="
			() => {
				if (turnInCheck) {
					const [checkArea, checkCheck] = turnInCheck.split(':');
					playthroughStore.toggleCheck(checkArea, checkCheck);
				} else if (powerStarNum || multiple || bootsOrHammer) {
					playthroughStore.removeItem(derivedData.removing);
				}
			}
		"
	>
		<img :src="getImageUrl(derivedData.image)" :alt="name" />
		<p class="label" v-if="label">{{ label }}</p>
		<p class="checkmark" v-if="showCheck">✔</p>
		<p class="count" v-if="powerStarNum || multiple">
			{{ playthroughStore.itemCount(name) + "/" + (powerStarNum || multiple) }}
		</p>
	</div>
</template>

<style scoped>
div {
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
