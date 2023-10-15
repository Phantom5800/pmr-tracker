<script setup lang="ts">
import { usePlaythrough } from "@/stores/playthrough";
import TrackerPanel from "./TrackerPanel.vue";
import { storeToRefs } from "pinia";
import { ref, watch } from "vue";

const playthroughStore = usePlaythrough();
const { notes } = storeToRefs(playthroughStore);

const content = ref(notes);

watch(content, (content) => {
	playthroughStore.setNotes(content);
});
</script>

<template>
	<TrackerPanel>
		<textarea
			v-model="content"
			placeholder="Put your own notes here if you want them"
		/>
	</TrackerPanel>
</template>

<style scoped>
textarea {
	width: 100%;
	height: 100%;
	min-height: 6rem;
	min-width: 100%;
	max-width: 100%;
	font-size: 1rem;
}
</style>
