import type { TrackableItemInfo } from "@/types/items";
import logic from "../utils/logic";
import type { OptionsValues } from "@/stores/config";

export const allItems: TrackableItemInfo[] = [
	{
		chapter: 1,
		name: "Eldstar",
		type: "chapterReward",
		image: "icons/Eldstar_PM.png"
	},
	{
		chapter: 2,
		name: "Mamar",
		type: "chapterReward",
		image: "icons/Mamar_PM.png"
	},
	{
		chapter: 3,
		name: "Skolar",
		type: "chapterReward",
		image: "icons/Skolar_PM.png"
	},
	{
		chapter: 4,
		name: "Muskular",
		type: "chapterReward",
		image: "icons/Muskular_PM.png"
	},
	{
		chapter: 5,
		name: "Misstar",
		type: "chapterReward",
		image: "icons/Misstar_PM.png"
	},
	{
		chapter: 6,
		name: "Klevar",
		type: "chapterReward",
		image: "icons/Klevar_PM.png"
	},
	{
		chapter: 7,
		name: "Kalmar",
		type: "chapterReward",
		image: "icons/Kalmar_PM.png"
	},
	{
		chapter: 8,
		name: "Star Rod",
		type: "chapterReward",
		image: "icons/PM_Starrod.png",
		show: (settings: OptionsValues) => !logic.powerStarHunt(settings)
	},
	{
		chapter: 16,
		name: "Power Stars Found",
		type: "required",
		image: "icons/Power_Star.png",
		show: logic.powerStarHunt
	},
	{
		chapter: -1,
		name: "Goombario",
		type: "required",
		image: "partners/goombario.png"
	},
	{
		chapter: -1,
		name: "Kooper",
		type: "required",
		image: "partners/kooper.png"
	},
	{
		chapter: -1,
		name: "Bombette",
		type: "required",
		image: "partners/bombette.png"
	},
	{
		chapter: -1,
		name: "Parakarry",
		type: "required",
		image: "partners/parakarr.png"
	},
	{
		chapter: -1,
		name: "Bow",
		type: "required",
		image: "partners/bow.png"
	},
	{
		chapter: -1,
		name: "Watt",
		type: "required",
		image: "partners/watt.png"
	},
	{
		chapter: -1,
		name: "Sushie",
		type: "required",
		image: "partners/sushie.png"
	},
	{
		chapter: -1,
		name: "Lakilester",
		type: "required",
		image: "partners/lakilester.png"
	},
	{
		chapter: 0,
		name: "Boots",
		type: "required",
		image: "upgrades/PM_Boots.png"
	},
	{
		chapter: 0,
		name: "Hammer",
		type: "required",
		image: "upgrades/PM_Hammer.png"
	},
	{
		chapter: 0,
		name: "Ultra Stone",
		type: "required",
		image: "icons/UltraStone.gif"
	},
	{
		name: "Dolly",
		type: "miscItem",
		image: "icons/PeachDoll_PM.png",
		turnInCheck: "Goomba Village:Give Dolly to Goombaria"
	},
	{
		name: "Kooper's Shell",
		type: "miscItem",
		image: "icons/Kooper'sShell_PM.png",
		turnInCheck: "Koopa Village East:Give Kooper his shell"
	},
	{
		chapter: 1,
		name: "Fortress Key",
		type: "required",
		image: "icons/FortressKey_PM.png",
		multiple: 4
	},
	// {
	// 	name: "Letters",
	// 	type: "miscItem",
	// 	image: "icons/PM_Letter_Sprite.png",
	// 	multiple: 3
	// },
	{
		chapter: 2,
		name: "Pulse Stone",
		type: "required",
		image: "icons/PulseStone.gif"
	},
	{
		chapter: 2,
		name: "Pyramid Stone",
		type: "required",
		image: "icons/PyramidStone.gif"
	},
	{
		chapter: 2,
		name: "Diamond Stone",
		type: "required",
		image: "icons/DiamondStone.png"
	},
	{
		chapter: 2,
		name: "Lunar Stone",
		type: "required",
		image: "icons/LunarStone.gif"
	},
	{
		chapter: 2,
		name: "Ruins Key",
		type: "required",
		image: "icons/Ruins_Key.png",
		multiple: 4
	},
	{
		name: "Artifact",
		type: "miscItem",
		image: "icons/Artifact_PM.png",
		turnInCheck: "Koopa Village East:Give Artifact to Kolorado"
	},
	{
		name: "Forest Pass",
		type: "miscItem",
		image: "icons/ForestPass.png",
		show: (settings) => !logic.forestOpen([], settings)
	},
	{
		name: "Record",
		type: "miscItem",
		image: "icons/Record.gif",
		turnInCheck: "Weight Room:Chest guarded by Boo"
	},
	{
		name: "Weight",
		type: "miscItem",
		image: "icons/WeightPM.gif"
	},
	{
		chapter: 3,
		name: "Boo's Portrait",
		type: "required",
		image: "icons/Boo'sPortrait_PM.png"
	},
	{
		chapter: 3,
		name: "Tubba Castle Key",
		type: "required",
		image: "icons/Tubba_Blubba_Castle_Key.png",
		multiple: 3
	},
	{
		name: "Storeroom Key",
		type: "miscKey",
		image: "icons/OddKey.gif",
		label: "S"
	},
	{
		chapter: 4,
		name: "Toy Train",
		type: "required",
		image: "icons/ToyTrain_PM.png"
	},
	{
		name: "Calculator",
		type: "miscItem",
		image: "icons/Calculator_PM.png",
		turnInCheck: "Central Plaza:Give Calculator to Rowf"
	},
	{
		name: "Frying Pan",
		type: "miscItem",
		image: "icons/PM_Frying_Pan.png",
		turnInCheck: "Below Plaza:Give Frying Pan to Tayce T."
	},
	{
		name: "Mailbag",
		type: "miscItem",
		image: "icons/Mailbag_PM.png",
		turnInCheck: "Central Plaza:Give Mailbag to Post Office"
	},
	{
		chapter: 4,
		name: "Cake",
		type: "required",
		image: "icons/Cake.gif"
	},
	{
		name: "Cookbook",
		type: "miscItem",
		image: "icons/Cook_Book_Paper_Mario.png"
	},
	{
		name: "Dictionary",
		type: "miscItem",
		image: "icons/PM_Dictionary.png",
		turnInCheck: "Main Gate:Give Dictionary to Russ T."
	},
	{
		name: "Mystery Note",
		type: "miscItem",
		image: "icons/MysteryNote.png"
	},
	{
		chapter: 5,
		name: "Jade Raven",
		type: "required",
		image: "icons/JadeRaven_PM.png"
	},
	{
		name: "Volcano Vase",
		type: "miscItem",
		image: "icons/VolcanoVase.gif",
		turnInCheck: "East Village:Give the volcano vase to Kolorado"
	},
	{
		chapter: 6,
		name: "Magical Seed 1",
		type: "required",
		image: "icons/MagicalSeed1.png",
		show: logic.showMagicalSeed(1)
	},
	{
		chapter: 6,
		name: "Magical Seed 2",
		type: "required",
		image: "icons/MagicalSeed2.png",
		show: logic.showMagicalSeed(2)
	},
	{
		chapter: 6,
		name: "Magical Seed 3",
		type: "required",
		image: "icons/MagicalSeed3.png",
		show: logic.showMagicalSeed(3)
	},
	{
		chapter: 6,
		name: "Magical Seed 4",
		type: "required",
		image: "icons/MagicalSeed4.png",
		show: logic.showMagicalSeed(4)
	},
	{
		chapter: 6,
		name: "Magical Bean",
		type: "required",
		image: "icons/MagicBean_PM.png"
	},
	{
		name: "Red Berry",
		type: "miscKey",
		image: "icons/PaperMario_Items_RedBerry.png",
		label: "R"
	},
	{
		name: "Yellow Berry",
		type: "miscKey",
		image: "icons/PaperMario_Items_YellowBerry.png",
		label: "Y"
	},
	{
		name: "Blue Berry",
		type: "miscKey",
		image: "icons/PaperMario_Items_BlueBerry.png",
		label: "B",
		multiple: 2
	},
	{
		chapter: 6,
		name: "Fertile Soil",
		type: "required",
		image: "icons/Fertilesoil.png"
	},
	{
		name: "Crystal Berry",
		type: "miscItem",
		image: "icons/CrystalBerry_PM.png",
		turnInCheck: "Rosie:Give Rosie the Crystal Berry"
	},
	{
		name: "Water Stone",
		type: "miscItem",
		image: "icons/WaterStone_PM.png",
		turnInCheck: "Lily:Give Water Stone to Lily"
	},
	{
		chapter: 6,
		name: "Miracle Water",
		type: "required",
		image: "icons/MiracleWater_PM.png"
	},
	{
		name: "Bubble Berry",
		type: "miscKey",
		image: "icons/PaperMario_Items_BubbleBerry.png"
	},
	{
		name: "Odd Key",
		type: "miscKey",
		image: "icons/OddKey.gif",
		label: "O",
		show: (settings: OptionsValues) => !logic.blueHouseOpen([], settings)
	},
	{
		chapter: 7,
		name: "Warehouse Key",
		type: "required",
		image: "icons/OddKey.gif",
		label: "W"
	},
	{
		chapter: 7,
		name: "Scarf",
		type: "required",
		image: "icons/Scarf.gif"
	},
	{
		chapter: 7,
		name: "Bucket",
		type: "required",
		image: "icons/Bucket.png"
	},
	{
		chapter: 7,
		name: "Star Stone",
		type: "required",
		image: "icons/StarStone_PM.png"
	},
	{
		name: "Blue Key",
		type: "miscKey",
		image: "icons/PM_BlueKey.png",
		label: "B"
	},
	{
		chapter: 7,
		name: "Red Key",
		type: "required",
		image: "icons/PM_Red_Key.png",
		label: "R"
	},

	{
		chapter: 7,
		name: "Palace Key",
		type: "required",
		image: "icons/PM_Palace_Key.png"
	},
	{
		chapter: 8,
		name: "Bowser's Castle Key",
		type: "required",
		image: "icons/PM_Bowser_Castle_Key.png",
		multiple: 5,
		show: (settings: OptionsValues) => !logic.fastBowserCastle([], settings)
	},
	{
		name: "Prison Key",
		type: "miscKey",
		image: "icons/OddKey.gif",
		label: "P",
		multiple: 2
	},
	{
		name: "Lyrics",
		type: "miscItem",
		image: "koopa-koot-favors/Lyrics_PM.png",
		label: "L",
		turnInCheck: "Dry Dry Outpost West:Turn in Lyrics at far right house"
	},
	{
		name: "Melody",
		type: "miscItem",
		image: "koopa-koot-favors/PM_Melody.png",
		label: "M",
		turnInCheck: "Harbor:Give Melody to Simon in Club 64"
	},
	{
		name: "Quizmo",
		type: "miscItem",
		image: "icons/ChuckQuizmo_PM.png",
		multiple: 16
	},
	{
		name: "Star Piece",
		type: "miscItem",
		image: "icons/Star_Piece.png",
		multiple: 96
	},
	{
		name: "Rip Cheato",
		type: "miscItem",
		image: "icons/RipCheato.png",
		multiple: 11
	},
	{
		name: "Anti Guy",
		type: "miscItem",
		image: "icons/Anti_Guy_Sprite_-_Paper_Mario.png"
	},
	{
		turnInCheck: "Central Plaza:[Letter] Merlon",
		name: "Merlon",
		type: "letter",
		image: "Letters/PM_Merlon.png"
	},
	{
		turnInCheck: "Koopa Village East:[Letter] Kolorado",
		name: "Kolorado",
		type: "letter",
		image: "Letters/PM_Kolorado.png"
	},
	{
		turnInCheck: "Koopa Village West:[Letter] Mort T.",
		name: "Mort T. (Koopa Village Inn)",
		type: "letter",
		image: "Letters/PM_Toad.png"
	},
	{
		turnInCheck: "Mouse:[Letter] Nomadimouse",
		name: "Nomadimouse",
		type: "letter",
		image: "Letters/Nomadimouse.png"
	},
	{
		turnInCheck: "Goomba Village:[Letter] Goompa",
		name: "Goompa",
		type: "letter",
		image: "Letters/PM_Goompa_sprite.png"
	},
	{
		turnInCheck: "Below Plaza:[Letter] Fice T.",
		name: "Fice T.",
		type: "letter",
		image: "Letters/PM_Fice_T_Sprite.png"
	},
	{
		turnInCheck: "Shop:[Letter] Igor",
		name: "Igor (Boo's Mansion Shop)",
		type: "letter",
		image: "Letters/PM_Boo_Sprite.png"
	},
	{
		turnInCheck: "Main Gate:[Letter] Russ T.",
		name: "Russ T.",
		type: "letter",
		image: "Letters/Russ_T.png"
	},
	{
		turnInCheck: "Central Plaza:[Letter] Minh T. (Chain)",
		name: "Minh T.",
		type: "letter",
		image: "Letters/MinhT_PM.png"
	},
	{
		turnInCheck: "West Shiver City:[Letter] Mayor Penguin",
		name: "Mayor Penguin",
		type: "letter",
		image: "Letters/MayorPenguinPM.png"
	},
	{
		turnInCheck: "Merluvlee's House:[Letter] Merlow",
		name: "Merlow",
		type: "letter",
		image: "Letters/PM_Merlow.png"
	},
	{
		turnInCheck: "Goomba Village:[Letter] Goompapa 1 (Chain)",
		name: "Goompapa 1",
		type: "letter",
		image: "Letters/PM_Goompapa_Sprite.png"
	},
	{
		turnInCheck: "Castle Ruins:[Letter] Muss T. (Chain)",
		name: "Muss T. (Castle Ruins)",
		type: "letter",
		image: "Letters/PM_Toad.png"
	},
	{
		turnInCheck: "Koopa Village West:[Letter] Koover 1 (Chain)",
		name: "Koover 1 (Koopa Village Entrance)",
		type: "letter",
		image: "Letters/KoopaTroopaPM.png"
	},
	{
		turnInCheck: "Harbor:[Letter] Fishmael (Chain)",
		name: "Fishmael",
		type: "letter",
		image: "Letters/Fishmael_PM.png"
	},
	{
		turnInCheck: "Koopa Village West:[Letter] Koover 2 (Chain)",
		name: "Koover 2 (Koopa Village Entrance)",
		type: "letter",
		image: "Letters/KoopaTroopaPM.png"
	},
	{
		turnInCheck: "Dry Dry Outpost East:[Letter] Mr. E (Chain)",
		name: "Mr. E",
		type: "letter",
		image: "Letters/MrEPM.png"
	},
	{
		turnInCheck: "Main Gate:[Letter] Miss T.",
		name: "Miss T.",
		type: "letter",
		image: "Letters/PMMissT.png"
	},
	{
		turnInCheck: "Dry Dry Outpost West:[Letter] Shop (Chain)",
		name: "Dry Dry Shop",
		type: "letter",
		image: "Letters/Little_Mouser_Paper_Mario.png"
	},
	{
		turnInCheck: "Main Room:[Letter] Franky (Chain)",
		name: "Franky (Boo's Mansion Entrance)",
		type: "letter",
		image: "Letters/PM_Boo_Sprite.png"
	},
	{
		turnInCheck: "Train Station:[Letter] Dane T. 1 (Chain)",
		name: "Dane T. 1",
		type: "letter",
		image: "Letters/PM_Dane_T.png"
	},
	{
		turnInCheck: "East Village:[Letter] Red Yoshi Kid (Chain)",
		name: "Red Yoshi Kid",
		type: "letter",
		image: "Letters/red_yoshi.png"
	},
	{
		turnInCheck: "Train Station:[Letter] Dane T. 2 (Chain)",
		name: "Dane T. 2",
		type: "letter",
		image: "Letters/PM_Dane_T.png"
	},
	{
		turnInCheck: "Starborn Valley:[Letter] Frost T. (Chain)",
		name: "Frost T.",
		type: "letter",
		image: "Letters/Frost_T.png"
	},
	{
		turnInCheck: "Goomba Village:[Letter] Goompapa 2 (Chain)",
		name: "Goompapa 2",
		type: "letter",
		image: "Letters/PM_Goompapa_Sprite.png"
	},
	{
		name: "Koopa Legends",
		turnInCheck:
			"Koopa Village East:[Koot Coin] Return Koopa Legends to Koopa Koot",
		type: "kootFavor",
		image: "koopa-koot-favors/KoopaLegends_PM.png"
	},

	{
		name: "Sleepy Sheep",
		turnInCheck:
			"Koopa Village East:[Koot] Give Koopa Koot a Sleepy Sheep (second item)",
		type: "kootFavor",
		image: "koopa-koot-favors/PaperMario_Items_SleepySheep.png"
	},

	{
		name: "Tape",
		turnInCheck: "Koopa Village East:[Koot Coin] Return Koopa Koot's Tape",
		type: "kootFavor",
		image: "koopa-koot-favors/Tape_PM.png"
	},

	{
		name: "Koopa Tea",
		turnInCheck: "Koopa Village East:[Koot] Give Koopa Koot Koopa Tea",
		type: "kootFavor",
		image: "koopa-koot-favors/PaperMario_Items_KoopaTea.png"
	},

	{
		name: "Luigi's Autograph",
		turnInCheck:
			"Koopa Village East:[Koot Coin] Give Luigi's Autograph to Koopa Koot",
		type: "kootFavor",
		image: "koopa-koot-favors/Luigi's_Autograph.png"
	},

	{
		name: "Wallet",
		turnInCheck: "Koopa Village East:[Koot Coin] Return Koopa Koot's wallet",
		type: "kootFavor",
		image: "koopa-koot-favors/PM_Empty_Wallet.png"
	},

	{
		name: "Tasty Tonic",
		turnInCheck: "Koopa Village East:[Koot Coin] Give Koopa Koot a Tasty Tonic",
		type: "kootFavor",
		image: "koopa-koot-favors/PaperMario_Items_TastyTonic.png"
	},

	{
		name: "Crystal Ball",
		turnInCheck: "Merluvlee's House:[Koot] Give Merluvlee the Crystal Ball",
		type: "kootFavor",
		image: "koopa-koot-favors/Crystal_Ball_PM.png"
	},

	{
		name: "Merluvlee's Autograph",
		turnInCheck:
			"Koopa Village East:[Koot] Give Merluvlee's Autograph to Koopa Koot",
		type: "kootFavor",
		image: "koopa-koot-favors/Merluvlee's_Autograph.png"
	},

	{
		name: "Life Shroom",
		turnInCheck:
			"Koopa Village East:[Koot] Give Koopa Koot a Life Shroom (second item)",
		type: "kootFavor",
		image: "koopa-koot-favors/PaperMario_Items_LifeShroom.png"
	},

	{
		name: "Nutty Cake",
		turnInCheck: "Koopa Village East:[Koot Coin] Give Koopa Koot a Nutty Cake",
		type: "kootFavor",
		image: "koopa-koot-favors/PaperMario_Items_NuttyCake.png"
	},

	{
		name: "Old Photo",
		turnInCheck: "Koopa Village East:[Koot Coin] Give Koopa Koot the Old Photo",
		type: "kootFavor",
		image: "koopa-koot-favors/OldPhoto_PM.png"
	},

	{
		name: "Koopasta",
		turnInCheck: "Koopa Village East:[Koot Coin] Give Koopa Koot Koopasta",
		type: "kootFavor",
		image: "koopa-koot-favors/PaperMario_Items_Koopasta.png"
	},

	{
		name: "Glasses",
		turnInCheck: "Koopa Village East:[Koot Coin] Return Koopa Koot's glasses",
		type: "kootFavor",
		image: "koopa-koot-favors/Glasses_PM.png"
	},

	{
		name: "Lime",
		turnInCheck: "Koopa Village East:[Koot] Give Koopa Koot a Lime",
		type: "kootFavor",
		image: "koopa-koot-favors/PaperMario_Items_Lime.png"
	},

	{
		name: "Kooky Cookie",
		turnInCheck:
			"Koopa Village East:[Koot Coin] Give Koopa Koot a Kooky Cookie",
		type: "kootFavor",
		image: "koopa-koot-favors/PaperMario_Items_KookyCookie.png"
	},

	{
		name: "Package",
		turnInCheck: "Koopa Village East:[Koot Coin] Give Koopa Koot his package",
		type: "kootFavor",
		image: "koopa-koot-favors/PM_Package.png"
	},

	{
		name: "Coconut",
		turnInCheck: "Koopa Village East:[Koot Coin] Give Koopa Koot a Coconut",
		type: "kootFavor",
		image: "koopa-koot-favors/PaperMario_Items_Coconut.png"
	},

	{
		name: "Red Jar",
		turnInCheck: "Koopa Village East:[Koot] Give Koopa Koot the Red Jar",
		type: "kootFavor",
		image: "koopa-koot-favors/PM_Red_Jar.png"
	}
];
