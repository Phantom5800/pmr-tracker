import type { Options } from "@/stores/config";
import * as logic from "../utils/logic";
import { has3Letters } from "@/utils/letterLogic";

export type Requirements =
	| null
	| number
	| string
	| boolean
	| (({
			items,
			checks,
			settings,
	  }: {
			items: string[];
			checks: string[];
			settings: Options;
	  }) => boolean)
	| Requirements[];
type Coords = { row: number; col: number; rowSpan?: number; colSpan?: number };
type Area = Coords & {
	checks: {
		[key: string]: {
			reqs: Requirements;
		};
	};
};
type Region = {
	blanks?: Coords[];
	labels?: (Coords & { content: string })[];
	reqs?: Requirements;
	areas: {
		[key: string]: Area;
	};
};

type MapRegions = { [key: string]: Region };

export const chapterRewardReqs = {
	Eldstar: [
		logic.canReachToadTown,
		logic.canClimbLedges,
		["Hammer", "Bombette"],
		"Kooper",
		logic.multipleItemCheck("Fortress Key", 4),
	],
	Mamar: [
		"Pulse Stone",
		"Pyramid Stone",
		"Diamond Stone",
		"Lunar Stone",
		logic.multipleItemCheck("Ruins Key", 3),
		[
			logic.startingLocation("Dry Dry Outpost"),
			["Bombette", "Parakarry"],
			"Super Hammer",
		],
	],
	Skolar: [
		logic.canReachToadTown,
		"Boo's Portrait",
		logic.multipleItemCheck("Tubba Castle Key", 3),
		"Parakarry",
		"Super Boots",
	],
	Muskular: [
		"Toy Train",
		"Cake",
		"Bombette",
		"Watt",
		"Hammer",
		logic.toyboxAccess,
	],
	Misstar: [
		"Jade Raven",
		"Sushie",
		"Hammer",
		logic.canClimbLedges,
		[
			logic.startingLocation("Yoshi Village"),
			"Watt",
			logic.whaleOpen,
			["Bombette", [logic.blueHouseOpen, "Odd Key"]],
			["Super Boots", "Sushie"],
		],
		logic.canBreakVolcanoBlocks,
	],
	Klevar: [
		logic.canReachToadTown,
		logic.chapter6Entry,
		"Magical Bean",
		"Fertile Soil",
		"Miracle Water",
		"Lakilester",
		"Super Boots",
		"Hammer",
	],
	Kalmar: [
		"Warehouse Key",
		"Bucket",
		"Scarf",
		"Star Stone",
		"Red Key",
		"Palace Key",
		"Kooper",
		"Hammer",
		"Bombette",
		logic.canReachToadTown,
		[["Super Boots", logic.shiverBridgeVisible], "Ultra Boots"],
		["Sushie", logic.blueHouseOpen, "Odd Key"],
	],
	"Star Rod": [
		logic.canReachToadTown,
		"Boots",
		7,
		[
			[
				logic.multipleItemCheck("Bowser's Castle Key", 5),
				"Bombette",
				"Lakilester",
				"Parakarry",
				"Bow",
				"Sushie",
				"Ultra Boots",
			],
			logic.fastBowserCastle,
		],
	],
} satisfies Record<string, Requirements>;

