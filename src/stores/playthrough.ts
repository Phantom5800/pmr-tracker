import { defineStore } from "pinia";
import { allRegions, type Requirements, getRegionData } from "../data/map";
import { useOptions } from "./config";

type PlaythroughProps = {
	items: string[];
	checks: string[];
	notes: string;
};

const fixedChapterRewards = [
	"Eldstar",
	"Mamar",
	"Skolar",
	"Muskular",
	"Misstar",
	"Klevar",
	"Kalmar",
	"Star Rod"
];

const storagePlaythroughStr = localStorage.getItem("playthrough");

const storagePlaythrough: Partial<PlaythroughProps> = storagePlaythroughStr
	? JSON.parse(storagePlaythroughStr)
	: {};

// const defaultOptions = Object.getOwnPropertyNames(allOptions).reduce(
// 	(a, v) => ({ ...a, [v]: allOptions[v].default }),
// 	{}
// );

const init = { items: [], checks: [], notes: "", ...storagePlaythrough };

export const usePlaythrough = defineStore("playthrough", {
	state: () => ({ ...init }),
	actions: {
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

			localStorage.setItem(
				"playthrough",
				JSON.stringify({
					items: this.items,
					checks: this.checks,
					notes: this.notes
				})
			);
		},
		addItem(item: string | null, max: number = 1) {
			if (item !== null) {
				if (this.items.filter((el) => el === item).length < max) {
					this.items.push(item);

					localStorage.setItem(
						"playthrough",
						JSON.stringify({
							items: this.items,
							checks: this.checks,
							notes: this.notes
						})
					);
				}
			}
		},
		removeItem(item: string | null) {
			if (item !== null) {
				if (this.items.includes(item)) {
					this.items.splice(this.items.indexOf(item), 1);

					localStorage.setItem(
						"playthrough",
						JSON.stringify({
							items: this.items,
							checks: this.checks,
							notes: this.notes
						})
					);
				}
			}
		},
		hasItem(item: string) {
			return this.items.includes(item);
		},
		itemCount(item: string) {
			return this.items.filter((el) => el === item).length;
		},
		filterItems(items: string[]) {
			return this.items.filter((el) => items.includes(el));
		},
		toggleCheck(check: string) {
			if (this.checks.includes(check)) {
				this.checks = this.checks.filter((el) => el !== check);
				if (fixedChapterRewards.includes(check) && this.items.includes(check)) {
					this.items = this.items.filter((el) => el !== check);
				}
			} else {
				this.checks.push(check);
				if (
					fixedChapterRewards.includes(check) &&
					!this.items.includes(check)
				) {
					this.items.push(check);
				}
			}

			localStorage.setItem(
				"playthrough",
				JSON.stringify({
					items: this.items,
					checks: this.checks,
					notes: this.notes
				})
			);
		},
		checkedLocation(check: string) {
			return this.checks.includes(check);
		},
		setNotes(notes: string) {
			this.notes = notes;

			localStorage.setItem(
				"playthrough",
				JSON.stringify({
					items: this.items,
					checks: this.checks,
					notes: this.notes
				})
			);
		},
		canCheckLocation(reqs: Requirements, region?: string) {
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
				Merlow: settings.merlowRandomized
			};

			if (check.startsWith("[")) {
				const tag: keyof typeof tags | undefined = (
					Object.getOwnPropertyNames(tags) as (keyof typeof tags)[]
				).find((el) => check.startsWith(`[${el}]`));
				if (!tag) {
					console.error(`Error processing tag ${check}`);
					return true;
				} else {
					return tags[tag];
				}
			} else {
				return true;
			}
		}
	}
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
				"Kalmar"
			]).length >= reqs
		);
	} else if (typeof reqs === "function") {
		return reqs(playthrough.$state.items, options.$state.options);
	} else if (operation === "and") {
		return reqs.every((el) => resolveRequirement(el, "or"));
	} else if (operation === "or") {
		return reqs.some((el) => resolveRequirement(el, "and"));
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
