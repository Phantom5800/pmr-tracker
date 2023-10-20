import type { Options } from "@/stores/config";

export default {
	canReachToadTown(items: string[], settings: Options) {
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
	canClimbLedges(items: string[], _: Options) {
		return items.includes("Boots") || items.includes("Parakarry");
	},
	canBreakBlocksAbove(items: string[], _: Options) {
		return items.includes("Boots") || items.includes("Kooper");
	},
	canBreakGroundBlocks(items: string[], _: Options) {
		return (
			items.includes("Hammer") ||
			items.includes("Kooper") ||
			items.includes("Bombette") ||
			items.includes("Super Boots")
		);
	},
	canShakeTree(items: string[], _: Options) {
		return items.includes("Hammer") || items.includes("Bombette");
	},
	canFlipPanel(items: string[], _: Options) {
		return items.includes("Super Boots") || items.includes("Ultra Hammer");
	},
	chapter6Entry(items: string[], settings: Options) {
		return (
			items.filter((el) => el.includes("Magical Seed")).length >=
			settings.seedsRequired
		);
	},
	shiverBridgeVisible(items: string[], settings: Options) {
		return settings.shiverBridgeVisible;
	},
	startingLocation(start: string) {
		return (items: string[], settings: Options) =>
			settings.startingLocation === start;
	},
	toyboxAccess(items: string[], settings: Options) {
		return (
			(items.includes("Boots") || items.includes("Parakarry")) &&
			(items.includes("Bow") || settings.toyboxOpen)
		);
	},
	canMoveStations(items: string[], _: Options) {
		return items.includes("Toy Train") && items.includes("Boots");
	},
	desertAccess(items: string[], settings: Options) {
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
	forestOpen(items: string[], settings: Options) {
		return settings.forestOpen;
	},
	prologueOpen(items: string[], settings: Options) {
		return settings.prologueOpen;
	},
	mtRuggedOpen(items: string[], settings: Options) {
		return settings.mtRuggedOpen;
	},
	blueHouseOpen(items: string[], settings: Options) {
		return settings.blueHouseOpen;
	},
	whaleOpen(items: string[], settings: Options) {
		return settings.whaleOpen;
	},
	multipleItemCheck(item: string, quantity: number) {
		return (items: string[], _: Options) =>
			items.filter((el) => el === item).length >= quantity;
	},
	fastBowserCastle(items: string[], settings: Options) {
		return settings.fastBowserCastle;
	},
	powerStarHunt(settings: Options) {
		return settings.powerStarHunt;
	},
	powerStarNum(settings: Options) {
		return settings.powerStarNum;
	},
	showMagicalSeed(num: number) {
		return (settings: Options) => settings.seedsRequired >= num;
	}
};
