import { defineStore } from "pinia";

const storagePlaythroughStr = localStorage.getItem("playthrough");

const storagePlaythrough = storagePlaythroughStr
	? JSON.parse(storagePlaythroughStr)
	: {};

// const defaultOptions = Object.getOwnPropertyNames(allOptions).reduce(
// 	(a, v) => ({ ...a, [v]: allOptions[v].default }),
// 	{}
// );

const init = { items: [], checks: [], ...storagePlaythrough };

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
				JSON.stringify({ items: this.items, checks: this.checks })
			);
		},
		hasItem(item: string) {
			return this.items.includes(item);
		},
		itemCount(item: string) {
			return this.items.filter((el) => el === item).length;
		},
		toggleCheck(check: string) {
			if (this.checks.includes(check)) {
			} else {
				this.checks.push(check);
			}

			localStorage.setItem(
				"playthrough",
				JSON.stringify({ items: this.items, checks: this.checks })
			);
		},
		checkedLocation(check: string) {
			return this.checks.includes(check);
		}
	}
});

// export const settingsKeys = Object.getOwnPropertyNames(allOptions).filter(
// 	(option) => allOptions[option].namespace === "settings"
// );
// export const configKeys = Object.getOwnPropertyNames(allOptions).filter(
// 	(option) => allOptions[option].namespace === "config"
// );

// export type OptionsStore = typeof useOptions;
