import type { OptionsValues } from "@/stores/config";

export default {
	canReachToadTown(items: string[], settings: OptionsValues) {
		return (
			settings.startingLocation === "Toad Town" ||
			(settings.startingLocation === "Goomba Village" &&
				(items.includes("Hammer") || items.includes("Bombette")) &&
				(items.includes("Boots") || items.includes("Parakarry"))) ||
			(settings.startingLocation === "Dry Dry Outpost" &&
				items.includes("Boots")) ||
			(settings.startingLocation === "Yoshi Village" &&
				(items.includes("Watt") || settings.whaleOpen))
		);
	},
	canJumpOnPipe(items: string[], settings: OptionsValues) {
		return items.includes("Boots") || items.includes("Parakarry");
	},
	canBreakBlocksAbove(items: string[], settings: OptionsValues) {
		return items.includes("Boots") || items.includes("Kooper");
	},
	canBreakGroundBlocks(items: string[], settings: OptionsValues) {
		return (
			items.includes("Hammer") ||
			items.includes("Kooper") ||
			items.includes("Bombette")
		);
	},
	canShakeTree(items: string[], settings: OptionsValues) {
		return items.includes("Hammer") || items.includes("Bombette");
	},
	canFlipPanel(items: string[], settings: OptionsValues) {
		return items.includes("Super Boots") || items.includes("Ultra Hammer");
	},
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
	forestOpen(items: string[], settings: OptionsValues) {
		return settings.forestOpen;
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
			((items.includes("Sushie") && items.includes("Super Boots")) ||
				(items.includes("Bombette") &&
					(settings.blueHouseOpen || items.includes("Odd Key")))) &&
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
