<script setup lang="ts">
import TrackerPanel from "./TrackerPanel.vue";
import { ref } from "vue";
import TrackableItem from "./TrackableItem.vue";

const tooltip = ref("");

const recipients = [
	{ name: "Merlon", src: "/src/assets/images/Letters/PM_Merlon.png" },
	{ name: "Kolorado", src: "/src/assets/images/Letters/PM_Kolorado.png" },
	{
		name: "Mort T. (Koopa Village Inn)",
		src: "/src/assets/images/Letters/PM_Toad.png"
	},
	{ name: "Nomadimouse", src: "/src/assets/images/Letters/Nomadimouse.png" },
	{ name: "Goompa", src: "/src/assets/images/Letters/PM_Goompa_sprite.png" },
	{
		name: "Fice T.",

		src: "/src/assets/images/Letters/PM_Fice_T_Sprite.png"
	},
	{
		name: "Igor (Boo's Mansion Shop)",
		src: "/src/assets/images/Letters/PM_Boo_Sprite.png"
	},
	{ name: "Russ T.", src: "/src/assets/images/Letters/Russ_T.png" },
	{ name: "Minh T.", src: "/src/assets/images/Letters/MinhT_PM.png" },
	{
		name: "Mayor Penguin",
		src: "/src/assets/images/Letters/MayorPenguinPM.png"
	},
	{ name: "Merlow", src: "/src/assets/images/Letters/PM_Merlow.png" },
	{
		name: "Goompapa 1",
		src: "/src/assets/images/Letters/PM_Goompapa_Sprite.png"
	},
	{
		name: "Muss T. (Castle Ruins)",
		src: "/src/assets/images/Letters/PM_Toad.png"
	},
	{
		name: "Koover 1 (Koopa Village Entrance)",
		src: "/src/assets/images/Letters/KoopaTroopaPM.png"
	},
	{ name: "Fishmael", src: "/src/assets/images/Letters/Fishmael_PM.png" },
	{
		name: "Koover 2 (Koopa Village Entrance)",
		src: "/src/assets/images/Letters/KoopaTroopaPM.png"
	},
	{
		name: "Mr. E",
		src: "/src/assets/images/Letters/MrEPM.png"
	},
	{ name: "Miss T.", src: "/src/assets/images/Letters/PMMissT.png" },
	{
		name: "Dry Dry Shop",
		src: "/src/assets/images/Letters/Little_Mouser_Paper_Mario.png"
	},
	{
		name: "Franky (Boo's Mansion Entrance)",
		src: "/src/assets/images/Letters/PM_Boo_Sprite.png"
	},
	{ name: "Dane T. 1", src: "/src/assets/images/Letters/PM_Dane_T.png" },
	{ name: "Red Yoshi Kid", src: "/src/assets/images/Letters/red_yoshi.png" },
	{ name: "Dane T. 2", src: "/src/assets/images/Letters/PM_Dane_T.png" },
	{ name: "Frost T.", src: "/src/assets/images/Letters/Frost_T.png" },
	{
		name: "Goompapa 2",
		src: "/src/assets/images/Letters/PM_Goompapa_Sprite.png"
	}
];
</script>

<template>
	<TrackerPanel>
		<div class="flex-header">
			<h2>Letters</h2>
			<span>{{ tooltip }}</span>
		</div>
		<div class="flex-main">
			<TrackableItem
				v-for="recipient in recipients"
				:key="recipient.name"
				:item="recipient.name"
				:src="recipient.src"
				@mouseover="tooltip = recipient.name"
				@mouseout="tooltip = ''"
			/>
		</div>
	</TrackerPanel>
</template>

<style scoped>
div.flex-header {
	color: white;
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 1rem;
}

h2 {
	margin: 0;
}

div.flex-main {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	column-gap: 3rem;
	row-gap: 1rem;
	justify-content: center;
}

div.flex-main > * {
	width: 2.5rem;
}

img.hide {
	display: none;
}
</style>
