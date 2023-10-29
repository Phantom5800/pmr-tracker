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

export type Options = {
	colorblind: boolean;
	highlightKey: boolean;
	trackerLogic: boolean;
	hideNonShuffledChecks: boolean;
	// compactTracker: boolean;
	// combineMisc: boolean;
	combineSortMode: string;
	uselessItems: boolean;
	hideBowsersCastle: boolean;
	hidePeachsCastle: boolean;
	hideLCLItems: boolean;
	hideLCLAreas: boolean;
	recipeTooltips: boolean;
	paperMarioFont: boolean;
	backgroundColor: string;
	sectionColor: string;
	prologueOpen: boolean;
	mtRuggedOpen: boolean;
	forestOpen: boolean;
	toyboxOpen: boolean;
	whaleOpen: boolean;
	seedsRequired: number;
	shiverBridgeVisible: boolean;
	blueHouseOpen: boolean;
	startingLocation: string;
	fastBowserCastle: boolean;
	limitChapterLogic: boolean;
	shopsRandomized: boolean;
	rowfRandomized: boolean;
	merlowRandomized: boolean;
	keysRandomized: boolean;
	panelsRandomized: boolean;
	coinsRandomized: boolean;
	coinBlocksRandomized: boolean;
	foliageCoinsRandomized: boolean;
	lettersRandomized: boolean;
	koopaKootRandomized: boolean;
	kootCoinsRandomized: boolean;
	dojoRandomized: boolean;
	tradingEventRandomized: boolean;
	superBlocksRandomized: boolean;
	multicoinBlocksRandomized: boolean;
	powerStarHunt: boolean;
	powerStarNum: number;
	sSkip: boolean;
	// gearShuffle: string;
};

export type ItemFilter = "show" | "default" | "hide";

export const optionsData = {
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
	hideNonShuffledChecks: {
		namespace: "config",
		name: "Hide Non-Shuffled Checks",
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
	uselessItems: {
		namespace: "config",
		name: "Show Logic-Only Items",
		type: "boolean",
		default: true,
	},
	hideBowsersCastle: {
		namespace: "config",
		name: "Hide Bowser's Castle when set to Fast",
		type: "boolean",
		default: true,
	},
	hidePeachsCastle: {
		namespace: "config",
		name: "Hide Peach's Castle",
		type: "boolean",
		default: true,
	},
	hideLCLItems: {
		namespace: "config",
		name: "Hide LCL Items Not Required",
		type: "boolean",
		default: true,
	},
	hideLCLAreas: {
		namespace: "config",
		name: "Hide LCL Areas Not Required",
		type: "boolean",
		default: true,
	},
	recipeTooltips: {
		namespace: "config",
		name: "Tooltip Info",
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
	limitChapterLogic: {
		namespace: "settings",
		name: "Limit Chapter Logic",
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
} satisfies Record<keyof Options, OptionData>;

const storageOptionsStr = localStorage.getItem("options");

const storageOptions = storageOptionsStr
	? (JSON.parse(storageOptionsStr) as {
			options?: Partial<Options>;
			itemFilters?: Record<string, ItemFilter>;
	  })
	: {};

const defaultOptions: Options = Object.getOwnPropertyNames(optionsData).reduce(
	(a, v) => ({ ...a, [v]: optionsData[v as keyof typeof optionsData].default }),
	{} as Options
);

const init: Options = { ...defaultOptions, ...storageOptions.options };

export const useOptions = defineStore("options", {
	state: () => ({
		options: init,
		itemFilters: storageOptions.itemFilters ?? {},
	}),
	actions: {
		save() {
			localStorage.setItem(
				"options",
				JSON.stringify({ options: this.options, itemFilters: this.itemFilters })
			);
		},
		toggle<T extends keyof Options>(key: T) {
			const data = optionsData[key];
			if (data.type === "boolean") {
				(this.options[key] as boolean) = !this.options[key];
				this.save();
			}
		},
		setValue<T extends keyof Options>(key: T, value: Options[T]) {
			this.options[key] = value;
			this.save();
		},
		getName(key: keyof Options) {
			return optionsData[key].name;
		},
		getType(key: keyof Options) {
			return optionsData[key].type;
		},
		getValue<T extends keyof Options>(key: T): Options[T] {
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
		getItemFilter(key: string): ItemFilter {
			if (key in this.itemFilters) {
				return this.itemFilters[key];
			} else {
				return "default";
			}
		},
		setItemFilter(key: string, filt: ItemFilter) {
			this.itemFilters[key] = filt;
			this.save();
		},
		resetItemFilters(filters: Record<string, ItemFilter>) {
			this.itemFilters = filters;
			this.save();
		},
	},
});

export const settingsKeys = Object.getOwnPropertyNames(optionsData).filter(
	k => optionsData[k as keyof typeof optionsData].namespace === "settings"
) as (keyof Options)[];

export const configKeys = Object.getOwnPropertyNames(optionsData).filter(
	k => optionsData[k as keyof typeof optionsData].namespace === "config"
) as (keyof Options)[];

export type OptionsStore = typeof useOptions;
