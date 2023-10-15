import type { OptionsValues } from "@/stores/config";

export default {
	chapter6Entry(items: string[], settings: OptionsValues) {
		return (
			items.filter((el) => el.includes("Magical Seed")).length >=
			settings.seedsRequired
		);
	},
	startingLocation(start: string) {
		return (items: string[], settings: OptionsValues) =>
			settings.startingLocation === start;
	},
	toyboxAccess(items: string[], settings: OptionsValues) {
		return items.includes("Bow") || settings.toyboxOpen;
	},
	blueHouseOpen(items: string[], settings: OptionsValues) {
		return settings.blueHouseOpen;
	},
	whaleOpen(items: string[], settings: OptionsValues) {
		return settings.whaleOpen;
	}
};
