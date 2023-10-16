<script setup lang="ts">
import { usePlaythrough } from "@/stores/playthrough";
import { storeToRefs } from "pinia";
import { computed, toRefs } from "vue";
import { chapterRewardReqs } from "@/data/map";
import type { TrackableItemInfo } from "@/types/items";

const playthroughStore = usePlaythrough();
const { info, shrink } = defineProps<{
	info: TrackableItemInfo;
	shrink?: boolean;
}>();

const { name, image, multiple, label } = info;

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

const imageUrl = computed(() => {
	const relativeUrl = `../assets/images/${derivedData.value.image}`;
	return new URL(relativeUrl, import.meta.url).href;
});
</script>

<template>
	<div
		:class="{
			fade: !bootsOrHammer && !playthroughStore.hasItem(name),
			shrink: shrink,
			glow:
				name in chapterRewardReqs &&
				!playthroughStore.hasItem(name) &&
				playthroughStore.canCheckLocation(chapterRewardReqs[name])
		}"
		@click="
			multiple || bootsOrHammer
				? playthroughStore.addItem(derivedData.adding, multiple)
				: playthroughStore.toggleItem(name)
		"
		@contextmenu.prevent="
			(multiple || bootsOrHammer) &&
				playthroughStore.removeItem(derivedData.removing)
		"
	>
		<img :src="imageUrl" :alt="name" />
		<p class="label" v-if="label">{{ label }}</p>
		<p class="count" v-if="multiple">
			{{ playthroughStore.itemCount(name) + "/" + multiple }}
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
