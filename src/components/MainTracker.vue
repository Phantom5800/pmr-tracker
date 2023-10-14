<script setup lang="ts">
import TrackerPanel from "./TrackerPanel.vue";
import { ref } from "vue";
import TrackableItem from "./TrackableItem.vue";
import { usePlaythrough } from "../stores/playthrough";

const tooltip = ref("");
const playthrough = usePlaythrough();

const trackerItems = [
	{
		chapter: 1,
		id: "Eldstar",
		src: "/src/assets/images/icons/Eldstar_PM.png"
	},

	{
		chapter: 1,
		id: "Fortress Key",
		src: "/src/assets/images/icons/FortressKey_PM.png",
		multiple: 4
	},

	{ chapter: 2, id: "Mamar", src: "/src/assets/images/icons/Mamar_PM.png" },
	{
		chapter: 2,
		id: "Pulse Stone",
		src: "/src/assets/images/icons/PulseStone.gif"
	},
	{
		chapter: 2,
		id: "Pyramid Stone",
		src: "/src/assets/images/icons/PyramidStone.gif"
	},
	{
		chapter: 2,
		id: "Diamond Stone",
		src: "/src/assets/images/icons/DiamondStone.png"
	},
	{
		chapter: 2,
		id: "Lunar Stone",
		src: "/src/assets/images/icons/LunarStone.gif"
	},

	{
		chapter: 2,
		id: "Ruins Key",
		src: "/src/assets/images/icons/Ruins_Key.png",
		multiple: 4
	},

	{ chapter: 3, id: "Skolar", src: "/src/assets/images/icons/Skolar_PM.png" },
	{
		chapter: 3,
		id: "Boo's Portrait",
		src: "/src/assets/images/icons/Boo'sPortrait_PM.png"
	},

	{
		chapter: 3,
		id: "Tubba Castle Key",
		src: "/src/assets/images/icons/Tubba_Blubba_Castle_Key.png",
		multiple: 3
	},

	{
		chapter: 4,
		id: "Muskular",
		src: "/src/assets/images/icons/Muskular_PM.png"
	},
	{
		chapter: 4,
		id: "Toy Train",
		src: "/src/assets/images/icons/ToyTrain_PM.png"
	},
	{ chapter: 4, id: "Cake", src: "/src/assets/images/icons/Cake.gif" },

	{ chapter: 5, id: "Misstar", src: "/src/assets/images/icons/Misstar_PM.png" },
	{
		chapter: 5,
		id: "Jade Raven",
		src: "/src/assets/images/icons/JadeRaven_PM.png"
	},

	{ chapter: 6, id: "Klevar", src: "/src/assets/images/icons/Klevar_PM.png" },
	{
		chapter: 6,
		id: "Magical Seed 1",
		src: "/src/assets/images/icons/MagicalSeed1.png"
	},
	{
		chapter: 6,
		id: "Magical Seed 2",
		src: "/src/assets/images/icons/MagicalSeed2.png"
	},
	{
		chapter: 6,
		id: "Magical Seed 3",
		src: "/src/assets/images/icons/MagicalSeed3.png"
	},
	{
		chapter: 6,
		id: "Magical Seed 4",
		src: "/src/assets/images/icons/MagicalSeed4.png"
	},
	{
		chapter: 6,
		id: "Magical Bean",
		src: "/src/assets/images/icons/MagicBean_PM.png"
	},
	{
		chapter: 6,
		id: "Fertile Soil",
		src: "/src/assets/images/icons/Fertilesoil.png"
	},
	{
		chapter: 6,
		id: "Miracle Water",
		src: "/src/assets/images/icons/MiracleWater_PM.png"
	},

	{ chapter: 7, id: "Kalmar", src: "/src/assets/images/icons/Kalmar_PM.png" },

	{
		chapter: 7,
		id: "Warehouse Key",
		src: "/src/assets/images/icons/OddKey.gif",
		label: "W"
	},

	{ chapter: 7, id: "Bucket", src: "/src/assets/images/icons/Bucket.png" },
	{ chapter: 7, id: "Scarf", src: "/src/assets/images/icons/Scarf.gif" },
	{
		chapter: 7,
		id: "Star Stone",
		src: "/src/assets/images/icons/StarStone_PM.png"
	},

	{ chapter: 7, id: "Red Key", src: "/src/assets/images/icons/PM_Red_Key.png" },

	{
		chapter: 7,
		id: "Palace Key",
		src: "/src/assets/images/icons/PM_Palace_Key.png",
		label: "R"
	},

	{
		chapter: 8,
		id: "Star Rod",
		src: "/src/assets/images/icons/PM_Starrod.png"
	},
	{
		chapter: 16,
		id: "Power Stars Found",
		src: "/src/assets/images/icons/Power_Star.png"
	},

	{
		chapter: 8,
		id: "Bowser's Castle Key",
		src: "/src/assets/images/icons/PM_Bowser_Castle_Key.png"
	},

	{
		chapter: 0,
		id: "Boots",
		src: "/src/assets/images/upgrades/PM_Boots.png"
	},
	{
		chapter: 0,
		id: "Hammer",
		src: "/src/assets/images/upgrades/PM_Hammer.png"
	},
	{
		chapter: 0,
		id: "Ultra Stone",
		src: "/src/assets/images/icons/UltraStone.gif"
	},

	{
		chapter: -1,
		id: "Goombario",
		src: "/src/assets/images/partners/goombario.png"
	},
	{ chapter: -1, id: "Kooper", src: "/src/assets/images/partners/kooper.png" },
	{
		chapter: -1,
		id: "Bombette",
		src: "/src/assets/images/partners/bombette.png"
	},
	{
		chapter: -1,
		id: "Parakarry",
		src: "/src/assets/images/partners/parakarr.png"
	},
	{ chapter: -1, id: "Bow", src: "/src/assets/images/partners/bow.png" },
	{ chapter: -1, id: "Watt", src: "/src/assets/images/partners/watt.png" },
	{ chapter: -1, id: "Sushie", src: "/src/assets/images/partners/sushie.png" },
	{
		chapter: -1,
		id: "Lakilester",
		src: "/src/assets/images/partners/lakilester.png"
	}
];
</script>

<template>
	<TrackerPanel>
		<div class="flex-header">
			<h2>Required Items</h2>
			<span>{{ tooltip }}</span>
		</div>
		<div class="rows">
			<div class="gridrow" v-for="chapter in [1, 2, 3, 4, 5, 6, 7, 8, 0, -1]">
				<TrackableItem
					v-for="(item, index) in trackerItems.filter(
						(el) => el.chapter === chapter
					)"
					:key="item.id"
					:item="item.id"
					:src="item.src"
					:multiple="item.multiple"
					:shrink="1 <= chapter && chapter <= 8 && index > 0"
					:label="item.label"
					@mouseover="tooltip = item.id"
					@mouseout="tooltip = ''"
				/>
			</div>
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

div.grid {
	display: grid;
	grid-template-columns: repeat(7, minmax(0, 1fr));
}

div.rows {
	display: flex;
	flex-direction: column;
	row-gap: 0.5rem;
}

div.gridrow {
	display: grid;
	grid-template-columns: repeat(8, minmax(0, 1fr));
	align-items: center;
}

div.gridrow > div {
	width: 100%;
	height: 5rem;
	position: relative;
}

img.hide {
	display: none;
}
</style>
