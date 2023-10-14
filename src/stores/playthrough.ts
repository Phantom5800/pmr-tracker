import { defineStore } from "pinia";
import type { Requirements } from "../data/map";

const storagePlaythroughStr = localStorage.getItem("playthrough");

const storagePlaythrough = storagePlaythroughStr
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
			} else {
				this.items.push(item);
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
			} else {
				this.checks.push(check);
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
		canCheckLocation(reqs: Requirements) {
			return resolveRequirement(reqs, "and");
		}
	}
});

const resolveRequirement = (
	reqs: Requirements,
	operation: "and" | "or"
): boolean => {
	const playthrough = usePlaythrough();

	if (reqs === null) {
		return true;
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
