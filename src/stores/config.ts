import { defineStore } from "pinia";

type OptionData =
	| {
			namespace: "config" | "settings";
			name: string;
			type: "boolean";
			default: boolean;
	  }
	| {
			namespace: "config" | "settings";
			name: string;
			type: "number";
			range: [number, number];
			default: number;
	  }
	| {
			namespace: "config" | "settings";
			name: string;
			type: "select";
			default: string;
			choices: string[];
	  }
	| {
			namespace: "config" | "settings";
			name: string;
			type: "color";
			default: string;
	  };

const optionsData = {
	colorblind: {
		namespace: "config",
		name: "Color Blind Labels",
		type: "boolean",
		default: true,
	},
	highlightKey: {
		namespace: "config",
		name: "Highlight Important Items",
		type: "boolean",
		default: false,
	},
	trackerLogic: {
		namespace: "config",
		name: "Tracker Logic",
		type: "boolean",
		default: true,
	},
	// compactTracker: {
	// 	namespace: "config",
	// 	name: "Compact Tracker",
	// 	type: "boolean",
	// 	default: false
	// },
	// combineMisc: {
	// 	namespace: "config",
	// 	name: "Combine Misc. Items",
	// 	type: "boolean",
	// 	default: false
	// },
	combineSortMode: {
		namespace: "config",
		name: "Combined Sort Mode",
		type: "select",
		default: "Vanilla Acquired Order",
		choices: ["Vanilla Acquired Order", "Required First"],
	},
	seedFlags: {
		namespace: "config",
		name: "Show Seed Flags",
		type: "boolean",
		default: true,
	},
	gameMaps: {
		namespace: "config",
		name: "Maps",
		type: "boolean",
		default: true,
	},
	userNotes: {
		namespace: "config",
		name: "Notes Field",
		type: "boolean",
		default: false,
	},
	uselessItems: {
		namespace: "config",
		name: "Show Logic-Only Items",
		type: "boolean",
		default: true,
	},
	recipeTooltips: {
		namespace: "config",
		name: "Tooltip Info",
		type: "boolean",
		default: true,
	},
	howToFields: {
		namespace: "config",
		name: "How-To Fields",
		type: "boolean",
		default: true,
	},
	paperMarioFont: {
		namespace: "config",
		name: "Paper Mario Font",
		type: "boolean",
		default: true,
	},
	backgroundColor: {
		namespace: "config",
		name: "Background Color",
		type: "color",
		default: "#3283b4",
	},
	sectionColor: {
		namespace: "config",
		name: "Section Color",
		type: "color",
		default: "#1e3140",
	},
	prologueOpen: {
		namespace: "settings",
		name: "Prologue Open",
		type: "boolean",
		default: true,
	},
	mtRuggedOpen: {
		namespace: "settings",
		name: "Mt. Rugged Open",
		type: "boolean",
		default: false,
	},
	forestOpen: {
		namespace: "settings",
		name: "Forever Forest Open",
		type: "boolean",
		default: false,
	},
	toyboxOpen: {
		namespace: "settings",
		name: "Toybox Open",
		type: "boolean",
		default: false,
	},
	whaleOpen: {
		namespace: "settings",
		name: "Whale Open",
		type: "boolean",
		default: false,
	},
	seedsRequired: {
		namespace: "settings",
		name: "Ch.6 Seeds Required",
		type: "number",
		default: 4,
		range: [0, 4],
	},
	shiverBridgeVisible: {
		namespace: "settings",
		name: "Ch.7 Bridge Visible",
		type: "boolean",
		default: false,
	},
	blueHouseOpen: {
		namespace: "settings",
		name: "Blue House Open",
		type: "boolean",
		default: false,
	},
	startingLocation: {
		namespace: "settings",
		name: "Starting Location",
		type: "select",
		default: "Toad Town",
		choices: [
			"Toad Town",
			"Goomba Village",
			"Dry Dry Outpost",
			"Yoshi Village",
		],
	},
	fastBowserCastle: {
		namespace: "settings",
		name: "Fast Bowser's Castle",
		type: "boolean",
		default: false,
	},
	shopsRandomized: {
		namespace: "settings",
		name: "Shopsanity",
		type: "boolean",
		default: true,
	},
	rowfRandomized: {
		namespace: "settings",
		name: "Rowf Shop In Logic",
		type: "boolean",
		default: true,
	},
	merlowRandomized: {
		namespace: "settings",
		name: "Merlow In Logic",
		type: "boolean",
		default: true,
	},
	keysRandomized: {
		namespace: "settings",
		name: "Keysanity",
		type: "boolean",
		default: true,
	},
	panelsRandomized: {
		namespace: "settings",
		name: "Panels Randomized",
		type: "boolean",
		default: true,
	},
	coinsRandomized: {
		namespace: "settings",
		name: "Overworld Coins",
		type: "boolean",
		default: true,
	},
	coinBlocksRandomized: {
		namespace: "settings",
		name: "Coin Blocks",
		type: "boolean",
		default: true,
	},
	foliageCoinsRandomized: {
		namespace: "settings",
		name: "Foliage Coins",
		type: "boolean",
		default: true,
	},
	lettersRandomized: {
		namespace: "settings",
		name: "Letters Randomized",
		type: "boolean",
		default: true,
	},
	koopaKootRandomized: {
		namespace: "settings",
		name: "Koopa Koot Randomized",
		type: "boolean",
		default: true,
	},
	kootCoinsRandomized: {
		namespace: "settings",
		name: "Koot Coins Randomized",
		type: "boolean",
		default: true,
	},
	dojoRandomized: {
		namespace: "settings",
		name: "Dojo Randomized",
		type: "boolean",
		default: true,
	},
	tradingEventRandomized: {
		namespace: "settings",
		name: "Trading Event Randomized",
		type: "boolean",
		default: true,
	},
	superBlocksRandomized: {
		namespace: "settings",
		name: "Super Blocks Randomized",
		type: "boolean",
		default: false,
	},
	multicoinBlocksRandomized: {
		namespace: "settings",
		name: "Multicoin Blocks Randomized",
		type: "boolean",
		default: false,
	},
	powerStarHunt: {
		namespace: "settings",
		name: "Power Star Hunt",
		type: "boolean",
		default: false,
	},
	powerStarNum: {
		namespace: "settings",
		name: "Power Star Hunt Num",
		type: "number",
		default: 120,
		range: [0, 120],
	},
	sSkip: {
		namespace: "settings",
		name: "Star Hunt Skips Ch. 8",
		type: "boolean",
		default: true,
	},
	// gearShuffle: {
	// 	namespace: "settings",
	// 	name: "Gear Shuffle",
	// 	type: "select",
	// 	default: "vanilla",
	// 	choices: ["Vanilla", "Big Chest Shuffle", "Full Shuffle"]
	// }
} satisfies Record<string, OptionData>;

