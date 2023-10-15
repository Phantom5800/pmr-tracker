import type { OptionsValues } from "@/stores/config";
import logic from "../utils/logic";

export type Requirements =
	| null
	| number
	| string
	| boolean
	| ((items: string[], settings: OptionsValues) => boolean)
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
	areas: {
		[key: string]: Area;
	};
};

type MapRegions = { [key: string]: Region };

export const chapterRewardReqs: Record<string, Requirements> = {
	Eldstar: [
		logic.multipleItemCheck("Fortress Key", 4),
		"Kooper",
		["Hammer", "Bombette"]
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
			"Super Hammer"
		]
	],
	Skolar: [
		"Boo's Portrait",
		logic.multipleItemCheck("Tubba Castle Key", 3),
		"Parakarry",
		"Super Boots"
	],
	Muskular: [
		"Toy Train",
		"Cake",
		"Bombette",
		"Watt",
		"Hammer",
		logic.toyboxAccess
	],
	Misstar: [
		"Jade Raven",
		"Sushie",
		"Hammer",
		[
			logic.startingLocation("Yoshi Village"),
			"Watt",
			logic.whaleOpen,
			["Bombette", [logic.blueHouseOpen, "Odd Key"]],
			["Super Boots", "Sushie"]
		],
		[
			"Ultra Hammer",
			[logic.gearShuffle("Vanilla"), ["Parakarry", "Lakilester"]]
		]
	],
	Klevar: [
		logic.chapter6Entry,
		"Magical Bean",
		"Fertile Soil",
		"Miracle Water",
		"Lakilester",
		"Super Boots"
	],
	Kalmar: [
		"Warehouse Key",
		"Bucket",
		"Scarf",
		"Star Stone",
		"Red Key",
		"Palace Key",
		"Kooper",
		"Bombette",
		"Hammer",
		"Super Boots",
		["Sushie", logic.blueHouseOpen, "Odd Key"]
	],
	"Star Rod": [
		7,
		[
			["Bowser's Castle Key", "Bombette", "Parakarry", "Bow", "Lakilester"],
			logic.fastBowserCastle
		]
	]
};