const regionData: MapRegions = {
	Prologue: {
		reqs: [[logic.startingLocation("Goomba Village"), logic.canReachToadTown]],
		areas: {
			Playground: {
				row: 1,
				col: 1,
				checks: {
					"Furthest left bush": {
						reqs: [["Hammer", "Bombette"], logic.goombaVillageAccess],
					},
					"Far right tree": {
						reqs: [["Hammer", "Bombette"], logic.goombaVillageAccess],
					},
					"[Foliage Coin] 2 more trees": {
						reqs: [["Hammer", "Bombette"], logic.goombaVillageAccess],
					},
					"[Foliage Coin] 6 more bushes": {
						reqs: [["Hammer", "Bombette"], logic.goombaVillageAccess],
					},
					"[Multicoin Block] Block on ground": {
						reqs: [["Hammer", "Bombette"], logic.goombaVillageAccess],
					},
				},
			},
			"Outside Playground": {
				row: 1,
				col: 2,
				checks: {
					"[Panel] Right of stone block": {
						reqs: [logic.canFlipPanel, logic.goombaVillageAccess],
					},
					"[Coinsanity] 4 items above spring": {
						reqs: [logic.canClimbLedges, logic.goombaVillageAccess],
					},
					"[Coin Block] Far left ? Block": {
						reqs: [["Hammer", "Bombette"], logic.goombaVillageAccess],
					},
					Tree: {
						reqs: [["Hammer", "Bombette"], logic.goombaVillageAccess],
					},
					"Item on ledge above spring": {
						reqs: [logic.canClimbLedges, logic.goombaVillageAccess],
					},
					"? Block above stone block": {
						reqs: [
							logic.goombaVillageAccess,
							"Super Hammer",
							logic.canBreakBlocksAbove,
						],
					},
				},
			},
			"Outside Village": {
				row: 1,
				col: 3,
				checks: {
					"Item on ledge": {
						reqs: ["Boots", logic.goombaVillageAccess],
					},
					"[Foliage Coin] Tree on ledge": {
						reqs: ["Boots", logic.canShakeTree, logic.goombaVillageAccess],
					},
				},
			},
			"Goomba Village": {
				row: 1,
				col: 4,
				rowSpan: 2,
				checks: {
					"[Letter] Goompa": {
						reqs: [logic.goombaVillageAccess, "Goompa", "Parakarry"],
					},
					"[Letter] Goompapa 1 (Chain)": {
						reqs: [logic.goombaVillageAccess, "Goompapa 1", "Parakarry"],
					},
					"[Letter] Goompapa 2 (Chain)": {
						reqs: [logic.goombaVillageAccess, "Goompapa 2", "Parakarry"],
					},
					"[Koot] Talk to Goompa after Koopa Koot asks for his Tape": {
						reqs: [
							logic.goombaVillageAccess,
							1,
							"Koopa Legends",
							"Sleepy Sheep",
						],
					},
					Goombario: {
						reqs: logic.goombaVillageAccess,
					},
					"Give Dolly to Goombaria": {
						reqs: [logic.goombaVillageAccess, "Dolly"],
					},
					Goompa: {
						reqs: logic.goombaVillageAccess,
					},
					"Goompa's Veranda": {
						reqs: logic.goombaVillageAccess,
					},
					Tree: {
						reqs: [logic.goombaVillageAccess, logic.canShakeTree],
					},
					"[Foliage Coin] Bottom right bush": {
						reqs: logic.goombaVillageAccess,
					},
				},
			},
			"Mario's Landing": {
				row: 2,
				col: 3,
				checks: {
					"[Panel] Middle of the room": {
						reqs: [logic.goombaVillageAccess, logic.canFlipPanel],
					},
				},
			},
			"Goomba Road 1": {
				row: 2,
				col: 5,
				checks: {
					"[Coin Block] Left ? Block": {
						reqs: [
							logic.canBreakBlocksAbove,
							[
								[logic.goombaVillageAccess, ["Hammer", "Bombette"]],
								[
									logic.canReachToadTown,
									logic.canClimbLedges,
									logic.prologueOpen,
								],
							],
						],
					},
					"[Coin Block] Right ? Block": {
						reqs: [
							logic.canBreakBlocksAbove,
							[
								[logic.goombaVillageAccess, ["Hammer", "Bombette"]],
								[
									logic.canReachToadTown,
									logic.canClimbLedges,
									logic.prologueOpen,
								],
							],
						],
					},
				},
			},
			"Goomba Road 2": {
				row: 2,
				col: 6,
				checks: {
					"? Block": {
						reqs: [
							logic.canBreakBlocksAbove,
							[
								[logic.goombaVillageAccess, ["Hammer", "Bombette"]],
								[
									logic.canReachToadTown,
									logic.canClimbLedges,
									logic.prologueOpen,
								],
							],
						],
					},
					Sign: {
						reqs: [
							[
								[logic.goombaVillageAccess, ["Hammer", "Bombette"]],
								[
									logic.canReachToadTown,
									logic.canClimbLedges,
									logic.prologueOpen,
								],
							],
						],
					},
				},
			},
			"Red & Blue Goomba": { row: 2, col: 7, checks: {} },
			"Outside Castle": { row: 2, col: 8, checks: {} },
			"Goomba King's Castle": {
				row: 2,
				col: 9,
				checks: {
					"[Panel] Right side of Goomba King's Fortress near tree": {
						reqs: [
							logic.canFlipPanel,
							logic.canClimbLedges,
							[
								logic.canReachToadTown,
								[logic.goombaVillageAccess, ["Hammer", "Bombette"]],
							],
						],
					},
					"Tree left of the fortress": {
						reqs: [
							logic.canShakeTree,
							logic.canClimbLedges,
							[
								[logic.canReachToadTown, logic.prologueOpen],
								[logic.goombaVillageAccess, ["Hammer", "Bombette"]],
							],
						],
					},
					"Break brick block to spawn ? Block": {
						reqs: [
							logic.canBreakBlocksAbove,
							logic.canBreakGroundBlocks,
							logic.canClimbLedges,
							[
								logic.canReachToadTown,
								[logic.goombaVillageAccess, ["Hammer", "Bombette"]],
							],
						],
					},
					"[Foliage Coin] Tree right of the fortress": {
						reqs: [
							logic.canShakeTree,
							logic.canClimbLedges,
							[
								logic.canReachToadTown,
								[logic.goombaVillageAccess, ["Hammer", "Bombette"]],
							],
						],
					},
				},
			},
		},
	},
	"Toad Town": {
		reqs: logic.canReachToadTown,
		areas: {
			"Castle Ruins": {
				row: 1,
				col: 3,
				rowSpan: 2,
				checks: {
					"[Letter] Muss T. (Chain)": {
						reqs: ["Muss T. (Castle Ruins)", "Parakarry"],
					},
					"[Panel] Right side of bridge": {
						reqs: logic.canFlipPanel,
					},
				},
			},
			"Shooting Star Summit": {
				row: 1,
				col: 4,
				checks: {
					"[Panel] On First Step": {
						reqs: [logic.canFlipPanel, logic.canClimbLedges],
					},
					"Left from entrance": { reqs: logic.canClimbLedges },
				},
			},
			"Mario's House": {
				row: 2,
				col: 2,
				checks: {
					"[Koot] Talk to Luigi after Koopa Koot requests his autograph": {
						reqs: [
							logic.canClimbLedges,
							"Hammer",
							1,
							"Koopa Legends",
							"Sleepy Sheep",
							"Tape",
							"Koopa Tea",
						],
					},
				},
			},
			"Merluvlee's House": {
				row: 2,
				col: 4,
				checks: {
					"[Panel] In front of pot outside house": {
						reqs: [logic.canFlipPanel],
					},
					"[Merlow] 6 items from Merlow Star Piece Rewards": {
						reqs: logic.canClimbLedges,
					},
					"[Letter] Merlow": { reqs: ["Merlow", "Parakarry"] },
					"[Koot] Give Merluvlee the Crystal Ball": {
						reqs: [
							"Hammer",
							2,
							"Koopa Legends",
							"Sleepy Sheep",
							"Tape",
							"Koopa Tea",
							"Luigi's Autograph",
							"Wallet",
							"Tasty Tonic",
							"Crystal Ball",
						],
					},
				},
			},
			"Outside Gate": {
				row: 3,
				col: 1,
				checks: {
					"Chest on top of Gate": {
						reqs: [logic.canShakeTree, logic.canClimbLedges],
					},
					"? Block": { reqs: logic.canBreakBlocksAbove },
				},
			},
			"Main Gate": {
				row: 3,
				col: 2,
				checks: {
					"[Panel] By three toad sisters": {
						reqs: [logic.canFlipPanel],
					},
					"[Dojo] Defeat Chan (logic from beginning)": {
						reqs: null,
					},
					"[Dojo] Defeat Lee (logic after 2 star spirits)": {
						reqs: 2,
					},
					"[Dojo] Defeat Master 1 (logic after 3 star spirits)": {
						reqs: 3,
					},
					"[Dojo] Defeat Master 2 (logic after 4 star spirits)": {
						reqs: 4,
					},
					"[Dojo] Defeat Master 3 (logic after 5 star spirits)": {
						reqs: 5,
					},
					"[Letter] Miss T.": { reqs: ["Miss T.", "Parakarry"] },
					"[Letter] Russ T.": { reqs: ["Russ T.", "Parakarry"] },
					"[Shop] 6 items in Shop": { reqs: null },
					"[Trade] Give Koopa Leaf to Trading Event Toad": {
						reqs: [["Hammer", "Bombette"], 1],
					},
					"Give Dictionary to Russ T.": { reqs: ["Dictionary"] },
					"Item at Sushie panel": { reqs: ["Sushie"] },
					"[Upgrade] Super Block": {
						reqs: ["Sushie", logic.canClimbLedges, logic.canBreakBlocksAbove],
					},
				},
			},
			"Central Plaza": {
				row: 3,
				col: 3,
				checks: {
					"[Letter] Merlon": { reqs: ["Merlon", "Parakarry"] },
					"[Letter] Minh T. (Chain)": {
						reqs: ["Minh T.", "Parakarry"],
					},
					"[Rowf] 4 items in Rowf's Shop": { reqs: null },
					"[Rowf] 3 items in Rowf's Shop after clearing 1 chapter": {
						reqs: 1,
					},
					"[Rowf] 3 items in Rowf's Shop after clearing 2 chapters": {
						reqs: 2,
					},
					"[Rowf] 3 items in Rowf's Shop after clearing 3 chapters": {
						reqs: 3,
					},
					"[Rowf] 3 items in Rowf's Shop after clearing 4 chapters": {
						reqs: 4,
					},
					"Tree by Merlon's house": {
						reqs: logic.canShakeTree,
					},
					"Give Calculator to Rowf": { reqs: "Calculator" },
					"Give Mailbag to Post Office": { reqs: "Mailbag" },
					"Ground Pound inside Merlon's house 3 times": {
						reqs: "Super Boots",
					},
				},
			},
			Harbor: {
				row: 4,
				col: 1,
				checks: {
					"[Panel] Outside Club 64": {
						reqs: logic.canFlipPanel,
					},
					"[Letter] Fishmael (Chain)": {
						reqs: ["Fishmael", "Parakarry"],
					},
					"[Trade] Give Coconut to Trading Event Toad": {
						reqs: [["Hammer", "Bombette"], 5],
					},
					"Talk to Simon in Club 64 (first time)": { reqs: null },
					"Give Melody to Simon in Club 64": { reqs: "Melody" },
					"[Multicoin Block] Block on crates": { reqs: "Boots" },
				},
			},
			"Residential Area": {
				row: 4,
				col: 2,
				checks: {
					"[Shop] 6 items in Shop": { reqs: null },
					"Four items in Harry's Storeroom": {
						reqs: "Storeroom Key",
					},
				},
			},
			"Below Plaza": {
				row: 4,
				col: 3,
				checks: {
					"[Panel] By guard house": {
						reqs: logic.canFlipPanel,
					},
					"[Letter] Fice T.": { reqs: ["Fice T.", "Parakarry"] },
					"Bub-ulb": { reqs: logic.canClimbLedges },
					"Give Frying Pan to Tayce T.": { reqs: "Frying Pan" },
					"Inside Blue House": {
						reqs: [
							[
								"Odd Key",
								logic.blueHouseOpen,
								[logic.canClimbLedges, "Super Boots", "Sushie", "Bombette"],
							],
						],
					},
				},
			},
			"Forever Forest Entrance": { row: 4, col: 4, checks: {} },
			"Train Station": {
				row: 5,
				col: 3,
				checks: {
					"[Panel] Bottom right side of room": {
						reqs: logic.canFlipPanel,
					},
					"[Letter] Dane T. 1 (Chain)": {
						reqs: ["Boots", "Dane T. 1", "Parakarry"],
					},
					"[Letter] Dane T. 2 (Chain)": {
						reqs: ["Boots", "Dane T. 2", "Parakarry"],
					},
				},
			},
		},
	},
	"Toad Town Tunnels": {
		reqs: [logic.canReachToadTown, logic.canClimbLedges],
		areas: {
			Pipe: {
				row: 1,
				col: 2,
				rowSpan: 2,
				checks: {
					"[Coin Block] Left ? Block": {
						reqs: ["Super Hammer", logic.canBreakBlocksAbove],
					},
					"[Coin Block] Right ? Block": {
						reqs: ["Super Hammer", logic.canBreakBlocksAbove],
					},
					"Middle ? Block": {
						reqs: ["Super Hammer", logic.canBreakBlocksAbove],
					},
				},
			},
			Shortcuts: { row: 1, col: 3, colSpan: 4, checks: {} },
			Entrance: {
				row: 1,
				col: 7,
				checks: {},
			},
			"Brick Blocks": {
				row: 1,
				col: 8,
				checks: {
					"Hidden block next to last brick block": {
						reqs: ["Hammer", logic.canBreakBlocksAbove],
					},
					"[Multicoin Block] Third block from the left": {
						reqs: ["Hammer", logic.canBreakBlocksAbove],
					},
				},
			},
			"Shrink Stomp": {
				row: 1,
				col: 9,
				checks: {
					Chest: {
						reqs: ["Hammer"],
					},
				},
			},
			"Lower Upgrade Block": {
				row: 4,
				col: 3,
				checks: {
					"[Upgrade] Super Block": {
						reqs: ["Ultra Hammer", logic.canBreakBlocksAbove],
					},
				},
			},
			"Bridge Upgrade Block": {
				row: 2,
				col: 4,
				checks: {
					"[Coin Block] Left invisible block": {
						reqs: [
							logic.canBreakBlocksAbove,
							[
								"Super Boots",
								["Odd Key", "Bombette", "Sushie"],
								[logic.blueHouseOpen, "Bombette", "Sushie"],
							],
						],
					},
					"[Coin Block] Middle invisible block": {
						reqs: [
							logic.canBreakBlocksAbove,
							[
								"Super Boots",
								["Odd Key", "Bombette", "Sushie"],
								[logic.blueHouseOpen, "Bombette", "Sushie"],
							],
						],
					},
					"[Coin Block] Right invisible block": {
						reqs: [
							logic.canBreakBlocksAbove,
							[
								"Super Boots",
								["Odd Key", "Bombette", "Sushie"],
								[logic.blueHouseOpen, "Bombette", "Sushie"],
							],
						],
					},
					"[Upgrade] Super Block": {
						reqs: [
							logic.canBreakBlocksAbove,
							[
								"Super Boots",
								["Odd Key", "Bombette", "Sushie"],
								[logic.blueHouseOpen, "Bombette", "Sushie"],
							],
						],
					},
				},
			},
			"Chapter 3 Shortcut": { row: 2, col: 5, colSpan: 2, checks: {} },
			"Tunnels Sushie Room": { row: 2, col: 7, checks: {} },
			"Above Spiny Room": {
				row: 2,
				col: 8,
				checks: {
					"Ultra Boots ? block": {
						reqs: [
							"Ultra Boots",
							[
								["Odd Key", "Bombette"],
								[logic.blueHouseOpen, "Bombette"],
								"Sushie",
							],
						],
					},
				},
			},
			"Chapter 7 Door": {
				row: 2,
				col: 9,
				rowSpan: 2,
				checks: {
					"[Coin Block] ? Block 1": {
						reqs: [
							[["Super Boots", logic.shiverBridgeVisible], "Ultra Boots"],
							[
								"Sushie",
								["Odd Key", "Bombette"],
								[logic.blueHouseOpen, "Bombette"],
							],
						],
					},
					"[Coin Block] ? Block 2": {
						reqs: [
							[["Super Boots", logic.shiverBridgeVisible], "Ultra Boots"],
							[
								"Sushie",
								["Odd Key", "Bombette"],
								[logic.blueHouseOpen, "Bombette"],
							],
						],
					},
					"[Coin Block] ? Block 3": {
						reqs: [
							[["Super Boots", logic.shiverBridgeVisible], "Ultra Boots"],
							[
								"Sushie",
								["Odd Key", "Bombette"],
								[logic.blueHouseOpen, "Bombette"],
							],
						],
					},
					"[Coin Block] ? Block 4": {
						reqs: [
							[["Super Boots", logic.shiverBridgeVisible], "Ultra Boots"],
							[
								"Sushie",
								["Odd Key", "Bombette"],
								[logic.blueHouseOpen, "Bombette"],
							],
						],
					},
					"[Coin Block] ? Block 5": {
						reqs: [
							[["Super Boots", logic.shiverBridgeVisible], "Ultra Boots"],
							[
								"Sushie",
								["Odd Key", "Bombette"],
								[logic.blueHouseOpen, "Bombette"],
							],
						],
					},
				},
			},
			"Chapter 7 Pipe": {
				row: 2,
				col: 10,
				checks: {
					"[Upgrade] Super Block": {
						reqs: [
							"Super Boots",
							[
								"Sushie",
								["Odd Key", "Bombette"],
								[logic.blueHouseOpen, "Bombette"],
							],
						],
					},
				},
			},
			"Power Smash": {
				row: 3,
				col: 1,
				checks: {
					Chest: { reqs: ["Super Hammer", logic.canBreakBlocksAbove] },
				},
			},
			Seesaw: { row: 3, col: 2, checks: {} },
			Elevator: {
				row: 3,
				col: 3,
				checks: {
					"Item on far right ledge": {
						reqs: ["Super Hammer", "Parakarry"],
					},
				},
			},
			"Elevator Upgrade Block": {
				row: 3,
				col: 4,
				checks: {
					"[Upgrade] Super Block": {
						reqs: ["Super Hammer", logic.canBreakBlocksAbove],
					},
				},
			},
			"Ultra Boots Room": {
				row: 3,
				col: 6,
				checks: {
					"Ultra Boots chest": {
						reqs: [
							"Ultra Hammer",
							[
								["Odd Key", "Bombette"],
								[logic.blueHouseOpen, "Bombette"],
								["Super Boots", "Sushie"],
							],
							"Lakilester",
						],
					},
				},
			},
			"Ultra Boots Blocks": {
				row: 3,
				col: 7,
				checks: {
					"[Coin Block] Left ? Block": {
						reqs: [
							"Ultra Boots",
							"Super Hammer",
							[
								["Odd Key", "Bombette"],
								[logic.blueHouseOpen, "Bombette"],
								"Sushie",
							],
							"Lakilester",
						],
					},
					"[Coin Block] Right ? Block": {
						reqs: [
							"Ultra Boots",
							"Super Hammer",
							[
								["Odd Key", "Bombette"],
								[logic.blueHouseOpen, "Bombette"],
								"Sushie",
							],
							"Lakilester",
						],
					},
					"Middle ? Block": {
						reqs: [
							"Ultra Boots",
							"Super Hammer",
							[
								["Odd Key", "Bombette"],
								[logic.blueHouseOpen, "Bombette"],
								"Sushie",
							],
							"Lakilester",
						],
					},
				},
			},
			"Spiny Room": {
				row: 3,
				col: 8,
				checks: {
					"Invisible block left of pipe": {
						reqs: [
							[
								["Odd Key", "Bombette"],
								[logic.blueHouseOpen, "Bombette"],
								["Super Boots", "Sushie"],
							],
							"Lakilester",
						],
					},
					"Invisible block between first and second spiny": {
						reqs: [
							[
								["Odd Key", "Bombette"],
								[logic.blueHouseOpen, "Bombette"],
								["Super Boots", "Sushie"],
							],
							"Lakilester",
						],
					},
					"Invisible block next to visible ? block": {
						reqs: [
							[
								["Odd Key", "Bombette"],
								[logic.blueHouseOpen, "Bombette"],
								["Super Boots", "Sushie"],
							],
							"Lakilester",
						],
					},
					"[Coin Block] ? Block by stone block": {
						reqs: [
							[
								["Odd Key", "Bombette"],
								[logic.blueHouseOpen, "Bombette"],
								["Super Boots", "Sushie"],
							],
							"Lakilester",
						],
					},
				},
			},
			"Below Blue House": {
				row: 3,
				col: 10,
				checks: {
					"All items from Rip Cheato - 11 total, only first 6 (28 coins) can be progression":
						{
							reqs: [
								[
									"Odd Key",
									logic.blueHouseOpen,
									["Super Boots", "Sushie", "Bombette"],
								],
							],
						},
				},
			},
		},
	},
	"Pleasant Path": {
		reqs: logic.canReachToadTown,
		areas: {
			"Outside Toad Town": {
				row: 1,
				col: 1,
				checks: {
					"[Coin Block] Left ? Block": { reqs: logic.canBreakBlocksAbove },
					"Middle ? Block": { reqs: logic.canBreakBlocksAbove },
					"Right ? Block": { reqs: logic.canBreakBlocksAbove },
				},
			},
			"Switch Bridge 1": {
				row: 1,
				col: 2,
				checks: {
					"? Block": { reqs: logic.canBreakBlocksAbove },
					"Kooper item": {
						reqs: [logic.canShakeTree, "Kooper"],
					},
					"Item behind small fence": {
						reqs: [logic.canShakeTree, logic.canClimbLedges],
					},
					"[Multicoin Block] Last block on the right": {
						reqs: [
							logic.canShakeTree,
							logic.canClimbLedges,
							logic.canBreakBlocksAbove,
						],
					},
				},
			},
			"Outside Koopa Village": {
				row: 1,
				col: 3,
				checks: {
					"[Panel] Middle of three pillars": {
						reqs: [
							logic.canShakeTree,
							logic.canClimbLedges,
							logic.canFlipPanel,
						],
					},
					"Item behind right-most pillar": {
						reqs: [logic.canShakeTree, logic.canClimbLedges],
					},
					"Break brick boxes (left, right, middle)": {
						reqs: [
							logic.canShakeTree,
							logic.canClimbLedges,
							logic.canBreakGroundBlocks,
							logic.canBreakBlocksAbove,
						],
					},
				},
			},
			"Switch Bridge 2": {
				row: 1,
				col: 4,
				checks: {
					"[Panel] Under 5 coins / items": {
						reqs: [
							logic.canShakeTree,
							logic.canClimbLedges,
							logic.canFlipPanel,
						],
					},
					"[Coinsanity] 5 items at start of room": {
						reqs: [logic.canShakeTree, logic.canClimbLedges],
					},
					"Item on brick block": {
						reqs: [
							logic.canShakeTree,
							logic.canClimbLedges,
							["Kooper", "Ultra Boots"],
						],
					},
					"Hidden ? block after bridge": {
						reqs: [
							logic.canShakeTree,
							logic.canClimbLedges,
							"Kooper",
							logic.canBreakBlocksAbove,
						],
					},
				},
			},
			"Path to Fortress": {
				row: 1,
				col: 5,
				checks: {
					"Item in first tree": {
						reqs: [logic.canShakeTree, logic.canClimbLedges, "Kooper"],
					},
				},
			},
		},
	},
	"Koopa Village": {
		reqs: [logic.canReachToadTown, logic.canShakeTree, logic.canClimbLedges],
		areas: {
			"Fuzzy Room": {
				row: 1,
				col: 2,
				checks: {
					"Item Fuzzies are holding": {
						reqs: "Hammer",
					},
				},
			},
			"Behind Kooper's House": {
				row: 2,
				col: 2,
				checks: {
					"On tall stump": {
						reqs: [["Kooper", "Parakarry"]],
					},
				},
			},
			"Koopa Village West": {
				row: 3,
				col: 1,
				checks: {
					"[Shop] 6 items in Shop": {
						reqs: null,
					},
					"[Panel] Left of tree": {
						reqs: logic.canFlipPanel,
					},
					"[Letter] Mort T.": {
						reqs: ["Mort T. (Koopa Village Inn)", "Parakarry"],
					},
					"[Letter] Koover 1 (Chain)": {
						reqs: ["Koover 1 (Koopa Village Entrance)", "Parakarry"],
					},
					"[Letter] Koover 2 (Chain)": {
						reqs: ["Koover 2 (Koopa Village Entrance)", "Parakarry"],
					},
					"[Koot] Far right bush after Koopa Koot requests his Wallet": {
						reqs: [
							2,
							"Koopa Legends",
							"Sleepy Sheep",
							"Tape",
							"Koopa Tea",
							"Luigi's Autograph",
						],
					},
					"[Koot] Second bush from left after Koopa Koot requests his Glasses":
						{
							reqs: [
								5,
								"Koopa Legends",
								"Sleepy Sheep",
								"Tape",
								"Koopa Tea",
								"Luigi's Autograph",
								"Wallet",
								"Tasty Tonic",
								"Merluvlee's Autograph",
								"Life Shroom",
								"Nutty Cake",
								"Eldstar",
								"Bombette",
								"Old Photo",
								"Koopasta",
							],
						},
					"Bottom bush on left side": {
						reqs: null,
					},
					"Third bush from the right": {
						reqs: null,
					},
					"[Foliage Coin] Far left bush": {
						reqs: null,
					},
					"[Foliage Coin] Second bush from the right": {
						reqs: null,
					},
				},
			},
			"Koopa Village East": {
				row: 3,
				col: 2,
				checks: {
					"[Letter] Kolorado": { reqs: ["Kolorado", "Parakarry"] },
					"[Koot] Talk to Kolorado's wife after starting Koopa Koot's first favor":
						{
							reqs: null,
						},
					"[Koot Coin] Return Koopa Legends to Koopa Koot": {
						reqs: "Koopa Legends",
					},
					"[Koot Coin] Give Koopa Koot a Sleepy Sheep (first item)": {
						reqs: ["Koopa Legends", "Sleepy Sheep"],
					},
					"[Koot] Give Koopa Koot a Sleepy Sheep (second item)": {
						reqs: ["Koopa Legends", "Sleepy Sheep"],
					},
					"[Koot Coin] Return Koopa Koot's Tape": {
						reqs: [1, "Koopa Legends", "Sleepy Sheep", "Tape"],
					},
					"[Koot] Give Koopa Koot Koopa Tea": {
						reqs: [1, "Koopa Legends", "Sleepy Sheep", "Tape", "Koopa Tea"],
					},
					"[Koot Coin] Give Luigi's Autograph to Koopa Koot": {
						reqs: [
							1,
							"Koopa Legends",
							"Sleepy Sheep",
							"Tape",
							"Koopa Tea",
							"Luigi's Autograph",
						],
					},
					"[Koot Coin] Return Koopa Koot's wallet": {
						reqs: [
							2,
							"Koopa Legends",
							"Sleepy Sheep",
							"Tape",
							"Koopa Tea",
							"Luigi's Autograph",
							"Wallet",
						],
					},
					"[Koot Coin] Give Koopa Koot a Tasty Tonic": {
						reqs: [
							2,
							"Koopa Legends",
							"Sleepy Sheep",
							"Tape",
							"Koopa Tea",
							"Luigi's Autograph",
							"Wallet",
							"Tasty Tonic",
						],
					},
					"[Koot] Give Merluvlee's Autograph to Koopa Koot": {
						reqs: [
							2,
							"Koopa Legends",
							"Sleepy Sheep",
							"Tape",
							"Koopa Tea",
							"Luigi's Autograph",
							"Wallet",
							"Tasty Tonic",
							"Merluvlee's Autograph",
						],
					},
					"[Koot Coin] Talk to Koopa Koot after reading the news in Toad Town":
						{
							reqs: [
								3,
								"Koopa Legends",
								"Sleepy Sheep",
								"Tape",
								"Koopa Tea",
								"Luigi's Autograph",
								"Wallet",
								"Tasty Tonic",
								"Merluvlee's Autograph",
							],
						},
					"[Koot Coin] Give Koopa Koot a Life Shroom (first item)": {
						reqs: [
							3,
							"Koopa Legends",
							"Sleepy Sheep",
							"Tape",
							"Koopa Tea",
							"Luigi's Autograph",
							"Wallet",
							"Tasty Tonic",
							"Merluvlee's Autograph",
							"Life Shroom",
						],
					},
					"[Koot] Give Koopa Koot a Life Shroom (second item)": {
						reqs: [
							3,
							"Koopa Legends",
							"Sleepy Sheep",
							"Tape",
							"Koopa Tea",
							"Luigi's Autograph",
							"Wallet",
							"Tasty Tonic",
							"Merluvlee's Autograph",
							"Life Shroom",
						],
					},
					"[Koot Coin] Give Koopa Koot a Nutty Cake": {
						reqs: [
							3,
							"Koopa Legends",
							"Sleepy Sheep",
							"Tape",
							"Koopa Tea",
							"Luigi's Autograph",
							"Wallet",
							"Tasty Tonic",
							"Merluvlee's Autograph",
							"Life Shroom",
							"Nutty Cake",
						],
					},
					"[Koot] Talk to Koopa Koot after calming the Bob-ombs": {
						reqs: [
							4,
							"Koopa Legends",
							"Sleepy Sheep",
							"Tape",
							"Koopa Tea",
							"Luigi's Autograph",
							"Wallet",
							"Tasty Tonic",
							"Merluvlee's Autograph",
							"Life Shroom",
							"Nutty Cake",
							"Eldstar",
							"Bombette",
						],
					},
					"[Koot Coin] Give Koopa Koot the Old Photo": {
						reqs: [
							4,
							"Koopa Legends",
							"Sleepy Sheep",
							"Tape",
							"Koopa Tea",
							"Luigi's Autograph",
							"Wallet",
							"Tasty Tonic",
							"Merluvlee's Autograph",
							"Life Shroom",
							"Nutty Cake",
							"Eldstar",
							"Bombette",
							"Old Photo",
						],
					},
					"[Koot Coin] Give Koopa Koot Koopasta": {
						reqs: [
							4,
							"Koopa Legends",
							"Sleepy Sheep",
							"Tape",
							"Koopa Tea",
							"Luigi's Autograph",
							"Wallet",
							"Tasty Tonic",
							"Merluvlee's Autograph",
							"Life Shroom",
							"Nutty Cake",
							"Eldstar",
							"Bombette",
							"Old Photo",
							"Koopasta",
						],
					},
					"[Koot Coin] Return Koopa Koot's glasses": {
						reqs: [
							5,
							"Koopa Legends",
							"Sleepy Sheep",
							"Tape",
							"Koopa Tea",
							"Luigi's Autograph",
							"Wallet",
							"Tasty Tonic",
							"Merluvlee's Autograph",
							"Life Shroom",
							"Nutty Cake",
							"Eldstar",
							"Bombette",
							"Old Photo",
							"Koopasta",
							"Glasses",
						],
					},
					"[Koot] Give Koopa Koot a Lime": {
						reqs: [
							5,
							"Koopa Legends",
							"Sleepy Sheep",
							"Tape",
							"Koopa Tea",
							"Luigi's Autograph",
							"Wallet",
							"Tasty Tonic",
							"Merluvlee's Autograph",
							"Life Shroom",
							"Nutty Cake",
							"Eldstar",
							"Bombette",
							"Old Photo",
							"Koopasta",
							"Glasses",
							"Lime",
						],
					},
					"[Koot Coin] Give Koopa Koot a Kooky Cookie": {
						reqs: [
							5,
							"Koopa Legends",
							"Sleepy Sheep",
							"Tape",
							"Koopa Tea",
							"Luigi's Autograph",
							"Wallet",
							"Tasty Tonic",
							"Merluvlee's Autograph",
							"Life Shroom",
							"Nutty Cake",
							"Eldstar",
							"Bombette",
							"Old Photo",
							"Koopasta",
							"Glasses",
							"Lime",
							"Kooky Cookie",
						],
					},
					"[Koot Coin] Give Koopa Koot his package": {
						reqs: [
							6,
							"Koopa Legends",
							"Sleepy Sheep",
							"Tape",
							"Koopa Tea",
							"Luigi's Autograph",
							"Wallet",
							"Tasty Tonic",
							"Merluvlee's Autograph",
							"Life Shroom",
							"Nutty Cake",
							"Eldstar",
							"Bombette",
							"Old Photo",
							"Koopasta",
							"Glasses",
							"Lime",
							"Kooky Cookie",
							"Package",
						],
					},
					"[Koot Coin] Give Koopa Koot a Coconut": {
						reqs: [
							6,
							"Koopa Legends",
							"Sleepy Sheep",
							"Tape",
							"Koopa Tea",
							"Luigi's Autograph",
							"Wallet",
							"Tasty Tonic",
							"Merluvlee's Autograph",
							"Life Shroom",
							"Nutty Cake",
							"Eldstar",
							"Bombette",
							"Old Photo",
							"Koopasta",
							"Glasses",
							"Lime",
							"Kooky Cookie",
							"Package",
							"Coconut",
						],
					},
					"[Koot] Give Koopa Koot the Red Jar": {
						reqs: [
							6,
							"Koopa Legends",
							"Sleepy Sheep",
							"Tape",
							"Koopa Tea",
							"Luigi's Autograph",
							"Wallet",
							"Tasty Tonic",
							"Merluvlee's Autograph",
							"Life Shroom",
							"Nutty Cake",
							"Eldstar",
							"Bombette",
							"Old Photo",
							"Koopasta",
							"Glasses",
							"Lime",
							"Kooky Cookie",
							"Package",
							"Coconut",
							"Red Jar",
						],
					},
					"First bush on left": {
						reqs: null,
					},
					"Give Kooper his shell": {
						reqs: "Kooper's Shell",
					},
					"Give Artifact to Kolorado": {
						reqs: [
							"Artifact",
							[
								"Mamar",
								["Bombette", "Parakarry"],
								"Super Hammer",
								"Ultra Hammer",
							],
						],
					},
					"Item on top of brick block on right (after defeating fuzzies)": {
						reqs: logic.canBreakBlocksAbove,
					},
					"[Foliage Coin] Far right bush": {
						reqs: null,
					},
				},
			},
		},
	},
	"Koopa Bros. Fortress": {
		reqs: [
			logic.canReachToadTown,
			logic.canShakeTree,
			logic.canClimbLedges,
			"Kooper",
		],
		areas: {
			"Fortress Entrance": {
				row: 1,
				col: 2,
				rowSpan: 3,
				checks: {
					"Defeat Koopa by first locked door": {
						reqs: null,
					},
					"Top of room guarded by Bob-omb": {
						reqs: logic.multipleItemCheck("Fortress Key", 4),
					},
				},
			},
			Cannons: {
				row: 1,
				col: 3,
				checks: {
					"? Block behind bombable rock": {
						reqs: ["Bombette", logic.multipleItemCheck("Fortress Key", 4)],
					},
				},
			},
			"Boss Room": {
				row: 1,
				col: 4,
				checks: {
					Eldstar: {
						reqs: chapterRewardReqs.Eldstar,
					},
				},
			},
			"Bomb Room": { row: 2, col: 3, rowSpan: 2, checks: {} },
			"Kooper Puzzle Room": {
				row: 2,
				col: 4,
				rowSpan: 2,
				checks: {
					"Left Jail Cell": {
						reqs: ["Bombette", logic.multipleItemCheck("Fortress Key", 3)],
					},
					"Middle Jail Cell": {
						reqs: ["Bombette", "Fortress Key"],
					},
					"Right Jail Cell": {
						reqs: ["Bombette", "Fortress Key"],
					},
				},
			},
			"Staircase Room": { row: 2, col: 5, rowSpan: 3, checks: {} },
			"Trap Room": { row: 2, col: 6, rowSpan: 2, colSpan: 2, checks: {} },
			"Outside Fortress": {
				row: 3,
				col: 1,
				checks: {
					"Inside chest on ledge from bombable wall on previous screen": {
						reqs: "Bombette",
					},
				},
			},
			"Outside Chest": {
				row: 3,
				col: 8,
				checks: {
					"Chest after bombable wall in trap room": {
						reqs: ["Bombette", logic.multipleItemCheck("Fortress Key", 2)],
					},
				},
			},
			Firebars: {
				row: 4,
				col: 3,
				checks: {
					"Item at end of room": {
						reqs: ["Bombette", "Fortress Key"],
					},
				},
			},
			"The Pit": { row: 4, col: 4, checks: {} },
			Jail: {
				row: 4,
				col: 6,
				checks: {
					Bombette: {
						reqs: [
							[
								["Fortress Key", "Bombette"],
								logic.multipleItemCheck("Fortress Key", 2),
							],
						],
					},
				},
			},
			"Fortress Save Block": { row: 4, col: 7, checks: {} },
		},
	},
	"Mt. Rugged": {
		reqs: [
			[
				[logic.canReachToadTown, ["Bombette", logic.mtRuggedOpen]],
				[logic.desertAccess, logic.canClimbLedges],
			],
		],
		areas: {
			"Letter 3": {
				row: 1,
				col: 2,
				checks: {
					"[Coin Block] ? Block left after taking spring": {
						reqs: [logic.canClimbLedges, logic.canBreakGroundBlocks],
					},
					"[Coinsanity] Circle of items across Parakarry gap": {
						reqs: [logic.canClimbLedges, "Parakarry"],
					},
					"[Coinsanity] 2 items on ground below Parakarry gap": {
						reqs: logic.canClimbLedges,
					},
					"? Block by Cleft when entering room": {
						reqs: [logic.canClimbLedges, logic.canBreakBlocksAbove],
					},
					"Chest in cave": {
						reqs: logic.canClimbLedges,
					},
					"Item across Parakarry gap": {
						reqs: [logic.canClimbLedges, "Parakarry"],
					},
					"? Block past Cleft after spring": {
						reqs: [logic.canClimbLedges, logic.canBreakGroundBlocks],
					},
					"Item on far right ledge": {
						reqs: logic.canClimbLedges,
					},
				},
			},
			"Letter 1": {
				row: 1,
				col: 3,
				rowSpan: 2,
				checks: {
					"[Panel] By wall near end of slide": {
						reqs: [logic.canClimbLedges, logic.canFlipPanel],
					},
					"Item on first ledge": {
						reqs: [logic.canClimbLedges, ["Kooper", "Parakarry"]],
					},
					"Item on second ledge": {
						reqs: [logic.canClimbLedges, "Parakarry"],
					},
				},
			},
			"Seed Room": {
				row: 1,
				col: 4,
				rowSpan: 2,
				checks: {
					"Bub-ulb": {
						reqs: [logic.canClimbLedges, "Parakarry"],
					},
					"Item on support beam when falling through opening at the top": {
						reqs: logic.canClimbLedges,
					},
				},
			},
			Buzzar: {
				row: 1,
				col: 5,
				checks: {
					"Item on ground by Cleft": {
						reqs: [logic.canClimbLedges, ["Parakarry", logic.desertAccess]],
					},
				},
			},
			Station: {
				row: 2,
				col: 1,
				checks: {
					"Item in top most bush": {
						reqs: null,
					},
					"Give three letters to Parakarry": {
						reqs: [logic.canClimbLedges, has3Letters],
					},
					"[Foliage Coin] All 3 other bushes": {
						reqs: null,
					},
					"[Upgrade] Super Block": {
						reqs: ["Super Hammer", logic.canBreakBlocksAbove],
					},
				},
			},
			Whacka: {
				row: 2,
				col: 2,
				checks: {
					"[Coinsanity] Three items on slide": {
						reqs: logic.canClimbLedges,
					},
					"Hit Whacka": {
						reqs: [logic.canClimbLedges, "Hammer"],
					},
					"? Block": {
						reqs: [logic.canClimbLedges, logic.canBreakBlocksAbove],
					},
				},
			},
		},
	},
	"Dry Dry Desert": {
		reqs: logic.desertAccess,
		areas: {
			"NW Two ? Blocks": {
				row: 1,
				col: 2,
				checks: {
					"[Coin Block] Right ? Block": {
						reqs: logic.canBreakGroundBlocks,
					},
					"Left ? Block": {
						reqs: logic.canBreakGroundBlocks,
					},
				},
			},
			"Two ? Blocks": {
				row: 2,
				col: 6,
				checks: {
					"[Coin Block] Left ? Block": {
						reqs: logic.canBreakGroundBlocks,
					},
					"Right ? Block": {
						reqs: logic.canBreakGroundBlocks,
					},
					"[Multicoin Block] Center of room": {
						reqs: logic.canBreakBlocksAbove,
					},
				},
			},
			"Dry Dry Ruins": {
				row: 1,
				col: 4,
				checks: {
					"[Trade] Give Nutty Cake to Trading Event Toad": {
						reqs: 3,
					},
				},
			},
			"Pokeys Room": {
				row: 1,
				col: 7,
				checks: {
					"Behind cactus at top of room": {
						reqs: null,
					},
				},
			},
			"NE Tree": {
				row: 1,
				col: 8,
				checks: {
					"[Foliage Coin] Tree": {
						reqs: logic.canShakeTree,
					},
					"[Multicoin Block] Block near tree": {
						reqs: logic.canBreakBlocksAbove,
					},
				},
			},
			"Thunder Rage": {
				row: 2,
				col: 2,
				checks: {
					"Hidden block above rock on right side": {
						reqs: [logic.canClimbLedges, logic.canBreakBlocksAbove],
					},
				},
			},
			"Hammer Block": {
				row: 3,
				col: 2,
				checks: {
					"Hammer yellow block once": {
						reqs: [logic.canBreakGroundBlocks, logic.canBreakBlocksAbove],
					},
					"Hammer yellow block five times": {
						reqs: [logic.canBreakGroundBlocks, logic.canBreakBlocksAbove],
					},
					"Hammer yellow block ten times": {
						reqs: [logic.canBreakGroundBlocks, logic.canBreakBlocksAbove],
					},
				},
			},
			"Five ? Blocks": {
				row: 3,
				col: 4,
				checks: {
					"[Coin Block] Top-Left ? Block": {
						reqs: logic.canBreakGroundBlocks,
					},
					"[Coin Block] Top-Right ? Block": {
						reqs: logic.canBreakGroundBlocks,
					},
					"[Coin Block] Bottom-Left ? Block": {
						reqs: logic.canBreakGroundBlocks,
					},
					"[Coin Block] Bottom-Right ? Block": {
						reqs: logic.canBreakGroundBlocks,
					},
					"Center ? Block": {
						reqs: logic.canBreakGroundBlocks,
					},
				},
			},
			"Runaway Pay": {
				row: 3,
				col: 6,
				checks: {
					"Hidden block in the middle of three trees": {
						reqs: logic.canBreakBlocksAbove,
					},
				},
			},
			"Seven Brick Blocks": {
				row: 3,
				col: 7,
				checks: {
					"[Multicoin Block] Second from right": {
						reqs: logic.canBreakBlocksAbove,
					},
					"[Multicoin Block] Third from right": {
						reqs: logic.canBreakBlocksAbove,
					},
				},
			},
			Tree: {
				row: 3,
				col: 8,
				checks: {
					"[Foliage Coin] Tree": {
						reqs: logic.canShakeTree,
					},
				},
			},
			"Desert Save Block": { row: 4, col: 1, checks: {} },
			"Kolorado's Camp": {
				row: 4,
				col: 2,
				checks: {
					"Tree at camp location after saving Mamar": {
						reqs: ["Mamar", logic.canShakeTree],
					},
				},
			},
			"South of Camp": {
				row: 5,
				col: 2,
				checks: {
					"[Multicoin Block] Center block": {
						reqs: logic.canBreakBlocksAbove,
					},
				},
			},
			"Stone Cactus": {
				row: 4,
				col: 5,
				checks: {
					"[Panel] Below stone cactus": {
						reqs: logic.canFlipPanel,
					},
				},
			},
			Mouse: {
				row: 4,
				col: 6,
				checks: {
					"[Letter] Nomadimouse": {
						reqs: ["Nomadimouse", "Parakarry"],
					},
					"[Foliage Coin] Tree": {
						reqs: logic.canShakeTree,
					},
				},
			},
			"Far Left Tree": {
				row: 4,
				col: 7,
				checks: {
					"[Foliage Coin] Far left tree": {
						reqs: logic.canShakeTree,
					},
				},
			},
			"Outside Outpost": {
				row: 4,
				col: 8,
				checks: {
					"Far right tree": {
						reqs: logic.canShakeTree,
					},
					"[Foliage Coin] Far left tree": {
						reqs: logic.canShakeTree,
					},
					"[Foliage Coin] Second tree from left": {
						reqs: logic.canShakeTree,
					},
					"[Foliage Coin] Fourth tree from right": {
						reqs: logic.canShakeTree,
					},
				},
			},
			"Dry Dry Outpost West": {
				row: 4,
				col: 9,
				checks: {
					"[Shop] 3 randomized items in Shop (password items are guaranteed vanilla)":
						{
							reqs: null,
						},
					"[Letter] Shop (Chain)": {
						reqs: ["Dry Dry Shop", "Parakarry"],
					},
					"[Koot] Buy Dusty Hammer, Dried Pasta, Dusty Hammer, Dried Shroom": {
						reqs: null,
					},
					"Turn in Lyrics at far right house": {
						reqs: "Lyrics",
					},
					"[Foliage Coin] Red tree": {
						reqs: logic.canShakeTree,
					},
				},
			},
			"Dry Dry Outpost East": {
				row: 4,
				col: 10,
				checks: {
					"[Panel] On rooftops": {
						reqs: ["Boots", logic.canFlipPanel],
					},
					"[Letter] Mr. E (Chain)": {
						reqs: ["Mr. E", "Parakarry"],
					},
					"[Koot] Talk to Merlee after Merluvlee requests Crystal Ball": {
						reqs: [
							2,
							"Koopa Legends",
							"Sleepy Sheep",
							"Tape",
							"Koopa Tea",
							"Luigi's Autograph",
							"Wallet",
							"Tasty Tonic",
						],
					},
					"Item on rooftops": {
						reqs: "Boots",
					},
					"Talk to Moustafa after buying Dried Shroom + Dusty Hammer": {
						reqs: "Boots",
					},
				},
			},
			"? Block": {
				row: 7,
				col: 6,
				checks: {
					"[Coin Block] ? Block in middle of room": {
						reqs: logic.canBreakGroundBlocks,
					},
				},
			},
			"Green Cactus": {
				row: 5,
				col: 5,
				checks: {
					"[Coin Block] ? Block in middle of room": {
						reqs: logic.canBreakGroundBlocks,
					},
				},
			},
			"Three Brick Blocks": {
				row: 6,
				col: 4,
				checks: {
					"[Multicoin Block] Center block": {
						reqs: logic.canBreakBlocksAbove,
					},
				},
			},
			"Spin Attack": {
				row: 5,
				col: 7,
				checks: {
					"Item on ledge (take Tweester in room down left from here)": {
						reqs: null,
					},
					"Item on brick block, requires Kooper or Ultra Boots": {
						reqs: [[["Kooper", logic.canClimbLedges], "Ultra Boots"]],
					},
				},
			},
			"Life Shroom": {
				row: 5,
				col: 8,
				checks: {
					"[Coin Block] ? Block in middle of room": {
						reqs: logic.canBreakGroundBlocks,
					},
					"Hidden block directly above other ? Block": {
						reqs: "Boots",
					},
					"[Foliage Coin] Bottom tree": {
						reqs: logic.canShakeTree,
					},
				},
			},
			"Before Oasis": {
				row: 6,
				col: 7,
				checks: {
					"Item behind bush on right side of room": {
						reqs: null,
					},
					"[Foliage Coin] Tree": {
						reqs: logic.canShakeTree,
					},
					"[Multicoin Block] Block near tree": {
						reqs: logic.canBreakBlocksAbove,
					},
				},
			},
			Oasis: {
				row: 6,
				col: 8,
				checks: {
					"Lemon Tree": {
						reqs: logic.canShakeTree,
					},
					"Lime Tree": {
						reqs: logic.canShakeTree,
					},
					"[Foliage Coin] Far left tree": {
						reqs: logic.canShakeTree,
					},
					"[Foliage Coin] Bottom right tree": {
						reqs: logic.canShakeTree,
					},
					"[Upgrade] Super Block": {
						reqs: logic.canBreakBlocksAbove,
					},
				},
			},
			"Attack FX C": {
				row: 7,
				col: 3,
				checks: {
					"Hidden block in middle of room": {
						reqs: [logic.canClimbLedges, logic.canBreakBlocksAbove],
					},
				},
			},
			"Six Multicoin Blocks": {
				row: 7,
				col: 8,
				checks: {
					"[Foliage Coin] Far right tree": {
						reqs: logic.canShakeTree,
					},
					"[Multicoin Block] Six Multicoin Blocks": {
						reqs: logic.canBreakBlocksAbove,
					},
				},
			},
		},
		blanks: [
			{ row: 1, col: 3 },
			{ row: 1, col: 5 },
			{ row: 1, col: 6 },
			{ row: 2, col: 3 },
			{ row: 2, col: 4 },
			{ row: 2, col: 5 },
			{ row: 2, col: 7 },
			{ row: 2, col: 8 },
			{ row: 3, col: 3 },
			{ row: 3, col: 5 },
			{ row: 4, col: 3 },
			{ row: 4, col: 4 },
			{ row: 5, col: 3 },
			{ row: 5, col: 4 },
			{ row: 5, col: 6 },
			{ row: 6, col: 2 },
			{ row: 6, col: 3 },
			{ row: 6, col: 5 },
			{ row: 6, col: 6 },
			{ row: 7, col: 2 },
			{ row: 7, col: 4 },
			{ row: 7, col: 5 },
			{ row: 7, col: 7 },
		],
	},
	"Dry Dry Ruins": {
		reqs: [logic.desertAccess, "Pulse Stone"],
		areas: {
			"Pokey Hall": {
				row: 1,
				col: 3,
				rowSpan: 2,
				checks: {
					"Inside middle coffin": {
						reqs: null,
					},
				},
			},
			"Sand Switch Room 1": {
				row: 1,
				col: 4,
				checks: {},
			},
			"Sand Switch Room 2": {
				row: 1,
				col: 6,
				checks: {
					"Bottom right corner after lowering sand": {
						reqs: [logic.canClimbLedges, "Bombette", "Parakarry", "Ruins Key"],
					},
				},
			},
			"West Hub": { row: 3, col: 3, rowSpan: 2, checks: {} },
			"East Hub": { row: 1, col: 5, rowSpan: 3, checks: {} },
			"Ruins Entrance": { row: 2, col: 2, checks: {} },
			"Sand Room": {
				row: 2,
				col: 4,
				checks: {
					"Item on elevated platform": {
						reqs: logic.canClimbLedges,
					},
				},
			},
			"Key Room": {
				row: 2,
				col: 6,
				checks: {
					"Item on elevated platform": {
						reqs: [logic.canClimbLedges, "Bombette", "Parakarry", "Ruins Key"],
					},
				},
			},
			"Super Hammer Room": {
				row: 3,
				col: 2,
				checks: {
					"Item in chest behind wall on ledge above Super Hammer chest": {
						reqs: ["Parakarry", logic.multipleItemCheck("Ruins Key", 3)],
					},
					"Super Hammer chest": {
						reqs: ["Parakarry", logic.multipleItemCheck("Ruins Key", 3)],
					},
				},
			},
			"Pokey Room": {
				row: 3,
				col: 4,
				checks: {
					"Defeat all three Pokey's after hitting ? Block": {
						reqs: [
							logic.canClimbLedges,
							logic.multipleItemCheck("Ruins Key", 2),
						],
					},
					"On ledge behind hammer block": {
						reqs: [
							logic.canClimbLedges,
							logic.canBreakRuinsBlocks,
							logic.multipleItemCheck("Ruins Key", 2),
						],
					},
				},
			},
			"Chomp Room 2": {
				row: 3,
				col: 6,
				checks: {
					"Item on pedestal": {
						reqs: [
							logic.canClimbLedges,
							logic.canBreakRuinsBlocks,
							"Ruins Key",
						],
					},
				},
			},
			"Chomp Room 3": {
				row: 5,
				col: 7,
				checks: {
					"Item on pedestal": {
						reqs: [
							logic.canBreakRuinsBlocks,
							logic.multipleItemCheck("Ruins Key", 4),
						],
					},
				},
			},
			"Chomp Room 1": {
				row: 7,
				col: 1,
				checks: {
					"Item on pedestal": {
						reqs: [
							"Bombette",
							logic.canClimbLedges,
							logic.canBreakRuinsBlocks,
							logic.multipleItemCheck("Ruins Key", 3),
						],
					},
				},
			},
			"Ruins Spring Room": {
				row: 4,
				col: 2,
				rowSpan: 4,
				checks: {
					"[Upgrade] Super Block": {
						reqs: [
							"Bombette",
							logic.canClimbLedges,
							logic.canBreakBlocksAbove,
							logic.multipleItemCheck("Ruins Key", 3),
						],
					},
				},
			},
			"Puzzle Room": { row: 4, col: 4, rowSpan: 2, colSpan: 2, checks: {} },
			"Puzzle Solution Room": { row: 4, col: 6, checks: {} },
			"Wall Stairs": {
				row: 5,
				col: 6,
				rowSpan: 3,
				checks: {
					"Item on ledge, reachable by breaking block and hitting switch": {
						reqs: [
							logic.canClimbLedges,
							logic.canBreakRuinsBlocks,
							logic.multipleItemCheck("Ruins Key", 3),
						],
					},
				},
			},
			"Heart Block": { row: 6, col: 4, checks: {} },
			"Boss Room": {
				row: 6,
				col: 5,
				checks: {
					Mamar: {
						reqs: chapterRewardReqs.Mamar,
					},
				},
			},
			"Beetle Room": { row: 7, col: 3, colSpan: 3, checks: {} },
		},
	},
	"Forever Forest": {
		reqs: [logic.canReachToadTown, [logic.forestOpen, "Forest Pass"]],
		areas: {
			"HP Plus": {
				row: 1,
				col: 5,
				checks: { "? Block": { reqs: null } },
			},
			"Oaklie Room": { row: 1, col: 7, checks: {} },
			"Forest Room 2": { row: 1, col: 9, checks: {} },
			"Forest Room 5": { row: 3, col: 5, checks: {} },
			"Forest Seed Room": {
				row: 3,
				col: 7,
				checks: { "Bub-ulb": { reqs: null } },
			},
			"Forest Entrance": { row: 3, col: 9, checks: {} },
			"FP Plus": {
				row: 5,
				col: 1,
				checks: { "? Block": { reqs: null } },
			},
			"Forest Room 7": { row: 5, col: 3, checks: {} },
			"Forest Room 6": { row: 5, col: 5, checks: {} },
		},
		labels: [
			{ row: 3, col: 3, content: "Boo's Mansion" },
			{ row: 5, col: 9, content: "Toad Town" },
			{ row: 1, col: 8, content: "◀" },
			{ row: 2, col: 5, content: "▲" },
			{ row: 2, col: 7, content: "▼" },
			{ row: 2, col: 9, content: "▲" },
			{ row: 3, col: 6, content: "◀" },
			{ row: 4, col: 3, content: "▲" },
			{ row: 4, col: 5, content: "▼" },
			{ row: 4, col: 9, content: "▲" },
			{ row: 5, col: 2, content: "◀" },
			{ row: 5, col: 4, content: "◀" },
		],
	},
	"Boo's Mansion": {
		reqs: [
			logic.canReachToadTown,
			[
				logic.forestOpen,
				"Forest Pass",
				"Super Boots",
				[[logic.blueHouseOpen, "Odd Key"], "Bombette", "Sushie", "Boots"],
			],
		],
		areas: {
			"Bow's Room": {
				row: 1,
				col: 1,
				colSpan: 4,
				checks: { Bow: { reqs: ["Boots", "Boo's Portrait"] } },
			},
			"Weight Room": {
				row: 2,
				col: 1,
				checks: { "Chest guarded by Boo": { reqs: ["Boots", "Record"] } },
			},
			"Main Room": {
				row: 2,
				col: 2,
				rowSpan: 2,
				colSpan: 2,
				checks: {
					"[Panel] By couch": {
						reqs: ["Boots", logic.canFlipPanel],
					},
					"[Letter] Franky (Chain)": {
						reqs: [
							"Boots",
							"Franky (Boo's Mansion Entrance)",
							"Boo's Portrait",
							"Parakarry",
						],
					},
					"[Koot] Talk to Franky after Koopa Koot requests the Old Photo": {
						reqs: [
							"Boots",
							4,
							"Koopa Legends",
							"Sleepy Sheep",
							"Tape",
							"Koopa Tea",
							"Luigi's Autograph",
							"Wallet",
							"Tasty Tonic",
							"Merluvlee's Autograph",
							"Life Shroom",
							"Nutty Cake",
							"Eldstar",
							"Bombette",
						],
					},
				},
			},
			"Record Room": {
				row: 2,
				col: 4,
				checks: {
					"[Panel] Middle of room": {
						reqs: ["Boots", logic.canFlipPanel],
					},
					"Open middle cabinets and do minigame": { reqs: "Boots" },
				},
			},
			"Trap Chest": {
				row: 3,
				col: 1,
				rowSpan: 3,
				checks: {
					"[Panel] In front of grandfather clock downstairs": {
						reqs: [
							"Boots",
							["Weight", ["Super Boots", "Bombette"]],
							logic.canFlipPanel,
						],
					},
				},
			},
			"Pixel Mario Room": {
				row: 3,
				col: 4,
				rowSpan: 2,
				checks: {
					"Left crate on right side of room": {
						reqs: "Super Boots",
					},
					"Right crate on right side of room under other crate": {
						reqs: "Super Boots",
					},
				},
			},
			"Outside Boo's Mansion": {
				row: 4,
				col: 2,
				colSpan: 2,
				checks: {
					"? Block before gate": { reqs: logic.canBreakBlocksAbove },
					"Right bush before Gusty Gulch": { reqs: null },
				},
			},
			Library: {
				row: 5,
				col: 2,
				colSpan: 3,
				checks: {
					"Item on right bookshelf": {
						reqs: ["Super Boots", "Parakarry"],
					},
					"Bottom crate": { reqs: "Super Boots" },
				},
			},
			"Above Shop": {
				row: 6,
				col: 1,
				checks: {
					"Right crate on left side of room": {
						reqs: ["Super Boots", ["Weight", "Bombette"]],
					},
				},
			},
			"Super Boots Room": {
				row: 6,
				col: 2,
				checks: {
					"Super Boots chest": {
						reqs: ["Boots", ["Weight", ["Super Boots", "Bombette"]]],
					},
					"[Panel] On left near Boo": {
						reqs: [
							"Boots",
							logic.canFlipPanel,
							["Weight", ["Super Boots", "Bombette"]],
						],
					},
					"Bottom left crate": {
						reqs: ["Super Boots", ["Weight", "Bombette"]],
					},
				},
			},
			Shop: {
				row: 7,
				col: 1,
				colSpan: 2,
				checks: {
					"[Shop] 6 items in Shop": {
						reqs: ["Super Boots", ["Weight", "Bombette"], "Boo's Portrait"],
					},
					"[Letter] Igor": {
						reqs: [
							"Super Boots",
							["Weight", "Bombette"],
							"Igor (Boo's Mansion Shop)",
							"Parakarry",
						],
					},
				},
			},
		},
	},
	"Gusty Gulch": {
		reqs: [
			logic.canReachToadTown,
			[[logic.forestOpen, "Forest Pass"], "Super Boots"],
			"Boots",
			"Boo's Portrait",
		],
		areas: {
			Gate: {
				row: 1,
				col: 1,
				checks: {
					"[Panel] Near gate": {
						reqs: logic.canFlipPanel,
					},
				},
			},
			Windmill: {
				row: 1,
				col: 2,
				checks: {
					Skolar: {
						reqs: chapterRewardReqs.Skolar,
					},
				},
			},
			"Village 1": {
				row: 1,
				col: 3,
				checks: {
					"[Coin Block] Block in far right house": {
						reqs: null,
					},
					"[Koot] Talk to Boo near Save Block after Koopa Koot requests a Package":
						{
							reqs: [
								5,
								"Koopa Legends",
								"Sleepy Sheep",
								"Tape",
								"Koopa Tea",
								"Luigi's Autograph",
								"Wallet",
								"Tasty Tonic",
								"Merluvlee's Autograph",
								"Life Shroom",
								"Nutty Cake",
								"Eldstar",
								"Bombette",
								"Old Photo",
								"Koopasta",
								"Glasses",
								"Lime",
								"Kooky Cookie",
							],
						},
				},
			},
			"Village 2": { row: 1, col: 4, checks: {} },
			"Gulch 1": {
				row: 1,
				col: 5,
				checks: {
					"[Coin Block] First ? Block": {
						reqs: null,
					},
					"[Coin Block] Upper ? Block near goomba": {
						reqs: null,
					},
					"Item on ledge (use Kooper)": {
						reqs: "Kooper",
					},
					"? Block in middle near goomba": {
						reqs: null,
					},
					"Item in front of log": { reqs: null },
				},
			},
			"Gulch 2": {
				row: 1,
				col: 6,
				checks: {
					"[Coin Block] ? Block by exit": {
						reqs: "Parakarry",
					},
					"? Block by Goomba": {
						reqs: "Parakarry",
					},
					"Item behind rock near exit": {
						reqs: "Parakarry",
					},
					"[Multicoin Block] Near exit": {
						reqs: "Parakarry",
					},
				},
			},
			"Outside Tubba's Castle": { row: 1, col: 7, checks: {} },
		},
	},
	"Tubba's Castle": {
		reqs: [
			logic.canReachToadTown,
			[[logic.forestOpen, "Forest Pass"], "Super Boots"],
			"Boots",
			"Boo's Portrait",
			"Parakarry",
		],
		areas: {
			"Sleeping Clubba's": {
				row: 1,
				col: 3,
				checks: {
					"Item at end of hall": {
						reqs: logic.multipleItemCheck("Tubba Castle Key", 2),
					},
				},
			},
			"Stairwell 1": {
				row: 6,
				col: 1,
				rowSpan: 2,
				checks: { "[Upgrade] Super Block": { reqs: null } },
			},
			"Stairwell 3": {
				row: 2,
				col: 1,
				rowSpan: 3,
				checks: {
					"? Block at bottom of staircase": {
						reqs: logic.multipleItemCheck("Tubba Castle Key", 2),
					},
				},
			},
			"Tubba Chase Room": { row: 2, col: 2, colSpan: 2, checks: {} },
			"Castle Save Block": { row: 2, col: 4, checks: {} },
			"Main Hall": { row: 2, col: 5, rowSpan: 5, checks: {} },
			"Tubba's Bedroom": { row: 2, col: 6, checks: {} },
			"Behind Clock": {
				row: 3,
				col: 2,
				checks: {
					"[Coinsanity] 6 items on bed": {
						reqs: "Tubba Castle Key",
					},
					"Behind wall on shelf at left side of room": {
						reqs: "Tubba Castle Key",
					},
				},
			},
			"Spike Room": {
				row: 3,
				col: 3,
				checks: {
					Chest: {
						reqs: ["Tubba Castle Key", ["Bow", "Lakilester"]],
					},
				},
			},
			"Floor Panel Room": { row: 3, col: 4, checks: {} },
			"Above Table": { row: 4, col: 2, checks: {} },
			"Left Hall 1": { row: 6, col: 3, colSpan: 2, checks: {} },
			"Left Hall 2": { row: 4, col: 3, colSpan: 2, checks: {} },
			"Right Hall / Stairwell": { row: 4, col: 6, rowSpan: 3, checks: {} },
			Study: {
				row: 5,
				col: 3,
				checks: {
					"On table": { reqs: null },
				},
			},
			"Spring Room": {
				row: 5,
				col: 4,
				checks: {
					"On left side, break panels in room above behind bombable wall": {
						reqs: ["Tubba Castle Key", "Bombette", "Super Boots"],
					},
				},
			},
			Table: {
				row: 6,
				col: 2,
				checks: {
					"On table, fall down from above": {
						reqs: "Tubba Castle Key",
					},
				},
			},
			"Basement Chest": {
				row: 7,
				col: 2,
				checks: {
					Chest: {
						reqs: "Super Boots",
					},
				},
			},
		},
	},
	"Shy Guy's Toybox": {
		reqs: [logic.canReachToadTown, logic.toyboxAccess],
		areas: {
			Playroom: {
				row: 1,
				col: 1,
				checks: {
					"Left hidden block": { reqs: logic.canBreakBlocksAbove },
					"Right hidden block": { reqs: logic.canBreakBlocksAbove },
					"Items held by Shy Guys (all of them)": {
						reqs: null,
					},
				},
			},
			"Anti Guy": {
				row: 1,
				col: 2,
				checks: {
					"[Coin Block] ? Block on left side": {
						reqs: logic.canBreakBlocksAbove,
					},
					"Anti Guy Chest (in logic if you can make a Lemon Candy [Lemon + Cake Mix])":
						{
							reqs: null,
						},
					"Hidden block on right side": {
						reqs: logic.canBreakBlocksAbove,
					},
				},
			},
			"Blue Station": {
				row: 1,
				col: 3,
				checks: {
					"[Panel] In front of station": {
						reqs: logic.canFlipPanel,
					},
					"Hidden block on right side": {
						reqs: logic.canBreakBlocksAbove,
					},
				},
			},
			"Block City": {
				row: 1,
				col: 4,
				checks: {
					"[Coinsanity] 3 items on left spring": {
						reqs: ["Boots", ["Hammer", "Super Boots"]],
					},
					"[Coinsanity] 5 items on elevated spring": {
						reqs: ["Boots", ["Hammer", "Super Boots"]],
					},
					"[Coin Block] ? Block on left side of wall": {
						reqs: ["Boots", ["Hammer", "Super Boots"]],
					},
					"[Coin Block] ? Block on right side of wall that can be jumped across":
						{
							reqs: ["Boots", ["Hammer", "Super Boots"]],
						},
					"Item behind fallen blocks": {
						reqs: ["Boots", ["Hammer", "Super Boots"]],
					},
					"Item on roof of left house": {
						reqs: ["Boots", ["Hammer", "Super Boots"], "Parakarry"],
					},
					"? Block on platform": {
						reqs: ["Boots", ["Hammer", "Super Boots"]],
					},
					"Item that Kammy spawns": {
						reqs: ["Boots", ["Hammer", "Super Boots"]],
					},
					Chest: {
						reqs: ["Boots", ["Hammer", "Super Boots"]],
					},
				},
			},
			"Gourmet Guy": {
				row: 2,
				col: 1,
				checks: {
					"[Coin Block] Left ? Block": {
						reqs: [logic.canMoveStations, "Cake"],
					},
					"[Coin Block] Right ? Block": {
						reqs: [logic.canMoveStations, "Cake"],
					},
					"Give Cake to Gourmet Guy": {
						reqs: [logic.canMoveStations, "Cake"],
					},
					"Hidden block left after Gourmet Guy arch": {
						reqs: [logic.canMoveStations, "Cake"],
					},
					"Hidden block between two other ? Blocks": {
						reqs: [logic.canMoveStations, "Cake"],
					},
				},
			},
			"Tracks Hallway": {
				row: 2,
				col: 2,
				checks: {
					"[Coin Block] ? Block before Spy Guy": {
						reqs: logic.canMoveStations,
					},
					"[Coin Block] Left ? Block by Groove Guy": {
						reqs: [logic.canMoveStations, "Cake"],
					},
					"[Coin Block] Right ? Block by Groove Guy": {
						reqs: [logic.canMoveStations, "Cake"],
					},
					"[Multicoin Block] Between two ? Blocks": {
						reqs: [logic.canMoveStations, "Cake"],
					},
				},
			},
			"Pink Station": {
				row: 2,
				col: 3,
				checks: {
					"[Panel] In front of station": {
						reqs: [logic.canMoveStations, logic.canFlipPanel],
					},
					"Chest on right side": {
						reqs: logic.canMoveStations,
					},
					"Hidden block by pink switch": {
						reqs: [logic.canMoveStations, "Cake"],
					},
				},
			},
			Playhouse: {
				row: 2,
				col: 4,
				checks: {
					"[Coin Block] ? Block": {
						reqs: [logic.canMoveStations, ["Hammer", "Super Boots"]],
					},
					"Chest on wall": {
						reqs: [logic.canMoveStations, ["Hammer", "Super Boots"]],
					},
					"Chest after door": {
						reqs: [logic.canMoveStations, ["Hammer", "Super Boots"]],
					},
					"Item that Kammy spawns": {
						reqs: [logic.canMoveStations, ["Hammer", "Super Boots"]],
					},
					"Chest at end of room": {
						reqs: [logic.canMoveStations, ["Hammer", "Super Boots"]],
					},
				},
			},
			"Green Station": {
				row: 3,
				col: 3,
				checks: {
					"[Panel] In front of station": {
						reqs: [logic.canMoveStations, "Cake", logic.canFlipPanel],
					},
					"Hidden block in upper right corner": {
						reqs: [logic.canMoveStations, "Cake"],
					},
				},
			},
			Treadmill: {
				row: 3,
				col: 4,
				checks: {
					"[Coinsanity] 3 items on first treadmill": {
						reqs: [logic.canMoveStations, "Cake"],
					},
					"[Coinsanity] 3 items on second treadmill": {
						reqs: [logic.canMoveStations, "Cake"],
					},
					"[Coinsanity] Ring of coins inside fort after moving blocks": {
						reqs: ["Bow", logic.canMoveStations, "Cake"],
					},
					"Item held by Shy Guy after treadmills": {
						reqs: ["Bow", logic.canMoveStations, "Cake"],
					},
					"[Multicoin Block] On pink moving platform": {
						reqs: ["Bow", logic.canMoveStations, "Cake", "Parakarry"],
					},
					"Middle item inside fort after moving blocks": {
						reqs: ["Bow", logic.canMoveStations, "Cake"],
					},
					"Item that Kammy spawns": {
						reqs: ["Bow", logic.canMoveStations, "Cake", "Parakarry"],
					},
					Chest: { reqs: ["Bow", logic.canMoveStations, "Cake", "Parakarry"] },
				},
			},
			"Lantern Ghost": {
				row: 4,
				col: 1,
				checks: {
					Watt: {
						reqs: [logic.canMoveStations, "Cake", "Hammer"],
					},
				},
			},
			"Toybox Moving Platforms": {
				row: 4,
				col: 2,
				checks: {
					"[Coin Block] Left ? Block": {
						reqs: [logic.canMoveStations, "Cake", "Hammer"],
					},
					"[Coin Block] Right ? Block": {
						reqs: [logic.canMoveStations, "Cake", "Hammer"],
					},
					"Hidden block by first elevator": {
						reqs: [logic.canMoveStations, "Cake", "Hammer"],
					},
					"Hidden block between two other ? blocks": {
						reqs: [logic.canMoveStations, "Cake", "Hammer"],
					},
					"Hidden block by door to Lantern Ghost room": {
						reqs: [logic.canMoveStations, "Cake", "Hammer"],
					},
					"[Upgrade] Super Block": {
						reqs: [logic.canMoveStations, "Cake", "Hammer"],
					},
					"[Multicoin Block] On top of wheel": {
						reqs: [logic.canMoveStations, "Cake", "Hammer"],
					},
				},
			},
			"Red Station": {
				row: 4,
				col: 3,
				checks: {
					"[Panel] In front of station": {
						reqs: [logic.canMoveStations, "Cake", "Hammer", logic.canFlipPanel],
					},
					"Hidden block on left side": {
						reqs: [logic.canMoveStations, "Cake", "Hammer"],
					},
				},
			},
			"Shy Guy Barricade": {
				row: 4,
				col: 4,
				checks: {
					"[Coin Block] ? Block just past barricade": {
						reqs: [logic.canMoveStations, "Cake", "Bombette", "Hammer"],
					},
					"Item on top of brick block": {
						reqs: [
							logic.canMoveStations,
							"Cake",
							"Bombette",
							"Hammer",
							["Kooper", "Ultra Boots"],
						],
					},
					"? Block at end of room": {
						reqs: [logic.canMoveStations, "Cake", "Bombette", "Hammer"],
					},
				},
			},
			"Dark Room": { row: 4, col: 5, checks: {} },
			"General Guy": {
				row: 4,
				col: 6,
				checks: {
					Muskular: {
						reqs: chapterRewardReqs.Muskular,
					},
				},
			},
		},
	},
	"Yoshi's Island": {
		reqs: [
			[
				logic.startingLocation("Yoshi Village"),
				[logic.canReachToadTown, ["Watt", logic.whaleOpen]],
				[
					logic.canReachToadTown,
					"Boots",
					[
						["Super Boots", "Sushie"],
						[[logic.blueHouseOpen, "Odd Key"], "Bombette"],
					],
				],
			],
		],
		areas: {
			"Ambush Room": {
				row: 1,
				col: 3,
				colSpan: 3,
				checks: {
					"[Panel] Near middle of room": {
						reqs: [
							"Sushie",
							"Hammer",
							"Jade Raven",
							logic.canFlipPanel,
							"Boots",
						],
					},
					"[Foliage Coin] Far right tree": {
						reqs: ["Sushie", "Hammer", "Jade Raven", "Boots"],
					},
				},
			},
			"Raph's Tree": {
				row: 1,
				col: 6,
				rowSpan: 6,
				checks: {
					"Item on the outside Raph's Tree": {
						reqs: ["Sushie", "Hammer", "Jade Raven", "Boots"],
					},
					"Talk to Raphael at the top": {
						reqs: ["Sushie", "Hammer", "Jade Raven", "Boots"],
					},
				},
			},
			"Vine Room": {
				row: 2,
				col: 3,
				checks: {
					"Second Tree vine": {
						reqs: ["Sushie", "Hammer", "Jade Raven", "Boots"],
					},
					"Last Tree vine": {
						reqs: ["Sushie", "Hammer", "Jade Raven", "Boots"],
					},
				},
			},
			"Block Puzzle": {
				row: 3,
				col: 3,
				checks: {
					"[Foliage Coin] Far left tree": {
						reqs: ["Sushie", "Hammer", "Jade Raven"],
					},
					"Hidden block near first push block": {
						reqs: [
							"Sushie",
							"Hammer",
							"Jade Raven",
							logic.canClimbLedges,
							logic.canBreakBlocksAbove,
						],
					},
				},
			},
			"Deep Jungle": {
				row: 4,
				col: 3,
				checks: {
					"Hidden block near bell plant": {
						reqs: [
							"Sushie",
							"Hammer",
							"Jade Raven",
							logic.canClimbLedges,
							logic.canBreakBlocksAbove,
						],
					},
					"Tree vine near bell plant": {
						reqs: ["Sushie", "Hammer", "Jade Raven", "Boots"],
					},
					"[Foliage Coin] Tree near bell plant": {
						reqs: ["Sushie", "Hammer", "Jade Raven", logic.canClimbLedges],
					},
				},
			},
			"Light-Blue Yoshi": {
				row: 5,
				col: 1,
				checks: {
					"Item under water": {
						reqs: "Sushie",
					},
				},
			},
			"NW Jungle": {
				row: 5,
				col: 2,
				checks: {
					"Item in tree by right side exit": {
						reqs: ["Sushie", logic.canShakeTree],
					},
					"[Foliage Coin] Tree on ledge": {
						reqs: ["Sushie", logic.canClimbLedges, logic.canShakeTree],
					},
					"[Foliage Coin] Second bush from right": {
						reqs: "Sushie",
					},
					"[Foliage Coin] Second bush from left": {
						reqs: "Sushie",
					},
				},
			},
			"NE Jungle": {
				row: 5,
				col: 3,
				checks: {
					"[Coinsanity] Item under water on right side of room": {
						reqs: ["Sushie", "Hammer"],
					},
					"[Foliage Coin] Tree near raven statue": {
						reqs: ["Sushie", "Hammer"],
					},
				},
			},
			"Yellow Yoshi": {
				row: 5,
				col: 4,
				checks: {
					"[Foliage Coin] Tree": {
						reqs: ["Sushie", "Hammer"],
					},
				},
			},
			Whale: {
				row: 6,
				col: 1,
				rowSpan: 2,
				checks: {
					"[Coinsanity] 2 items on spinning flower": {
						reqs: logic.canClimbLedges,
					},
					"Coconut tree": {
						reqs: logic.canShakeTree,
					},
					"Item behind bush near top of screen": {
						reqs: null,
					},
				},
			},
			"SW Jungle": {
				row: 6,
				col: 2,
				checks: {
					"[Coinsanity] Three items under water": {
						reqs: "Sushie",
					},
					"Hidden block near exit to NW Jungle": {
						reqs: ["Sushie", logic.canBreakBlocksAbove],
					},
					"[Foliage Coin] Tree near north exit": {
						reqs: ["Sushie", logic.canShakeTree],
					},
					"[Foliage Coin] Tree near Spear Guy": {
						reqs: ["Sushie", logic.canShakeTree],
					},
					"[Foliage Coin] Right bush near north exit": {
						reqs: "Sushie",
					},
					"[Foliage Coin] Bottom bush on left side": {
						reqs: "Sushie",
					},
					"[Upgrade] Super Block": {
						reqs: ["Sushie", logic.canBreakBlocksAbove],
					},
				},
			},
			"SE Jungle": {
				row: 6,
				col: 3,
				colSpan: 2,
				checks: {
					"? Block on island": {
						reqs: ["Sushie", logic.canBreakBlocksAbove],
					},
					"[Foliage Coin] Far right tree": {
						reqs: logic.canShakeTree,
					},
					"[Foliage Coin] Bottom left bush": {
						reqs: ["Sushie", "Hammer"],
					},
					"[Foliage Coin] Bottom right bush": {
						reqs: null,
					},
				},
			},
			"Sushie Room": {
				row: 6,
				col: 5,
				checks: {
					Sushie: {
						reqs: "Hammer",
					},
					"Item on top right island": {
						reqs: "Sushie",
					},
					"Item in tree on top right island": {
						reqs: "Sushie",
					},
					"Chest after saving Misstar": {
						reqs: "Misstar",
					},
				},
			},
			Beach: {
				row: 7,
				col: 2,
				checks: {
					"[Coinsanity] 2 items on spinning flower": {
						reqs: logic.canClimbLedges,
					},
					"Coconut tree 1 (far left)": {
						reqs: logic.canShakeTree,
					},
					"Coconut tree 2": {
						reqs: logic.canShakeTree,
					},
					"Hidden block by bell plant": {
						reqs: logic.canBreakBlocksAbove,
					},
					"Coconut tree 3": {
						reqs: logic.canShakeTree,
					},
					"Item on rock formation": {
						reqs: logic.canClimbLedges,
					},
					"Coconut tree 4": {
						reqs: logic.canShakeTree,
					},
					"Coconut tree 5": {
						reqs: logic.canShakeTree,
					},
					"Coconut tree 6 (last tree, 2 items)": {
						reqs: logic.canShakeTree,
					},
				},
			},
			"West Village": {
				row: 7,
				col: 3,
				checks: {
					"[Panel] In front of raven statue": {
						reqs: logic.canFlipPanel,
					},
					"Talk to Yoshi Chief after saving all the kids": {
						reqs: ["Watt", "Sushie", "Hammer"],
					},
					"Left Coconut tree": {
						reqs: logic.canShakeTree,
					},
					"Right Coconut tree": {
						reqs: logic.canShakeTree,
					},
				},
			},
			"East Village": {
				row: 7,
				col: 4,
				colSpan: 2,
				checks: {
					"[Shop] 6 items in Shop": {
						reqs: null,
					},
					"[Letter] Red Yoshi Kid (Chain)": {
						reqs: ["Red Yoshi Kid", "Parakarry"],
					},
					"Give a Tayce T. item to Yellow Adult Yoshi": {
						reqs: ["Watt", "Sushie", "Misstar", "Hammer"],
					},
					"Give the volcano vase to Kolorado": {
						reqs: ["Watt", "Sushie", "Volcano Vase", "Misstar", "Hammer"],
					},
					"Coconut tree on right side of room": {
						reqs: logic.canShakeTree,
					},
				},
			},
			"Outside Volcano": {
				row: 7,
				col: 6,
				checks: {
					"Item behind large tree": {
						reqs: null,
					},
				},
			},
		},
	},
	"Mt. Lavalava": {
		reqs: [
			[
				logic.startingLocation("Yoshi Village"),
				[logic.canReachToadTown, ["Watt", logic.whaleOpen]],
				[
					logic.canReachToadTown,
					"Boots",
					[
						["Super Boots", "Sushie"],
						[[logic.blueHouseOpen, "Odd Key"], "Bombette"],
					],
				],
			],
			"Sushie",
			"Jade Raven",
			"Hammer",
			logic.canClimbLedges,
		],
		areas: {
			"Mt. Lavalava Entrance": { row: 1, col: 2, checks: {} },
			"Sinking Platforms": { row: 1, col: 3, checks: {} },
			"Hub Room": {
				row: 1,
				col: 4,
				rowSpan: 3,
				checks: {
					"[Coin Block] ? Block 1": {
						reqs: logic.canBreakBlocksAbove,
					},
					"[Coin Block] ? Block 2": {
						reqs: logic.canBreakBlocksAbove,
					},
					"[Coin Block] ? Block 3": {
						reqs: logic.canBreakBlocksAbove,
					},
					"[Coin Block] ? Block 4": {
						reqs: logic.canBreakBlocksAbove,
					},
					"Item on top of brick block": {
						reqs: ["Ultra Boots", ["Boots", "Kooper"]],
					},
					"Item on platform halfway down second zip line": {
						reqs: "Boots",
					},
				},
			},
			"Firebars + Upgrade": {
				row: 1,
				col: 5,
				checks: {
					"[Upgrade] Super Block": {
						reqs: "Boots",
					},
				},
			},
			Zipline: {
				row: 2,
				col: 5,
				rowSpan: 2,
				checks: {
					"[Panel] Right side of lower level": {
						reqs: logic.canFlipPanel,
					},
					"[Upgrade] Super Block": {
						reqs: ["Boots", logic.canBreakVolcanoBlocks],
					},
				},
			},
			"Spike Ball Chase": { row: 2, col: 6, checks: {} },
			"Moving Platforms": { row: 2, col: 7, checks: {} },
			"Spike Ball Wall Break": { row: 2, col: 8, checks: {} },
			"Volcano Save Block": {
				row: 2,
				col: 9,
				rowSpan: 2,
				checks: {
					"[Panel] Left of heart block": {
						reqs: [logic.canBreakVolcanoBlocks, "Boots", logic.canFlipPanel],
					},
				},
			},
			Deadend: {
				row: 2,
				col: 10,
				checks: {
					"Left ? Block": {
						reqs: [logic.canBreakVolcanoBlocks, "Boots"],
					},
					"Right ? Block": {
						reqs: [logic.canBreakVolcanoBlocks, "Boots"],
					},
				},
			},
			"Ultra Hammer Room": {
				row: 3,
				col: 1,
				checks: {
					"Ultra Hammer chest": {
						reqs: [["Parakarry", "Lakilester"]],
					},
				},
			},
			"Lava Puzzle": {
				row: 3,
				col: 2,
				rowSpan: 2,
				checks: {
					"Hidden block on right side of room": {
						reqs: logic.canBreakBlocksAbove,
					},
				},
			},
			"Slope Hallway": { row: 3, col: 3, checks: {} },
			"Lava Piranha": {
				row: 3,
				col: 10,
				checks: {
					Misstar: {
						reqs: chapterRewardReqs.Misstar,
					},
				},
			},
			"Dizzy Stomp": {
				row: 4,
				col: 3,
				checks: {
					Chest: {
						reqs: [logic.canBreakVolcanoBlocks, ["Parakarry", "Lakilester"]],
					},
				},
			},
		},
	},
	"Flower Fields": {
		reqs: [logic.canReachToadTown, logic.chapter6Entry],
		areas: {
			"In The Clouds": {
				row: 1,
				col: 4,
				checks: {
					"Ride cloud elevator up to item": {
						reqs: [
							"Lakilester",
							"Super Boots",
							"Hammer",
							"Magical Bean",
							"Fertile Soil",
							"Miracle Water",
						],
					},
				},
			},
			"Huff n Puff": {
				row: 1,
				col: 5,
				checks: {
					Klevar: {
						reqs: chapterRewardReqs.Klevar,
					},
				},
			},
			"Sun Tower": { row: 2, col: 1, checks: {} },
			Lakilester: {
				row: 2,
				col: 2,
				checks: {
					Lakilester: {
						reqs: [["Lakilester", "Bubble Berry"], "Bombette"],
					},
					"Item in grass": {
						reqs: [["Lakilester", "Bubble Berry"]],
					},
					"Item in crevasse": {
						reqs: [["Lakilester", "Bubble Berry"], "Bombette"],
					},
				},
			},
			"Bubble Plant": {
				row: 2,
				col: 3,
				checks: {
					"Item on ledge": {
						reqs: [["Lakilester", "Bubble Berry"]],
					},
					"Item in vines immediately below ledge item": {
						reqs: null,
					},
				},
			},
			"Fields Tree": { row: 2, col: 4, rowSpan: 3, checks: {} },
			Elevators: {
				row: 2,
				col: 5,
				checks: {
					"Item in second vine (jump to trigger it)": {
						reqs: "Boots",
					},
					"Item from ground pounding opposite side from partner upgrade block":
						{
							reqs: ["Lakilester", "Super Boots"],
						},
					"[Upgrade] Super Block": {
						reqs: ["Lakilester", "Super Boots"],
					},
				},
			},
			"Fallen Logs": {
				row: 2,
				col: 6,
				checks: {
					"Item in grass at bottom of screen": {
						reqs: ["Lakilester", "Super Boots"],
					},
					"? Block before cloud machine room": {
						reqs: ["Lakilester", "Super Boots"],
					},
				},
			},
			"Cloud Machine": { row: 2, col: 7, checks: {} },
			Rosie: {
				row: 3,
				col: 1,
				checks: {
					"Give Rosie the Crystal Berry": {
						reqs: ["Blue Berry", "Crystal Berry", "Boots"],
					},
				},
			},
			Maze: {
				row: 3,
				col: 2,
				checks: {
					"[Multicoin Block] Right of exit pipe": {
						reqs: ["Blue Berry", "Boots"],
					},
				},
			},
			"Blue Flower": {
				row: 3,
				col: 3,
				checks: {
					"[Coin Block] Hidden block between brick block and spring": {
						reqs: [logic.canBreakBlocksAbove, "Blue Berry"],
					},
					"Hidden block above brick block": {
						reqs: ["Boots", "Blue Berry"],
					},
				},
			},
			"Three Trees": {
				row: 3,
				col: 5,
				checks: {
					"Hit trees Middle, Right, Left": {
						reqs: logic.canShakeTree,
					},
					"Second set of vines": { reqs: null },
				},
			},
			Petunia: {
				row: 3,
				col: 6,
				checks: {
					"[Panel] Near bottom left corner of room directly above grass": {
						reqs: logic.canFlipPanel,
					},
					"2 items in tree": {
						reqs: logic.canShakeTree,
					},
					"Talk to Petunia and defeat all moles": {
						reqs: null,
					},
				},
			},
			Well: {
				row: 3,
				col: 7,
				checks: {
					"Give a blue berry to the well": {
						reqs: "Blue Berry",
					},
				},
			},
			Posie: {
				row: 4,
				col: 2,
				checks: {
					"2 items from Posie": {
						reqs: "Red Berry",
					},
				},
			},
			"Red Flower": {
				row: 4,
				col: 3,
				checks: {
					"[Panel] In front of tree": {
						reqs: ["Red Berry", logic.canFlipPanel],
					},
					"2 items in tree": {
						reqs: ["Red Berry", logic.canShakeTree],
					},
					"Item in middle vines": {
						reqs: "Red Berry",
					},
				},
			},
			"Yellow Flower": {
				row: 4,
				col: 5,
				checks: {
					"Vines next to yellow flower": {
						reqs: null,
					},
					"2 items in tree": {
						reqs: [
							"Yellow Berry",
							["Parakarry", "Lakilester"],
							logic.canShakeTree,
						],
					},
					"Item in grass right of tree": {
						reqs: ["Yellow Berry", ["Parakarry", "Lakilester"]],
					},
					"[Upgrade] Super Block": {
						reqs: [
							"Yellow Berry",
							["Parakarry", "Lakilester"],
							logic.canClimbLedges,
						],
					},
				},
			},
			"Bubble Berry Tree": {
				row: 4,
				col: 6,
				checks: {
					"[Panel] Under hidden block on right side": {
						reqs: [
							"Yellow Berry",
							["Parakarry", "Lakilester"],
							logic.canClimbLedges,
							logic.canFlipPanel,
						],
					},
					"? Block on left side": {
						reqs: [
							"Yellow Berry",
							["Parakarry", "Lakilester"],
							logic.canBreakBlocksAbove,
						],
					},
					"2 items in tree": {
						reqs: [
							"Yellow Berry",
							["Parakarry", "Lakilester"],
							logic.canClimbLedges,
							"Water Stone",
							"Sushie",
							logic.canShakeTree,
						],
					},
					"Hidden ? Block on right side": {
						reqs: [
							"Yellow Berry",
							["Parakarry", "Lakilester"],
							logic.canClimbLedges,
						],
					},
				},
			},
			Lily: {
				row: 4,
				col: 7,
				checks: {
					"Give Water Stone to Lily": {
						reqs: [
							"Yellow Berry",
							["Parakarry", "Lakilester"],
							logic.canClimbLedges,
							"Water Stone",
						],
					},
					"Item in tree": {
						reqs: [
							"Yellow Berry",
							["Parakarry", "Lakilester"],
							logic.canClimbLedges,
							logic.canShakeTree,
						],
					},
				},
			},
		},
	},
	"Shiver Region": {
		reqs: [
			logic.canReachToadTown,
			logic.canClimbLedges,
			[logic.shiverBridgeVisible, "Ultra Boots"],
			["Sushie", ["Odd Key", "Bombette"], [logic.blueHouseOpen, "Bombette"]],
		],
		areas: {
			"Ice Staircase": {
				row: 1,
				col: 5,
				checks: {
					"? Block up first set of stairs": {
						reqs: [
							"Warehouse Key",
							"Scarf",
							"Bucket",
							"Kooper",
							"Hammer",
							"Star Stone",
						],
					},
					"Item on ledge when falling down after second set of stairs": {
						reqs: [
							"Warehouse Key",
							"Scarf",
							"Bucket",
							"Kooper",
							"Hammer",
							"Star Stone",
						],
					},
				},
			},
			"Merlar's Sanctuary": {
				row: 1,
				col: 6,
				checks: {
					"Sacred item sealed away for centuries": {
						reqs: [
							"Warehouse Key",
							"Scarf",
							"Bucket",
							"Kooper",
							"Hammer",
							"Bombette",
						],
					},
				},
			},
			"Shiver Mountain Tunnel": {
				row: 2,
				col: 5,
				checks: {
					"Left pillar": {
						reqs: ["Warehouse Key", "Scarf", "Bucket", "Kooper", "Hammer"],
					},
					"Middle pillar": {
						reqs: ["Warehouse Key", "Scarf", "Bucket", "Kooper", "Hammer"],
					},
					"Right pillar": {
						reqs: ["Warehouse Key", "Scarf", "Bucket", "Kooper", "Hammer"],
					},
				},
			},
			"Shiver Mountain Hills": {
				row: 3,
				col: 5,
				checks: {
					"Item below Kooper switch": {
						reqs: ["Warehouse Key", "Scarf", "Bucket"],
					},
					"[Upgrade] Super Block": {
						reqs: ["Warehouse Key", "Scarf", "Bucket", "Kooper", "Hammer"],
					},
				},
			},
			"Shiver Mountain Passage": {
				row: 4,
				col: 5,
				checks: {
					"Ultra Boots block": {
						reqs: ["Warehouse Key", "Scarf", "Bucket", "Ultra Boots"],
					},
				},
			},
			"West Shiver City": {
				row: 5,
				col: 1,
				checks: {
					"[Panel] Next to the Mayor's house": {
						reqs: logic.canFlipPanel,
					},
					"[Letter] Mayor Penguin": {
						reqs: ["Mayor Penguin", "Parakarry"],
					},
					"Talk to Mayor after having met Merle": {
						reqs: "Warehouse Key",
					},
					"Chest in middle house": {
						reqs: null,
					},
				},
			},
			"Center Shiver City": {
				row: 5,
				col: 2,
				checks: {
					"[Shop] 6 items in Shop": {
						reqs: null,
					},
					"Item in the Inn": {
						reqs: null,
					},
					"5 items in the Inn after giving Scarf and Bucket to snowmen": {
						reqs: ["Warehouse Key", "Scarf", "Bucket"],
					},
				},
			},
			"East Shiver City": {
				row: 5,
				col: 3,
				checks: {
					"Item in lake": {
						reqs: "Sushie",
					},
				},
			},
			"Outside Shiver City": { row: 5, col: 4, checks: {} },
			"Shiver Snowfield": {
				row: 5,
				col: 5,
				checks: {
					"[Panel] Along bottom of room": {
						reqs: ["Warehouse Key", logic.canFlipPanel],
					},
					"Hit left pine tree 4 times": {
						reqs: ["Warehouse Key", "Hammer"],
					},
					"Item behind pine tree in top right corner": {
						reqs: "Warehouse Key",
					},
				},
			},
			"Outside Starborn Valley": {
				row: 5,
				col: 6,
				checks: {
					"Item behind ice": {
						reqs: "Warehouse Key",
					},
					"Hidden block where you fight Monstar": {
						reqs: "Warehouse Key",
					},
				},
			},
			"Starborn Valley": {
				row: 5,
				col: 7,
				checks: {
					"[Letter] Frost T. (Chain)": {
						reqs: ["Warehouse Key", "Frost T.", "Parakarry"],
					},
					"Talk to Merle": {
						reqs: "Warehouse Key",
					},
				},
			},
		},
	},
	"Crystal Palace": {
		reqs: [
			logic.canReachToadTown,
			logic.canClimbLedges,
			[
				["Super Boots", "Sushie"],
				["Odd Key", "Bombette"],
				[logic.blueHouseOpen, "Bombette"],
			],
			"Warehouse Key",
			"Scarf",
			"Bucket",
			"Super Boots",
			"Kooper",
			"Hammer",
			"Star Stone",
		],
		areas: {
			"Ground Panel Room": {
				row: 1,
				col: 3,
				rowSpan: 3,
				checks: {
					"? Block": {
						reqs: [["Red Key", "Blue Key"]],
					},
				},
			},
			"Duplighost Room 1": { row: 1, col: 4, checks: {} },
			"P-Down/​D-Up": {
				row: 2,
				col: 5,
				checks: {
					Chest: {
						reqs: [["Red Key", "Blue Key"]],
					},
				},
			},
			"Upper Swooper Room": { row: 2, col: 4, checks: {} },
			"Shooting Star": {
				row: 1,
				col: 5,
				checks: {
					"Item on ledge": {
						reqs: [["Red Key", "Blue Key"]],
					},
				},
			},
			"Duplighost Room 2": { row: 7, col: 9, checks: {} },
			"Red Key": {
				row: 8,
				col: 5,
				checks: {
					Chest: {
						reqs: [["Red Key", "Blue Key"], "Bombette"],
					},
				},
			},
			"Lower Swooper Room": { row: 7, col: 4, checks: {} },
			"Blue Key": {
				row: 7,
				col: 5,
				checks: {
					Chest: {
						reqs: null,
					},
				},
			},
			"Small Statue Room": {
				row: 2,
				col: 8,
				rowSpan: 2,
				checks: {
					"[Panel] Under block": {
						reqs: ["Red Key", "Bombette"],
					},
					"? Block": {
						reqs: ["Red Key", "Bombette"],
					},
				},
			},
			"Clubba Room": { row: 2, col: 9, checks: {} },
			"P-Up/​D-Down": {
				row: 2,
				col: 10,
				checks: {
					Chest: {
						reqs: ["Red Key", "Bombette"],
					},
				},
			},
			Cave: {
				row: 4,
				col: 1,
				checks: {
					"Item in cave": {
						reqs: [["Red Key", "Blue Key"]],
					},
				},
			},
			"Crystal Palace Entrance": { row: 4, col: 2, rowSpan: 2, checks: {} },
			"Mirror Room": {
				row: 4,
				col: 3,
				rowSpan: 2,
				checks: {
					"[Multicoin Block] 2 Blocks past blue door": {
						reqs: ["Blue Key", "Bombette"],
					},
				},
			},
			"Elevator + Clubba Room": { row: 4, col: 4, rowSpan: 2, checks: {} },
			"Bomb Switch": { row: 4, col: 5, rowSpan: 2, checks: {} },
			"Triple Dip": {
				row: 4,
				col: 6,
				rowSpan: 2,
				checks: {
					"Chest, blow up right wall in switch room": {
						reqs: ["Red Key", "Bombette"],
					},
				},
			},
			"Kooper Puzzle": { row: 4, col: 7, rowSpan: 2, checks: {} },
			"Hub 2": { row: 4, col: 8, rowSpan: 2, checks: {} },
			"Palace Key": {
				row: 7,
				col: 10,
				checks: {
					Chest: {
						reqs: ["Red Key", "Bombette"],
					},
				},
			},
			"Kooper Switch + Palace Key Lock": {
				row: 4,
				col: 9,
				rowSpan: 2,
				checks: {},
			},
			"Albino Dinos + Crystal King": {
				row: 4,
				col: 10,
				rowSpan: 2,
				checks: {
					Kalmar: {
						reqs: chapterRewardReqs.Kalmar,
					},
				},
			},
			"X Mark Room": { row: 6, col: 3, rowSpan: 3, checks: {} },
			"Large Statue Room": {
				row: 6,
				col: 8,
				rowSpan: 2,
				checks: {
					"[Panel] Under block": {
						reqs: ["Red Key", "Bombette"],
					},
					"? Block": {
						reqs: ["Red Key", "Bombette"],
					},
				},
			},
			"Bombette Puzzle": { row: 8, col: 4, checks: {} },
		},
	},
	"Bowser's Castle": {
		reqs: [logic.canReachToadTown, "Boots", 7],
		areas: {
			"Bombette Switch Room": {
				row: 2,
				col: 1,
				checks: {
					"Item on floor": {
						reqs: [
							logic.multipleItemCheck("Bowser's Castle Key", 4),
							"Bombette",
							"Lakilester",
							"Parakarry",
							"Bow",
							"Sushie",
							"Ultra Boots",
						],
					},
				},
			},
			"Second Lobby": {
				row: 2,
				col: 2,
				rowSpan: 2,
				checks: {},
			},
			Staircase: {
				row: 1,
				col: 3,
				rowSpan: 2,
				checks: {},
			},
			"Kooper Switch Room": {
				row: 1,
				col: 4,
				checks: {
					"Item on Floor": {
						reqs: [
							logic.multipleItemCheck("Bowser's Castle Key", 4),
							"Bombette",
							"Lakilester",
							"Parakarry",
							"Bow",
							"Sushie",
							"Ultra Boots",
							"Kooper",
						],
					},
				},
			},
			"Up/Down Hallway": {
				row: 2,
				col: 4,
				colSpan: 2,
				checks: {},
			},
			"Before Duplighosts": {
				row: 2,
				col: 6,
				checks: {},
			},
			Duplighosts: {
				row: 2,
				col: 7,
				checks: {},
			},
			"Jr. Troopa": {
				row: 2,
				col: 8,
				checks: {},
			},
			"Stairway to Peach's Castle": {
				row: 2,
				col: 9,
				checks: {},
			},
			"Upper Prison Inn": {
				row: 3,
				col: 1,
				checks: {
					"Koopatrol fight": {
						reqs: [
							logic.multipleItemCheck("Bowser's Castle Key", 4),
							"Bombette",
							"Lakilester",
							"Parakarry",
							"Bow",
							"Sushie",
							"Ultra Boots",
						],
					},
				},
			},
			Battlements: {
				row: 3,
				col: 3,
				rowSpan: 2,
				checks: {
					"Left ? Block": {
						reqs: [
							logic.multipleItemCheck("Bowser's Castle Key", 4),
							"Bombette",
							"Lakilester",
							"Parakarry",
							"Bow",
							"Sushie",
							"Ultra Boots",
						],
					},
					"Center ? Block": {
						reqs: [
							logic.multipleItemCheck("Bowser's Castle Key", 4),
							"Bombette",
							"Lakilester",
							"Parakarry",
							"Bow",
							"Sushie",
							"Ultra Boots",
						],
					},
					"Right ? Block": {
						reqs: [
							logic.multipleItemCheck("Bowser's Castle Key", 4),
							"Bombette",
							"Lakilester",
							"Parakarry",
							"Bow",
							"Sushie",
							"Ultra Boots",
						],
					},
					"Item on ledge": {
						reqs: [
							logic.multipleItemCheck("Bowser's Castle Key", 4),
							"Bombette",
							"Lakilester",
							"Parakarry",
							"Bow",
							"Sushie",
							"Ultra Boots",
						],
					},
				},
			},
			"Bowser Door 2": {
				row: 4,
				col: 2,
				checks: {},
			},
			"Push Block Hallways": {
				row: 5,
				col: 8,
				rowSpan: 2,
				colSpan: 2,
				checks: {
					"Hidden ? Block in Dry Bones room (left)": {
						reqs: [
							logic.multipleItemCheck("Bowser's Castle Key", 3),
							"Bombette",
							"Lakilester",
							"Parakarry",
							"Bow",
							"Sushie",
							"Ultra Boots",
						],
					},
					"? Block in Dry Bones room (right)": {
						reqs: [
							logic.multipleItemCheck("Bowser's Castle Key", 3),
							"Bombette",
							"Lakilester",
							"Parakarry",
							"Bow",
							"Sushie",
							"Ultra Boots",
						],
					},
					"Item on floor in back left room": {
						reqs: [
							logic.multipleItemCheck("Bowser's Castle Key", 3),
							"Bombette",
							"Lakilester",
							"Parakarry",
							"Bow",
							"Sushie",
							"Ultra Boots",
						],
					},
				},
			},
			"Cannon Room": {
				row: 6,
				col: 6,
				rowSpan: 2,
				colSpan: 2,
				checks: {},
			},
			"Flood Room": {
				row: 6,
				col: 4,
				rowSpan: 2,
				colSpan: 2,
				checks: {
					"Hidden ? Block on path to second chain": {
						reqs: [
							logic.multipleItemCheck("Bowser's Castle Key", 2),
							"Bombette",
							"Lakilester",
							"Parakarry",
							"Bow",
							"Sushie",
							"Ultra Boots",
						],
					},
					"Item on upper left ledge": {
						reqs: [
							logic.multipleItemCheck("Bowser's Castle Key", 2),
							"Bombette",
							"Lakilester",
							"Parakarry",
							"Bow",
							"Sushie",
							"Ultra Boots",
						],
					},
				},
			},
			Shop: {
				row: 7,
				col: 2,
				checks: {
					"[Shop] 6 items in shop": {
						reqs: [
							logic.multipleItemCheck("Bowser's Castle Key", 2),
							"Bombette",
							"Lakilester",
							"Parakarry",
							"Bow",
						],
					},
				},
			},
			"First Lobby": {
				row: 7,
				col: 3,
				rowSpan: 2,
				checks: {},
			},
			"Lower Prison Inn": {
				row: 8,
				col: 4,
				checks: {
					"Koopatrol fight": {
						reqs: [
							logic.multipleItemCheck("Bowser's Castle Key", 2),
							"Bombette",
							"Lakilester",
							"Parakarry",
							"Bow",
						],
					},
				},
			},
			"Bowser Door 1": {
				row: 8,
				col: 2,
				checks: {},
			},
			"First Hallway": {
				row: 8,
				col: 1,
				checks: {},
			},
			Prison: {
				row: 9,
				col: 2,
				checks: {
					"Lower left crate": {
						reqs: ["Bowser's Castle Key", "Super Boots"],
					},
					"Right crate": {
						reqs: ["Bowser's Castle Key", "Super Boots"],
					},
				},
			},
			"Outside Prison": {
				row: 10,
				col: 2,
				checks: {
					"Koopatrol fight": {
						reqs: null,
					},
				},
			},
			"Outside Bowser's Castle": {
				row: 9,
				col: 1,
				rowSpan: 2,
				checks: {
					"? Block on ledges": {
						reqs: ["Bowser's Castle Key", "Bombette", "Lakilester"],
					},
				},
			},
			"Star Haven": {
				row: 11,
				col: 1,
				checks: {
					"[Shop] 6 items in shop": {
						reqs: null,
					},
				},
			},
			"Lava Corridor 1": {
				row: 9,
				col: 3,
				colSpan: 2,
				checks: {
					"? Block on platform near prison": {
						reqs: ["Bowser's Castle Key", "Bombette", "Lakilester"],
					},
				},
			},
			"Lava Corridor 2": {
				row: 9,
				col: 5,
				colSpan: 2,
				checks: {
					"Item in side room": {
						reqs: [
							"Bowser's Castle Key",
							"Bombette",
							"Lakilester",
							"Parakarry",
							"Bow",
						],
					},
				},
			},
			"Lava Corridor 3": {
				row: 9,
				col: 7,
				colSpan: 2,
				checks: {
					"Item on left platform": {
						reqs: [
							"Bowser's Castle Key",
							"Bombette",
							"Lakilester",
							"Parakarry",
						],
					},
					"Item on right platform": {
						reqs: [
							"Bowser's Castle Key",
							"Bombette",
							"Lakilester",
							"Parakarry",
							"Bow",
						],
					},
				},
			},
			"Dark Cave": {
				row: 8,
				col: 5,
				colSpan: 4,
				checks: {
					"Left ? block": {
						reqs: [
							logic.multipleItemCheck("Bowser's Castle Key", 2),
							"Bombette",
							"Lakilester",
							"Parakarry",
							"Bow",
						],
					},
					"Right ? block": {
						reqs: [
							logic.multipleItemCheck("Bowser's Castle Key", 2),
							"Bombette",
							"Lakilester",
							"Parakarry",
							"Bow",
						],
					},
				},
			},
		},
	},
	"Peach's Castle": {
		reqs: chapterRewardReqs["Star Rod"],
		areas: {
			"Final Bowser": {
				row: 1,
				col: 2,
				checks: {
					"Star Rod": {
						reqs: null,
					},
				},
			},
			"Hallway Bowser": {
				row: 2,
				col: 2,
				checks: {},
			},
			"Peach's Room": {
				row: 2,
				col: 3,
				checks: {},
			},
			Balcony: {
				row: 2,
				col: 4,
				checks: {},
			},
			"Second Lobby": {
				row: 3,
				col: 2,
				rowSpan: 2,
				colSpan: 2,
				checks: {},
			},
			"Bowser's Room": {
				row: 3,
				col: 1,
				checks: {},
			},
			"Castle Library": {
				row: 4,
				col: 1,
				checks: {
					"Item between shelves": {
						reqs: null,
					},
					"Item on ledge": {
						reqs: null,
					},
				},
			},
			"Magic Chest": {
				row: 3,
				col: 4,
				checks: {
					"Item on floor": {
						reqs: null,
					},
				},
			},
			"Dining Room": {
				row: 4,
				col: 4,
				checks: {},
			},
			"First Lobby": {
				row: 5,
				col: 2,
				rowSpan: 2,
				colSpan: 2,
				checks: {},
			},
			"Outside Peach's Castle": {
				row: 7,
				col: 2,
				checks: {
					"Hidden ? Block": {
						reqs: null,
					},
				},
			},
			"Quiz Room": {
				row: 6,
				col: 1,
				checks: {},
			},
			Kitchen: {
				row: 5,
				col: 4,
				checks: {},
			},
			"Wardrobe Toad": {
				row: 6,
				col: 4,
				checks: {
					Chest: {
						reqs: null,
					},
				},
			},
		},
	},
};

export const kootReqs = Object.values(regionData)
	.flatMap(v =>
		Object.values(v.areas).flatMap(av =>
			Object.entries(av.checks).filter(([ck, _]) => ck.startsWith("[Koot"))
		)
	)
	.reduce(
		(a, v) => ({ ...a, [v[0]]: v[1].reqs }),
		{} as Record<string, Requirements>
	);

export const allRegions = Object.getOwnPropertyNames(regionData);
export const getRegionData = (region: string) => regionData[region];
export const getChecks = (region: string, area: string) =>
	regionData[region].areas[area].checks;
