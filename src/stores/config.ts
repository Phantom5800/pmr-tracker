import { defineStore } from "pinia";

type OptionData = {
	namespace: "config" | "settings";
	name: string;
} & (
	| {
			type: "boolean";
			default: boolean;
	  }
	| { type: "number"; default: number }
	| {
			type: "select";
			default: string;
			choices: {
				name: string;
				id: string;
			}[];
	  }
	| {
			type: "color";
			default: string;
	  }
	| { type: "string"; default: string }
);

const allOptions: Record<string, OptionData> = {
	colorblind: {
		namespace: "config",
		name: "Color Blind Labels",
		type: "boolean",
		default: false
	},
	highlightKey: {
		namespace: "config",
		name: "Highlight Important Items",
		type: "boolean",
		default: true
	},
	trackerLogic: {
		namespace: "config",
		name: "Tracker Logic",
		type: "boolean",
		default: true
	},
	compactTracker: {
		namespace: "config",
		name: "Compact Tracker",
		type: "boolean",
		default: false
	},
	combineMisc: {
		namespace: "config",
		name: "Combine Misc. Items",
		type: "boolean",
		default: false
	},
	combineSortMode: {
		namespace: "config",
		name: "Combine Sort Mode",
		type: "select",
		default: "vanilla",
		choices: [
			{
				id: "vanilla",
				name: "Vanilla Acquired Order"
			},
			{
				id: "required",
				name: "Required First"
			}
		]
	},
	seedFlags: {
		namespace: "config",
		name: "Show Seed Flags",
		type: "boolean",
		default: true
	},
	gameMaps: {
		namespace: "config",
		name: "Maps",
		type: "boolean",
		default: true
	},
	userNotes: {
		namespace: "config",
		name: "Notes Field",
		type: "boolean",
		default: false
	},
	uselessItems: {
		namespace: "config",
		name: "Show Logic-Only Items",
		type: "boolean",
		default: false
	},
	recipeTooltips: {
		namespace: "config",
		name: "Tooltip Info",
		type: "boolean",
		default: true
	},
	howToFields: {
		namespace: "config",
		name: "How-To Fields",
		type: "boolean",
		default: true
	},
	backgroundColor: {
		namespace: "config",
		name: "Background Color",
		type: "color",
		default: "#2f4f4f"
	},
	sectionColor: {
		namespace: "config",
		name: "Section Color",
		type: "color",
		default: "#23233b"
	},
	randomizerSeed: {
		namespace: "settings",
		name: "Randomizer Seed",
		type: "string",
		default: "0"
	},
	forestOpen: {
		namespace: "settings",
		name: "Forever Forest Open",
		type: "boolean",
		default: false
	},
	toyboxOpen: {
		namespace: "settings",
		name: "Toybox Open",
		type: "boolean",
		default: false
	},
	whaleOpen: {
		namespace: "settings",
		name: "Whale Open",
		type: "boolean",
		default: false
	},
	seedsRequired: {
		namespace: "settings",
		name: "Magical Seeds Required",
		type: "number",
		default: 4
	},
	blueHouseOpen: {
		namespace: "settings",
		name: "Blue House Open",
		type: "boolean",
		default: false
	},
	startingLocation: {
		namespace: "settings",
		name: "Starting Location",
		type: "select",
		default: "random",
		choices: [
			{
				id: "random",
				name: "Random"
			},
			{
				id: "toadTown",
				name: "Toad Town"
			},
			{
				id: "goombaVillage",
				name: "Goomba Village"
			},
			{
				id: "dryDryOutpost",
				name: "Dry Dry Outpost"
			},
			{
				id: "yoshiVillage",
				name: "Yoshi Village"
			}
		]
	},
	fastBowserCastle: {
		namespace: "settings",
		name: "Fast Bowser's Castle",
		type: "boolean",
		default: false
	},
	shopsRandomized: {
		namespace: "settings",
		name: "Shopsanity",
		type: "boolean",
		default: true
	},
	rowfRandomized: {
		namespace: "settings",
		name: "Rowf Shop In Logic",
		type: "boolean",
		default: true
	},
	merlowRandomized: {
		namespace: "settings",
		name: "Merlow In Logic",
		type: "boolean",
		default: true
	},
	keysRandomized: {
		namespace: "settings",
		name: "Keysanity",
		type: "boolean",
		default: true
	},
	panelsRandomized: {
		namespace: "settings",
		name: "Panels Randomized",
		type: "boolean",
		default: true
	},
	coinsRandomized: {
		namespace: "settings",
		name: "Overworld Coins",
		type: "boolean",
		default: true
	},
	coinBlocksRandomized: {
		namespace: "settings",
		name: "Coin Blocks",
		type: "boolean",
		default: true
	},
	foliageCoinsRandomized: {
		namespace: "settings",
		name: "Foliage Coins",
		type: "boolean",
		default: true
	},
	lettersRandomized: {
		namespace: "settings",
		name: "Letters Randomized",
		type: "boolean",
		default: true
	},
	koopaKootRandomized: {
		namespace: "settings",
		name: "Koopa Koot Randomized",
		type: "boolean",
		default: true
	},
	kootCoinsRandomized: {
		namespace: "settings",
		name: "Koot Coins Randomized",
		type: "boolean",
		default: true
	},
	dojoRandomized: {
		namespace: "settings",
		name: "Dojo Randomized",
		type: "boolean",
		default: true
	},
	tradingEventRandomized: {
		namespace: "settings",
		name: "Trading Event Randomized",
		type: "boolean",
		default: true
	},
	powerStarHunt: {
		namespace: "settings",
		name: "Power Star Hunt",
		type: "boolean",
		default: false
	},
	powerStarNum: {
		namespace: "settings",
		name: "Power Star Hunt Num",
		type: "number",
		default: 120
	},
	sSkip: {
		namespace: "settings",
		name: "Star Hunt Skips Ch. 8",
		type: "boolean",
		default: true
	},
	gearShuffle: {
		namespace: "settings",
		name: "Gear Shuffle",
		type: "select",
		default: "vanilla",
		choices: [
			{
				id: "vanilla",
				name: "Vanilla"
			},
			{
				id: "bigChest",
				name: "Big Chest Shuffle"
			},
			{
				id: "full",
				name: "Full Shuffle"
			}
		]
	}
};

const storageOptionsStr = localStorage.getItem("options");

const storageOptions = storageOptionsStr ? JSON.parse(storageOptionsStr) : {};

const defaultOptions = Object.getOwnPropertyNames(allOptions).reduce(
	(a, v) => ({ ...a, [v]: allOptions[v].default }),
	{}
);

const init = { ...defaultOptions, ...storageOptions };

export const useOptions = defineStore("options", {
	state: () => ({ options: { ...init } }),
	actions: {
		toggle(key: keyof typeof allOptions) {
			this.options[key] = !this.options[key];

			console.log(key);
			console.log(this.options[key]);

			localStorage.setItem("options", JSON.stringify(this.options));
		},
		getName(key: keyof typeof allOptions) {
			return allOptions[key].name;
		},
		getType(key: keyof typeof allOptions) {
			return allOptions[key].type;
		}
	}
});

export const settingsKeys = Object.getOwnPropertyNames(allOptions).filter(
	(option) => allOptions[option].namespace === "settings"
);
export const configKeys = Object.getOwnPropertyNames(allOptions).filter(
	(option) => allOptions[option].namespace === "config"
);

export type OptionsStore = typeof useOptions;
