<script setup lang="ts">
import { useOptions } from "@/stores/config";
import { usePlaythrough } from "@/stores/playthrough";
import { storeToRefs, defineStore } from "pinia";
import { ref } from "vue";
import MenuOptions from "./MenuOptions.vue";
import axios from "axios";
import { vOnClickOutside } from "@vueuse/components";

const optionsStore = useOptions();

const { options } = storeToRefs(optionsStore);

const props = defineProps<{
	isOpen: boolean;
	optionsKeys: string[];
	close: () => void;
}>();

function fetchSeedSettings(id: string) {
	axios
		.get(
			`https://paper-mario-randomizer-server.ue.r.appspot.com/randomizer_settings/${id}`,
			{
				headers: {
					Accept: "application/json",
					Origin: "https://pmr-tracker.phantom-games.com",
					Referer: "https://pmr-tracker.phantom-games.com/"
				}
			}
		)
		.then((result) => {
			console.log(result);
		});
}
</script>

<template>
	<div
		:class="[{ 'options-open': props.isOpen }, 'panel']"
		v-on-click-outside="
			() => {
				if (props.isOpen) {
					props.close();
				}
			}
		"
	>
		<MenuOptions :options-keys="optionsKeys" />
	</div>
</template>

<style scoped>
div.panel {
	background-color: darkblue;
	color: white;
	margin: 5px 5px 5px 5px;
	padding: 1rem;
	font-size: 1.5em;
	position: absolute;
	left: -600px;
	top: 58px;
	width: 500px;
	transition: 0.4s;
}

div.panel.options-open {
	-webkit-transform: translate(608px);
	transform: translate(608px);
}

table {
	width: 100%;
}

div.flex {
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
}

div.flex-row {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
}

button {
	min-height: 100%;
	color: black;
	font-weight: bold;
	border-radius: 0;
	background-color: white;
	border: 2px solid black;
	padding-inline: 1rem;
}

input {
	min-height: 100%;
}
</style>
