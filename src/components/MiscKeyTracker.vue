<script setup lang="ts">
import ItemTracker from "./ItemTracker.vue";

const trackerItems = [
	{
		name: "Red Berry",
		image: "/src/assets/images/icons/PaperMario_Items_RedBerry.png",
		label: "R"
	},
	{
		name: "Yellow Berry",
		image: "/src/assets/images/icons/PaperMario_Items_YellowBerry.png",
		label: "Y"
	},
	{
		name: "Blue Berry",
		image: "/src/assets/images/icons/PaperMario_Items_BlueBerry.png",
		label: "B",
		multiple: 2
	},
	{
		name: "Bubble Berry",
		image: "/src/assets/images/icons/PaperMario_Items_BubbleBerry.png"
	},
	{
		name: "Storeroom Key",
		image: "/src/assets/images/icons/OddKey.gif",
		label: "S"
	},
	{
		name: "Odd Key",
		image: "/src/assets/images/icons/OddKey.gif",
		label: "O"
	},
	{
		name: "Blue Key",
		image: "/src/assets/images/icons/PM_BlueKey.png",
		label: "B"
	},
	{
		name: "Prison Key",
		image: "/src/assets/images/icons/OddKey.gif",
		label: "P",
		multiple: 2
	}
];
</script>

<template>
	<ItemTracker :tracker-items="trackerItems" heading="Misc. Items" />
</template>

<style scoped></style>
