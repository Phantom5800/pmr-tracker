<script setup lang="ts">
import { usePlaythrough } from "@/stores/playthrough";
import { storeToRefs } from "pinia";
import { computed, toRefs } from "vue";
import { chapterRewardReqs } from "@/data/map";

const playthroughStore = usePlaythrough();
const { item, src, multiple, label, shrink } = defineProps<{
	item: string;
	src: string;
	multiple?: number;
	label?: string;
	shrink?: boolean;
}>();

const bootsOrHammer = computed(() => item === "Boots" || item === "Hammer");

const derivedData = computed(
	(): {
		adding: null | string;
		removing: null | string;
		item: string;
		src: string;
	} => {
		if (bootsOrHammer.value) {
			const _ultra = `Ultra ${item}`;
			const _super = `Super ${item}`;
			if (playthroughStore.hasItem(_ultra)) {
				return {
					adding: null,
					removing: _ultra,
					item: _ultra,
					src: `/src/assets/images/upgrades/PM_${_ultra.replace(" ", "_")}.png`
				};
			} else if (playthroughStore.hasItem(_super)) {
				return {
					adding: _ultra,
					removing: _super,
					item: _ultra,
					src: `/src/assets/images/upgrades/PM_${_super.replace(" ", "_")}.png`
				};
			} else if (playthroughStore.hasItem(item)) {
				return {
					adding: _super,
					removing: item,
					item: _ultra,
					src: `/src/assets/images/upgrades/PM_${item}.png`
				};
			} else {
				return {
					adding: item,
					removing: null,
					item: _ultra,
					src: `/src/assets/images/upgrades/PM_No_${item}.png`
				};
			}
		} else {
			return { adding: item, removing: item, item: item, src: src };
		}
	}
);
</script>

<template>
	<div
		:class="{
			fade: !bootsOrHammer && !playthroughStore.hasItem(item),
			shrink: shrink,
			glow:
				item in chapterRewardReqs &&
				!playthroughStore.hasItem(item) &&
				playthroughStore.canCheckLocation(chapterRewardReqs[item])
		}"
		@click="
			multiple || bootsOrHammer
				? playthroughStore.addItem(derivedData.adding, multiple)
				: playthroughStore.toggleItem(item)
		"
		@contextmenu.prevent="
			(multiple || bootsOrHammer) &&
				playthroughStore.removeItem(derivedData.removing)
		"
	>
		<img :src="derivedData.src" :alt="item" />
		<p class="label" v-if="label">{{ label }}</p>
		<p class="count" v-if="multiple">
			{{ playthroughStore.itemCount(item) + "/" + multiple }}
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
}

img {
	width: 100%;
	height: 100%;
	object-fit: contain;
}

p.label {
	position: absolute;
	bottom: 4px;
	right: 4px;
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
