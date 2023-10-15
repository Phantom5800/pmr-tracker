<script setup lang="ts">
import TrackerPanel from "./TrackerPanel.vue";
import TrackableItem from "./TrackableItem.vue";
import ItemTracker from "./ItemTracker.vue";

const trackerItems = [
	{ name: "Dolly", image: "/src/assets/images/icons/PeachDoll_PM.png" },
	{
		name: "Kooper's Shell",
		image: "/src/assets/images/icons/Kooper'sShell_PM.png"
	},
	{
		name: "Letters",
		image: "/src/assets/images/icons/PM_Letter_Sprite.png",
		multiple: 3
	},

	{ name: "Artifact", image: "/src/assets/images/icons/Artifact_PM.png" },
	{ name: "Forest Pass", image: "/src/assets/images/icons/ForestPass.png" },
	{ name: "Record", image: "/src/assets/images/icons/Record.gif" },
	{ name: "Weight", image: "/src/assets/images/icons/WeightPM.gif" },
	{ name: "Calculator", image: "/src/assets/images/icons/Calculator_PM.png" },
	{ name: "Frying Pan", image: "/src/assets/images/icons/PM_Frying_Pan.png" },
	{ name: "Mailbag", image: "/src/assets/images/icons/Mailbag_PM.png" },
	{
		name: "Cookbook",
		image: "/src/assets/images/icons/Cook_Book_Paper_Mario.png"
	},
	{ name: "Dictionary", image: "/src/assets/images/icons/PM_Dictionary.png" },
	{ name: "Mystery Note", image: "/src/assets/images/icons/MysteryNote.png" },
	{ name: "Volcano Vase", image: "/src/assets/images/icons/VolcanoVase.gif" },
	{
		name: "Crystal Berry",
		image: "/src/assets/images/icons/CrystalBerry_PM.png"
	},
	{ name: "Water Stone", image: "/src/assets/images/icons/WaterStone_PM.png" },
	{
		name: "Lyrics",
		image: "/src/assets/images/koopa-koot-favors/Lyrics_PM.png",
		label: "L"
	},
	{
		name: "Melody",
		image: "/src/assets/images/koopa-koot-favors/PM_Melody.png",
		label: "M"
	},
	{
		name: "Quizmo",
		image: "/src/assets/images/icons/ChuckQuizmo_PM.png",
		multiple: 16
	},
	{
		name: "Star Piece",
		image: "/src/assets/images/icons/Star_Piece.png",
		multiple: 96
	},
	{
		name: "Rip Cheato",
		image: "/src/assets/images/icons/RipCheato.png",
		multiple: 11
	},
	{
		name: "Anti Guy",
		image: "/src/assets/images/icons/Anti_Guy_Sprite_-_Paper_Mario.png"
	}
];
</script>

<template>
	<ItemTracker :tracker-items="trackerItems" heading="Misc. Items" />
</template>

<style scoped>
div.grid {
	display: grid;
	grid-template-columns: repeat(8, minmax(0, 1fr));
	gap: 1rem;
}
</style>
