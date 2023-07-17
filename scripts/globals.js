/******************************************************************************
 * globals.js
 * 
 * Contains global variables / constants.
*******************************************************************************/

const maxKeyCounts = {
    1: 4, // fortress keys
    2: 4, // ruins keys
    3: 3, // tubba keys
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 5, // bowser castle keys
    9: 16, // quizmo
    10: 3, // master
    11: 96, // star pieces
    12: 11, // rip cheato
    13: 3, // letters
    14: 2, // prison keys
    15: 2, // blue berry
    16: 120, // power stars
};

var currentKeyCounts = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
    10: 0,
    11: 0,
    12: 0,
    13: 0,
    14: 0,
    15: 0,
    16: 0
};

var useTrackerLogic = true;

// The main requirements are grouped logically with their respective chapters.
// Additional requirements are typically partners or upgrades for mario.
// Any nested arrays means that if any condition from that group is true, the entire group is treated as true.
const extraChapterRequirements = {
    1: [
        ["[id=Hammer]:visible", "Super Hammer", "[id=Bombette]:visible"], // tree for switch on pleasant path
        "[id=Kooper]:visible" // switch to bring up bridge on pleasant path
    ],
    2: [
        ["#starting-location [value='DryDryOutpost']", "[id=Bombette]:visible", "Super Hammer"], // need bombette to blow up rock in toad town (or super hammer for sewers)
        ["#starting-location [value='DryDryOutpost']", "[id=Parakarry]:visible", "Super Hammer"] // this is just to access the ruins via mt rugged or sewers respectively
    ],
    3: [
        "[id=Parakarry]:visible", // need parakarry to get to Tubba's Castle
        "Super Boots" // need a boots upgrade to fight the heart
    ],
    4: [
        "[id=Bombette]:visible", // blow up the wall to general guy
        "[id=Watt]:visible", // see in the room before general guy
        ["[id=Hammer]:visible", "Super Hammer"], // hit boxes in green station
        ["[id=Bow]:visible", "#toybox-open"] // need Bow to get into toybox if it is not open by default
    ],
    5: [
        "[id=Sushie]:visible", // need sushie in order to place the jade raven
        ["[id=Hammer]:visible", "Super Hammer"], // drop log bridge
        [
            "#starting-location [value='YoshiVillage']",
            "[id=Watt]:visible", 
            "#whale-open", // watt or whale open to get to the island OR vvvv
            ["[id=Bombette]:visible", ["img[data-item-name='Odd Key']", "#blue-house-open"]], // bombette AND access to blue house for pipe
            ["Super Boots", "[id=Sushie]:visible"] // boots and sushie to reach shortcut from the left
        ],
        ["Ultra Hammer", ["#gear-shuffle [value='Vanilla']", ["[id=Parakarry]:visible", "[id=Lakilester]:visible"]]] // volcano blocks
    ],
    6: ["[id=Lakilester]:visible", "Super Boots"], // both of these requirements are for top right room
    7: [
        "[id=Kooper]:visible", // switch on shiver mountain
        "[id=Bombette]:visible", // switch in crystal palace
        ["[id=Hammer]:visible", "Super Hammer"], // hit fake Kooper
        "Super Boots", // break the ice on shiver mountain
        ["[id=Sushie]:visible", "#blue-house-open", "img[data-item-name='Odd Key']"] // access to chapter 7 via blue house or past Blooper fight
    ],
    8: [
        ["[id=Eldstar]:visible", "#power-star"], 
        ["[id=Mamar]:visible", "#power-star"], 
        ["[id=Skolar]:visible", "#power-star"], 
        ["[id=Muskular]:visible", "#power-star"], 
        ["[id=Misstar]:visible", "#power-star"], 
        ["[id=Klevar]:visible", "#power-star"], 
        ["[id=Kalmar]:visible", "#power-star"],
        ["[id=Bombette]:visible", "#fast-bowser-castle", "#power-star-skip"], // getting out of jail
        ["[id=Parakarry]:visible", "#fast-bowser-castle", "#power-star-skip"], // basement
        ["[id=Bow]:visible", "#fast-bowser-castle", "#power-star-skip"], // basement
        ["[id=Lakilester]:visible", "#fast-bowser-castle", "#power-star-skip"] // basement
    ]
}

var seedSettingsExpanded = false;
