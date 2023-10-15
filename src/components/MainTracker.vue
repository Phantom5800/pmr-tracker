<script setup lang="ts">
import TrackerPanel from "./TrackerPanel.vue";
import { ref } from "vue";
import TrackableItem from "./TrackableItem.vue";
import { usePlaythrough } from "../stores/playthrough";
import ItemTracker from "./ItemTracker.vue";

const tooltip = ref("");
const playthrough = usePlaythrough();

const trackerItems = [
	{
		chapter: 1,
		name: "Eldstar",
		image: "/src/assets/images/icons/Eldstar_PM.png"
	},

	{
		chapter: 1,
		name: "Fortress Key",
		image: "/src/assets/images/icons/FortressKey_PM.png",
		multiple: 4
	},

	{ chapter: 2, name: "Mamar", image: "/src/assets/images/icons/Mamar_PM.png" },
	{
		chapter: 2,
		name: "Pulse Stone",
		image: "/src/assets/images/icons/PulseStone.gif"
	},
	{
		chapter: 2,
		name: "Pyramid Stone",
		image: "/src/assets/images/icons/PyramidStone.gif"
	},
	{
		chapter: 2,
		name: "Diamond Stone",
		image: "/src/assets/images/icons/DiamondStone.png"
	},
	{
		chapter: 2,
		name: "Lunar Stone",
		image: "/src/assets/images/icons/LunarStone.gif"
	},

	{
		chapter: 2,
		name: "Ruins Key",
		image: "/src/assets/images/icons/Ruins_Key.png",
		multiple: 4
	},

	{
		chapter: 3,
		name: "Skolar",
		image: "/src/assets/images/icons/Skolar_PM.png"
	},
	{
		chapter: 3,
		name: "Boo's Portrait",
		image: "/src/assets/images/icons/Boo'sPortrait_PM.png"
	},

	{
		chapter: 3,
		name: "Tubba Castle Key",
		image: "/src/assets/images/icons/Tubba_Blubba_Castle_Key.png",
		multiple: 3
	},

	{
		chapter: 4,
		name: "Muskular",
		image: "/src/assets/images/icons/Muskular_PM.png"
	},
	{
		chapter: 4,
		name: "Toy Train",
		image: "/src/assets/images/icons/ToyTrain_PM.png"
	},
	{ chapter: 4, name: "Cake", image: "/src/assets/images/icons/Cake.gif" },

	{
		chapter: 5,
		name: "Misstar",
		image: "/src/assets/images/icons/Misstar_PM.png"
	},
	{
		chapter: 5,
		name: "Jade Raven",
		image: "/src/assets/images/icons/JadeRaven_PM.png"
	},

	{
		chapter: 6,
		name: "Klevar",
		image: "/src/assets/images/icons/Klevar_PM.png"
	},
	{
		chapter: 6,
		name: "Magical Seed 1",
		image: "/src/assets/images/icons/MagicalSeed1.png"
	},
	{
		chapter: 6,
		name: "Magical Seed 2",
		image: "/src/assets/images/icons/MagicalSeed2.png"
	},
	{
		chapter: 6,
		name: "Magical Seed 3",
		image: "/src/assets/images/icons/MagicalSeed3.png"
	},
	{
		chapter: 6,
		name: "Magical Seed 4",
		image: "/src/assets/images/icons/MagicalSeed4.png"
	},
	{
		chapter: 6,
		name: "Magical Bean",
		image: "/src/assets/images/icons/MagicBean_PM.png"
	},
	{
		chapter: 6,
		name: "Fertile Soil",
		image: "/src/assets/images/icons/Fertilesoil.png"
	},
	{
		chapter: 6,
		name: "Miracle Water",
		image: "/src/assets/images/icons/MiracleWater_PM.png"
	},

	{
		chapter: 7,
		name: "Kalmar",
		image: "/src/assets/images/icons/Kalmar_PM.png"
	},

	{
		chapter: 7,
		name: "Warehouse Key",
		image: "/src/assets/images/icons/OddKey.gif",
		label: "W"
	},

	{ chapter: 7, name: "Bucket", image: "/src/assets/images/icons/Bucket.png" },
	{ chapter: 7, name: "Scarf", image: "/src/assets/images/icons/Scarf.gif" },
	{
		chapter: 7,
		name: "Star Stone",
		image: "/src/assets/images/icons/StarStone_PM.png"
	},

	{
		chapter: 7,
		name: "Red Key",
		image: "/src/assets/images/icons/PM_Red_Key.png"
	},

	{
		chapter: 7,
		name: "Palace Key",
		image: "/src/assets/images/icons/PM_Palace_Key.png",
		label: "R"
	},

	{
		chapter: 8,
		name: "Star Rod",
		image: "/src/assets/images/icons/PM_Starrod.png"
	},
	{
		chapter: 16,
		name: "Power Stars Found",
		image: "/src/assets/images/icons/Power_Star.png"
	},

	{
		chapter: 8,
		name: "Bowser's Castle Key",
		image: "/src/assets/images/icons/PM_Bowser_Castle_Key.png"
	},

	{
		chapter: 0,
		name: "Boots",
		image: "/src/assets/images/upgrades/PM_Boots.png"
	},
	{
		chapter: 0,
		name: "Hammer",
		image: "/src/assets/images/upgrades/PM_Hammer.png"
	},
	{
		chapter: 0,
		name: "Ultra Stone",
		image: "/src/assets/images/icons/UltraStone.gif"
	},

	{
		chapter: -1,
		name: "Goombario",
		image: "/src/assets/images/partners/goombario.png"
	},
	{
		chapter: -1,
		name: "Kooper",
		image: "/src/assets/images/partners/kooper.png"
	},
	{
		chapter: -1,
		name: "Bombette",
		image: "/src/assets/images/partners/bombette.png"
	},
	{
		chapter: -1,
		name: "Parakarry",
		image: "/src/assets/images/partners/parakarr.png"
	},
	{ chapter: -1, name: "Bow", image: "/src/assets/images/partners/bow.png" },
	{ chapter: -1, name: "Watt", image: "/src/assets/images/partners/watt.png" },
	{
		chapter: -1,
		name: "Sushie",
		image: "/src/assets/images/partners/sushie.png"
	},
	{
		chapter: -1,
		name: "Lakilester",
		image: "/src/assets/images/partners/lakilester.png"
	}
];
</script>

<template>
	<ItemTracker heading="Required Items" :tooltip="tooltip">
		<div class="rows">
			<div class="gridrow" v-for="chapter in [1, 2, 3, 4, 5, 6, 7, 8, 0, -1]">
				<TrackableItem
					v-for="(item, index) in trackerItems.filter(
						(el) => el.chapter === chapter
					)"
					:key="item.name"
					:info="item"
					:shrink="1 <= chapter && chapter <= 8 && index > 0"
					@mouseover="tooltip = item.name"
					@mouseout="tooltip = ''"
				/>
			</div>
		</div>
	</ItemTracker>
</template>

<style scoped>
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