export type OptionsValues = {
	[key in keyof typeof optionsData]: (typeof optionsData)[key]["default"];
};

const storageOptionsStr = localStorage.getItem("options");

const storageOptions: Partial<OptionsValues> = storageOptionsStr
	? JSON.parse(storageOptionsStr)
	: {};

const defaultOptions: OptionsValues = Object.getOwnPropertyNames(
	optionsData
).reduce(
	(a, v) => ({ ...a, [v]: optionsData[v as keyof typeof optionsData].default }),
	{} as OptionsValues
);

const init: OptionsValues = { ...defaultOptions, ...storageOptions };

export const useOptions = defineStore("options", {
	state: () => ({ options: init }),
	actions: {
		toggle(key: keyof OptionsValues) {
			const data: OptionData = optionsData[key];
			if (data.type === "boolean") {
				(this.options[key] as boolean) = !this.options[key];
				localStorage.setItem("options", JSON.stringify(this.options));
			}
		},
		setValue(key: keyof typeof optionsData, value: string | number | boolean) {
			(this.options[key] as string | number | boolean) = value;
			localStorage.setItem("options", JSON.stringify(this.options));
		},
		getName(key: keyof typeof optionsData) {
			return optionsData[key].name;
		},
		getType(key: keyof typeof optionsData) {
			return optionsData[key].type;
		},
		getValue(key: keyof typeof optionsData) {
			return this.options[key];
		},
		getRange(key: keyof typeof optionsData): [number, number] {
			const data: OptionData = optionsData[key];
			if (data.type === "number") {
				return data.range;
			} else {
				return [0, 0];
			}
		},
		getChoices(key: keyof typeof optionsData) {
			const data: OptionData = optionsData[key];
			if (data.type === "select") {
				return data.choices;
			}
		},
	},
});

export const settingsKeys = Object.getOwnPropertyNames(optionsData).filter(
	(k) => optionsData[k as keyof typeof optionsData].namespace === "settings"
) as (keyof OptionsValues)[];

export const configKeys = Object.getOwnPropertyNames(optionsData).filter(
	(k) => optionsData[k as keyof typeof optionsData].namespace === "config"
) as (keyof OptionsValues)[];

export type OptionsStore = typeof useOptions;
