import type { Options } from "@/stores/config";

export default {
	canReachToadTown(
		this: void,
		{
			items,
			settings,
		}: { items: string[]; checks: string[]; settings: Options }
	) {
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
	canClimbLedges(
		this: void,
		{ items }: { items: string[]; checks: string[]; settings: Options }
	) {
		return items.includes("Boots") || items.includes("Parakarry");
	},
	canBreakBlocksAbove(
		this: void,
		{ items }: { items: string[]; checks: string[]; settings: Options }
	) {
		return items.includes("Boots") || items.includes("Kooper");
	},
	canBreakGroundBlocks(
		this: void,
		{ items }: { items: string[]; checks: string[]; settings: Options }
	) {
		return (
			items.includes("Hammer") ||
			items.includes("Kooper") ||
			items.includes("Bombette") ||
			items.includes("Super Boots")
		);
	},
	canShakeTree(
		this: void,
		{ items }: { items: string[]; checks: string[]; settings: Options }
	) {
		return items.includes("Hammer") || items.includes("Bombette");
	},
	canFlipPanel(
		this: void,
		{ items }: { items: string[]; checks: string[]; settings: Options }
	) {
		return items.includes("Super Boots") || items.includes("Ultra Hammer");
	},
	chapter6Entry(
		this: void,
		{
			items,
			settings,
		}: { items: string[]; checks: string[]; settings: Options }
	) {
		return (
			items.filter(el => el.includes("Magical Seed")).length >=
			settings.seedsRequired
		);
	},
	shiverBridgeVisible(
		this: void,
		{ settings }: { items: string[]; checks: string[]; settings: Options }
	) {
		return settings.shiverBridgeVisible;
	},
	startingLocation(this: void, start: string) {
		return ({
			settings,
		}: {
			items: string[];
			checks: string[];
			settings: Options;
		}) => settings.startingLocation === start;
	},
	canBreakRuinsBlocks(
		this: void,
		{
			items,
			checks,
			settings,
		}: { items: string[]; checks: string[]; settings: Options }
	) {
		if (settings.gearShuffle !== "Vanilla") {
			return items.includes("Super Hammer");
		} else {
			return (
				items.includes("Ultra Hammer") ||
				(!checks.includes("Ultra Hammer Room:Ultra Hammer chest") &&
					items.includes("Super Hammer"))
			);
		}
	},
	canBreakVolcanoBlocks(
		this: void,
		{
			items,
			checks,
			settings,
		}: { items: string[]; checks: string[]; settings: Options }
	) {
		if (settings.gearShuffle !== "Vanilla") {
			return items.includes("Ultra Hammer");
		} else {
			return (
				items.includes("Ultra Hammer") ||
				(!checks.includes("Super Hammer Room:Super Hammer chest") &&
					items.includes("Super Hammer"))
			);
		}
	},
	toyboxAccess(
		this: void,
		{
			items,
			settings,
		}: { items: string[]; checks: string[]; settings: Options }
	) {
		return (
			(items.includes("Boots") || items.includes("Parakarry")) &&
			(items.includes("Bow") || settings.toyboxOpen)
		);
	},
	canMoveStations(
		this: void,
		{ items }: { items: string[]; checks: string[]; settings: Options }
	) {
		return items.includes("Toy Train") && items.includes("Boots");
	},
	desertAccess(
		this: void,
		{
			items,
			settings,
		}: { items: string[]; checks: string[]; settings: Options }
	) {
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
					(items.includes("Boots") && items.includes("Super Hammer"))))
		);
	},
	forestOpen(
		this: void,
		{ settings }: { items: string[]; checks: string[]; settings: Options }
	) {
		return settings.forestOpen;
	},
	prologueOpen(
		this: void,
		{ settings }: { items: string[]; checks: string[]; settings: Options }
	) {
		return settings.prologueOpen;
	},
	mtRuggedOpen(
		this: void,
		{ settings }: { items: string[]; checks: string[]; settings: Options }
	) {
		return settings.mtRuggedOpen;
	},
	blueHouseOpen(
		this: void,
		{ settings }: { items: string[]; checks: string[]; settings: Options }
	) {
		return settings.blueHouseOpen;
	},
	whaleOpen(
		this: void,
		{ settings }: { items: string[]; checks: string[]; settings: Options }
	) {
		return settings.whaleOpen;
	},
	multipleItemCheck(this: void, item: string, quantity: number) {
		return ({
			items,
		}: {
			items: string[];
			checks: string[];
			settings: Options;
		}) => items.filter(el => el === item).length >= quantity;
	},
	fastBowserCastle(
		this: void,
		{ settings }: { items: string[]; checks: string[]; settings: Options }
	) {
		return settings.fastBowserCastle;
	},
	powerStarHunt(this: void, settings: Options) {
		return settings.powerStarHunt;
	},
	powerStarNum(this: void, settings: Options) {
		return settings.powerStarNum;
	},
	showMagicalSeed(this: void, num: number) {
		return (settings: Options) => settings.seedsRequired >= num;
	},
};
