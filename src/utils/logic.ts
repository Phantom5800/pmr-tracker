import type { Options } from "@/stores/config";

export function canReachToadTown({
	items,
	settings,
}: {
	items: string[];
	checks: string[];
	settings: Options;
}) {
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
}
export function canClimbLedges({
	items,
}: {
	items: string[];
	checks: string[];
	settings: Options;
}) {
	return items.includes("Boots") || items.includes("Parakarry");
}
export function canBreakBlocksAbove({
	items,
}: {
	items: string[];
	checks: string[];
	settings: Options;
}) {
	return items.includes("Boots") || items.includes("Kooper");
}
export function canBreakGroundBlocks({
	items,
}: {
	items: string[];
	checks: string[];
	settings: Options;
}) {
	return (
		items.includes("Hammer") ||
		items.includes("Kooper") ||
		items.includes("Bombette") ||
		items.includes("Super Boots")
	);
}
export function canShakeTree({
	items,
}: {
	items: string[];
	checks: string[];
	settings: Options;
}) {
	return items.includes("Hammer") || items.includes("Bombette");
}
export function canFlipPanel({
	items,
}: {
	items: string[];
	checks: string[];
	settings: Options;
}) {
	return items.includes("Super Boots") || items.includes("Ultra Hammer");
}
export function chapter6Entry({
	items,
	settings,
}: {
	items: string[];
	checks: string[];
	settings: Options;
}) {
	return (
		items.filter(el => el.includes("Magical Seed")).length >=
		settings.seedsRequired
	);
}
export function shiverBridgeVisible({
	settings,
}: {
	items: string[];
	checks: string[];
	settings: Options;
}) {
	return settings.shiverBridgeVisible;
}
export function startingLocation(start: string) {
	return ({
		settings,
	}: {
		items: string[];
		checks: string[];
		settings: Options;
	}) => settings.startingLocation === start;
}
export function canBreakRuinsBlocks({
	items,
	checks,
	settings,
}: {
	items: string[];
	checks: string[];
	settings: Options;
}) {
	if (settings.gearShuffle !== "Vanilla") {
		return items.includes("Super Hammer");
	} else {
		return (
			items.includes("Ultra Hammer") ||
			(!checks.includes("Ultra Hammer Room:Ultra Hammer chest") &&
				items.includes("Super Hammer"))
		);
	}
}
export function canBreakVolcanoBlocks({
	items,
	checks,
	settings,
}: {
	items: string[];
	checks: string[];
	settings: Options;
}) {
	if (settings.gearShuffle !== "Vanilla") {
		return items.includes("Ultra Hammer");
	} else {
		return (
			items.includes("Ultra Hammer") ||
			(!checks.includes("Super Hammer Room:Super Hammer chest") &&
				items.includes("Super Hammer"))
		);
	}
}
export function toyboxAccess({
	items,
	settings,
}: {
	items: string[];
	checks: string[];
	settings: Options;
}) {
	return (
		(items.includes("Boots") || items.includes("Parakarry")) &&
		(items.includes("Bow") || settings.toyboxOpen)
	);
}
export function canMoveStations({
	items,
}: {
	items: string[];
	checks: string[];
	settings: Options;
}) {
	return items.includes("Toy Train") && items.includes("Boots");
}
export function goombaVillageAccess({
	items,
	checks,
	settings,
}: {
	items: string[];
	checks: string[];
	settings: Options;
}) {
	return (
		settings.startingLocation === "Goomba Village" ||
		(canReachToadTown({ items, checks, settings }) &&
			(items.includes("Bombette") || items.includes("Hammer")) &&
			canClimbLedges({ items, checks, settings }) &&
			settings.prologueOpen) ||
		(items.includes("Boots") && items.includes("Super Hammer"))
	);
}
export function desertAccess({
	items,
	checks,
	settings,
}: {
	items: string[];
	checks: string[];
	settings: Options;
}) {
	return (
		settings.startingLocation === "Dry Dry Outpost" ||
		(canReachToadTown({ items, checks, settings }) &&
			(((items.includes("Bombette") || settings.mtRuggedOpen) &&
				items.includes("Parakarry")) ||
				(items.includes("Boots") && items.includes("Super Hammer"))))
	);
}
export function forestOpen({
	settings,
}: {
	items: string[];
	checks: string[];
	settings: Options;
}) {
	return settings.forestOpen;
}
export function prologueOpen({
	settings,
}: {
	items: string[];
	checks: string[];
	settings: Options;
}) {
	return settings.prologueOpen;
}
export function mtRuggedOpen({
	settings,
}: {
	items: string[];
	checks: string[];
	settings: Options;
}) {
	return settings.mtRuggedOpen;
}
export function blueHouseOpen({
	settings,
}: {
	items: string[];
	checks: string[];
	settings: Options;
}) {
	return settings.blueHouseOpen;
}
export function whaleOpen({
	settings,
}: {
	items: string[];
	checks: string[];
	settings: Options;
}) {
	return settings.whaleOpen;
}
export function multipleItemCheck(item: string, quantity: number) {
	return ({
		items,
	}: {
		items: string[];
		checks: string[];
		settings: Options;
	}) => items.filter(el => el === item).length >= quantity;
}
export function fastBowserCastle({
	settings,
}: {
	items: string[];
	checks: string[];
	settings: Options;
}) {
	return settings.fastBowserCastle;
}
export function powerStarHunt(settings: Options) {
	return settings.powerStarHunt;
}
export function powerStarNum(settings: Options) {
	return settings.powerStarNum;
}
export function showMagicalSeed(num: number) {
	return (settings: Options) => settings.seedsRequired >= num;
}
