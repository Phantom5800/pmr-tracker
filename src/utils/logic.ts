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
	canClimbLedges(items: string[], settings: OptionsValues) {
		return items.includes("Boots") || items.includes("Parakarry");
	},
	canBreakBlocksAbove(items: string[], settings: OptionsValues) {
		return items.includes("Boots") || items.includes("Kooper");
	},
	canBreakGroundBlocks(items: string[], settings: OptionsValues) {
		return (
			items.includes("Hammer") ||
			items.includes("Kooper") ||
			items.includes("Bombette") ||
			items.includes("Super Boots")
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
	shiverBridgeVisible(items: string[], settings: OptionsValues) {
		return settings.shiverBridgeVisible;
	},
	startingLocation(start: string) {
		return (items: string[], settings: OptionsValues) =>
			settings.startingLocation === start;
	},
	toyboxAccess(items: string[], settings: OptionsValues) {
		return (
			(items.includes("Boots") || items.includes("Parakarry")) &&
			(items.includes("Bow") || settings.toyboxOpen)
		);
	},
	canMoveStations(items: string[], settings: OptionsValues) {
		return items.includes("Toy Train") && items.includes("Boots");
	},
	desertAccess(items: string[], settings: OptionsValues) {
		return (
			settings.startingLocation === "Dry Dry Outpost" ||
			((settings.startingLocation === "Toad Town" ||
				(settings.startingLocation === "Goomba Village" &&
					(items.includes("Hammer") || items.includes("Bombette")) &&
					(items.includes("Boots") || items.includes("Parakarry"))) ||
				(settings.startingLocation === "Yoshi Village" &&
					(items.includes("Watt") || settings.whaleOpen))) &&
				(((items.includes("Bombette") || settings.mtRuggedOpen) &&
					items.includes("Parakarry")) ||
					((items.includes("Boots") || items.includes("Parakarry")) &&
						items.includes("Super Hammer"))))
		);
	},
	forestOpen(items: string[], settings: OptionsValues) {
		return settings.forestOpen;
	},
	prologueOpen(items: string[], settings: OptionsValues) {
		return settings.prologueOpen;
	},
	mtRuggedOpen(items: string[], settings: OptionsValues) {
		return settings.mtRuggedOpen;
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
	fastBowserCastle(items: string[], settings: OptionsValues) {
		return settings.fastBowserCastle;
	},
	powerStarHunt(settings: OptionsValues) {
		return settings.powerStarHunt;
	},
	powerStarNum(settings: OptionsValues) {
		return settings.powerStarNum;
	},
	showMagicalSeed(num: number) {
		return (settings: OptionsValues) => settings.seedsRequired >= num;
	}
};
