<script setup lang="ts">
import ItemTracker from "./ItemTracker.vue";

const recipients = [
	{ name: "Merlon", image: "/src/assets/images/Letters/PM_Merlon.png" },
	{ name: "Kolorado", image: "/src/assets/images/Letters/PM_Kolorado.png" },
	{
		name: "Mort T. (Koopa Village Inn)",
		image: "/src/assets/images/Letters/PM_Toad.png"
	},
	{ name: "Nomadimouse", image: "/src/assets/images/Letters/Nomadimouse.png" },
	{ name: "Goompa", image: "/src/assets/images/Letters/PM_Goompa_sprite.png" },
	{
		name: "Fice T.",

		image: "/src/assets/images/Letters/PM_Fice_T_Sprite.png"
	},
	{
		name: "Igor (Boo's Mansion Shop)",
		image: "/src/assets/images/Letters/PM_Boo_Sprite.png"
	},
	{ name: "Russ T.", image: "/src/assets/images/Letters/Russ_T.png" },
	{ name: "Minh T.", image: "/src/assets/images/Letters/MinhT_PM.png" },
	{
		name: "Mayor Penguin",
		image: "/src/assets/images/Letters/MayorPenguinPM.png"
	},
	{ name: "Merlow", image: "/src/assets/images/Letters/PM_Merlow.png" },
	{
		name: "Goompapa 1",
		image: "/src/assets/images/Letters/PM_Goompapa_Sprite.png"
	},
	{
		name: "Muss T. (Castle Ruins)",
		image: "/src/assets/images/Letters/PM_Toad.png"
	},
	{
		name: "Koover 1 (Koopa Village Entrance)",
		image: "/src/assets/images/Letters/KoopaTroopaPM.png"
	},
	{ name: "Fishmael", image: "/src/assets/images/Letters/Fishmael_PM.png" },
	{
		name: "Koover 2 (Koopa Village Entrance)",
		image: "/src/assets/images/Letters/KoopaTroopaPM.png"
	},
	{
		name: "Mr. E",
		image: "/src/assets/images/Letters/MrEPM.png"
	},
	{ name: "Miss T.", image: "/src/assets/images/Letters/PMMissT.png" },
	{
		name: "Dry Dry Shop",
		image: "/src/assets/images/Letters/Little_Mouser_Paper_Mario.png"
	},
	{
		name: "Franky (Boo's Mansion Entrance)",
		image: "/src/assets/images/Letters/PM_Boo_Sprite.png"
	},
	{ name: "Dane T. 1", image: "/src/assets/images/Letters/PM_Dane_T.png" },
	{ name: "Red Yoshi Kid", image: "/src/assets/images/Letters/red_yoshi.png" },
	{ name: "Dane T. 2", image: "/src/assets/images/Letters/PM_Dane_T.png" },
	{ name: "Frost T.", image: "/src/assets/images/Letters/Frost_T.png" },
	{
		name: "Goompapa 2",
		image: "/src/assets/images/Letters/PM_Goompapa_Sprite.png"
	}
];
</script>

<template>
	<ItemTracker heading="Letters" :tracker-items="recipients" />
</template>

<style scoped></style>
