<script setup lang="ts">
import { usePlaythrough } from "@/stores/playthrough";
import TrackerPanel from "./TrackerPanel.vue";
import { storeToRefs } from "pinia";
import { ref, watch } from "vue";

const playthroughStore = usePlaythrough();
const { notes } = storeToRefs(playthroughStore);

const content = ref(notes);

watch(content, content => {
	playthroughStore.setNotes(content);
});

const { moving, removePanel } = defineProps<{
	moving: boolean;
	removePanel: () => void;
}>();
</script>

<template>
	<TrackerPanel :moving="moving" :remove-panel="removePanel">
		<textarea
			v-model="content"
			placeholder="Put your own notes here if you want them"
		/>
	</TrackerPanel>
</template>

<style scoped>
textarea {
	font-family: monospace;
	width: 100%;
	height: 100%;
	font-size: 1rem;
	resize: none;
}
</style>
