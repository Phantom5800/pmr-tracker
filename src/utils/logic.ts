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
	},
	multipleItemCheck(item: string, quantity: number) {
		return (items: string[], settings: OptionsValues) =>
			items.filter((el) => el === item).length >= quantity;
	},
	gearShuffle(shuffle: string) {
		return (items: string[], settings: OptionsValues) =>
			settings.gearShuffle === shuffle;
	},
	shiverRegionAccess(items: string[], settings: OptionsValues) {
		return (
			(items.includes("Sushie") && items.includes("Super Boots")) ||
			(items.includes("Bombette") &&
				(settings.blueHouseOpen || items.includes("Odd Key")))
		);
	},
	crystalPalaceAccess(items: string[], settings: OptionsValues) {
		return (
			this.shiverRegionAccess(items, settings) &&
			items.includes("Warehouse Key") &&
			items.includes("Scarf") &&
			items.includes("Bucket") &&
			items.includes("Super Boots") &&
			items.includes("Kooper") &&
			items.includes("Hammer") &&
			items.includes("Star Stone")
		);
	},
	fastBowserCastle(items: string[], settings: OptionsValues) {
		return settings.fastBowserCastle;
	}
};
