import { defineStore } from "pinia";
import { type Requirements, getRegionData } from "../data/map";
import { useOptions } from "./config";
import { saveAs } from "file-saver";
import { allItems } from "@/data/items";

export type PlaythroughProps = {
	items: string[];
	checks: string[];
	notes: string;
	spiritAnnotations: typeof spiritAnnotations;
};

type SpiritAnnotations = {
	scaling: number;
	entrance: string;
};

const starSpirits = [
	"Eldstar",
	"Mamar",
	"Skolar",
	"Muskular",
	"Misstar",
	"Klevar",
	"Kalmar",
];

const fixedChapterRewards = [...starSpirits, "Star Rod"];

const letters = allItems.filter(el => el.type === "letter").map(el => el.name);

const storagePlaythroughStr = localStorage.getItem("playthrough");

const storagePlaythrough = storagePlaythroughStr
	? (JSON.parse(storagePlaythroughStr) as Partial<PlaythroughProps>)
	: {};

// const defaultOptions = Object.getOwnPropertyNames(allOptions).reduce(
// 	(a, v) => ({ ...a, [v]: allOptions[v].default }),
// 	{}
// );

const spiritAnnotations = {
	Eldstar: {
		scaling: 0,
		entrance: "",
	},
	Mamar: {
		scaling: 0,
		entrance: "",
	},
	Skolar: {
		scaling: 0,
		entrance: "",
	},
	Muskular: {
		scaling: 0,
		entrance: "",
	},
	Misstar: {
		scaling: 0,
		entrance: "",
	},
	Klevar: {
		scaling: 0,
		entrance: "",
	},
	Kalmar: {
		scaling: 0,
		entrance: "",
	},
	"Star Rod": {
		scaling: 0,
		entrance: "",
	},
} satisfies Record<string, SpiritAnnotations>;

const init: PlaythroughProps = {
	items: [],
	checks: [],
	notes: "",
	spiritAnnotations,
	...storagePlaythrough,
};