const regionData: MapRegions = {
	Prologue: {
		areas: {
			Playground: {
				row: 1,
				col: 1,
				checks: {
					"Furthest left bush": {
						reqs: [
							[
								[
									// options.value.startingLocation?.default === "Goomba Village",
									"Hammer"
								],
								"Super Hammer",
								"Ultra Hammer"
							]
						]
					},
					"Far right tree": {
						reqs: [
							[
								[logic.startingLocation("Goomba Village"), "Hammer"],
								"Super Hammer",
								"Ultra Hammer"
							]
						]
					},
					"[Foliage Coin] All other bushes (6) and trees (2)": {
						reqs: [
							[
								[logic.startingLocation("Goomba Village"), "Hammer"],
								"Super Hammer",
								"Ultra Hammer"
							]
						]
					}
				}
			},
			"Outside Playground": {
				row: 1,
				col: 2,
				checks: {
					"[Panel] Right of stone block": {
						reqs: [
							[
								logic.startingLocation("Goomba Village"),
								"Super Hammer",
								"Ultra Hammer"
							],
							["Super Boots", "Ultra Boots", "Ultra Hammer"]
						]
					},
					"[Coinsanity] 4 items above spring": {
						reqs: [
							[
								logic.startingLocation("Goomba Village"),
								"Super Hammer",
								"Ultra Hammer"
							]
						]
					},
					"[Coin Block] Far left ? Block": {
						reqs: [
							[
								[logic.startingLocation("Goomba Village"), "Hammer"],
								"Super Hammer",
								"Ultra Hammer"
							]
						]
					},
					Tree: {
						reqs: [
							[
								[logic.startingLocation("Goomba Village"), "Hammer"],
								"Super Hammer",
								"Ultra Hammer"
							]
						]
					},
					"Item on ledge above spring": {
						reqs: [
							[
								logic.startingLocation("Goomba Village"),
								"Super Hammer",
								"Ultra Hammer"
							]
						]
					},
					"? Block above stone block": {
						reqs: [["Super Hammer", "Ultra Hammer"]]
					}
				}
			},
			"Outside Village": {
				row: 1,
				col: 3,
				checks: {
					"Item on ledge": {
						reqs: [
							[
								logic.startingLocation("Goomba Village"),
								"Super Hammer",
								"Ultra Hammer"
							]
						]
					},
					"[Foliage Coin] Tree on ledge": {
						reqs: [
							[
								logic.startingLocation("Goomba Village"),
								"Super Hammer",
								"Ultra Hammer"
							],
							["Hammer", "Super Hammer", "Ultra Hammer", "Bombette"]
						]
					}
				}
			},
			"Goomba Village": {
				row: 1,
				col: 4,
				rowSpan: 2,
				checks: {
					"[Letter] Goompa": {
						reqs: [
							[
								logic.startingLocation("Goomba Village"),
								"Super Hammer",
								"Ultra Hammer"
							],
							"Goompa",
							"Parakarry"
						]
					},
					"[Letter] Goompapa 1 (Chain)": {
						reqs: [
							[
								logic.startingLocation("Goomba Village"),
								"Super Hammer",
								"Ultra Hammer"
							],
							"Goompapa 1",
							"Parakarry"
						]
					},
					"[Letter] Goompapa 2 (Chain)": {
						reqs: [
							[
								logic.startingLocation("Goomba Village"),
								"Super Hammer",
								"Ultra Hammer"
							],
							"Goompapa 2",
							"Parakarry"
						]
					},
					"[Koot] Talk to Goompa after Koopa Koot asks for his Tape": {
						reqs: [
							[
								[logic.startingLocation("Goomba Village"), "Hammer"],
								"Super Hammer",
								"Ultra Hammer"
							],
							1,
							"Koopa Legends",
							"Sleepy Sheep"
						]
					},
					Goombario: {
						reqs: [
							[
								logic.startingLocation("Goomba Village"),
								"Super Hammer",
								"Ultra Hammer"
							]
						]
					},
					"Give Dolly to Goombaria": {
						reqs: [
							[
								logic.startingLocation("Goomba Village"),
								"Super Hammer",
								"Ultra Hammer"
							],
							"Dolly"
						]
					},
					Goompa: {
						reqs: [
							[
								logic.startingLocation("Goomba Village"),
								"Super Hammer",
								"Ultra Hammer"
							]
						]
					},
					"Goompa's Veranda": {
						reqs: [
							[
								logic.startingLocation("Goomba Village"),
								"Super Hammer",
								"Ultra Hammer"
							]
						]
					},
					Tree: {
						reqs: [
							[
								logic.startingLocation("Goomba Village"),
								"Super Hammer",
								"Ultra Hammer"
							],
							["Hammer", "Super Hammer", "Ultra Hammer", "Bombette"]
						]
					},
					"[Foliage Coin] Bottom right bush": {
						reqs: [
							[
								logic.startingLocation("Goomba Village"),
								"Super Hammer",
								"Ultra Hammer"
							]
						]
					}
				}
			},
			"Mario's Landing": {
				row: 2,
				col: 3,
				checks: {
					"[Panel] Middle of the room": {
						reqs: [
							[
								logic.startingLocation("Goomba Village"),
								"Super Hammer",
								"Ultra Hammer"
							],
							["Super Boots", "Ultra Boots", "Ultra Hammer"]
						]
					}
				}
			},
			"Goomba Road 1": {
				row: 2,
				col: 5,
				checks: {
					"[Coin Block] Left ? Block": {
						reqs: [
							[
								[logic.startingLocation("Goomba Village"), "Hammer"],
								"Super Hammer",
								"Ultra Hammer"
							]
						]
					},
					"[Coin Block] Right ? Block": {
						reqs: [
							[
								[logic.startingLocation("Goomba Village"), "Hammer"],
								"Super Hammer",
								"Ultra Hammer"
							]
						]
					}
				}
			},
			"Goomba Road 2": {
				row: 2,
				col: 6,
				checks: {
					"? Block": {
						reqs: [
							[
								[logic.startingLocation("Goomba Village"), "Hammer"],
								"Super Hammer",
								"Ultra Hammer"
							]
						]
					},
					Sign: {
						reqs: [
							[
								[logic.startingLocation("Goomba Village"), "Hammer"],
								"Super Hammer",
								"Ultra Hammer"
							]
						]
					}
				}
			},
			"Red & Blue Goomba": { row: 2, col: 7, checks: {} },
			"Outside Castle": { row: 2, col: 8, checks: {} },
			"Goomba King's Castle": {
				row: 2,
				col: 9,
				checks: {
					"[Panel] Right side of Goomba King's Fortress near tree": {
						reqs: [["Super Boots", "Ultra Boots", "Ultra Hammer"]]
					},
					"Tree left of the fortress": {
						reqs: [
							[
								[logic.startingLocation("Goomba Village"), "Hammer"],
								"Super Hammer",
								"Ultra Hammer"
							]
						]
					},
					"Break brick block to spawn ? Block": {
						reqs: [
							[
								"Hammer",
								"Super Hammer",
								"Ultra Hammer",
								"Super Boots",
								"Ultra Boots",
								"Bombette",
								"Kooper"
							]
						]
					},
					"[Foliage Coin] Tree right of the fortress": {
						reqs: [["Hammer", "Super Hammer", "Ultra Hammer", "Bombette"]]
					}
				}
			}
		}
	},
	"Toad Town": {
		areas: {
			"Castle Ruins": {
				row: 1,
				col: 3,
				rowSpan: 2,
				checks: {
					"[Letter] Muss T. (Chain)": {
						reqs: ["Muss T. (Castle Ruins)", "Parakarry"]
					},
					"[Panel] Right side of bridge": {
						reqs: [["Super Boots", "Ultra Boots", "Ultra Hammer"]]
					}
				}
			},
			"Shooting Star Summit": {
				row: 1,
				col: 4,
				checks: {
					"[Panel] On First Step": {
						reqs: [["Super Boots", "Ultra Boots", "Ultra Hammer"]]
					},
					"Left from entrance": { reqs: null }
				}
			},
			"Mario's House": {
				row: 2,
				col: 2,
				checks: {
					"[Koot] Talk to Luigi after Koopa Koot requests his autograph": {
						reqs: [
							["Hammer", "Super Hammer", "Ultra Hammer"],
							1,
							"Koopa Legends",
							"Sleepy Sheep",
							"Tape",
							"Koopa Tea"
						]
					}
				}
			},
			"Merluvlee's House": {
				row: 2,
				col: 4,
				checks: {
					"[Panel] In front of pot outside house": {
						reqs: [["Super Boots", "Ultra Boots", "Ultra Hammer"]]
					},
					"[Shop] 6 items from Merlow Star Piece Rewards": {
						reqs: null
					},
					"[Letter] Merlow": { reqs: ["Merlow", "Parakarry"] },
					"[Koot] Give Merluvlee the Crystal Ball": {
						reqs: [
							["Hammer", "Super Hammer", "Ultra Hammer"],
							2,
							"Koopa Legends",
							"Sleepy Sheep",
							"Tape",
							"Koopa Tea",
							"Luigi's Autograph",
							"Wallet",
							"Tasty Tonic",
							"Crystal Ball"
						]
					}
				}
			},
			"Outside Gate": {
				row: 3,
				col: 1,
				checks: {
					"Chest on top of Gate": {
						reqs: [["Hammer", "Super Hammer", "Ultra Hammer", "Bombette"]]
					},
					"? Block": { reqs: null }
				}
			},
			"Main Gate": {
				row: 3,
				col: 2,
				checks: {
					"[Panel] By three toad sisters": {
						reqs: [["Super Boots", "Ultra Boots", "Ultra Hammer"]]
					},
					"[Dojo] Defeat Chan (logic from beginning)": {
						reqs: null
					},
					"[Dojo] Defeat Lee (logic after 2 star spirits)": {
						reqs: [2]
					},
					"[Dojo] Defeat Master 1 (logic after 3 star spirits)": {
						reqs: [3]
					},
					"[Dojo] Defeat Master 2 (logic after 4 star spirits)": {
						reqs: [4]
					},
					"[Dojo] Defeat Master 3 (logic after 5 star spirits)": {
						reqs: [5]
					},
					"[Letter] Miss T.": { reqs: ["Miss T.", "Parakarry"] },
					"[Letter] Russ T.": { reqs: ["Russ T.", "Parakarry"] },
					"[Shop] 6 items in Shop": { reqs: null },
					"[Trade] Give Koopa Leaf to Trading Event Toad": {
						reqs: [["Hammer", "Super Hammer", "Ultra Hammer", "Bombette"], 1]
					},
					"Give Dictionary to Russ T.": { reqs: ["Dictionary"] },
					"Item at Sushie panel": { reqs: ["Sushie"] }
				}
			},
			"Central Plaza": {
				row: 3,
				col: 3,
				checks: {
					"[Letter] Merlon": { reqs: ["Merlon", "Parakarry"] },
					"[Letter] Minh T. (Chain)": {
						reqs: ["Minh T.", "Parakarry"]
					},
					"[Shop] 4 items in Rowf's Shop": { reqs: null },
					"[Shop] 3 items in Rowf's Shop after clearing 1 chapter": {
						reqs: [1]
					},
					"[Shop] 3 items in Rowf's Shop after clearing 2 chapters": {
						reqs: [2]
					},
					"[Shop] 3 items in Rowf's Shop after clearing 3 chapters": {
						reqs: [3]
					},
					"[Shop] 3 items in Rowf's Shop after clearing 4 chapters": {
						reqs: [4]
					},
					"Tree by Merlon's house": {
						reqs: [["Hammer", "Super Hammer", "Ultra Hammer", "Bombette"]]
					},
					"Give Calculator to Rowf": { reqs: ["Calculator"] },
					"Give Mailbag to Post Office": { reqs: ["Mailbag"] },
					"Ground Pound inside Merlon's house 3 times": {
						reqs: [["Super Boots", "Ultra Boots"]]
					}
				}
			},
			Harbor: {
				row: 4,
				col: 1,
				checks: {
					"[Panel] Outside Club 64": {
						reqs: [["Super Boots", "Ultra Boots", "Ultra Hammer"]]
					},
					"[Letter] Fishmael (Chain)": {
						reqs: ["Fishmael", "Parakarry"]
					},
					"[Trade] Give Coconut to Trading Event Toad": {
						reqs: [["Hammer", "Super Hammer", "Ultra Hammer", "Bombette"], 5]
					},
					"Talk to Simon in Club 64 (first time)": { reqs: null },
					"Give Melody to Simon in Club 64": { reqs: ["Melody"] }
				}
			},
			"Residential Area": {
				row: 4,
				col: 2,
				checks: {
					"[Shop] 6 items in Shop": { reqs: null },
					"Four items in Harry's Storeroom": {
						reqs: ["Storeroom Key"]
					}
				}
			},
			"Below Plaza": {
				row: 4,
				col: 3,
				checks: {
					"[Panel] By guard house": {
						reqs: [["Super Boots", "Ultra Boots", "Ultra Hammer"]]
					},
					"[Letter] Fice T.": { reqs: ["Fice T.", "Parakarry"] },
					"Bub-ulb": { reqs: null },
					"Give Frying Pan to Tayce T.": { reqs: ["Frying Pan"] },
					"Inside Blue House": {
						reqs: [
							[
								"Odd Key",
								logic.blueHouseOpen,
								["Super Boots", "Sushie", "Bombette"],
								["Ultra Boots", "Sushie", "Bombette"]
							]
						]
					}
				}
			},
			"Forever Forest Entrance": { row: 4, col: 4, checks: {} },
			"Train Station": {
				row: 5,
				col: 3,
				checks: {
					"[Panel] Bottom right side of room": {
						reqs: [["Super Boots", "Ultra Boots", "Ultra Hammer"]]
					},
					"[Letter] Dane T. 1 (Chain)": {
						reqs: ["Dane T. 1", "Parakarry"]
					},
					"[Letter] Dane T. 2 (Chain)": {
						reqs: ["Dane T. 2", "Parakarry"]
					}
				}
			}
		}
	},
	"Toad Town Tunnels": {
		areas: {
			Pipe: {
				row: 1,
				col: 2,
				rowSpan: 2,
				checks: {
					"[Coin Block] Left ? Block": {
						reqs: [["Super Hammer", "Ultra Hammer"]]
					},
					"[Coin Block] Right ? Block": {
						reqs: [["Super Hammer", "Ultra Hammer"]]
					},
					"Middle ? Block": {
						reqs: [["Super Hammer", "Ultra Hammer"]]
					}
				}
			},
			Shortcuts: { row: 1, col: 3, colSpan: 4, checks: {} },
			Entrance: {
				row: 1,
				col: 7,
				checks: {
					"Defeat Koopa by first locked door": {
						reqs: [
							["Hammer", "Super Hammer", "Ultra Hammer", "Bombette"],
							"Kooper"
						]
					},
					"Top of room guarded by Bob-omb": {
						reqs: [
							["Hammer", "Super Hammer", "Ultra Hammer", "Bombette"],
							"Kooper",
							logic.multipleItemCheck("Fortress Key", 4)
						]
					}
				}
			},
			"Brick Blocks": {
				row: 1,
				col: 8,
				checks: {
					"Hidden block next to last brick block": {
						reqs: [["Hammer", "Super Hammer", "Ultra Hammer"]]
					}
				}
			},
			"Shrink Stomp": {
				row: 1,
				col: 9,
				checks: {
					Chest: {
						reqs: [["Hammer", "Super Hammer", "Ultra Hammer"]]
					}
				}
			},
			"Lower Upgrade Block": {
				row: 4,
				col: 3,
				checks: {}
			},
			"Bridge Upgrade Block": {
				row: 2,
				col: 4,
				checks: {
					"[Coin Block] Left invisible block": {
						reqs: [
							[
								"Super Boots",
								"Ultra Boots",
								["Odd Key", "Bombette", "Sushie"],
								[logic.blueHouseOpen, "Bombette", "Sushie"]
							]
						]
					},
					"[Coin Block] Middle invisible block": {
						reqs: [
							[
								"Super Boots",
								"Ultra Boots",
								["Odd Key", "Bombette", "Sushie"],
								[logic.blueHouseOpen, "Bombette", "Sushie"]
							]
						]
					},
					"[Coin Block] Right invisible block": {
						reqs: [
							[
								"Super Boots",
								"Ultra Boots",
								["Odd Key", "Bombette", "Sushie"],
								[logic.blueHouseOpen, "Bombette", "Sushie"]
							]
						]
					}
				}
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
								"Sushie"
							]
						]
					}
				}
			},
			"Chapter 7 Door": {
				row: 2,
				col: 9,
				rowSpan: 2,
				checks: {
					"[Coin Block] ? Block 1": {
						reqs: [
							["Super Boots", "Ultra Boots"],
							[
								"Sushie",
								["Odd Key", "Bombette"],
								[logic.blueHouseOpen, "Bombette"]
							]
						]
					},
					"[Coin Block] ? Block 2": {
						reqs: [
							["Super Boots", "Ultra Boots"],
							[
								"Sushie",
								["Odd Key", "Bombette"],
								[logic.blueHouseOpen, "Bombette"]
							]
						]
					},
					"[Coin Block] ? Block 3": {
						reqs: [
							["Super Boots", "Ultra Boots"],
							[
								"Sushie",
								["Odd Key", "Bombette"],
								[logic.blueHouseOpen, "Bombette"]
							]
						]
					},
					"[Coin Block] ? Block 4": {
						reqs: [
							["Super Boots", "Ultra Boots"],
							[
								"Sushie",
								["Odd Key", "Bombette"],
								[logic.blueHouseOpen, "Bombette"]
							]
						]
					},
					"[Coin Block] ? Block 5": {
						reqs: [
							["Super Boots", "Ultra Boots"],
							[
								"Sushie",
								["Odd Key", "Bombette"],
								[logic.blueHouseOpen, "Bombette"]
							]
						]
					}
				}
			},
			"Chapter 7 Pipe": { row: 2, col: 10, checks: {} },
			"Power Smash": {
				row: 3,
				col: 1,
				checks: {
					Chest: { reqs: [["Super Hammer", "Ultra Hammer"]] }
				}
			},
			Seesaw: { row: 3, col: 2, checks: {} },
			Elevator: {
				row: 3,
				col: 3,
				checks: {
					"Item on far right ledge": {
						reqs: [["Super Hammer", "Ultra Hammer"], "Parakarry"]
					}
				}
			},
			"Elevator Upgrade Block": {
				row: 3,
				col: 4,
				checks: {}
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
								["Ultra Boots", "Sushie"]
							],
							"Lakilester"
						]
					}
				}
			},
			"Ultra Boots Blocks": {
				row: 3,
				col: 7,
				checks: {
					"[Coin Block] Left ? Block": {
						reqs: [
							"Ultra Boots",
							["Super Hammer", "Ultra Hammer"],
							[
								["Odd Key", "Bombette"],
								[logic.blueHouseOpen, "Bombette"],
								"Sushie"
							],
							"Lakilester"
						]
					},
					"[Coin Block] Right ? Block": {
						reqs: [
							"Ultra Boots",
							["Super Hammer", "Ultra Hammer"],
							[
								["Odd Key", "Bombette"],
								[logic.blueHouseOpen, "Bombette"],
								"Sushie"
							],
							"Lakilester"
						]
					},
					"Middle ? Block": {
						reqs: [
							"Ultra Boots",
							["Super Hammer", "Ultra Hammer"],
							[
								["Odd Key", "Bombette"],
								[logic.blueHouseOpen, "Bombette"],
								"Sushie"
							],
							"Lakilester"
						]
					}
				}
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
								["Ultra Boots", "Sushie"]
							],
							"Lakilester"
						]
					},
					"Invisible block between first and second spiny": {
						reqs: [
							[
								["Odd Key", "Bombette"],
								[logic.blueHouseOpen, "Bombette"],
								["Super Boots", "Sushie"],
								["Ultra Boots", "Sushie"]
							],
							"Lakilester"
						]
					},
					"Invisible block next to visible ? block": {
						reqs: [
							[
								["Odd Key", "Bombette"],
								[logic.blueHouseOpen, "Bombette"],
								["Super Boots", "Sushie"],
								["Ultra Boots", "Sushie"]
							],
							"Lakilester"
						]
					},
					"[Coin Block] ? Block by stone block": {
						reqs: [
							[
								["Odd Key", "Bombette"],
								[logic.blueHouseOpen, "Bombette"],
								["Super Boots", "Sushie"],
								["Ultra Boots", "Sushie"]
							],
							"Lakilester"
						]
					}
				}
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
									["Ultra Boots", "Sushie", "Bombette"]
								]
							]
						}
				}
			}
		}
	},
	"Pleasant Path": {
		areas: {
			"Outside Toad Town": {
				row: 1,
				col: 1,
				checks: {
					"[Coin Block] Left ? Block": { reqs: null },
					"Middle ? Block": { reqs: null },
					"Right ? Block": { reqs: null }
				}
			},
			"Switch Bridge 1": {
				row: 1,
				col: 2,
				checks: {
					"? Block": { reqs: null },
					"Kooper item": {
						reqs: [
							["Hammer", "Super Hammer", "Ultra Hammer", "Bombette"],
							"Kooper"
						]
					},
					"Item behind small fence": {
						reqs: [["Hammer", "Super Hammer", "Ultra Hammer", "Bombette"]]
					}
				}
			},
			"Outside Koopa Village": {
				row: 1,
				col: 3,
				checks: {
					"[Panel] Middle of three pillars": {
						reqs: [
							["Hammer", "Super Hammer", "Ultra Hammer", "Bombette"],
							["Super Boots", "Ultra Boots", "Ultra Hammer"]
						]
					},
					"Item behind right-most pillar": {
						reqs: [["Hammer", "Super Hammer", "Ultra Hammer", "Bombette"]]
					},
					"Break brick boxes (left, right, middle)": {
						reqs: [["Hammer", "Super Hammer", "Ultra Hammer", "Bombette"]]
					}
				}
			},
			"Switch Bridge 2": {
				row: 1,
				col: 4,
				checks: {
					"[Panel] Under 5 coins / items": {
						reqs: [
							["Hammer", "Super Hammer", "Ultra Hammer", "Bombette"],
							["Super Boots", "Ultra Boots", "Ultra Hammer"]
						]
					},
					"[Coinsanity] 5 items at start of room": {
						reqs: [["Hammer", "Super Hammer", "Ultra Hammer", "Bombette"]]
					},
					"Item on brick block": {
						reqs: [
							["Hammer", "Super Hammer", "Ultra Hammer", "Bombette"],
							["Kooper", "Ultra Boots"]
						]
					},
					"Hidden ? block after bridge": {
						reqs: [
							["Hammer", "Super Hammer", "Ultra Hammer", "Bombette"],
							"Kooper"
						]
					}
				}
			},
			"Path to Fortress": {
				row: 1,
				col: 5,
				checks: {
					"Item in first tree": {
						reqs: [
							["Hammer", "Super Hammer", "Ultra Hammer", "Bombette"],
							"Kooper"
						]
					}
				}
			}
		}
	},
	"Koopa Village": {
		areas: {
			"Fuzzy Room": {
				row: 1,
				col: 2,
				checks: {
					"Item Fuzzies are holding": {
						reqs: [["Hammer", "Super Hammer", "Ultra Hammer"]]
					}
				}
			},
			"Behind Kooper's House": {
				row: 2,
				col: 2,
				checks: {
					"On tall stump": {
						reqs: [
							["Hammer", "Super Hammer", "Ultra Hammer", "Bombette"],
							["Kooper", "Parakarry"]
						]
					}
				}
			},
			"Koopa Village West": {
				row: 3,
				col: 1,
				checks: {
					"[Shop] 6 items in Shop": {
						reqs: [["Hammer", "Super Hammer", "Ultra Hammer", "Bombette"]]
					},
					"[Panel] Left of tree": {
						reqs: [
							["Hammer", "Super Hammer", "Ultra Hammer", "Bombette"],
							["Super Boots", "Ultra Boots", "Ultra Hammer"]
						]
					},
					"[Letter] Mort T.": {
						reqs: [
							["Hammer", "Super Hammer", "Ultra Hammer", "Bombette"],
							"Mort T. (Koopa Village Inn)",
							"Parakarry"
						]
					},
					"[Letter] Koover 1 (Chain)": {
						reqs: [
							["Hammer", "Super Hammer", "Ultra Hammer", "Bombette"],
							"Koover 1 (Koopa Village Entrance)",
							"Parakarry"
						]
					},
					"[Letter] Koover 2 (Chain)": {
						reqs: [
							["Hammer", "Super Hammer", "Ultra Hammer", "Bombette"],
							"Koover 2 (Koopa Village Entrance)",
							"Parakarry"
						]
					},
					"[Koot] Far right bush after Koopa Koot requests his Wallet": {
						reqs: [
							["Hammer", "Super Hammer", "Ultra Hammer"],
							2,
							"Koopa Legends",
							"Sleepy Sheep",
							"Tape",
							"Koopa Tea",
							"Luigi's Autograph"
						]
					},
					"[Koot] Second bush from left after Koopa Koot requests his Glasses":
						{
							reqs: [
								["Hammer", "Super Hammer", "Ultra Hammer"],
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
								"Koopasta"
							]
						},
					"Bottom bush on left side": {
						reqs: [["Hammer", "Super Hammer", "Ultra Hammer", "Bombette"]]
					},
					"Third bush from the right": {
						reqs: [["Hammer", "Super Hammer", "Ultra Hammer", "Bombette"]]
					},
					"[Foliage Coin] Far left bush": {
						reqs: [["Hammer", "Super Hammer", "Ultra Hammer", "Bombette"]]
					},
					"[Foliage Coin] Second bush from the right": {
						reqs: [["Hammer", "Super Hammer", "Ultra Hammer", "Bombette"]]
					}
				}
			},
			"Koopa Village East": {
				row: 3,
				col: 2,
				checks: {
					"[Letter] Kolorado": { reqs: ["Kolorado", "Parakarry"] },
					"[Koot] Talk to Kolorado's wife after starting Koopa Koot's first favor":
						{
							reqs: [["Hammer", "Super Hammer", "Ultra Hammer"]]
						},
					"[Koot] [Koot Coin] Return Koopa Legends to Koopa Koot": {
						reqs: [["Hammer", "Super Hammer", "Ultra Hammer"], "Koopa Legends"]
					},
					"[Koot] [Koot Coin] Give Koopa Koot a Sleepy Sheep (first item)": {
						reqs: [
							["Hammer", "Super Hammer", "Ultra Hammer"],
							"Koopa Legends",
							"Sleepy Sheep"
						]
					},
					"[Koot] Give Koopa Koot a Sleepy Sheep (second item)": {
						reqs: [
							["Hammer", "Super Hammer", "Ultra Hammer"],
							"Koopa Legends",
							"Sleepy Sheep"
						]
					},
					"[Koot] [Koot Coin] Return Koopa Koot's Tape": {
						reqs: [
							["Hammer", "Super Hammer", "Ultra Hammer"],
							1,
							"Koopa Legends",
							"Sleepy Sheep",
							"Tape"
						]
					},
					"[Koot] Give Koopa Koot Koopa Tea": {
						reqs: [
							["Hammer", "Super Hammer", "Ultra Hammer"],
							1,
							"Koopa Legends",
							"Sleepy Sheep",
							"Tape",
							"Koopa Tea"
						]
					},
					"[Koot] [Koot Coin] Give Luigi's Autograph to Koopa Koot": {
						reqs: [
							["Hammer", "Super Hammer", "Ultra Hammer"],
							1,
							"Koopa Legends",
							"Sleepy Sheep",
							"Tape",
							"Koopa Tea",
							"Luigi's Autograph"
						]
					},
					"[Koot] [Koot Coin] Return Koopa Koot's wallet": {
						reqs: [
							["Hammer", "Super Hammer", "Ultra Hammer"],
							2,
							"Koopa Legends",
							"Sleepy Sheep",
							"Tape",
							"Koopa Tea",
							"Luigi's Autograph",
							"Wallet"
						]
					},
					"[Koot] [Koot Coin] Give Koopa Koot a Tasty Tonic": {
						reqs: [
							["Hammer", "Super Hammer", "Ultra Hammer"],
							2,
							"Koopa Legends",
							"Sleepy Sheep",
							"Tape",
							"Koopa Tea",
							"Luigi's Autograph",
							"Wallet",
							"Tasty Tonic"
						]
					},
					"[Koot] Give Merluvlee's Autograph to Koopa Koot": {
						reqs: [
							["Hammer", "Super Hammer", "Ultra Hammer"],
							2,
							"Koopa Legends",
							"Sleepy Sheep",
							"Tape",
							"Koopa Tea",
							"Luigi's Autograph",
							"Wallet",
							"Tasty Tonic",
							"Merluvlee's Autograph"
						]
					},
					"[Koot] [Koot Coin] Talk to Koopa Koot after reading the news in Toad Town":
						{
							reqs: [
								["Hammer", "Super Hammer", "Ultra Hammer"],
								3,
								"Koopa Legends",
								"Sleepy Sheep",
								"Tape",
								"Koopa Tea",
								"Luigi's Autograph",
								"Wallet",
								"Tasty Tonic",
								"Merluvlee's Autograph"
							]
						},
					"[Koot] [Koot Coin] Give Koopa Koot a Life Shroom (first item)": {
						reqs: [
							["Hammer", "Super Hammer", "Ultra Hammer"],
							3,
							"Koopa Legends",
							"Sleepy Sheep",
							"Tape",
							"Koopa Tea",
							"Luigi's Autograph",
							"Wallet",
							"Tasty Tonic",
							"Merluvlee's Autograph",
							"Life Shroom"
						]
					},
					"[Koot] Give Koopa Koot a Life Shroom (second item)": {
						reqs: [
							["Hammer", "Super Hammer", "Ultra Hammer"],
							3,
							"Koopa Legends",
							"Sleepy Sheep",
							"Tape",
							"Koopa Tea",
							"Luigi's Autograph",
							"Wallet",
							"Tasty Tonic",
							"Merluvlee's Autograph",
							"Life Shroom"
						]
					},
					"[Koot] [Koot Coin] Give Koopa Koot a Nutty Cake": {
						reqs: [
							["Hammer", "Super Hammer", "Ultra Hammer"],
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
							"Nutty Cake"
						]
					},
					"[Koot] Talk to Koopa Koot after calming the Bob-ombs": {
						reqs: [
							["Hammer", "Super Hammer", "Ultra Hammer"],
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
							"Bombette"
						]
					},
					"[Koot] [Koot Coin] Give Koopa Koot the Old Photo": {
						reqs: [
							["Hammer", "Super Hammer", "Ultra Hammer"],
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
							"Old Photo"
						]
					},
					"[Koot] [Koot Coin] Give Koopa Koot Koopasta": {
						reqs: [
							["Hammer", "Super Hammer", "Ultra Hammer"],
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
							"Koopasta"
						]
					},
					"[Koot] [Koot Coin] Return Koopa Koot's glasses": {
						reqs: [
							["Hammer", "Super Hammer", "Ultra Hammer"],
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
							"Glasses"
						]
					},
					"[Koot] Give Koopa Koot a Lime": {
						reqs: [
							["Hammer", "Super Hammer", "Ultra Hammer"],
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
							"Lime"
						]
					},
					"[Koot] [Koot Coin] Give Koopa Koot a Kooky Cookie": {
						reqs: [
							["Hammer", "Super Hammer", "Ultra Hammer"],
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
							"Kooky Cookie"
						]
					},
					"[Koot] [Koot Coin] Give Koopa Koot his package": {
						reqs: [
							["Hammer", "Super Hammer", "Ultra Hammer"],
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
							"Package"
						]
					},
					"[Koot] [Koot Coin] Give Koopa Koot a Coconut": {
						reqs: [
							["Hammer", "Super Hammer", "Ultra Hammer"],
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
							"Coconut"
						]
					},
					"[Koot] Give Koopa Koot the Red Jar": {
						reqs: [
							["Hammer", "Super Hammer", "Ultra Hammer"],
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
							"Red Jar"
						]
					},
					"First bush on left": {
						reqs: [["Hammer", "Super Hammer", "Ultra Hammer", "Bombette"]]
					},
					"Give Kooper his shell": {
						reqs: [
							["Hammer", "Super Hammer", "Ultra Hammer", "Bombette"],
							"Kooper's Shell"
						]
					},
					"Give Artifact to Kolorado": {
						reqs: [
							"Artifact",
							[
								"Mamar",
								["Bombette", "Parakarry"],
								"Super Hammer",
								"Ultra Hammer"
							]
						]
					},
					"Item on top of brick block on right (after defeating fuzzies)": {
						reqs: [["Hammer", "Super Hammer", "Ultra Hammer"]]
					},
					"[Foliage Coin] Far right bush": {
						reqs: [["Hammer", "Super Hammer", "Ultra Hammer", "Bombette"]]
					}
				}
			}
		}
	},
	"Koopa Bros. Fortress": {
		areas: {
			"Fortress Entrance": { row: 1, col: 2, rowSpan: 3, checks: {} },
			Cannons: {
				row: 1,
				col: 3,
				checks: {
					"? Block behind bombable rock": {
						reqs: [
							"Kooper",
							"Bombette",
							logic.multipleItemCheck("Fortress Key", 4)
						]
					}
				}
			},
			"Boss Room": {
				row: 1,
				col: 4,
				checks: {
					Eldstar: {
						reqs: chapterRewardReqs.Eldstar
					}
				}
			},
			"Bomb Room": { row: 2, col: 3, rowSpan: 2, checks: {} },
			"Kooper Puzzle Room": {
				row: 2,
				col: 4,
				rowSpan: 2,
				checks: {
					"Left Jail Cell": {
						reqs: [
							"Kooper",
							"Bombette",
							logic.multipleItemCheck("Fortress Key", 3)
						]
					},
					"Middle Jail Cell": {
						reqs: [
							["Hammer", "Super Hammer", "Ultra Hammer", "Bombette"],
							"Kooper",
							"Fortress Key"
						]
					},
					"Right Jail Cell": {
						reqs: ["Kooper", "Bombette", "Fortress Key"]
					}
				}
			},
			"Staircase Room": { row: 2, col: 5, rowSpan: 3, checks: {} },
			"Trap Room": { row: 2, col: 6, rowSpan: 2, colSpan: 2, checks: {} },
			"Outside Fortress": {
				row: 3,
				col: 1,
				checks: {
					"Inside chest on ledge from bombable wall on previous screen": {
						reqs: ["Kooper", "Bombette"]
					}
				}
			},
			"Outside Chest": {
				row: 3,
				col: 8,
				checks: {
					"Chest after bombable wall in trap room": {
						reqs: [
							"Kooper",
							"Bombette",
							logic.multipleItemCheck("Fortress Key", 2)
						]
					}
				}
			},
			Firebars: {
				row: 4,
				col: 3,
				checks: {
					"Item at end of room": {
						reqs: [
							["Hammer", "Super Hammer", "Ultra Hammer", "Bombette"],
							"Kooper",
							"Fortress Key"
						]
					}
				}
			},
			"The Pit": { row: 4, col: 4, checks: {} },
			Jail: {
				row: 4,
				col: 6,
				checks: {
					Bombette: {
						reqs: [
							["Hammer", "Super Hammer", "Ultra Hammer", "Bombette"],
							"Kooper",
							[
								["Fortress Key", "Bombette"],
								logic.multipleItemCheck("Fortress Key", 2)
							]
						]
					}
				}
			},
			"Fortress Save Block": { row: 4, col: 7, checks: {} }
		}
	},
	"Mt. Rugged": {
		areas: {
			"Letter 3": {
				row: 1,
				col: 2,
				checks: {
					"[Coin Block] ? Block left after taking spring": {
						reqs: [
							[
								[logic.startingLocation("Dry Dry Outpost"), "Hammer"],
								[logic.startingLocation("Dry Dry Outpost"), "Kooper"],
								"Bombette",
								"Super Hammer",
								"Ultra Hammer"
							]
						]
					},
					"[Coinsanity] Circle of items across Parakarry gap": {
						reqs: [
							[
								logic.startingLocation("Dry Dry Outpost"),
								"Bombette",
								"Super Hammer",
								"Ultra Hammer"
							],
							"Parakarry"
						]
					},
					"[Coinsanity] 2 items on ground below Parakarry gap": {
						reqs: [
							[
								logic.startingLocation("Dry Dry Outpost"),
								"Bombette",
								"Super Hammer",
								"Ultra Hammer"
							]
						]
					},
					"? Block by Cleft when entering room": {
						reqs: [
							[
								logic.startingLocation("Dry Dry Outpost"),
								"Bombette",
								"Super Hammer",
								"Ultra Hammer"
							]
						]
					},
					"Chest in cave": {
						reqs: [
							[
								logic.startingLocation("Dry Dry Outpost"),
								"Bombette",
								"Super Hammer",
								"Ultra Hammer"
							]
						]
					},
					"Item across Parakarry gap": {
						reqs: [
							[
								logic.startingLocation("Dry Dry Outpost"),
								"Bombette",
								"Super Hammer",
								"Ultra Hammer"
							],
							"Parakarry"
						]
					},
					"? Block past Cleft after spring": {
						reqs: [
							[
								[logic.startingLocation("Dry Dry Outpost"), "Hammer"],
								[logic.startingLocation("Dry Dry Outpost"), "Kooper"],
								"Bombette",
								"Super Hammer",
								"Ultra Hammer"
							]
						]
					},
					"Item on far right ledge": {
						reqs: [
							[
								logic.startingLocation("Dry Dry Outpost"),
								"Bombette",
								"Super Hammer",
								"Ultra Hammer"
							]
						]
					}
				}
			},
			"Letter 1": {
				row: 1,
				col: 3,
				rowSpan: 2,
				checks: {
					"[Panel] By wall near end of slide": {
						reqs: [
							[
								logic.startingLocation("Dry Dry Outpost"),
								"Bombette",
								"Super Hammer",
								"Ultra Hammer"
							],
							["Super Boots", "Ultra Boots", "Ultra Hammer"]
						]
					},
					"Item on first ledge": {
						reqs: [
							[
								logic.startingLocation("Dry Dry Outpost"),
								"Bombette",
								"Super Hammer",
								"Ultra Hammer"
							],
							["Kooper", "Parakarry"]
						]
					},
					"Item on second ledge": {
						reqs: [
							[
								logic.startingLocation("Dry Dry Outpost"),
								"Bombette",
								"Super Hammer",
								"Ultra Hammer"
							],
							"Parakarry"
						]
					}
				}
			},
			"Seed Room": {
				row: 1,
				col: 4,
				rowSpan: 2,
				checks: {
					"Bub-ulb": {
						reqs: [
							[
								logic.startingLocation("Dry Dry Outpost"),
								"Bombette",
								"Super Hammer",
								"Ultra Hammer"
							],
							"Parakarry"
						]
					},
					"Item on support beam when falling through opening at the top": {
						reqs: [
							[
								logic.startingLocation("Dry Dry Outpost"),
								"Bombette",
								"Super Hammer",
								"Ultra Hammer"
							]
						]
					}
				}
			},
			Buzzar: {
				row: 1,
				col: 5,
				checks: {
					"Item on ground by Cleft": {
						reqs: [
							[
								logic.startingLocation("Dry Dry Outpost"),
								"Bombette",
								"Super Hammer",
								"Ultra Hammer"
							]
						]
					}
				}
			},
			Station: {
				row: 2,
				col: 1,
				checks: {
					"Item in top most bush": {
						reqs: [
							[
								logic.startingLocation("Dry Dry Outpost"),
								"Bombette",
								"Super Hammer",
								"Ultra Hammer"
							]
						]
					},
					"Give three letters to Parakarry": {
						reqs: [
							[
								logic.startingLocation("Dry Dry Outpost"),
								"Bombette",
								"Super Hammer",
								"Ultra Hammer"
							]
						]
					},
					"[Foliage Coin] All 3 other bushes": {
						reqs: [
							[
								logic.startingLocation("Dry Dry Outpost"),
								"Bombette",
								"Super Hammer",
								"Ultra Hammer"
							]
						]
					}
				}
			},
			Whacka: {
				row: 2,
				col: 2,
				checks: {
					"[Coinsanity] Three items on slide": {
						reqs: [
							[
								logic.startingLocation("Dry Dry Outpost"),
								"Bombette",
								"Super Hammer",
								"Ultra Hammer"
							]
						]
					},
					"Hit Whacka": {
						reqs: [
							[
								[logic.startingLocation("Dry Dry Outpost"), "Hammer"],
								["Bombette", "Hammer"],
								"Super Hammer",
								"Ultra Hammer"
							]
						]
					},
					"? Block": {
						reqs: [
							[
								logic.startingLocation("Dry Dry Outpost"),
								"Bombette",
								"Super Hammer",
								"Ultra Hammer"
							]
						]
					}
				}
			}
		}
	},
	"Dry Dry Desert": {
		areas: {
			"NW Two ? Blocks": {
				row: 1,
				col: 2,
				checks: {
					"[Coin Block] Right ? Block": {
						reqs: [
							[
								logic.startingLocation("Dry Dry Outpost"),
								["Bombette", "Parakarry"],
								"Super Hammer",
								"Ultra Hammer"
							],
							[
								"Hammer",
								"Super Hammer",
								"Ultra Hammer",
								"Super Boots",
								"Ultra Boots",
								"Bombette",
								"Kooper"
							]
						]
					},
					"Left ? Block": {
						reqs: [
							[
								logic.startingLocation("Dry Dry Outpost"),
								["Bombette", "Parakarry"],
								"Super Hammer",
								"Ultra Hammer"
							],
							[
								"Hammer",
								"Super Hammer",
								"Ultra Hammer",
								"Super Boots",
								"Ultra Boots",
								"Bombette",
								"Kooper"
							]
						]
					}
				}
			},
			"Two ? Blocks": {
				row: 2,
				col: 6,
				checks: {
					"[Coin Block] Left ? Block": {
						reqs: [
							[
								logic.startingLocation("Dry Dry Outpost"),
								["Bombette", "Parakarry"],
								"Super Hammer",
								"Ultra Hammer"
							],
							[
								"Hammer",
								"Super Hammer",
								"Ultra Hammer",
								"Super Boots",
								"Ultra Boots",
								"Bombette",
								"Kooper"
							]
						]
					},
					"Right ? Block": {
						reqs: [
							[
								logic.startingLocation("Dry Dry Outpost"),
								["Bombette", "Parakarry"],
								"Super Hammer",
								"Ultra Hammer"
							],
							[
								"Hammer",
								"Super Hammer",
								"Ultra Hammer",
								"Super Boots",
								"Ultra Boots",
								"Bombette",
								"Kooper"
							]
						]
					}
				}
			},
			"Dry Dry Ruins": {
				row: 1,
				col: 4,
				checks: {
					"[Trade] Give Nutty Cake to Trading Event Toad": {
						reqs: [
							[
								logic.startingLocation("Dry Dry Outpost"),
								["Bombette", "Parakarry"],
								"Super Hammer",
								"Ultra Hammer"
							],
							3
						]
					}
				}
			},
			"Pokeys Room": {
				row: 1,
				col: 7,
				checks: {
					"Behind cactus at top of room": {
						reqs: [
							[
								logic.startingLocation("Dry Dry Outpost"),
								["Bombette", "Parakarry"],
								"Super Hammer",
								"Ultra Hammer"
							]
						]
					}
				}
			},
			"NE Tree": {
				row: 1,
				col: 8,
				checks: {
					"[Foliage Coin] Tree": {
						reqs: [
							[
								logic.startingLocation("Dry Dry Outpost"),
								["Bombette", "Parakarry"],
								"Super Hammer",
								"Ultra Hammer"
							],
							["Hammer", "Super Hammer", "Ultra Hammer", "Bombette"]
						]
					}
				}
			},
			"Thunder Rage": {
				row: 2,
				col: 2,
				checks: {
					"Hidden block above rock on right side": {
						reqs: [
							[
								logic.startingLocation("Dry Dry Outpost"),
								["Bombette", "Parakarry"],
								"Super Hammer",
								"Ultra Hammer"
							]
						]
					}
				}
			},
			"Hammer Block": {
				row: 3,
				col: 2,
				checks: {
					"Hammer yellow block once": {
						reqs: [
							[
								logic.startingLocation("Dry Dry Outpost"),
								["Bombette", "Parakarry"],
								"Super Hammer",
								"Ultra Hammer"
							],
							[
								"Hammer",
								"Super Hammer",
								"Ultra Hammer",
								"Super Boots",
								"Ultra Boots",
								"Bombette",
								"Kooper"
							]
						]
					},
					"Hammer yellow block five times": {
						reqs: [
							[
								logic.startingLocation("Dry Dry Outpost"),
								["Bombette", "Parakarry"],
								"Super Hammer",
								"Ultra Hammer"
							],
							[
								"Hammer",
								"Super Hammer",
								"Ultra Hammer",
								"Super Boots",
								"Ultra Boots",
								"Bombette",
								"Kooper"
							]
						]
					},
					"Hammer yellow block ten times": {
						reqs: [
							[
								logic.startingLocation("Dry Dry Outpost"),
								["Bombette", "Parakarry"],
								"Super Hammer",
								"Ultra Hammer"
							],
							[
								"Hammer",
								"Super Hammer",
								"Ultra Hammer",
								"Super Boots",
								"Ultra Boots",
								"Bombette",
								"Kooper"
							]
						]
					}
				}
			},
			"Five ? Blocks": {
				row: 3,
				col: 4,
				checks: {
					"[Coin Block] Top-Left ? Block": {
						reqs: [
							[
								logic.startingLocation("Dry Dry Outpost"),
								["Bombette", "Parakarry"],
								"Super Hammer",
								"Ultra Hammer"
							],
							[
								"Hammer",
								"Super Hammer",
								"Ultra Hammer",
								"Super Boots",
								"Ultra Boots",
								"Bombette",
								"Kooper"
							]
						]
					},
					"[Coin Block] Top-Right ? Block": {
						reqs: [
							[
								logic.startingLocation("Dry Dry Outpost"),
								["Bombette", "Parakarry"],
								"Super Hammer",
								"Ultra Hammer"
							],
							[
								"Hammer",
								"Super Hammer",
								"Ultra Hammer",
								"Super Boots",
								"Ultra Boots",
								"Bombette",
								"Kooper"
							]
						]
					},
					"[Coin Block] Bottom-Left ? Block": {
						reqs: [
							[
								logic.startingLocation("Dry Dry Outpost"),
								["Bombette", "Parakarry"],
								"Super Hammer",
								"Ultra Hammer"
							],
							[
								"Hammer",
								"Super Hammer",
								"Ultra Hammer",
								"Super Boots",
								"Ultra Boots",
								"Bombette",
								"Kooper"
							]
						]
					},
					"[Coin Block] Bottom-Right ? Block": {
						reqs: [
							[
								logic.startingLocation("Dry Dry Outpost"),
								["Bombette", "Parakarry"],
								"Super Hammer",
								"Ultra Hammer"
							],
							[
								"Hammer",
								"Super Hammer",
								"Ultra Hammer",
								"Super Boots",
								"Ultra Boots",
								"Bombette",
								"Kooper"
							]
						]
					},
					"Center ? Block": {
						reqs: [
							[
								logic.startingLocation("Dry Dry Outpost"),
								["Bombette", "Parakarry"],
								"Super Hammer",
								"Ultra Hammer"
							],
							[
								"Hammer",
								"Super Hammer",
								"Ultra Hammer",
								"Super Boots",
								"Ultra Boots",
								"Bombette",
								"Kooper"
							]
						]
					}
				}
			},
			"Runaway Pay": {
				row: 3,
				col: 6,
				checks: {
					"Hidden block in the middle of three trees": {
						reqs: [
							[
								logic.startingLocation("Dry Dry Outpost"),
								["Bombette", "Parakarry"],
								"Super Hammer",
								"Ultra Hammer"
							]
						]
					}
				}
			},
			Tree: {
				row: 3,
				col: 8,
				checks: {
					"[Foliage Coin] Tree": {
						reqs: [
							[
								logic.startingLocation("Dry Dry Outpost"),
								["Bombette", "Parakarry"],
								"Super Hammer",
								"Ultra Hammer"
							],
							["Hammer", "Super Hammer", "Ultra Hammer", "Bombette"]
						]
					}
				}
			},
			"Desert Save Block": { row: 4, col: 1, checks: {} },
			"Kolorado's Camp": {
				row: 4,
				col: 2,
				checks: {
					"Tree at camp location after saving Mamar": {
						reqs: [
							[
								logic.startingLocation("Dry Dry Outpost"),
								["Bombette", "Parakarry"],
								"Super Hammer",
								"Ultra Hammer"
							],
							"Mamar",
							["Hammer", "Super Hammer", "Ultra Hammer", "Bombette"]
						]
					}
				}
			},
			"Stone Cactus": {
				row: 4,
				col: 5,
				checks: {
					"[Panel] Below stone cactus": {
						reqs: [
							[
								logic.startingLocation("Dry Dry Outpost"),
								["Bombette", "Parakarry"],
								"Super Hammer",
								"Ultra Hammer"
							],
							["Super Boots", "Ultra Boots", "Ultra Hammer"]
						]
					}
				}
			},
			Mouse: {
				row: 4,
				col: 6,
				checks: {
					"[Letter] Nomadimouse": {
						reqs: [
							[
								logic.startingLocation("Dry Dry Outpost"),
								"Bombette",
								"Super Hammer",
								"Ultra Hammer"
							],
							"Nomadimouse",
							"Parakarry"
						]
					},
					"[Foliage Coin] Tree": {
						reqs: [
							[
								logic.startingLocation("Dry Dry Outpost"),
								["Bombette", "Parakarry"],
								"Super Hammer",
								"Ultra Hammer"
							],
							["Hammer", "Super Hammer", "Ultra Hammer", "Bombette"]
						]
					}
				}
			},
			"Far Left Tree": { row: 4, col: 7, checks: {} },
			"Outside Outpost": {
				row: 4,
				col: 8,
				checks: {
					"Far right tree": {
						reqs: [
							[
								logic.startingLocation("Dry Dry Outpost"),
								["Bombette", "Parakarry"],
								"Super Hammer",
								"Ultra Hammer"
							],
							["Hammer", "Super Hammer", "Ultra Hammer", "Bombette"]
						]
					},
					"[Foliage Coin] Far left tree": {
						reqs: [
							[
								logic.startingLocation("Dry Dry Outpost"),
								["Bombette", "Parakarry"],
								"Super Hammer",
								"Ultra Hammer"
							],
							["Hammer", "Super Hammer", "Ultra Hammer", "Bombette"]
						]
					},
					"[Foliage Coin] Second tree from left": {
						reqs: [
							[
								logic.startingLocation("Dry Dry Outpost"),
								["Bombette", "Parakarry"],
								"Super Hammer",
								"Ultra Hammer"
							],
							["Hammer", "Super Hammer", "Ultra Hammer", "Bombette"]
						]
					},
					"[Foliage Coin] Fourth tree from right": {
						reqs: [
							[
								logic.startingLocation("Dry Dry Outpost"),
								["Bombette", "Parakarry"],
								"Super Hammer",
								"Ultra Hammer"
							],
							["Hammer", "Super Hammer", "Ultra Hammer", "Bombette"]
						]
					}
				}
			},
			"Dry Dry Outpost West": {
				row: 4,
				col: 9,
				checks: {
					"[Shop] 3 randomized items in Shop (password items are guaranteed vanilla)":
						{
							reqs: [
								[
									logic.startingLocation("Dry Dry Outpost"),
									["Bombette", "Parakarry"],
									"Super Hammer",
									"Ultra Hammer"
								]
							]
						},
					"[Letter] Shop (Chain)": {
						reqs: [
							[
								logic.startingLocation("Dry Dry Outpost"),
								"Bombette",
								"Super Hammer",
								"Ultra Hammer"
							],
							"Dry Dry Shop",
							"Parakarry"
						]
					},
					"[Koot] Buy Dusty Hammer, Dried Pasta, Dusty Hammer, Dried Shroom": {
						reqs: [
							[
								logic.startingLocation("Dry Dry Outpost"),
								["Bombette", "Parakarry"],
								"Super Hammer",
								"Ultra Hammer"
							]
						]
					},
					"Turn in Lyrics at far right house": {
						reqs: [
							[
								logic.startingLocation("Dry Dry Outpost"),
								["Bombette", "Parakarry"],
								"Super Hammer",
								"Ultra Hammer"
							],
							"Lyrics"
						]
					},
					"[Foliage Coin] Red tree": {
						reqs: [
							[
								logic.startingLocation("Dry Dry Outpost"),
								["Bombette", "Parakarry"],
								"Super Hammer",
								"Ultra Hammer"
							],
							["Hammer", "Super Hammer", "Ultra Hammer", "Bombette"]
						]
					}
				}
			},
			"Dry Dry Outpost East": {
				row: 4,
				col: 10,
				checks: {
					"[Panel] On rooftops": {
						reqs: [
							[
								logic.startingLocation("Dry Dry Outpost"),
								["Bombette", "Parakarry"],
								"Super Hammer",
								"Ultra Hammer"
							],
							["Super Boots", "Ultra Boots", "Ultra Hammer"]
						]
					},
					"[Letter] Mr. E (Chain)": {
						reqs: [
							[
								logic.startingLocation("Dry Dry Outpost"),
								"Bombette",
								"Super Hammer",
								"Ultra Hammer"
							],
							"Mr. E",
							"Parakarry"
						]
					},
					"[Koot] Talk to Merlee after Merluvlee requests Crystal Ball": {
						reqs: [
							[
								logic.startingLocation("Dry Dry Outpost"),
								["Bombette", "Parakarry"],
								"Super Hammer",
								"Ultra Hammer"
							],
							["Hammer", "Super Hammer", "Ultra Hammer"],
							2,
							"Koopa Legends",
							"Sleepy Sheep",
							"Tape",
							"Koopa Tea",
							"Luigi's Autograph",
							"Wallet",
							"Tasty Tonic"
						]
					},
					"Item on rooftops": {
						reqs: [
							[
								logic.startingLocation("Dry Dry Outpost"),
								["Bombette", "Parakarry"],
								"Super Hammer",
								"Ultra Hammer"
							]
						]
					},
					"Talk to Moustafa after buying Dried Shroom + Dusty Hammer": {
						reqs: [
							[
								logic.startingLocation("Dry Dry Outpost"),
								["Bombette", "Parakarry"],
								"Super Hammer",
								"Ultra Hammer"
							]
						]
					}
				}
			},
			"? Block": {
				row: 7,
				col: 6,
				checks: {
					"[Coin Block] ? Block in middle of room": {
						reqs: [
							[
								logic.startingLocation("Dry Dry Outpost"),
								["Bombette", "Parakarry"],
								"Super Hammer",
								"Ultra Hammer"
							],
							[
								"Hammer",
								"Super Hammer",
								"Ultra Hammer",
								"Super Boots",
								"Ultra Boots",
								"Bombette",
								"Kooper"
							]
						]
					}
				}
			},
			"Green Cactus": {
				row: 5,
				col: 5,
				checks: {
					"[Coin Block] ? Block in middle of room": {
						reqs: [
							[
								logic.startingLocation("Dry Dry Outpost"),
								["Bombette", "Parakarry"],
								"Super Hammer",
								"Ultra Hammer"
							],
							[
								"Hammer",
								"Super Hammer",
								"Ultra Hammer",
								"Super Boots",
								"Ultra Boots",
								"Bombette",
								"Kooper"
							]
						]
					}
				}
			},
			"Spin Attack": {
				row: 5,
				col: 7,
				checks: {
					"Item on ledge (take Tweester in room down left from here)": {
						reqs: [
							[
								logic.startingLocation("Dry Dry Outpost"),
								["Bombette", "Parakarry"],
								"Super Hammer",
								"Ultra Hammer"
							]
						]
					},
					"Item on brick block, requires Kooper or Ultra Boots": {
						reqs: [
							[
								logic.startingLocation("Dry Dry Outpost"),
								["Bombette", "Parakarry"],
								"Super Hammer",
								"Ultra Hammer"
							],
							["Kooper", "Ultra Boots"]
						]
					}
				}
			},
			"Life Shroom": {
				row: 5,
				col: 8,
				checks: {
					"[Coin Block] ? Block in middle of room": {
						reqs: [
							[
								logic.startingLocation("Dry Dry Outpost"),
								["Bombette", "Parakarry"],
								"Super Hammer",
								"Ultra Hammer"
							],
							[
								"Hammer",
								"Super Hammer",
								"Ultra Hammer",
								"Super Boots",
								"Ultra Boots",
								"Bombette",
								"Kooper"
							]
						]
					},
					"Hidden block directly above other ? Block": {
						reqs: [
							[
								logic.startingLocation("Dry Dry Outpost"),
								["Bombette", "Parakarry"],
								"Super Hammer",
								"Ultra Hammer"
							]
						]
					},
					"[Foliage Coin] Bottom tree": {
						reqs: [
							[
								logic.startingLocation("Dry Dry Outpost"),
								["Bombette", "Parakarry"],
								"Super Hammer",
								"Ultra Hammer"
							],
							["Hammer", "Super Hammer", "Ultra Hammer", "Bombette"]
						]
					}
				}
			},
			"Before Oasis": {
				row: 6,
				col: 7,
				checks: {
					"Item behind bush on right side of room": {
						reqs: [
							[
								logic.startingLocation("Dry Dry Outpost"),
								["Bombette", "Parakarry"],
								"Super Hammer",
								"Ultra Hammer"
							]
						]
					},
					"[Foliage Coin] Tree": {
						reqs: [
							[
								logic.startingLocation("Dry Dry Outpost"),
								["Bombette", "Parakarry"],
								"Super Hammer",
								"Ultra Hammer"
							],
							["Hammer", "Super Hammer", "Ultra Hammer", "Bombette"]
						]
					}
				}
			},
			Oasis: {
				row: 6,
				col: 8,
				checks: {
					"Lemon Tree": {
						reqs: [
							[
								logic.startingLocation("Dry Dry Outpost"),
								["Bombette", "Parakarry"],
								"Super Hammer",
								"Ultra Hammer"
							],
							["Hammer", "Super Hammer", "Ultra Hammer", "Bombette"]
						]
					},
					"Lime Tree": {
						reqs: [
							[
								logic.startingLocation("Dry Dry Outpost"),
								["Bombette", "Parakarry"],
								"Super Hammer",
								"Ultra Hammer"
							],
							["Hammer", "Super Hammer", "Ultra Hammer", "Bombette"]
						]
					},
					"[Foliage Coin] Far left tree": {
						reqs: [
							[
								logic.startingLocation("Dry Dry Outpost"),
								["Bombette", "Parakarry"],
								"Super Hammer",
								"Ultra Hammer"
							],
							["Hammer", "Super Hammer", "Ultra Hammer", "Bombette"]
						]
					},
					"[Foliage Coin] Bottom right tree": {
						reqs: [
							[
								logic.startingLocation("Dry Dry Outpost"),
								["Bombette", "Parakarry"],
								"Super Hammer",
								"Ultra Hammer"
							],
							["Hammer", "Super Hammer", "Ultra Hammer", "Bombette"]
						]
					}
				}
			},
			"Attack FX C": {
				row: 7,
				col: 3,
				checks: {
					"Hidden block in middle of room": {
						reqs: [
							[
								logic.startingLocation("Dry Dry Outpost"),
								["Bombette", "Parakarry"],
								"Super Hammer",
								"Ultra Hammer"
							]
						]
					}
				}
			},
			"Six Multicoin Blocks": {
				row: 7,
				col: 8,
				checks: {
					"[Foliage Coin] Far right tree": {
						reqs: [
							[
								logic.startingLocation("Dry Dry Outpost"),
								["Bombette", "Parakarry"],
								"Super Hammer",
								"Ultra Hammer"
							],
							["Hammer", "Super Hammer", "Ultra Hammer", "Bombette"]
						]
					}
				}
			}
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
			{ row: 3, col: 7 },
			{ row: 4, col: 3 },
			{ row: 4, col: 4 },
			{ row: 5, col: 2 },
			{ row: 5, col: 3 },
			{ row: 5, col: 4 },
			{ row: 5, col: 6 },
			{ row: 6, col: 2 },
			{ row: 6, col: 3 },
			{ row: 6, col: 4 },
			{ row: 6, col: 5 },
			{ row: 6, col: 6 },
			{ row: 7, col: 2 },
			{ row: 7, col: 4 },
			{ row: 7, col: 5 },
			{ row: 7, col: 7 }
		]
	},
	"Dry Dry Ruins": {
		areas: {
			"Pokey Hall": {
				row: 1,
				col: 3,
				rowSpan: 2,
				checks: {
					"Inside middle coffin": {
						reqs: [
							[
								logic.startingLocation("Dry Dry Outpost"),
								["Bombette", "Parakarry"],
								"Super Hammer",
								"Ultra Hammer"
							],
							"Pulse Stone"
						]
					}
				}
			},
			"Sand Switch Room 1": {
				row: 1,
				col: 4,
				checks: {}
			},
			"Sand Switch Room 2": {
				row: 1,
				col: 6,
				checks: {
					"Bottom right corner after lowering sand": {
						reqs: ["Bombette", "Parakarry", "Pulse Stone", "Ruins Key"]
					}
				}
			},
			"West Hub": { row: 3, col: 3, rowSpan: 2, checks: {} },
			"East Hub": { row: 1, col: 5, rowSpan: 3, checks: {} },
			"Ruins Entrance": { row: 2, col: 2, checks: {} },
			"Sand Room": {
				row: 2,
				col: 4,
				checks: {
					"Item on elevated platform": {
						reqs: [
							[
								logic.startingLocation("Dry Dry Outpost"),
								["Bombette", "Parakarry"],
								"Super Hammer",
								"Ultra Hammer"
							],
							"Pulse Stone",
							"Ruins Key"
						]
					}
				}
			},
			"Key Room": {
				row: 2,
				col: 6,
				checks: {
					"Item on elevated platform": {
						reqs: ["Bombette", "Parakarry", "Pulse Stone", "Ruins Key"]
					}
				}
			},
			"Super Hammer Room": {
				row: 3,
				col: 2,
				checks: {
					"Item in chest behind wall on ledge above Super Hammer chest": {
						reqs: [
							[
								logic.startingLocation("Dry Dry Outpost"),
								"Bombette",
								"Super Hammer",
								"Ultra Hammer"
							],
							"Pulse Stone",
							"Parakarry",
							logic.multipleItemCheck("Ruins Key", 3)
						]
					},
					"Super Hammer chest": {
						reqs: [
							[
								logic.startingLocation("Dry Dry Outpost"),
								"Bombette",
								"Super Hammer",
								"Ultra Hammer"
							],
							"Pulse Stone",
							"Parakarry",
							logic.multipleItemCheck("Ruins Key", 3)
						]
					}
				}
			},
			"Pokey Room": {
				row: 3,
				col: 4,
				checks: {
					"Defeat all three Pokey's after hitting ? Block": {
						reqs: [
							[
								logic.startingLocation("Dry Dry Outpost"),
								["Bombette", "Parakarry"],
								"Super Hammer",
								"Ultra Hammer"
							],
							"Pulse Stone",
							logic.multipleItemCheck("Ruins Key", 2)
						]
					},
					"On ledge behind hammer block": {
						reqs: [
							[
								logic.startingLocation("Dry Dry Outpost"),
								["Bombette", "Parakarry"],
								"Super Hammer",
								"Ultra Hammer"
							],
							"Pulse Stone",
							"Parakarry",
							logic.multipleItemCheck("Ruins Key", 3)
						]
					}
				}
			},
			"Chomp Room 2": {
				row: 3,
				col: 6,
				checks: {
					"Item on pedestal": {
						reqs: [
							[
								logic.startingLocation("Dry Dry Outpost"),
								["Bombette", "Parakarry"],
								"Super Hammer",
								"Ultra Hammer"
							],
							"Pulse Stone",
							"Parakarry",
							logic.multipleItemCheck("Ruins Key", 3)
						]
					}
				}
			},
			"Chomp Room 3": {
				row: 5,
				col: 7,
				checks: {
					"Item on pedestal": {
						reqs: [
							[
								logic.startingLocation("Dry Dry Outpost"),
								["Bombette", "Parakarry"],
								"Super Hammer",
								"Ultra Hammer"
							],
							"Pulse Stone",
							"Parakarry",
							logic.multipleItemCheck("Ruins Key", 4)
						]
					}
				}
			},
			"Chomp Room 1": {
				row: 7,
				col: 1,
				checks: {
					"Item on pedestal": {
						reqs: [
							[
								logic.startingLocation("Dry Dry Outpost"),
								["Bombette", "Parakarry"],
								"Super Hammer",
								"Ultra Hammer"
							],
							"Pulse Stone",
							logic.multipleItemCheck("Ruins Key", 3)
						]
					}
				}
			},
			"Ruins Spring Room": { row: 4, col: 2, rowSpan: 4, checks: {} },
			"Puzzle Room": { row: 4, col: 4, rowSpan: 2, colSpan: 2, checks: {} },
			"Puzzle Solution Room": { row: 4, col: 6, checks: {} },
			"Wall Stairs": {
				row: 5,
				col: 6,
				rowSpan: 3,
				checks: {
					"Item on ledge, reachable by breaking block and hitting switch": {
						reqs: [
							[
								logic.startingLocation("Dry Dry Outpost"),
								["Bombette", "Parakarry"],
								"Super Hammer",
								"Ultra Hammer"
							],
							"Pulse Stone",
							logic.multipleItemCheck("Ruins Key", 3)
						]
					}
				}
			},
			"Heart Block": { row: 6, col: 4, checks: {} },
			"Boss Room": {
				row: 6,
				col: 5,
				checks: {
					Mamar: {
						reqs: chapterRewardReqs.Mamar
					}
				}
			},
			"Beetle Room": { row: 7, col: 3, colSpan: 3, checks: {} }
		}
	},
	"Forever Forest": {
		areas: {
			"HP Plus": {
				row: 2,
				col: 5,
				checks: { "? Block": { reqs: null } }
			},
			"Oaklie Room": { row: 2, col: 7, checks: {} },
			"Forest Room 2": { row: 2, col: 9, checks: {} },
			"Forest Room 5": { row: 4, col: 5, checks: {} },
			"Forest Seed Room": {
				row: 4,
				col: 7,
				checks: { "Bub-ulb": { reqs: null } }
			},
			"Forest Entrance": { row: 4, col: 9, checks: {} },
			"FP Plus": {
				row: 6,
				col: 1,
				checks: { "? Block": { reqs: null } }
			},
			"Forest Room 7": { row: 6, col: 3, checks: {} },
			"Forest Room 6": { row: 6, col: 5, checks: {} }
		}
	},
	"Boo's Mansion": {
		areas: {
			"Bow's Room": {
				row: 1,
				col: 1,
				colSpan: 4,
				checks: { Bow: { reqs: ["Boo's Portrait"] } }
			},
			"Weight Room": {
				row: 2,
				col: 1,
				checks: { "Chest guarded by Boo": { reqs: ["Record"] } }
			},
			"Main Room": {
				row: 2,
				col: 2,
				rowSpan: 2,
				colSpan: 2,
				checks: {
					"[Panel] By couch": {
						reqs: [["Super Boots", "Ultra Boots", "Ultra Hammer"]]
					},
					"[Letter] Franky (Chain)": {
						reqs: [
							"Franky (Boo's Mansion Entrance)",
							"Boo's Portrait",
							"Parakarry"
						]
					},
					"[Koot] Talk to Franky after Koopa Koot requests the Old Photo": {
						reqs: [
							["Hammer", "Super Hammer", "Ultra Hammer"],
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
							"Bombette"
						]
					}
				}
			},
			"Record Room": {
				row: 2,
				col: 4,
				checks: {
					"[Panel] Middle of room": {
						reqs: [["Super Boots", "Ultra Boots", "Ultra Hammer"]]
					},
					"Open middle cabinets and do minigame": { reqs: null }
				}
			},
			"Trap Chest": {
				row: 3,
				col: 1,
				rowSpan: 3,
				checks: {
					"[Panel] In front of grandfather clock downstairs": {
						reqs: [
							[
								"Weight",
								["Super Boots", "Bombette"],
								["Ultra Boots", "Bombette"]
							],
							["Super Boots", "Ultra Boots", "Ultra Hammer"]
						]
					}
				}
			},
			"Pixel Mario Room": {
				row: 3,
				col: 4,
				rowSpan: 2,
				checks: {
					"Left crate on right side of room": {
						reqs: [["Super Boots", "Ultra Boots"]]
					},
					"Right crate on right side of room under other crate": {
						reqs: [["Super Boots", "Ultra Boots"]]
					}
				}
			},
			"Outside Boo's Mansion": {
				row: 4,
				col: 2,
				colSpan: 2,
				checks: {
					"? Block before gate": { reqs: null },
					"Right bush before Gusty Gulch": { reqs: null }
				}
			},
			Library: {
				row: 5,
				col: 2,
				colSpan: 3,
				checks: {
					"Item on right bookshelf": {
						reqs: [["Super Boots", "Ultra Boots"], "Parakarry"]
					},
					"Bottom crate": { reqs: [["Super Boots", "Ultra Boots"]] }
				}
			},
			"Above Shop": {
				row: 6,
				col: 1,
				checks: {
					"Right crate on left side of room": {
						reqs: [
							["Super Boots", "Ultra Boots"],
							["Weight", "Bombette"]
						]
					}
				}
			},
			"Super Boots Room": {
				row: 6,
				col: 2,
				checks: {
					"Super Boots chest": {
						reqs: [
							[
								"Weight",
								["Super Boots", "Bombette"],
								["Ultra Boots", "Bombette"]
							]
						]
					},
					"[Panel] On left near Boo": {
						reqs: [
							["Super Boots", "Ultra Boots", "Ultra Hammer"],
							[
								"Weight",
								["Super Boots", "Bombette"],
								["Ultra Boots", "Bombette"]
							]
						]
					},
					"Bottom left crate": {
						reqs: [
							["Super Boots", "Ultra Boots"],
							["Weight", "Bombette"]
						]
					}
				}
			},
			Shop: {
				row: 7,
				col: 1,
				colSpan: 2,
				checks: {
					"[Shop] 6 items in Shop": {
						reqs: [
							["Super Boots", "Ultra Boots"],
							["Weight", "Bombette"],
							"Boo's Portrait"
						]
					},
					"[Letter] Igor": {
						reqs: [
							["Super Boots", "Ultra Boots"],
							["Weight", "Bombette"],
							"Igor (Boo's Mansion Shop)",
							"Parakarry"
						]
					}
				}
			}
		}
	},
	"Gusty Gulch": {
		areas: {
			Gate: {
				row: 1,
				col: 1,
				checks: {
					"[Panel] Near gate": {
						reqs: [
							"Boo's Portrait",
							["Super Boots", "Ultra Boots", "Ultra Hammer"]
						]
					}
				}
			},
			Windmill: {
				row: 1,
				col: 2,
				checks: {
					Skolar: {
						reqs: chapterRewardReqs.Skolar
					}
				}
			},
			"Village 1": {
				row: 1,
				col: 3,
				checks: {
					"[Coin Block] Block in far right house": {
						reqs: ["Boo's Portrait"]
					},
					"[Koot] Talk to Boo near Save Block after Koopa Koot requests a Package":
						{
							reqs: [
								["Hammer", "Super Hammer", "Ultra Hammer"],
								"Boo's Portrait",
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
								"Kooky Cookie"
							]
						}
				}
			},
			"Village 2": { row: 1, col: 4, checks: {} },
			"Gulch 1": {
				row: 1,
				col: 5,
				checks: {
					"[Coin Block] First ? Block": {
						reqs: ["Boo's Portrait"]
					},
					"[Coin Block] Upper ? Block near goomba": {
						reqs: ["Boo's Portrait"]
					},
					"Item on ledge (use Kooper)": {
						reqs: ["Boo's Portrait", "Kooper"]
					},
					"? Block in middle near goomba": {
						reqs: ["Boo's Portrait"]
					},
					"Item in front of log": { reqs: ["Boo's Portrait"] }
				}
			},
			"Gulch 2": {
				row: 1,
				col: 6,
				checks: {
					"[Coin Block] ? Block by exit": {
						reqs: ["Boo's Portrait", "Parakarry"]
					},
					"? Block by goomba": {
						reqs: ["Boo's Portrait", "Parakarry"]
					},
					"Item behind rock near exit": {
						reqs: ["Boo's Portrait", "Parakarry"]
					}
				}
			},
			"Outside Tubba's Castle": { row: 1, col: 7, checks: {} }
		}
	},
	"Tubba's Castle": {
		areas: {
			"Sleeping Clubba's": {
				row: 1,
				col: 3,
				checks: {
					"Item at end of hall": {
						reqs: [
							"Boo's Portrait",
							"Parakarry",
							logic.multipleItemCheck("Tubba Castle Key", 2)
						]
					}
				}
			},
			"Stairwell 1": {
				row: 6,
				col: 1,
				rowSpan: 2,
				checks: {}
			},
			"Stairwell 3": {
				row: 2,
				col: 1,
				rowSpan: 3,
				checks: {
					"? Block at bottom of staircase": {
						reqs: [
							"Boo's Portrait",
							"Parakarry",
							logic.multipleItemCheck("Tubba Castle Key", 2)
						]
					}
				}
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
						reqs: ["Boo's Portrait", "Parakarry", "Tubba Castle Key"]
					},
					"Behind wall on shelf at left side of room": {
						reqs: ["Boo's Portrait", "Parakarry", "Tubba Castle Key"]
					}
				}
			},
			"Spike Room": {
				row: 3,
				col: 3,
				checks: {
					Chest: {
						reqs: [
							"Boo's Portrait",
							"Parakarry",
							"Tubba Castle Key",
							["Bow", "Lakilester"]
						]
					}
				}
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
					"On table": { reqs: ["Boo's Portrait", "Parakarry"] }
				}
			},
			"Spring Room": {
				row: 5,
				col: 4,
				checks: {
					"On left side, break panels in room above behind bombable wall": {
						reqs: [
							"Boo's Portrait",
							"Parakarry",
							"Tubba Castle Key",
							"Bombette",
							["Super Boots", "Ultra Boots"]
						]
					}
				}
			},
			Table: {
				row: 6,
				col: 2,
				checks: {
					"On table, fall down from above": {
						reqs: ["Boo's Portrait", "Parakarry", "Tubba Castle Key"]
					}
				}
			},
			"Basement Chest": {
				row: 7,
				col: 2,
				checks: {
					Chest: {
						reqs: [
							"Boo's Portrait",
							"Parakarry",
							["Super Boots", "Ultra Boots"]
						]
					}
				}
			}
		}
	},
	"Shy Guy's Toybox": {
		areas: {
			Playroom: {
				row: 1,
				col: 1,
				checks: {
					"Left hidden block": { reqs: [logic.toyboxAccess] },
					"Right hidden block": { reqs: [logic.toyboxAccess] },
					"Items held by Shy Guys (all of them)": {
						reqs: [logic.toyboxAccess]
					}
				}
			},
			"Anti Guy": {
				row: 1,
				col: 2,
				checks: {
					"[Coin Block] ? Block on left side": {
						reqs: [logic.toyboxAccess]
					},
					"Anti Guy Chest (in logic if you can make a Lemon Candy [Lemon + Cake Mix])":
						{
							reqs: [logic.toyboxAccess]
						},
					"Hidden block on right side": {
						reqs: [logic.toyboxAccess]
					}
				}
			},
			"Blue Station": {
				row: 1,
				col: 3,
				checks: {
					"[Panel] In front of station": {
						reqs: [
							logic.toyboxAccess,
							["Super Boots", "Ultra Boots", "Ultra Hammer"]
						]
					},
					"Hidden block on right side": {
						reqs: [logic.toyboxAccess]
					}
				}
			},
			"Block City": {
				row: 1,
				col: 4,
				checks: {
					"[Coinsanity] 3 items on left spring": {
						reqs: [
							logic.toyboxAccess,
							[
								"Hammer",
								"Super Hammer",
								"Ultra Hammer",
								"Super Boots",
								"Ultra Boots"
							]
						]
					},
					"[Coinsanity] 5 items on elevated spring": {
						reqs: [
							logic.toyboxAccess,
							[
								"Hammer",
								"Super Hammer",
								"Ultra Hammer",
								"Super Boots",
								"Ultra Boots"
							]
						]
					},
					"[Coin Block] ? Block on left side of wall": {
						reqs: [
							logic.toyboxAccess,
							[
								"Hammer",
								"Super Hammer",
								"Ultra Hammer",
								"Super Boots",
								"Ultra Boots"
							]
						]
					},
					"[Coin Block] ? Block on right side of wall that can be jumped across":
						{
							reqs: [
								logic.toyboxAccess,
								[
									"Hammer",
									"Super Hammer",
									"Ultra Hammer",
									"Super Boots",
									"Ultra Boots"
								]
							]
						},
					"Item behind fallen blocks": {
						reqs: [
							logic.toyboxAccess,
							[
								"Hammer",
								"Super Hammer",
								"Ultra Hammer",
								"Super Boots",
								"Ultra Boots"
							]
						]
					},
					"Item on roof of left house": {
						reqs: [
							logic.toyboxAccess,
							[
								"Hammer",
								"Super Hammer",
								"Ultra Hammer",
								"Super Boots",
								"Ultra Boots"
							],
							"Parakarry"
						]
					},
					"? Block on platform": {
						reqs: [
							logic.toyboxAccess,
							[
								"Hammer",
								"Super Hammer",
								"Ultra Hammer",
								"Super Boots",
								"Ultra Boots"
							]
						]
					},
					"Item that Kammy spawns": {
						reqs: [
							logic.toyboxAccess,
							[
								"Hammer",
								"Super Hammer",
								"Ultra Hammer",
								"Super Boots",
								"Ultra Boots"
							]
						]
					},
					Chest: {
						reqs: [
							logic.toyboxAccess,
							[
								"Hammer",
								"Super Hammer",
								"Ultra Hammer",
								"Super Boots",
								"Ultra Boots"
							]
						]
					}
				}
			},
			"Gourmet Guy": {
				row: 2,
				col: 1,
				checks: {
					"[Coin Block] Left ? Block": {
						reqs: [logic.toyboxAccess, "Toy Train", "Cake"]
					},
					"[Coin Block] Right ? Block": {
						reqs: [logic.toyboxAccess, "Toy Train", "Cake"]
					},
					"Give Cake to Gourmet Guy": {
						reqs: [logic.toyboxAccess, "Toy Train", "Cake"]
					},
					"Hidden block left after Gourmet Guy arch": {
						reqs: [logic.toyboxAccess, "Toy Train", "Cake"]
					},
					"Hidden block between two other ? Blocks": {
						reqs: [logic.toyboxAccess, "Toy Train", "Cake"]
					}
				}
			},
			"Tracks Hallway": {
				row: 2,
				col: 2,
				checks: {
					"[Coin Block] ? Block before Spy Guy": {
						reqs: [logic.toyboxAccess, "Toy Train"]
					},
					"[Coin Block] Left ? Block by Groove Guy": {
						reqs: [logic.toyboxAccess, "Toy Train", "Cake"]
					},
					"[Coin Block] Right ? Block by Groove Guy": {
						reqs: [logic.toyboxAccess, "Toy Train", "Cake"]
					}
				}
			},
			"Pink Station": {
				row: 2,
				col: 3,
				checks: {
					"[Panel] In front of station": {
						reqs: [
							logic.toyboxAccess,
							"Toy Train",
							["Super Boots", "Ultra Boots", "Ultra Hammer"]
						]
					},
					"Chest on right side": {
						reqs: [logic.toyboxAccess, "Toy Train"]
					},
					"Hidden block by pink switch": {
						reqs: [logic.toyboxAccess, "Toy Train", "Cake"]
					}
				}
			},
			Playhouse: {
				row: 2,
				col: 4,
				checks: {
					"[Coin Block] ? Block": {
						reqs: [
							logic.toyboxAccess,
							"Toy Train",
							[
								"Hammer",
								"Super Hammer",
								"Ultra Hammer",
								"Super Boots",
								"Ultra Boots"
							]
						]
					},
					"Chest on wall": {
						reqs: [
							logic.toyboxAccess,
							"Toy Train",
							[
								"Hammer",
								"Super Hammer",
								"Ultra Hammer",
								"Super Boots",
								"Ultra Boots"
							]
						]
					},
					"Chest after door": {
						reqs: [
							logic.toyboxAccess,
							"Toy Train",
							[
								"Hammer",
								"Super Hammer",
								"Ultra Hammer",
								"Super Boots",
								"Ultra Boots"
							]
						]
					},
					"Item that Kammy spawns": {
						reqs: [
							logic.toyboxAccess,
							"Toy Train",
							[
								"Hammer",
								"Super Hammer",
								"Ultra Hammer",
								"Super Boots",
								"Ultra Boots"
							]
						]
					},
					"Chest at end of room": {
						reqs: [
							logic.toyboxAccess,
							"Toy Train",
							[
								"Hammer",
								"Super Hammer",
								"Ultra Hammer",
								"Super Boots",
								"Ultra Boots"
							]
						]
					}
				}
			},
			"Green Station": {
				row: 3,
				col: 3,
				checks: {
					"[Panel] In front of station": {
						reqs: [
							logic.toyboxAccess,
							"Toy Train",
							"Cake",
							["Super Boots", "Ultra Boots", "Ultra Hammer"]
						]
					},
					"Hidden block in upper right corner": {
						reqs: [logic.toyboxAccess, "Toy Train", "Cake"]
					}
				}
			},
			Treadmill: {
				row: 3,
				col: 4,
				checks: {
					"[Coinsanity] 3 items on first treadmill": {
						reqs: [logic.toyboxAccess, "Toy Train", "Cake"]
					},
					"[Coinsanity] 3 items on second treadmill": {
						reqs: [logic.toyboxAccess, "Toy Train", "Cake"]
					},
					"[Coinsanity] Ring of coins inside fort after moving blocks": {
						reqs: ["Bow", "Toy Train", "Cake"]
					},
					"Item held by Shy Guy after treadmills": {
						reqs: ["Bow", "Toy Train", "Cake"]
					},
					"Middle item inside fort after moving blocks": {
						reqs: ["Bow", "Toy Train", "Cake"]
					},
					"Item that Kammy spawns": {
						reqs: ["Bow", "Toy Train", "Cake", "Parakarry"]
					},
					Chest: { reqs: ["Bow", "Toy Train", "Cake", "Parakarry"] }
				}
			},
			"Lantern Ghost": {
				row: 4,
				col: 1,
				checks: {
					Watt: {
						reqs: [
							logic.toyboxAccess,
							"Toy Train",
							"Cake",
							["Hammer", "Super Hammer", "Ultra Hammer"]
						]
					}
				}
			},
			"Toybox Moving Platforms": {
				row: 4,
				col: 2,
				checks: {
					"[Coin Block] Left ? Block": {
						reqs: [
							logic.toyboxAccess,
							"Toy Train",
							"Cake",
							["Hammer", "Super Hammer", "Ultra Hammer"]
						]
					},
					"[Coin Block] Right ? Block": {
						reqs: [
							logic.toyboxAccess,
							"Toy Train",
							"Cake",
							["Hammer", "Super Hammer", "Ultra Hammer"]
						]
					},
					"Hidden block by first elevator": {
						reqs: [
							logic.toyboxAccess,
							"Toy Train",
							"Cake",
							["Hammer", "Super Hammer", "Ultra Hammer"]
						]
					},
					"Hidden block between two other ? blocks": {
						reqs: [
							logic.toyboxAccess,
							"Toy Train",
							"Cake",
							["Hammer", "Super Hammer", "Ultra Hammer"]
						]
					},
					"Hidden block by door to Lantern Ghost room": {
						reqs: [
							logic.toyboxAccess,
							"Toy Train",
							"Cake",
							["Hammer", "Super Hammer", "Ultra Hammer"]
						]
					}
				}
			},
			"Red Station": {
				row: 4,
				col: 3,
				checks: {
					"[Panel] In front of station": {
						reqs: [
							logic.toyboxAccess,
							"Toy Train",
							"Cake",
							["Hammer", "Super Hammer", "Ultra Hammer"],
							["Super Boots", "Ultra Boots", "Ultra Hammer"]
						]
					},
					"Hidden block on left side": {
						reqs: [
							logic.toyboxAccess,
							"Toy Train",
							"Cake",
							["Hammer", "Super Hammer", "Ultra Hammer"]
						]
					}
				}
			},
			"Shy Guy Barricade": {
				row: 4,
				col: 4,
				checks: {
					"[Coin Block] ? Block just past barricade": {
						reqs: [
							logic.toyboxAccess,
							"Toy Train",
							"Cake",
							"Bombette",
							["Hammer", "Super Hammer", "Ultra Hammer"]
						]
					},
					"Item on top of brick block": {
						reqs: [
							logic.toyboxAccess,
							"Toy Train",
							"Cake",
							"Bombette",
							["Hammer", "Super Hammer", "Ultra Hammer"],
							["Kooper", "Ultra Boots"]
						]
					},
					"? Block at end of room": {
						reqs: [
							logic.toyboxAccess,
							"Toy Train",
							"Cake",
							"Bombette",
							["Hammer", "Super Hammer", "Ultra Hammer"]
						]
					}
				}
			},
			"Dark Room": { row: 4, col: 5, checks: {} },
			"General Guy": {
				row: 4,
				col: 6,
				checks: {
					Muskular: {
						reqs: chapterRewardReqs.Muskular
					}
				}
			}
		}
	},
	"Yoshi's Island": {
		areas: {
			"Ambush Room": {
				row: 1,
				col: 3,
				colSpan: 3,
				checks: {
					"[Panel] Near middle of room": {
						reqs: [
							[
								logic.startingLocation("Yoshi Village"),
								"Watt",
								logic.whaleOpen,
								["Super Boots", "Sushie"],
								["Ultra Boots", "Sushie"],
								["Odd Key", "Bombette"],
								[logic.blueHouseOpen, "Bombette"]
							],
							"Sushie",
							"Jade Raven",
							["Super Boots", "Ultra Boots", "Ultra Hammer"],
							["Hammer", "Super Hammer", "Ultra Hammer"]
						]
					},
					"[Foliage Coin] Far right tree": {
						reqs: [
							[
								logic.startingLocation("Yoshi Village"),
								"Watt",
								logic.whaleOpen,
								["Super Boots", "Sushie"],
								["Ultra Boots", "Sushie"],
								["Odd Key", "Bombette"],
								[logic.blueHouseOpen, "Bombette"]
							],
							"Sushie",
							"Jade Raven",
							["Hammer", "Super Hammer", "Ultra Hammer"]
						]
					}
				}
			},
			"Raph's Tree": {
				row: 1,
				col: 6,
				rowSpan: 6,
				checks: {
					"Item on the outside Raph's Tree": {
						reqs: [
							[
								logic.startingLocation("Yoshi Village"),
								"Watt",
								logic.whaleOpen,
								["Super Boots", "Sushie"],
								["Ultra Boots", "Sushie"],
								["Odd Key", "Bombette"],
								[logic.blueHouseOpen, "Bombette"]
							],
							"Sushie",
							"Jade Raven",
							["Hammer", "Super Hammer", "Ultra Hammer"]
						]
					},
					"Talk to Raphael at the top": {
						reqs: [
							[
								logic.startingLocation("Yoshi Village"),
								"Watt",
								logic.whaleOpen,
								["Super Boots", "Sushie"],
								["Ultra Boots", "Sushie"],
								["Odd Key", "Bombette"],
								[logic.blueHouseOpen, "Bombette"]
							],
							"Sushie",
							"Jade Raven",
							["Hammer", "Super Hammer", "Ultra Hammer"]
						]
					}
				}
			},
			"Vine Room": {
				row: 2,
				col: 3,
				checks: {
					"Second Tree vine": {
						reqs: [
							[
								logic.startingLocation("Yoshi Village"),
								"Watt",
								logic.whaleOpen,
								["Super Boots", "Sushie"],
								["Ultra Boots", "Sushie"],
								["Odd Key", "Bombette"],
								[logic.blueHouseOpen, "Bombette"]
							],
							"Sushie",
							"Jade Raven",
							["Hammer", "Super Hammer", "Ultra Hammer"]
						]
					},
					"Last Tree vine": {
						reqs: [
							[
								logic.startingLocation("Yoshi Village"),
								"Watt",
								logic.whaleOpen,
								["Super Boots", "Sushie"],
								["Ultra Boots", "Sushie"],
								["Odd Key", "Bombette"],
								[logic.blueHouseOpen, "Bombette"]
							],
							"Sushie",
							"Jade Raven",
							["Hammer", "Super Hammer", "Ultra Hammer"]
						]
					}
				}
			},
			"Block Puzzle": {
				row: 3,
				col: 3,
				checks: {
					"[Foliage Coin] Far left tree": {
						reqs: [
							[
								logic.startingLocation("Yoshi Village"),
								"Watt",
								logic.whaleOpen,
								["Super Boots", "Sushie"],
								["Ultra Boots", "Sushie"],
								["Odd Key", "Bombette"],
								[logic.blueHouseOpen, "Bombette"]
							],
							"Sushie",
							"Jade Raven",
							["Hammer", "Super Hammer", "Ultra Hammer"]
						]
					},
					"Hidden block near first push block": {
						reqs: [
							[
								logic.startingLocation("Yoshi Village"),
								"Watt",
								logic.whaleOpen,
								["Super Boots", "Sushie"],
								["Ultra Boots", "Sushie"],
								["Odd Key", "Bombette"],
								[logic.blueHouseOpen, "Bombette"]
							],
							"Sushie",
							"Jade Raven",
							["Hammer", "Super Hammer", "Ultra Hammer"]
						]
					}
				}
			},
			"Deep Jungle": {
				row: 4,
				col: 3,
				checks: {
					"Hidden block near bell plant": {
						reqs: [
							[
								logic.startingLocation("Yoshi Village"),
								"Watt",
								logic.whaleOpen,
								["Super Boots", "Sushie"],
								["Ultra Boots", "Sushie"],
								["Odd Key", "Bombette"],
								[logic.blueHouseOpen, "Bombette"]
							],
							"Sushie",
							"Jade Raven",
							["Hammer", "Super Hammer", "Ultra Hammer"]
						]
					},
					"Tree vine near bell plant": {
						reqs: [
							[
								logic.startingLocation("Yoshi Village"),
								"Watt",
								logic.whaleOpen,
								["Super Boots", "Sushie"],
								["Ultra Boots", "Sushie"],
								["Odd Key", "Bombette"],
								[logic.blueHouseOpen, "Bombette"]
							],
							"Sushie",
							"Jade Raven",
							["Hammer", "Super Hammer", "Ultra Hammer"]
						]
					},
					"[Foliage Coin] Tree near bell plant": {
						reqs: [
							[
								logic.startingLocation("Yoshi Village"),
								"Watt",
								logic.whaleOpen,
								["Super Boots", "Sushie"],
								["Ultra Boots", "Sushie"],
								["Odd Key", "Bombette"],
								[logic.blueHouseOpen, "Bombette"]
							],
							"Sushie",
							"Jade Raven",
							["Hammer", "Super Hammer", "Ultra Hammer"]
						]
					}
				}
			},
			"Light-Blue Yoshi": {
				row: 5,
				col: 1,
				checks: {
					"Item under water": {
						reqs: [
							[
								logic.startingLocation("Yoshi Village"),
								["Watt", "Hammer"],
								["Watt", "Super Hammer"],
								["Watt", "Ultra Hammer"],
								["Watt", "Super Boots"],
								["Watt", "Ultra Boots"],
								logic.whaleOpen,
								["Super Boots", "Sushie"],
								["Ultra Boots", "Sushie"],
								["Odd Key", "Bombette"],
								[logic.blueHouseOpen, "Bombette"]
							],
							"Sushie"
						]
					}
				}
			},
			"NW Jungle": {
				row: 5,
				col: 2,
				checks: {
					"Item in tree by right side exit": {
						reqs: [
							[
								logic.startingLocation("Yoshi Village"),
								["Watt", "Hammer"],
								["Watt", "Super Hammer"],
								["Watt", "Ultra Hammer"],
								["Watt", "Super Boots"],
								["Watt", "Ultra Boots"],
								logic.whaleOpen,
								["Super Boots", "Sushie"],
								["Ultra Boots", "Sushie"],
								["Odd Key", "Bombette"],
								[logic.blueHouseOpen, "Bombette"]
							],
							"Sushie",
							["Hammer", "Super Hammer", "Ultra Hammer", "Bombette"]
						]
					},
					"[Foliage Coin] Tree on ledge": {
						reqs: [
							[
								logic.startingLocation("Yoshi Village"),
								["Watt", "Hammer"],
								["Watt", "Super Hammer"],
								["Watt", "Ultra Hammer"],
								["Watt", "Super Boots"],
								["Watt", "Ultra Boots"],
								logic.whaleOpen,
								["Super Boots", "Sushie"],
								["Ultra Boots", "Sushie"],
								["Odd Key", "Bombette"],
								[logic.blueHouseOpen, "Bombette"]
							],
							"Sushie",
							["Hammer", "Super Hammer", "Ultra Hammer", "Bombette"]
						]
					},
					"[Foliage Coin] Second bush from right": {
						reqs: [
							[
								logic.startingLocation("Yoshi Village"),
								["Watt", "Hammer"],
								["Watt", "Super Hammer"],
								["Watt", "Ultra Hammer"],
								["Watt", "Super Boots"],
								["Watt", "Ultra Boots"],
								logic.whaleOpen,
								["Super Boots", "Sushie"],
								["Ultra Boots", "Sushie"],
								["Odd Key", "Bombette"],
								[logic.blueHouseOpen, "Bombette"]
							],
							"Sushie"
						]
					},
					"[Foliage Coin] Second bush from left": {
						reqs: [
							[
								logic.startingLocation("Yoshi Village"),
								["Watt", "Hammer"],
								["Watt", "Super Hammer"],
								["Watt", "Ultra Hammer"],
								["Watt", "Super Boots"],
								["Watt", "Ultra Boots"],
								logic.whaleOpen,
								["Super Boots", "Sushie"],
								["Ultra Boots", "Sushie"],
								["Odd Key", "Bombette"],
								[logic.blueHouseOpen, "Bombette"]
							],
							"Sushie"
						]
					}
				}
			},
			"NE Jungle": {
				row: 5,
				col: 3,
				checks: {
					"[Coinsanity] Item under water on right side of room": {
						reqs: [
							[
								logic.startingLocation("Yoshi Village"),
								"Watt",
								logic.whaleOpen,
								["Super Boots", "Sushie"],
								["Ultra Boots", "Sushie"],
								["Odd Key", "Bombette"],
								[logic.blueHouseOpen, "Bombette"]
							],
							"Sushie",
							["Hammer", "Super Hammer", "Ultra Hammer"]
						]
					},
					"[Foliage Coin] Tree near raven statue": {
						reqs: [
							[
								logic.startingLocation("Yoshi Village"),
								"Watt",
								logic.whaleOpen,
								["Super Boots", "Sushie"],
								["Ultra Boots", "Sushie"],
								["Odd Key", "Bombette"],
								[logic.blueHouseOpen, "Bombette"]
							],
							"Sushie",
							["Hammer", "Super Hammer", "Ultra Hammer"]
						]
					}
				}
			},
			"Yellow Yoshi": {
				row: 5,
				col: 4,
				checks: {
					"[Foliage Coin] Tree": {
						reqs: [
							[
								logic.startingLocation("Yoshi Village"),
								"Watt",
								logic.whaleOpen,
								["Super Boots", "Sushie"],
								["Ultra Boots", "Sushie"],
								["Odd Key", "Bombette"],
								[logic.blueHouseOpen, "Bombette"]
							],
							"Sushie",
							["Hammer", "Super Hammer", "Ultra Hammer"]
						]
					}
				}
			},
			Whale: {
				row: 6,
				col: 1,
				rowSpan: 2,
				checks: {
					"[Coinsanity] 2 items on spinning flower": {
						reqs: [
							[
								logic.startingLocation("Yoshi Village"),
								["Watt", "Hammer"],
								["Watt", "Super Hammer"],
								["Watt", "Ultra Hammer"],
								["Watt", "Super Boots"],
								["Watt", "Ultra Boots"],
								logic.whaleOpen,
								["Super Boots", "Sushie"],
								["Ultra Boots", "Sushie"],
								["Odd Key", "Bombette"],
								[logic.blueHouseOpen, "Bombette"]
							]
						]
					},
					"Coconut tree": {
						reqs: [
							[
								logic.startingLocation("Yoshi Village"),
								["Watt", "Hammer"],
								["Watt", "Super Hammer"],
								["Watt", "Ultra Hammer"],
								["Watt", "Super Boots"],
								["Watt", "Ultra Boots"],
								logic.whaleOpen,
								["Super Boots", "Sushie"],
								["Ultra Boots", "Sushie"],
								["Odd Key", "Bombette"],
								[logic.blueHouseOpen, "Bombette"]
							],
							["Hammer", "Super Hammer", "Ultra Hammer", "Bombette"]
						]
					},
					"Item behind bush near top of screen": {
						reqs: [
							[
								logic.startingLocation("Yoshi Village"),
								["Watt", "Hammer"],
								["Watt", "Super Hammer"],
								["Watt", "Ultra Hammer"],
								["Watt", "Super Boots"],
								["Watt", "Ultra Boots"],
								logic.whaleOpen,
								["Super Boots", "Sushie"],
								["Ultra Boots", "Sushie"],
								["Odd Key", "Bombette"],
								[logic.blueHouseOpen, "Bombette"]
							]
						]
					}
				}
			},
			"SW Jungle": {
				row: 6,
				col: 2,
				checks: {
					"[Coinsanity] Three items under water": {
						reqs: [
							[
								logic.startingLocation("Yoshi Village"),
								["Watt", "Hammer"],
								["Watt", "Super Hammer"],
								["Watt", "Ultra Hammer"],
								["Watt", "Super Boots"],
								["Watt", "Ultra Boots"],
								logic.whaleOpen,
								["Super Boots", "Sushie"],
								["Ultra Boots", "Sushie"],
								["Odd Key", "Bombette"],
								[logic.blueHouseOpen, "Bombette"]
							],
							"Sushie"
						]
					},
					"Hidden block near exit to NW Jungle": {
						reqs: [
							[
								logic.startingLocation("Yoshi Village"),
								["Watt", "Hammer"],
								["Watt", "Super Hammer"],
								["Watt", "Ultra Hammer"],
								["Watt", "Super Boots"],
								["Watt", "Ultra Boots"],
								logic.whaleOpen,
								["Super Boots", "Sushie"],
								["Ultra Boots", "Sushie"],
								["Odd Key", "Bombette"],
								[logic.blueHouseOpen, "Bombette"]
							],
							"Sushie"
						]
					},
					"[Foliage Coin] Tree near north exit": {
						reqs: [
							[
								logic.startingLocation("Yoshi Village"),
								["Watt", "Hammer"],
								["Watt", "Super Hammer"],
								["Watt", "Ultra Hammer"],
								["Watt", "Super Boots"],
								["Watt", "Ultra Boots"],
								logic.whaleOpen,
								["Super Boots", "Sushie"],
								["Ultra Boots", "Sushie"],
								["Odd Key", "Bombette"],
								[logic.blueHouseOpen, "Bombette"]
							],
							"Sushie",
							["Hammer", "Super Hammer", "Ultra Hammer", "Bombette"]
						]
					},
					"[Foliage Coin] Tree near Spear Guy": {
						reqs: [
							[
								logic.startingLocation("Yoshi Village"),
								["Watt", "Hammer"],
								["Watt", "Super Hammer"],
								["Watt", "Ultra Hammer"],
								["Watt", "Super Boots"],
								["Watt", "Ultra Boots"],
								logic.whaleOpen,
								["Super Boots", "Sushie"],
								["Ultra Boots", "Sushie"],
								["Odd Key", "Bombette"],
								[logic.blueHouseOpen, "Bombette"]
							],
							"Sushie",
							["Hammer", "Super Hammer", "Ultra Hammer", "Bombette"]
						]
					},
					"[Foliage Coin] Right bush near north exit": {
						reqs: [
							[
								logic.startingLocation("Yoshi Village"),
								["Watt", "Hammer"],
								["Watt", "Super Hammer"],
								["Watt", "Ultra Hammer"],
								["Watt", "Super Boots"],
								["Watt", "Ultra Boots"],
								logic.whaleOpen,
								["Super Boots", "Sushie"],
								["Ultra Boots", "Sushie"],
								["Odd Key", "Bombette"],
								[logic.blueHouseOpen, "Bombette"]
							],
							"Sushie"
						]
					},
					"[Foliage Coin] Bottom bush on left side": {
						reqs: [
							[
								logic.startingLocation("Yoshi Village"),
								["Watt", "Hammer"],
								["Watt", "Super Hammer"],
								["Watt", "Ultra Hammer"],
								["Watt", "Super Boots"],
								["Watt", "Ultra Boots"],
								logic.whaleOpen,
								["Super Boots", "Sushie"],
								["Ultra Boots", "Sushie"],
								["Odd Key", "Bombette"],
								[logic.blueHouseOpen, "Bombette"]
							],
							"Sushie"
						]
					}
				}
			},
			"SE Jungle": {
				row: 6,
				col: 3,
				colSpan: 2,
				checks: {
					"? Block on island": {
						reqs: [
							[
								logic.startingLocation("Yoshi Village"),
								["Watt", "Hammer"],
								["Watt", "Super Hammer"],
								["Watt", "Ultra Hammer"],
								["Watt", "Super Boots"],
								["Watt", "Ultra Boots"],
								logic.whaleOpen,
								["Super Boots", "Sushie"],
								["Ultra Boots", "Sushie"],
								["Odd Key", "Bombette"],
								[logic.blueHouseOpen, "Bombette"]
							],
							"Sushie"
						]
					},
					"[Foliage Coin] Far right tree": {
						reqs: [
							[
								logic.startingLocation("Yoshi Village"),
								["Watt", "Hammer"],
								["Watt", "Super Hammer"],
								["Watt", "Ultra Hammer"],
								["Watt", "Super Boots"],
								["Watt", "Ultra Boots"],
								logic.whaleOpen,
								["Super Boots", "Sushie"],
								["Ultra Boots", "Sushie"],
								["Odd Key", "Bombette"],
								[logic.blueHouseOpen, "Bombette"]
							],
							["Hammer", "Super Hammer", "Ultra Hammer", "Bombette"]
						]
					},
					"[Foliage Coin] Bottom left bush": {
						reqs: [
							[
								logic.startingLocation("Yoshi Village"),
								["Watt", "Hammer"],
								["Watt", "Super Hammer"],
								["Watt", "Ultra Hammer"],
								["Watt", "Super Boots"],
								["Watt", "Ultra Boots"],
								logic.whaleOpen,
								["Super Boots", "Sushie"],
								["Ultra Boots", "Sushie"],
								["Odd Key", "Bombette"],
								[logic.blueHouseOpen, "Bombette"]
							]
						]
					},
					"[Foliage Coin] Bottom right bush": {
						reqs: [
							[
								logic.startingLocation("Yoshi Village"),
								["Watt", "Hammer"],
								["Watt", "Super Hammer"],
								["Watt", "Ultra Hammer"],
								["Watt", "Super Boots"],
								["Watt", "Ultra Boots"],
								logic.whaleOpen,
								["Super Boots", "Sushie"],
								["Ultra Boots", "Sushie"],
								["Odd Key", "Bombette"],
								[logic.blueHouseOpen, "Bombette"]
							]
						]
					}
				}
			},
			"Sushie Room": {
				row: 6,
				col: 5,
				checks: {
					Sushie: {
						reqs: [
							[
								logic.startingLocation("Yoshi Village"),
								["Watt", "Hammer"],
								["Watt", "Super Hammer"],
								["Watt", "Ultra Hammer"],
								["Watt", "Super Boots"],
								["Watt", "Ultra Boots"],
								logic.whaleOpen,
								["Super Boots", "Sushie"],
								["Ultra Boots", "Sushie"],
								["Odd Key", "Bombette"],
								[logic.blueHouseOpen, "Bombette"]
							]
						]
					},
					"Item on top right island": {
						reqs: [
							[
								logic.startingLocation("Yoshi Village"),
								["Watt", "Hammer"],
								["Watt", "Super Hammer"],
								["Watt", "Ultra Hammer"],
								["Watt", "Super Boots"],
								["Watt", "Ultra Boots"],
								logic.whaleOpen,
								["Super Boots", "Sushie"],
								["Ultra Boots", "Sushie"],
								["Odd Key", "Bombette"],
								[logic.blueHouseOpen, "Bombette"]
							],
							"Sushie"
						]
					},
					"Item in tree on top right island": {
						reqs: [
							[
								logic.startingLocation("Yoshi Village"),
								["Watt", "Hammer"],
								["Watt", "Super Hammer"],
								["Watt", "Ultra Hammer"],
								["Watt", "Super Boots"],
								["Watt", "Ultra Boots"],
								logic.whaleOpen,
								["Super Boots", "Sushie"],
								["Ultra Boots", "Sushie"],
								["Odd Key", "Bombette"],
								[logic.blueHouseOpen, "Bombette"]
							],
							"Sushie"
						]
					},
					"Chest after saving Misstar": {
						reqs: [
							[
								logic.startingLocation("Yoshi Village"),
								["Watt", "Hammer"],
								["Watt", "Super Hammer"],
								["Watt", "Ultra Hammer"],
								["Watt", "Super Boots"],
								["Watt", "Ultra Boots"],
								logic.whaleOpen,
								["Super Boots", "Sushie"],
								["Ultra Boots", "Sushie"],
								["Odd Key", "Bombette"],
								[logic.blueHouseOpen, "Bombette"]
							],
							"Misstar"
						]
					}
				}
			},
			Beach: {
				row: 7,
				col: 2,
				checks: {
					"[Coinsanity] 2 items on spinning flower": {
						reqs: [
							[
								logic.startingLocation("Yoshi Village"),
								["Watt", "Hammer"],
								["Watt", "Super Hammer"],
								["Watt", "Ultra Hammer"],
								["Watt", "Super Boots"],
								["Watt", "Ultra Boots"],
								logic.whaleOpen,
								["Super Boots", "Sushie"],
								["Ultra Boots", "Sushie"],
								["Odd Key", "Bombette"],
								[logic.blueHouseOpen, "Bombette"]
							]
						]
					},
					"Coconut tree 1 (far left)": {
						reqs: [
							[
								logic.startingLocation("Yoshi Village"),
								["Watt", "Hammer"],
								["Watt", "Super Hammer"],
								["Watt", "Ultra Hammer"],
								["Watt", "Super Boots"],
								["Watt", "Ultra Boots"],
								logic.whaleOpen,
								["Super Boots", "Sushie"],
								["Ultra Boots", "Sushie"],
								["Odd Key", "Bombette"],
								[logic.blueHouseOpen, "Bombette"]
							],
							["Hammer", "Super Hammer", "Ultra Hammer", "Bombette"]
						]
					},
					"Coconut tree 2": {
						reqs: [
							[
								logic.startingLocation("Yoshi Village"),
								["Watt", "Hammer"],
								["Watt", "Super Hammer"],
								["Watt", "Ultra Hammer"],
								["Watt", "Super Boots"],
								["Watt", "Ultra Boots"],
								logic.whaleOpen,
								["Super Boots", "Sushie"],
								["Ultra Boots", "Sushie"],
								["Odd Key", "Bombette"],
								[logic.blueHouseOpen, "Bombette"]
							],
							["Hammer", "Super Hammer", "Ultra Hammer", "Bombette"]
						]
					},
					"Hidden block by bell plant": {
						reqs: [
							[
								logic.startingLocation("Yoshi Village"),
								["Watt", "Hammer"],
								["Watt", "Super Hammer"],
								["Watt", "Ultra Hammer"],
								["Watt", "Super Boots"],
								["Watt", "Ultra Boots"],
								logic.whaleOpen,
								["Super Boots", "Sushie"],
								["Ultra Boots", "Sushie"],
								["Odd Key", "Bombette"],
								[logic.blueHouseOpen, "Bombette"]
							]
						]
					},
					"Coconut tree 3": {
						reqs: [
							[
								logic.startingLocation("Yoshi Village"),
								["Watt", "Hammer"],
								["Watt", "Super Hammer"],
								["Watt", "Ultra Hammer"],
								["Watt", "Super Boots"],
								["Watt", "Ultra Boots"],
								logic.whaleOpen,
								["Super Boots", "Sushie"],
								["Ultra Boots", "Sushie"],
								["Odd Key", "Bombette"],
								[logic.blueHouseOpen, "Bombette"]
							],
							["Hammer", "Super Hammer", "Ultra Hammer", "Bombette"]
						]
					},
					"Item on rock formation": {
						reqs: [
							[
								logic.startingLocation("Yoshi Village"),
								["Watt", "Hammer"],
								["Watt", "Super Hammer"],
								["Watt", "Ultra Hammer"],
								["Watt", "Super Boots"],
								["Watt", "Ultra Boots"],
								logic.whaleOpen,
								["Super Boots", "Sushie"],
								["Ultra Boots", "Sushie"],
								["Odd Key", "Bombette"],
								[logic.blueHouseOpen, "Bombette"]
							]
						]
					},
					"Coconut tree 4": {
						reqs: [
							[
								logic.startingLocation("Yoshi Village"),
								["Watt", "Hammer"],
								["Watt", "Super Hammer"],
								["Watt", "Ultra Hammer"],
								["Watt", "Super Boots"],
								["Watt", "Ultra Boots"],
								logic.whaleOpen,
								["Super Boots", "Sushie"],
								["Ultra Boots", "Sushie"],
								["Odd Key", "Bombette"],
								[logic.blueHouseOpen, "Bombette"]
							],
							["Hammer", "Super Hammer", "Ultra Hammer", "Bombette"]
						]
					},
					"Coconut tree 5": {
						reqs: [
							[
								logic.startingLocation("Yoshi Village"),
								["Watt", "Hammer"],
								["Watt", "Super Hammer"],
								["Watt", "Ultra Hammer"],
								["Watt", "Super Boots"],
								["Watt", "Ultra Boots"],
								logic.whaleOpen,
								["Super Boots", "Sushie"],
								["Ultra Boots", "Sushie"],
								["Odd Key", "Bombette"],
								[logic.blueHouseOpen, "Bombette"]
							],
							["Hammer", "Super Hammer", "Ultra Hammer", "Bombette"]
						]
					},
					"Coconut tree 6 (last tree, 2 items)": {
						reqs: [
							[
								logic.startingLocation("Yoshi Village"),
								["Watt", "Hammer"],
								["Watt", "Super Hammer"],
								["Watt", "Ultra Hammer"],
								["Watt", "Super Boots"],
								["Watt", "Ultra Boots"],
								logic.whaleOpen,
								["Super Boots", "Sushie"],
								["Ultra Boots", "Sushie"],
								["Odd Key", "Bombette"],
								[logic.blueHouseOpen, "Bombette"]
							],
							["Hammer", "Super Hammer", "Ultra Hammer", "Bombette"]
						]
					}
				}
			},
			"West Village": {
				row: 7,
				col: 3,
				checks: {
					"[Panel] In front of raven statue": {
						reqs: [
							[
								logic.startingLocation("Yoshi Village"),
								"Watt",
								logic.whaleOpen,
								["Super Boots", "Sushie"],
								["Ultra Boots", "Sushie"],
								["Odd Key", "Bombette"],
								[logic.blueHouseOpen, "Bombette"]
							],
							["Super Boots", "Ultra Boots", "Ultra Hammer"]
						]
					},
					"Talk to Yoshi Chief after saving all the kids": {
						reqs: ["Watt", "Sushie", ["Hammer", "Super Hammer", "Ultra Hammer"]]
					},
					"Left Coconut tree": {
						reqs: [
							[
								logic.startingLocation("Yoshi Village"),
								["Watt", "Hammer"],
								["Watt", "Super Hammer"],
								["Watt", "Ultra Hammer"],
								["Watt", "Super Boots"],
								["Watt", "Ultra Boots"],
								logic.whaleOpen,
								["Super Boots", "Sushie"],
								["Ultra Boots", "Sushie"],
								["Odd Key", "Bombette"],
								[logic.blueHouseOpen, "Bombette"]
							],
							["Hammer", "Super Hammer", "Ultra Hammer", "Bombette"]
						]
					},
					"Right Coconut tree": {
						reqs: [
							[
								logic.startingLocation("Yoshi Village"),
								["Watt", "Hammer"],
								["Watt", "Super Hammer"],
								["Watt", "Ultra Hammer"],
								["Watt", "Super Boots"],
								["Watt", "Ultra Boots"],
								logic.whaleOpen,
								["Super Boots", "Sushie"],
								["Ultra Boots", "Sushie"],
								["Odd Key", "Bombette"],
								[logic.blueHouseOpen, "Bombette"]
							],
							["Hammer", "Super Hammer", "Ultra Hammer", "Bombette"]
						]
					}
				}
			},
			"East Village": {
				row: 7,
				col: 4,
				colSpan: 2,
				checks: {
					"[Shop] 6 items in Shop": {
						reqs: [
							[
								logic.startingLocation("Yoshi Village"),
								["Watt", "Hammer"],
								["Watt", "Super Hammer"],
								["Watt", "Ultra Hammer"],
								["Watt", "Super Boots"],
								["Watt", "Ultra Boots"],
								logic.whaleOpen,
								["Super Boots", "Sushie"],
								["Ultra Boots", "Sushie"],
								["Odd Key", "Bombette"],
								[logic.blueHouseOpen, "Bombette"]
							]
						]
					},
					"[Letter] Red Yoshi Kid (Chain)": {
						reqs: [
							[
								logic.startingLocation("Yoshi Village"),
								["Watt", "Hammer"],
								["Watt", "Super Hammer"],
								["Watt", "Ultra Hammer"],
								["Watt", "Super Boots"],
								["Watt", "Ultra Boots"],
								logic.whaleOpen,
								["Super Boots", "Sushie"],
								["Ultra Boots", "Sushie"],
								["Odd Key", "Bombette"],
								[logic.blueHouseOpen, "Bombette"]
							],
							"Red Yoshi Kid",
							"Parakarry"
						]
					},
					"Give a Tayce T. item to Yellow Adult Yoshi": {
						reqs: [
							"Watt",
							"Sushie",
							"Misstar",
							["Hammer", "Super Hammer", "Ultra Hammer"]
						]
					},
					"Give the volcano vase to Kolorado": {
						reqs: [
							"Watt",
							"Sushie",
							"Volcano Vase",
							"Misstar",
							["Hammer", "Super Hammer", "Ultra Hammer"]
						]
					},
					"Coconut tree on right side of room": {
						reqs: [
							[
								logic.startingLocation("Yoshi Village"),
								["Watt", "Hammer"],
								["Watt", "Super Hammer"],
								["Watt", "Ultra Hammer"],
								["Watt", "Super Boots"],
								["Watt", "Ultra Boots"],
								logic.whaleOpen,
								["Super Boots", "Sushie"],
								["Ultra Boots", "Sushie"],
								["Odd Key", "Bombette"],
								[logic.blueHouseOpen, "Bombette"]
							],
							["Hammer", "Super Hammer", "Ultra Hammer", "Bombette"]
						]
					}
				}
			},
			"Outside Volcano": {
				row: 7,
				col: 6,
				checks: {
					"Item behind large tree": {
						reqs: [
							[
								logic.startingLocation("Yoshi Village"),
								["Watt", "Hammer"],
								["Watt", "Super Hammer"],
								["Watt", "Ultra Hammer"],
								["Watt", "Super Boots"],
								["Watt", "Ultra Boots"],
								logic.whaleOpen,
								["Super Boots", "Sushie"],
								["Ultra Boots", "Sushie"],
								["Odd Key", "Bombette"],
								[logic.blueHouseOpen, "Bombette"]
							]
						]
					}
				}
			}
		}
	},
	"Mt. Lavalava": {
		areas: {
			"Mt. Lavalava Entrance": { row: 1, col: 2, checks: {} },
			"Sinking Platforms": { row: 1, col: 3, checks: {} },
			"Hub Room": {
				row: 1,
				col: 4,
				rowSpan: 3,
				checks: {
					"[Coin Block] ? Block 1": {
						reqs: [
							[
								logic.startingLocation("Yoshi Village"),
								"Watt",
								logic.whaleOpen,
								["Super Boots", "Sushie"],
								["Ultra Boots", "Sushie"],
								["Odd Key", "Bombette"],
								[logic.blueHouseOpen, "Bombette"]
							],
							"Sushie",
							"Jade Raven",
							["Hammer", "Super Hammer", "Ultra Hammer"]
						]
					},
					"[Coin Block] ? Block 2": {
						reqs: [
							[
								logic.startingLocation("Yoshi Village"),
								"Watt",
								logic.whaleOpen,
								["Super Boots", "Sushie"],
								["Ultra Boots", "Sushie"],
								["Odd Key", "Bombette"],
								[logic.blueHouseOpen, "Bombette"]
							],
							"Sushie",
							"Jade Raven",
							["Hammer", "Super Hammer", "Ultra Hammer"]
						]
					},
					"[Coin Block] ? Block 3": {
						reqs: [
							[
								logic.startingLocation("Yoshi Village"),
								"Watt",
								logic.whaleOpen,
								["Super Boots", "Sushie"],
								["Ultra Boots", "Sushie"],
								["Odd Key", "Bombette"],
								[logic.blueHouseOpen, "Bombette"]
							],
							"Sushie",
							"Jade Raven",
							["Hammer", "Super Hammer", "Ultra Hammer"]
						]
					},
					"[Coin Block] ? Block 4": {
						reqs: [
							[
								logic.startingLocation("Yoshi Village"),
								"Watt",
								logic.whaleOpen,
								["Super Boots", "Sushie"],
								["Ultra Boots", "Sushie"],
								["Odd Key", "Bombette"],
								[logic.blueHouseOpen, "Bombette"]
							],
							"Sushie",
							"Jade Raven",
							["Hammer", "Super Hammer", "Ultra Hammer"]
						]
					},
					"Item on top of brick block": {
						reqs: [
							[
								logic.startingLocation("Yoshi Village"),
								"Watt",
								logic.whaleOpen,
								["Super Boots", "Sushie"],
								["Ultra Boots", "Sushie"],
								["Odd Key", "Bombette"],
								[logic.blueHouseOpen, "Bombette"]
							],
							"Sushie",
							"Jade Raven",
							["Hammer", "Super Hammer", "Ultra Hammer"],
							["Kooper", "Ultra Boots"]
						]
					},
					"Item on platform halfway down second zip line": {
						reqs: [
							[
								logic.startingLocation("Yoshi Village"),
								"Watt",
								logic.whaleOpen,
								["Super Boots", "Sushie"],
								["Ultra Boots", "Sushie"],
								["Odd Key", "Bombette"],
								[logic.blueHouseOpen, "Bombette"]
							],
							"Sushie",
							"Jade Raven",
							["Hammer", "Super Hammer", "Ultra Hammer"]
						]
					}
				}
			},
			"Firebars + Upgrade": { row: 1, col: 5, checks: {} },
			Zipline: {
				row: 2,
				col: 5,
				rowSpan: 2,
				checks: {
					"[Panel] Right side of lower level": {
						reqs: [
							[
								logic.startingLocation("Yoshi Village"),
								"Watt",
								logic.whaleOpen,
								["Super Boots", "Sushie"],
								["Ultra Boots", "Sushie"],
								["Odd Key", "Bombette"],
								[logic.blueHouseOpen, "Bombette"]
							],
							"Sushie",
							"Jade Raven",
							["Hammer", "Super Hammer", "Ultra Hammer"],
							["Parakarry", "Lakilester"],
							["Super Boots", "Ultra Boots", "Ultra Hammer"]
						]
					}
				}
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
						reqs: [
							[
								logic.startingLocation("Yoshi Village"),
								"Watt",
								logic.whaleOpen,
								["Super Boots", "Sushie"],
								["Ultra Boots", "Sushie"],
								["Odd Key", "Bombette"],
								[logic.blueHouseOpen, "Bombette"]
							],
							"Sushie",
							"Jade Raven",
							["Hammer", "Super Hammer", "Ultra Hammer"],
							["Parakarry", "Lakilester"],
							["Super Boots", "Ultra Boots", "Ultra Hammer"]
						]
					}
				}
			},
			Deadend: {
				row: 2,
				col: 10,
				checks: {
					"Left ? Block": {
						reqs: [
							[
								logic.startingLocation("Yoshi Village"),
								"Watt",
								logic.whaleOpen,
								["Super Boots", "Sushie"],
								["Ultra Boots", "Sushie"],
								["Odd Key", "Bombette"],
								[logic.blueHouseOpen, "Bombette"]
							],
							"Sushie",
							"Jade Raven",
							["Hammer", "Super Hammer", "Ultra Hammer"],
							["Parakarry", "Lakilester"]
						]
					},
					"Right ? Block": {
						reqs: [
							[
								logic.startingLocation("Yoshi Village"),
								"Watt",
								logic.whaleOpen,
								["Super Boots", "Sushie"],
								["Ultra Boots", "Sushie"],
								["Odd Key", "Bombette"],
								[logic.blueHouseOpen, "Bombette"]
							],
							"Sushie",
							"Jade Raven",
							["Hammer", "Super Hammer", "Ultra Hammer"],
							["Parakarry", "Lakilester"]
						]
					}
				}
			},
			"Ultra Hammer Room": {
				row: 3,
				col: 1,
				checks: {
					"Ultra Hammer chest": {
						reqs: [
							[
								logic.startingLocation("Yoshi Village"),
								"Watt",
								logic.whaleOpen,
								["Super Boots", "Sushie"],
								["Ultra Boots", "Sushie"],
								["Odd Key", "Bombette"],
								[logic.blueHouseOpen, "Bombette"]
							],
							"Sushie",
							"Jade Raven",
							["Hammer", "Super Hammer", "Ultra Hammer"],
							["Parakarry", "Lakilester"]
						]
					}
				}
			},
			"Lava Puzzle": {
				row: 3,
				col: 2,
				rowSpan: 2,
				checks: {
					"Hidden block on right side of room": {
						reqs: [
							[
								logic.startingLocation("Yoshi Village"),
								"Watt",
								logic.whaleOpen,
								["Super Boots", "Sushie"],
								["Ultra Boots", "Sushie"],
								["Odd Key", "Bombette"],
								[logic.blueHouseOpen, "Bombette"]
							],
							"Sushie",
							"Jade Raven",
							["Hammer", "Super Hammer", "Ultra Hammer"]
						]
					}
				}
			},
			"Slope Hallway": { row: 3, col: 3, checks: {} },
			"Lava Piranha": {
				row: 3,
				col: 10,
				checks: {
					Misstar: {
						reqs: chapterRewardReqs.Misstar
					}
				}
			},
			"Dizzy Stomp": {
				row: 4,
				col: 3,
				checks: {
					Chest: {
						reqs: [
							[
								logic.startingLocation("Yoshi Village"),
								"Watt",
								logic.whaleOpen,
								["Super Boots", "Sushie"],
								["Ultra Boots", "Sushie"],
								["Odd Key", "Bombette"],
								[logic.blueHouseOpen, "Bombette"]
							],
							"Sushie",
							"Jade Raven",
							["Hammer", "Super Hammer", "Ultra Hammer"],
							["Parakarry", "Lakilester"]
						]
					}
				}
			}
		}
	},
	"Flower Fields": {
		areas: {
			"In The Clouds": {
				row: 1,
				col: 4,
				checks: {
					"Ride cloud elevator up to item": {
						reqs: [
							logic.chapter6Entry,
							"Lakilester",
							["Super Boots", "Ultra Boots"],
							"Magical Bean",
							"Fertile Soil",
							"Miracle Water"
						]
					}
				}
			},
			"Huff n Puff": {
				row: 1,
				col: 5,
				checks: {
					Klevar: {
						reqs: chapterRewardReqs.Klevar
					}
				}
			},
			"Sun Tower": { row: 2, col: 1, checks: {} },
			Lakilester: {
				row: 2,
				col: 2,
				checks: {
					Lakilester: {
						reqs: [
							logic.chapter6Entry,
							["Lakilester", "Bubble Berry"],
							"Bombette"
						]
					},
					"Item in grass": {
						reqs: [logic.chapter6Entry, ["Lakilester", "Bubble Berry"]]
					},
					"Item in crevasse": {
						reqs: [
							logic.chapter6Entry,
							["Lakilester", "Bubble Berry"],
							"Bombette"
						]
					}
				}
			},
			"Bubble Plant": {
				row: 2,
				col: 3,
				checks: {
					"Item on ledge": {
						reqs: [logic.chapter6Entry, ["Lakilester", "Bubble Berry"]]
					},
					"Item in vines immediately below ledge item": {
						reqs: [logic.chapter6Entry]
					}
				}
			},
			"Fields Tree": { row: 2, col: 4, rowSpan: 3, checks: {} },
			Elevators: {
				row: 2,
				col: 5,
				checks: {
					"Item in second vine (jump to trigger it)": {
						reqs: [logic.chapter6Entry]
					},
					"Item from ground pounding opposite side from partner upgrade block":
						{
							reqs: [
								logic.chapter6Entry,
								"Lakilester",
								["Super Boots", "Ultra Boots"]
							]
						}
				}
			},
			"Fallen Logs": {
				row: 2,
				col: 6,
				checks: {
					"Item in grass at bottom of screen": {
						reqs: [
							logic.chapter6Entry,
							"Lakilester",
							["Super Boots", "Ultra Boots"]
						]
					},
					"? Block before cloud machine room": {
						reqs: [
							logic.chapter6Entry,
							"Lakilester",
							["Super Boots", "Ultra Boots"]
						]
					}
				}
			},
			"Cloud Machine": { row: 2, col: 7, checks: {} },
			Rosie: {
				row: 3,
				col: 1,
				checks: {
					"Give Rosie the Crystal Berry": {
						reqs: [logic.chapter6Entry, "Blue Berry", "Crystal Berry"]
					}
				}
			},
			Maze: { row: 3, col: 2, checks: {} },
			"Blue Flower": {
				row: 3,
				col: 3,
				checks: {
					"[Coin Block] Hidden block between brick block and spring": {
						reqs: [logic.chapter6Entry, "Blue Berry"]
					},
					"Hidden block above brick block": {
						reqs: [logic.chapter6Entry, "Blue Berry"]
					}
				}
			},
			"Three Trees": {
				row: 3,
				col: 5,
				checks: {
					"[Foliage Coin] Far left tree": {
						reqs: [
							[
								logic.startingLocation("Dry Dry Outpost"),
								["Bombette", "Parakarry"],
								"Super Hammer",
								"Ultra Hammer"
							],
							["Hammer", "Super Hammer", "Ultra Hammer", "Bombette"]
						]
					},
					"Hit trees Middle, Right, Left": {
						reqs: [
							logic.chapter6Entry,
							["Hammer", "Super Hammer", "Ultra Hammer", "Bombette"]
						]
					},
					"Second set of vines": { reqs: [logic.chapter6Entry] }
				}
			},
			Petunia: {
				row: 3,
				col: 6,
				checks: {
					"[Panel] Near bottom left corner of room directly above grass": {
						reqs: [
							logic.chapter6Entry,
							["Super Boots", "Ultra Boots", "Ultra Hammer"]
						]
					},
					"2 items in tree": {
						reqs: [
							logic.chapter6Entry,
							["Hammer", "Super Hammer", "Ultra Hammer", "Bombette"]
						]
					},
					"Talk to Petunia and defeat all moles": {
						reqs: [logic.chapter6Entry]
					}
				}
			},
			Well: {
				row: 3,
				col: 7,
				checks: {
					"Give a blue berry to the well": {
						reqs: [logic.chapter6Entry, "Blue Berry"]
					}
				}
			},
			Posie: {
				row: 4,
				col: 2,
				checks: {
					"2 items from Posie": {
						reqs: [logic.chapter6Entry, "Red Berry"]
					}
				}
			},
			"Red Flower": {
				row: 4,
				col: 3,
				checks: {
					"[Panel] In front of tree": {
						reqs: [
							logic.chapter6Entry,
							"Red Berry",
							["Super Boots", "Ultra Boots", "Ultra Hammer"]
						]
					},
					"2 items in tree": {
						reqs: [
							logic.chapter6Entry,
							"Red Berry",
							["Hammer", "Super Hammer", "Ultra Hammer", "Bombette"]
						]
					},
					"Item in middle vines": {
						reqs: [logic.chapter6Entry, "Red Berry"]
					}
				}
			},
			"Yellow Flower": {
				row: 4,
				col: 5,
				checks: {
					"Vines next to yellow flower": {
						reqs: [logic.chapter6Entry]
					},
					"2 items in tree": {
						reqs: [
							logic.chapter6Entry,
							"Yellow Berry",
							["Parakarry", "Lakilester"],
							["Hammer", "Super Hammer", "Ultra Hammer", "Bombette"]
						]
					},
					"Item in grass right of tree": {
						reqs: [
							logic.chapter6Entry,
							"Yellow Berry",
							["Parakarry", "Lakilester"]
						]
					}
				}
			},
			"Bubble Berry Tree": {
				row: 4,
				col: 6,
				checks: {
					"[Panel] Under hidden block on right side": {
						reqs: [
							logic.chapter6Entry,
							"Yellow Berry",
							["Parakarry", "Lakilester"],
							["Super Boots", "Ultra Boots", "Ultra Hammer"]
						]
					},
					"? Block on left side": {
						reqs: [
							logic.chapter6Entry,
							"Yellow Berry",
							["Parakarry", "Lakilester"]
						]
					},
					"2 items in tree": {
						reqs: [
							logic.chapter6Entry,
							"Yellow Berry",
							["Parakarry", "Lakilester"],
							"Water Stone",
							"Sushie",
							["Hammer", "Super Hammer", "Ultra Hammer", "Bombette"]
						]
					},
					"Hidden ? Block on right side": {
						reqs: [
							logic.chapter6Entry,
							"Yellow Berry",
							["Parakarry", "Lakilester"]
						]
					}
				}
			},
			Lily: {
				row: 4,
				col: 7,
				checks: {
					"Give Water Stone to Lily": {
						reqs: [
							logic.chapter6Entry,
							"Yellow Berry",
							["Parakarry", "Lakilester"],
							"Water Stone"
						]
					},
					"Item in tree": {
						reqs: [
							logic.chapter6Entry,
							"Yellow Berry",
							["Parakarry", "Lakilester"]
						]
					}
				}
			}
		}
	},
	"Shiver Region": {
		areas: {
			"Ice Staircase": {
				row: 1,
				col: 5,
				checks: {
					"? Block up first set of stairs": {
						reqs: [
							[
								["Super Boots", "Sushie"],
								["Ultra Boots", "Sushie"],
								["Odd Key", "Bombette"],
								[logic.blueHouseOpen, "Bombette"]
							],
							"Warehouse Key",
							"Scarf",
							"Bucket",
							["Super Boots", "Ultra Boots"],
							"Kooper",
							["Hammer", "Super Hammer", "Ultra Hammer"],
							"Star Stone"
						]
					},
					"Item on ledge when falling down after second set of stairs": {
						reqs: [
							[
								["Super Boots", "Sushie"],
								["Ultra Boots", "Sushie"],
								["Odd Key", "Bombette"],
								[logic.blueHouseOpen, "Bombette"]
							],
							"Warehouse Key",
							"Scarf",
							"Bucket",
							["Super Boots", "Ultra Boots"],
							"Kooper",
							["Hammer", "Super Hammer", "Ultra Hammer"],
							"Star Stone"
						]
					}
				}
			},
			"Merlar's Sanctuary": {
				row: 1,
				col: 6,
				checks: {
					"Sacred item sealed away for centuries": {
						reqs: [
							[
								["Super Boots", "Sushie"],
								["Ultra Boots", "Sushie"],
								["Odd Key", "Bombette"],
								[logic.blueHouseOpen, "Bombette"]
							],
							"Warehouse Key",
							"Scarf",
							"Bucket",
							["Super Boots", "Ultra Boots"],
							"Kooper",
							["Hammer", "Super Hammer", "Ultra Hammer"],
							"Bombette"
						]
					}
				}
			},
			"Shiver Mountain Tunnel": {
				row: 2,
				col: 5,
				checks: {
					"Left pillar": {
						reqs: [
							[
								["Super Boots", "Sushie"],
								["Ultra Boots", "Sushie"],
								["Odd Key", "Bombette"],
								[logic.blueHouseOpen, "Bombette"]
							],
							"Warehouse Key",
							"Scarf",
							"Bucket",
							["Super Boots", "Ultra Boots"],
							"Kooper",
							["Hammer", "Super Hammer", "Ultra Hammer"]
						]
					},
					"Middle pillar": {
						reqs: [
							[
								["Super Boots", "Sushie"],
								["Ultra Boots", "Sushie"],
								["Odd Key", "Bombette"],
								[logic.blueHouseOpen, "Bombette"]
							],
							"Warehouse Key",
							"Scarf",
							"Bucket",
							["Super Boots", "Ultra Boots"],
							"Kooper",
							["Hammer", "Super Hammer", "Ultra Hammer"]
						]
					},
					"Right pillar": {
						reqs: [
							[
								["Super Boots", "Sushie"],
								["Ultra Boots", "Sushie"],
								["Odd Key", "Bombette"],
								[logic.blueHouseOpen, "Bombette"]
							],
							"Warehouse Key",
							"Scarf",
							"Bucket",
							["Super Boots", "Ultra Boots"],
							"Kooper",
							["Hammer", "Super Hammer", "Ultra Hammer"]
						]
					}
				}
			},
			"Shiver Mountain Hills": {
				row: 3,
				col: 5,
				checks: {
					"Item below Kooper switch": {
						reqs: [
							[
								["Super Boots", "Sushie"],
								["Ultra Boots", "Sushie"],
								["Odd Key", "Bombette"],
								[logic.blueHouseOpen, "Bombette"]
							],
							"Warehouse Key",
							"Scarf",
							"Bucket",
							["Super Boots", "Ultra Boots"]
						]
					}
				}
			},
			"Shiver Mountain Passage": {
				row: 4,
				col: 5,
				checks: {
					"Ultra Boots block": {
						reqs: [
							[
								["Super Boots", "Sushie"],
								["Ultra Boots", "Sushie"],
								["Odd Key", "Bombette"],
								[logic.blueHouseOpen, "Bombette"]
							],
							"Warehouse Key",
							"Scarf",
							"Bucket",
							"Ultra Boots"
						]
					}
				}
			},
			"West Shiver City": {
				row: 5,
				col: 1,
				checks: {
					"[Panel] Next to the Mayor's house": {
						reqs: [
							[
								["Super Boots", "Sushie"],
								["Ultra Boots", "Sushie"],
								["Odd Key", "Bombette"],
								[logic.blueHouseOpen, "Bombette"]
							],
							["Super Boots", "Ultra Boots", "Ultra Hammer"]
						]
					},
					"[Letter] Mayor Penguin": {
						reqs: [
							[
								["Super Boots", "Sushie"],
								["Ultra Boots", "Sushie"],
								["Odd Key", "Bombette"],
								[logic.blueHouseOpen, "Bombette"]
							],
							"Mayor Penguin",
							"Parakarry"
						]
					},
					"Talk to Mayor after having met Merle": {
						reqs: [
							[
								["Super Boots", "Sushie"],
								["Ultra Boots", "Sushie"],
								["Odd Key", "Bombette"],
								[logic.blueHouseOpen, "Bombette"]
							],
							"Warehouse Key"
						]
					},
					"Chest in middle house": {
						reqs: [
							[
								["Super Boots", "Sushie"],
								["Ultra Boots", "Sushie"],
								["Odd Key", "Bombette"],
								[logic.blueHouseOpen, "Bombette"]
							]
						]
					}
				}
			},
			"Center Shiver City": {
				row: 5,
				col: 2,
				checks: {
					"[Shop] 6 items in Shop": {
						reqs: [
							[
								["Super Boots", "Sushie"],
								["Ultra Boots", "Sushie"],
								["Odd Key", "Bombette"],
								[logic.blueHouseOpen, "Bombette"]
							]
						]
					},
					"Item in the Inn": {
						reqs: [
							[
								["Super Boots", "Sushie"],
								["Ultra Boots", "Sushie"],
								["Odd Key", "Bombette"],
								[logic.blueHouseOpen, "Bombette"]
							]
						]
					},
					"5 items in the Inn after giving Scarf and Bucket to snowmen": {
						reqs: [
							[
								["Super Boots", "Sushie"],
								["Ultra Boots", "Sushie"],
								["Odd Key", "Bombette"],
								[logic.blueHouseOpen, "Bombette"]
							],
							"Warehouse Key",
							"Scarf",
							"Bucket"
						]
					}
				}
			},
			"East Shiver City": {
				row: 5,
				col: 3,
				checks: {
					"Item in lake": {
						reqs: [["Super Boots", "Ultra Boots"], "Sushie"]
					}
				}
			},
			"Outside Shiver City": { row: 5, col: 4, checks: {} },
			"Shiver Snowfield": {
				row: 5,
				col: 5,
				checks: {
					"[Panel] Along bottom of room": {
						reqs: [
							[
								["Super Boots", "Sushie"],
								["Ultra Boots", "Sushie"],
								["Odd Key", "Bombette"],
								[logic.blueHouseOpen, "Bombette"]
							],
							"Warehouse Key",
							["Super Boots", "Ultra Boots", "Ultra Hammer"]
						]
					},
					"Hit left pine tree 4 times": {
						reqs: [
							[
								["Super Boots", "Sushie"],
								["Ultra Boots", "Sushie"],
								["Odd Key", "Bombette"],
								[logic.blueHouseOpen, "Bombette"]
							],
							"Warehouse Key",
							["Hammer", "Super Hammer", "Ultra Hammer"]
						]
					},
					"Item behind pine tree in top right corner": {
						reqs: [
							[
								["Super Boots", "Sushie"],
								["Ultra Boots", "Sushie"],
								["Odd Key", "Bombette"],
								[logic.blueHouseOpen, "Bombette"]
							],
							"Warehouse Key"
						]
					}
				}
			},
			"Outside Starborn Valley": {
				row: 5,
				col: 6,
				checks: {
					"Item behind ice": {
						reqs: [
							[
								["Super Boots", "Sushie"],
								["Ultra Boots", "Sushie"],
								["Odd Key", "Bombette"],
								[logic.blueHouseOpen, "Bombette"]
							],
							"Warehouse Key"
						]
					},
					"Hidden block where you fight Monstar": {
						reqs: [
							[
								["Super Boots", "Sushie"],
								["Ultra Boots", "Sushie"],
								["Odd Key", "Bombette"],
								[logic.blueHouseOpen, "Bombette"]
							],
							"Warehouse Key"
						]
					}
				}
			},
			"Starborn Valley": {
				row: 5,
				col: 7,
				checks: {
					"[Letter] Frost T. (Chain)": {
						reqs: [
							[
								["Super Boots", "Sushie"],
								["Ultra Boots", "Sushie"],
								["Odd Key", "Bombette"],
								[logic.blueHouseOpen, "Bombette"]
							],
							"Warehouse Key",
							"Frost T.",
							"Parakarry"
						]
					},
					"Talk to Merle": {
						reqs: [
							[
								["Super Boots", "Sushie"],
								["Ultra Boots", "Sushie"],
								["Odd Key", "Bombette"],
								[logic.blueHouseOpen, "Bombette"]
							],
							"Warehouse Key"
						]
					}
				}
			}
		}
	},
	"Crystal Palace": {
		areas: {
			"Ground Panel Room": {
				row: 1,
				col: 3,
				rowSpan: 3,
				checks: {
					"? Block": {
						reqs: [
							[
								["Super Boots", "Sushie"],
								["Ultra Boots", "Sushie"],
								["Odd Key", "Bombette"],
								[logic.blueHouseOpen, "Bombette"]
							],
							"Warehouse Key",
							"Scarf",
							"Bucket",
							["Super Boots", "Ultra Boots"],
							"Kooper",
							["Hammer", "Super Hammer", "Ultra Hammer"],
							"Star Stone",
							["Red Key", "Blue Key"]
						]
					}
				}
			},
			"Duplighost Room 1": { row: 1, col: 4, checks: {} },
			"P-Down/​D-Up": {
				row: 2,
				col: 5,
				checks: {
					Chest: {
						reqs: [logic.crystalPalaceAccess, ["Red Key", "Blue Key"]]
					}
				}
			},
			"Upper Swooper Room": { row: 2, col: 4, checks: {} },
			"Shooting Star": {
				row: 1,
				col: 5,
				checks: {
					"Item on ledge": {
						reqs: [
							[
								["Super Boots", "Sushie"],
								["Ultra Boots", "Sushie"],
								["Odd Key", "Bombette"],
								[logic.blueHouseOpen, "Bombette"]
							],
							"Warehouse Key",
							"Scarf",
							"Bucket",
							["Super Boots", "Ultra Boots"],
							"Kooper",
							["Hammer", "Super Hammer", "Ultra Hammer"],
							"Star Stone",
							["Red Key", "Blue Key"]
						]
					}
				}
			},
			"Duplighost Room 2": { row: 7, col: 9, checks: {} },
			"Red Key": {
				row: 8,
				col: 5,
				checks: {
					Chest: {
						reqs: [
							logic.crystalPalaceAccess,
							["Red Key", "Blue Key"],
							"Bombette"
						]
					}
				}
			},
			"Lower Swooper Room": { row: 7, col: 4, checks: {} },
			"Blue Key": {
				row: 7,
				col: 5,
				checks: {
					Chest: {
						reqs: logic.crystalPalaceAccess
					}
				}
			},
			"Small Statue Room": {
				row: 2,
				col: 8,
				rowSpan: 2,
				checks: {
					"[Panel] Under block": {
						reqs: [
							[
								["Super Boots", "Sushie"],
								["Ultra Boots", "Sushie"],
								["Odd Key", "Bombette"],
								[logic.blueHouseOpen, "Bombette"]
							],
							"Warehouse Key",
							"Scarf",
							"Bucket",
							["Super Boots", "Ultra Boots"],
							"Kooper",
							["Hammer", "Super Hammer", "Ultra Hammer"],
							"Star Stone",
							"Red Key",
							"Bombette"
						]
					},
					"? Block": {
						reqs: [
							[
								["Super Boots", "Sushie"],
								["Ultra Boots", "Sushie"],
								["Odd Key", "Bombette"],
								[logic.blueHouseOpen, "Bombette"]
							],
							"Warehouse Key",
							"Scarf",
							"Bucket",
							"Ultra Boots",
							"Kooper",
							["Hammer", "Super Hammer", "Ultra Hammer"],
							"Star Stone",
							"Red Key",
							"Bombette"
						]
					}
				}
			},
			"Clubba Room": { row: 2, col: 9, checks: {} },
			"P-Up/​D-Down": {
				row: 2,
				col: 10,
				checks: {
					Chest: {
						reqs: [logic.crystalPalaceAccess, "Red Key", "Bombette"]
					}
				}
			},
			Cave: {
				row: 4,
				col: 1,
				checks: {
					"Item in cave": {
						reqs: [
							[
								["Super Boots", "Sushie"],
								["Ultra Boots", "Sushie"],
								["Odd Key", "Bombette"],
								[logic.blueHouseOpen, "Bombette"]
							],
							"Warehouse Key",
							"Scarf",
							"Bucket",
							["Super Boots", "Ultra Boots"],
							"Kooper",
							["Hammer", "Super Hammer", "Ultra Hammer"],
							"Star Stone",
							["Red Key", "Blue Key"]
						]
					}
				}
			},
			"Crystal Palace Entrance": { row: 4, col: 2, rowSpan: 2, checks: {} },
			"Mirror Room": { row: 4, col: 3, rowSpan: 2, checks: {} },
			"Elevator + Clubba Room": { row: 4, col: 4, rowSpan: 2, checks: {} },
			"Bomb Switch": { row: 4, col: 5, rowSpan: 2, checks: {} },
			"Triple Dip": {
				row: 4,
				col: 6,
				rowSpan: 2,
				checks: {
					"Chest, blow up right wall in switch room": {
						reqs: [
							[
								["Super Boots", "Sushie"],
								["Ultra Boots", "Sushie"],
								["Odd Key", "Bombette"],
								[logic.blueHouseOpen, "Bombette"]
							],
							"Warehouse Key",
							"Scarf",
							"Bucket",
							["Super Boots", "Ultra Boots"],
							"Kooper",
							["Hammer", "Super Hammer", "Ultra Hammer"],
							"Star Stone",
							"Red Key",
							"Bombette"
						]
					}
				}
			},
			"Kooper Puzzle": { row: 4, col: 7, rowSpan: 2, checks: {} },
			"Hub 2": { row: 4, col: 8, rowSpan: 2, checks: {} },
			"Palace Key": {
				row: 7,
				col: 10,
				checks: {
					Chest: {
						reqs: [logic.crystalPalaceAccess, "Red Key", "Bombette"]
					}
				}
			},
			"Kooper Switch + Palace Key Lock": {
				row: 4,
				col: 9,
				rowSpan: 2,
				checks: {}
			},
			"Albino Dinos + Crystal King": {
				row: 4,
				col: 10,
				rowSpan: 2,
				checks: {
					Kalmar: {
						reqs: chapterRewardReqs.Kalmar
					}
				}
			},
			"X Mark Room": { row: 6, col: 3, rowSpan: 3, checks: {} },
			"Large Statue Room": {
				row: 6,
				col: 8,
				rowSpan: 2,
				checks: {
					"[Panel] Under block": {
						reqs: [
							[
								["Super Boots", "Sushie"],
								["Ultra Boots", "Sushie"],
								["Odd Key", "Bombette"],
								[logic.blueHouseOpen, "Bombette"]
							],
							"Warehouse Key",
							"Scarf",
							"Bucket",
							["Super Boots", "Ultra Boots"],
							"Kooper",
							["Hammer", "Super Hammer", "Ultra Hammer"],
							"Star Stone",
							"Red Key",
							"Bombette"
						]
					},
					"? Block": {
						reqs: [
							[
								["Super Boots", "Sushie"],
								["Ultra Boots", "Sushie"],
								["Odd Key", "Bombette"],
								[logic.blueHouseOpen, "Bombette"]
							],
							"Warehouse Key",
							"Scarf",
							"Bucket",
							"Ultra Boots",
							"Kooper",
							["Hammer", "Super Hammer", "Ultra Hammer"],
							"Star Stone",
							"Red Key",
							"Bombette"
						]
					}
				}
			},
			"Bombette Puzzle": { row: 8, col: 4, checks: {} }
		}
	}
};

export const allRegions = Object.getOwnPropertyNames(regionData);
export const getRegionData = (region: string) => regionData[region];
export const getChecks = (region: string, area: string) =>
	regionData[region].areas[area].checks;