export const usePlaythrough = defineStore("playthrough", {
	state: () => ({ ...init }),
	actions: {
		save() {
			localStorage.setItem(
				"playthrough",
				JSON.stringify({
					items: this.items,
					checks: this.checks,
					notes: this.notes,
					spiritAnnotations: this.spiritAnnotations,
				})
			);
		},
		getSpiritAnnotation(k: keyof PlaythroughProps["spiritAnnotations"]) {
			return this.spiritAnnotations[k];
		},
		setSpiritAnnotation(
			k: keyof PlaythroughProps["spiritAnnotations"],
			value: Partial<SpiritAnnotations>
		) {
			this.spiritAnnotations[k] = { ...this.spiritAnnotations[k], ...value };
			this.save();
		},
		cycleUpgrade(k: string) {
			const _super = `${k}:super`;
			const _ultra = `${k}:ultra`;

			if (this.items.includes(_ultra)) {
				this.items.splice(this.items.indexOf(_ultra), 1);
				this.items.splice(this.items.indexOf(_super), 1);
			} else if (this.items.includes(_super)) {
				this.items.push(_ultra);
			} else {
				this.items.push(_super);
			}

			this.save();
		},
		toggleItem(item: string) {
			if (this.items.includes(item)) {
				this.items.splice(this.items.indexOf(item), 1);
				if (fixedChapterRewards.includes(item) && this.checks.includes(item)) {
					this.checks.splice(this.checks.indexOf(item), 1);
				}
			} else {
				this.items.push(item);
				if (fixedChapterRewards.includes(item) && !this.checks.includes(item)) {
					this.checks.push(item);
				}
			}

			this.save();
		},
		addItem(item: string | null, max: number = 1) {
			if (item !== null) {
				if (this.items.filter(el => el === item).length < max) {
					this.items.push(item);

					this.save();
				}
			}
		},
		removeItem(item: string | null) {
			if (item !== null) {
				if (this.items.includes(item)) {
					this.items.splice(this.items.indexOf(item), 1);

					this.save();
				}
			}
		},
		hasItem(item: string) {
			return this.items.includes(item);
		},
		itemCount(item: string) {
			if (item === "Letters") {
				return (
					letters.filter(el => this.items.includes(el)).length +
					this.items.filter(el => el === item).length
				);
			} else {
				return this.items.filter(el => el === item).length;
			}
		},
		filterItems(items: string[]) {
			return this.items.filter(el => items.includes(el));
		},
		toggleCheck(area: string, check: string) {
			const checkString = fixedChapterRewards.includes(check)
				? check
				: `${area}:${check}`;
			if (this.checks.includes(checkString)) {
				this.checks = this.checks.filter(el => el !== checkString);
				if (fixedChapterRewards.includes(check) && this.items.includes(check)) {
					this.items = this.items.filter(el => el !== check);
				}
			} else {
				this.checks.push(checkString);
				if (
					fixedChapterRewards.includes(check) &&
					!this.items.includes(check)
				) {
					this.items.push(check);
				}
			}

			this.save();
		},
		checkedLocation(area: string, check: string) {
			const checkString = fixedChapterRewards.includes(check)
				? check
				: `${area}:${check}`;
			return this.checks.includes(checkString);
		},
		setNotes(notes: string) {
			this.notes = notes;

			this.save();
		},
		chaptersBeaten() {
			return starSpirits.filter(el => this.items.includes(el)).length;
		},
		getRequiredChapters(reqs: Requirements) {
			if (typeof reqs === "number") {
				return reqs;
			} else if (Array.isArray(reqs)) {
				return (reqs.find(el => typeof el === "number") as number) ?? 0;
			} else {
				return 0;
			}
		},
		canCheckLocation(reqs: Requirements, region?: string) {
			const options = useOptions();
			if (!options.$state.options.trackerLogic) {
				return true;
			}
			const regionReqs = region ? getRegionData(region).reqs : null;
			return (
				resolveRequirement(regionReqs ?? null, "and") &&
				resolveRequirement(reqs, "and")
			);
		},
		locationIsRandomized(check: string) {
			const optionsStore = useOptions();
			const settings = optionsStore.$state.options;
			const tags = {
				Panel: settings.panelsRandomized,
				Dojo: settings.dojoRandomized,
				Shop: settings.shopsRandomized,
				Rowf: settings.shopsRandomized && settings.rowfRandomized,
				Trade: settings.tradingEventRandomized,
				Letter: settings.lettersRandomized,
				Koot: settings.koopaKootRandomized,
				"Koot Coin":
					settings.koopaKootRandomized && settings.kootCoinsRandomized,
				"Foliage Coin": settings.foliageCoinsRandomized,
				Coinsanity: settings.coinsRandomized,
				"Coin Block": settings.coinBlocksRandomized,
				Merlow: settings.merlowRandomized,
				Upgrade: settings.superBlocksRandomized,
				"Multicoin Block": settings.multicoinBlocksRandomized,
			};

			if (check.startsWith("[")) {
				const tag: keyof typeof tags | undefined = (
					Object.getOwnPropertyNames(tags) as (keyof typeof tags)[]
				).find(el => check.startsWith(`[${el}]`));
				if (!tag) {
					console.error(`Error processing tag ${check}`);
					return true;
				} else {
					return tags[tag];
				}
			} else {
				return true;
			}
		},
		resetPlaythrough() {
			this.checks = [];
			this.items = [];
			this.notes = "";
			this.spiritAnnotations = spiritAnnotations;
			this.save();
		},
		savePlaythrough() {
			const saveData = JSON.stringify({
				checks: this.checks,
				items: this.items,
				notes: this.notes,
				spiritAnnotations: this.spiritAnnotations,
			});
			const blob = new Blob([saveData], { type: "application/json" });
			saveAs(blob, `pmr-tracker-${new Date().toISOString()}.json`);
		},
		loadPlaythrough(file: File) {
			const reader = new FileReader();
			reader.onload = e => {
				const contents = e.target?.result;
				if (typeof contents === "string") {
					const saveData = JSON.parse(contents) as PlaythroughProps;
					if (
						"checks" in saveData &&
						"items" in saveData &&
						"notes" in saveData &&
						"spiritAnnotations" in saveData
					) {
						this.checks = saveData.checks;
						this.items = saveData.items;
						this.notes = saveData.notes;
						this.spiritAnnotations = saveData.spiritAnnotations;
						this.save();
					}
				}
			};
			reader.readAsText(file);
		},
	},
});

const resolveRequirement = (
	reqs: Requirements,
	operation: "and" | "or"
): boolean => {
	const playthrough = usePlaythrough();
	const options = useOptions();

	if (reqs === null) {
		return true;
	} else if (typeof reqs === "boolean") {
		return reqs;
	} else if (typeof reqs === "string") {
		return playthrough.hasItem(reqs);
	} else if (typeof reqs === "number") {
		return (
			playthrough.filterItems([
				"Eldstar",
				"Mamar",
				"Skolar",
				"Muskular",
				"Misstar",
				"Klevar",
				"Kalmar",
			]).length >= reqs
		);
	} else if (typeof reqs === "function") {
		return reqs(playthrough.$state.items, options.$state.options);
	} else if (operation === "and") {
		return reqs.every(el => resolveRequirement(el, "or"));
	} else if (operation === "or") {
		return reqs.some(el => resolveRequirement(el, "and"));
	} else {
		console.error("error in resolveRequirement", reqs);
		throw "error in resolveRequirement";
	}
};

// export const settingsKeys = Object.getOwnPropertyNames(allOptions).filter(
// 	(option) => allOptions[option].namespace === "settings"
// );
// export const configKeys = Object.getOwnPropertyNames(allOptions).filter(
// 	(option) => allOptions[option].namespace === "config"
// );

// export type OptionsStore = typeof useOptions;
