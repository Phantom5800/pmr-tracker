const maxKeyCounts = {
    1: 4, // fortress keys
    2: 4, // ruins keys
    3: 3, // tubba keys
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 5, // bowser castle keys
    9: 64, // quizmo
    10: 3, // master
    11: 96, // star pieces
    12: 11, // rip cheato
    13: 26, // letters
    14: 2, // prison keys
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
    14: 0
};

// alternate tracker html, default tracker is in index.html, so this version is a more compact layout
var altTracker = `<table width="100%">
<tr style="height: 4em;">
    <td style="text-align: left; width: 60%;">
        <h1 id="main-tracker-name">Required Items</h1>
    </td>
    <td style="text-align: right;">
        <h2></h2>
    </td>
</tr>
</table>
<div style="display:flex;flex-wrap:wrap;padding-left:10px;">
    <div class="compact-element"><img data-chapter-star="1" id="Eldstar" class="unselected star-spirit" src="images/icons/Eldstar_PM.png"></div>
    <div class="compact-element"><img data-chapter-star="2" id="Mamar" class="unselected star-spirit" src="images/icons/Mamar_PM.png"></div>
    <div class="compact-element"><img data-chapter-star="3" id="Skolar" class="unselected star-spirit" src="images/icons/Skolar_PM.png"></div>
    <div class="compact-element"><img data-chapter-star="4" id="Muskular" class="unselected star-spirit" src="images/icons/Muskular_PM.png"></div>
    <div class="compact-element"><img data-chapter-star="5" id="Misstar" class="unselected star-spirit" src="images/icons/Misstar_PM.png"></div>
    <div class="compact-element"><img data-chapter-star="6" id="Klevar" class="unselected star-spirit" src="images/icons/Klevar_PM.png"></div>
    <div class="compact-element"><img data-chapter-star="7" id="Kalmar" class="unselected star-spirit" src="images/icons/Kalmar_PM.png"></div>
    <div class="compact-element"><img data-chapter-star="8" id="Star Rod" class="unselected star-spirit" src="images/icons/PM_Starrod.png"></div>
    <div class="compact-element"><img id="Goombario" class="unselected partner" src="images/partners/goombario.png"></div>
    <div class="compact-element"><img id="Kooper" class="unselected partner" src="images/partners/kooper.png"></div>
    <div class="compact-element"><img id="Bombette" class="unselected partner" src="images/partners/bombette.png"></div>
    <div class="compact-element"><img id="Parakarry" class="unselected partner" src="images/partners/parakarr.png"></div>
    <div class="compact-element"><img id="Bow" class="unselected partner" src="images/partners/bow.png"></div>
    <div class="compact-element"><img id="Watt" class="unselected partner" src="images/partners/watt.png"></div>
    <div class="compact-element"><img id="Sushie" class="unselected partner" src="images/partners/sushie.png"></div>
    <div class="compact-element"><img id="Lakilester" class="unselected partner" src="images/partners/lakilester.png"></div>
    <div class="compact-element"><img id="Boots" class="boots upgrade" src="images/upgrades/PM_Normal_Boots_Sprite.png"></div>
    <div class="compact-element"><img id="Hammer" class="hammer upgrade" src="images/upgrades/PM_Normal_Hammer_Sprite.png"></div>
    <div class="compact-element"><img id="Ultra Stone" class="unselected optional-item" src="images/icons/UltraStone.gif"></div>
    <div class="compact-misc-item compact-element"><img id="Dolly" class="unselected optional-item" src="images/icons/PeachDoll_PM.png"></div>
    <div class="compact-misc-item compact-element"><img id="Kooper's Shell" class="unselected optional-item" src="images/icons/Kooper'sShell_PM.png"></div>
    <div class="compact-element">
        <img data-chapter-key="1" id="Fortress Key" class="unselected key-item" src="images/icons/FortressKey_PM.png">
        <br>
        <p data-chapter-key-count="1">0/4</p>
    </div>
    <div class="compact-misc-item compact-element">
        <img data-chapter-key="13" id="Letter" class="unselected optional-item" src="images/icons/PM_Letter_Sprite.png">
        <br>
        <p data-chapter-key-count="13">0/26</p>
    </div>
    <div class="compact-element"><img data-chapter="2" id="Pulse Stone" class="unselected key-item" src="images/icons/PulseStone.gif"></div>
    <div class="compact-element"><img data-chapter="2" id="Pyramid Stone" class="unselected key-item" src="images/icons/PyramidStone.gif"></div>
    <div class="compact-element"><img data-chapter="2" id="Diamond Stone" class="unselected key-item" src="images/icons/DiamondStone.png"></div>
    <div class="compact-element"><img data-chapter="2" id="Lunar Stone" class="unselected key-item" src="images/icons/LunarStone.gif"></div>
    <div class="compact-element">
        <img data-chapter-key="2" id="Ruins Key" class="unselected key-item" src="images/icons/Ruins_Key.png">
        <br>
        <p data-chapter-key-count="2">0/4</p>
    </div>
    <div class="compact-misc-item compact-element"><img id="Artifact" class="unselected optional-item" src="images/icons/Artifact_PM.png"></div>
    <div class="compact-misc-item compact-element"><img id="Record" class="unselected optional-item" src="images/icons/Record.gif"></div>
    <div class="compact-misc-item compact-element"><img id="Weight" class="unselected optional-item" src="images/icons/WeightPM.gif"></div>
    <div class="compact-element"><img data-chapter="3" id="Boo's Portrait" class="unselected key-item" src="images/icons/Boo'sPortrait_PM.png"></div>
    <div class="compact-element">
        <img data-chapter-key="3" id="Tubba Castle Key" class="unselected key-item" src="images/icons/Tubba_Blubba_Castle_Key.png">
        <br>
        <p data-chapter-key-count="3">0/3</p>
    </div>
    <div class="compact-misc-item compact-element"><img id="Storeroom Key" class="unselected optional-item" src="images/icons/OddKey.gif"></div>
    <div class="compact-element"><img data-chapter="4" id="Toy Train" class="unselected key-item" src="images/icons/ToyTrain_PM.png"></div>
    <div class="compact-misc-item compact-element"><img id="Calculator" class="unselected optional-item" src="images/icons/Calculator_PM.png"></div>
    <div class="compact-misc-item compact-element"><img id="Frying Pan" class="unselected optional-item" src="images/icons/PM_Frying_Pan.png"></div>
    <div class="compact-misc-item compact-element"><img id="Mailbag" class="unselected optional-item" src="images/icons/Mailbag_PM.png"></div>
    <div class="compact-element"><img data-chapter="4" id="Cake" class="unselected key-item" src="images/icons/Cake.gif"></div>
    <div class="compact-misc-item compact-element"><img id="Cookbook" class="unselected optional-item" src="images/icons/Cook_Book_Paper_Mario.png"></div>
    <div class="compact-misc-item compact-element"><img id="Dictionary" class="unselected optional-item" src="images/icons/PM_Dictionary.png"></div>
    <div class="compact-misc-item compact-element"><img id="Mystery Note" class="unselected optional-item" src="images/icons/MysteryNote.png"></div>
    <div class="compact-element"><img data-chapter="5" id="Jade Raven" class="unselected key-item" src="images/icons/JadeRaven_PM.png"></div>
    <div class="compact-misc-item compact-element"><img id="Volcano Vase" class="unselected optional-item" src="images/icons/VolcanoVase.gif"></div>
    <div class="ch6-optional compact-element"><img data-chapter="6" id="Magical Seed 1" class="unselected key-item" src="images/icons/MagicalSeed1.png"></div>
    <div class="ch6-optional compact-element"><img data-chapter="6" id="Magical Seed 2" class="unselected key-item" src="images/icons/MagicalSeed2.png"></div>
    <div class="ch6-optional compact-element"><img data-chapter="6" id="Magical Seed 3" class="unselected key-item" src="images/icons/MagicalSeed3.png"></div>
    <div class="ch6-optional compact-element"><img data-chapter="6" id="Magical Seed 4" class="unselected key-item" src="images/icons/MagicalSeed4.png"></div>
    <div class="compact-element"><img data-chapter="6" id="Magical Bean" class="unselected key-item" src="images/icons/MagicBean_PM.png"></div>
    <div class="compact-misc-item compact-element"><img id="Red Berry" class="unselected optional-item" src="images/icons/PaperMario_Items_RedBerry.png"></div>
    <div class="compact-misc-item compact-element"><img id="Yellow Berry" class="unselected optional-item" src="images/icons/PaperMario_Items_YellowBerry.png"></div>
    <div class="compact-misc-item compact-element">
        <div class="tooltip">
            <img id="Blue Berry" class="unselected optional-item" src="images/icons/PaperMario_Items_BlueBerry.png">
            <span class="tooltiptext">Used in two places: the blue flower and the well in chapter 6.</span>
        </div>
    </div>
    <div class="compact-element"><img data-chapter="6" id="Fertile Soil" class="unselected key-item" src="images/icons/Fertilesoil.png"></div>
    <div class="compact-misc-item compact-element"><img id="Bubble Berry" class="unselected optional-item" src="images/icons/PaperMario_Items_BubbleBerry.png"></div>
    <div class="compact-misc-item compact-element"><img id="Crystal Berry" class="unselected optional-item" src="images/icons/CrystalBerry_PM.png"></div>
    <div class="compact-misc-item compact-element"><img id="Water Stone" class="unselected optional-item" src="images/icons/WaterStone_PM.png"></div>
    <div class="compact-element"><img data-chapter="6" id="Miracle Water" class="unselected key-item" src="images/icons/MiracleWater_PM.png"></div>
    <div class="compact-misc-item compact-element blue-house-optional"><img data-item-name="Odd Key" id="Odd Key" class="unselected optional-item" src="images/icons/OddKey.gif"></div>
    <div class="compact-element"><img data-chapter="7" id="Warehouse Key" class="unselected key-item" src="images/icons/OddKey.gif"></div>
    <div class="compact-element"><img data-chapter="7" id="Bucket" class="unselected key-item" src="images/icons/Bucket.png"></div>
    <div class="compact-element"><img data-chapter="7" id="Scarf" class="unselected key-item" src="images/icons/Scarf.gif"></div>
    <div class="compact-element"><img data-chapter="7" id="Star Stone" class="unselected key-item" src="images/icons/StarStone_PM.png"></div>
    <div class="compact-misc-item compact-element"><img id="Blue Key" class="unselected optional-item" src="images/icons/PM_BlueKey.png"></div>
    <div class="compact-element"><img data-chapter="7" id="Red Key" class="unselected key-item" src="images/icons/PM_Red_Key.png"></div>
    <div class="compact-element"><img data-chapter="7" id="Palace Key" class="unselected key-item" src="images/icons/PM_Palace_Key.png"></div>
    <div id="BowsersKeySlot" class="compact-element">
        <img data-chapter-key="8" id="Bowser's Castle Key" class="unselected key-item" src="images/icons/PM_Bowser_Castle_Key.png">
        <br>
        <p data-chapter-key-count="8">0/5</p>
    </div>
    <div class="compact-misc-item compact-element">
        <img data-chapter-key="14" id="Prison Key" class="unselected optional-item" src="images/icons/OddKey.gif">
        <p data-chapter-key-count="14">0/2</p>
    </div>
    <div class="compact-misc-item compact-element koopa-koot-generated-item"><img id="Crystal Ball" class="unselected optional-item" src="images/koopa-koot-favors/Crystal_Ball_PM.png"></div>
    <div class="compact-misc-item compact-element"><img id="Lyrics" class="unselected optional-item" src="images/koopa-koot-favors/Lyrics_PM.png"></div>
    <div class="compact-misc-item compact-element"><img id="Melody" class="unselected optional-item" src="images/koopa-koot-favors/PM_Melody.png"></div>
    <div class="compact-misc-item compact-element">
        <img data-chapter-key="9" id="Quizmo" class="unselected optional-item" src="images/icons/ChuckQuizmo_PM.png">
        <br>
        <p data-chapter-key-count="9">0/64</p>
    </div>
    <div class="compact-misc-item compact-element">
        <img data-chapter-key="11" id="Star Piece" class="unselected optional-item" src="images/icons/Star_Piece.png">
        <br>
        <p data-chapter-key-count="11">0/96</p>
    </div>
    <div class="compact-misc-item compact-element">
        <img data-chapter-key="12" id="Rip Cheato" class="unselected optional-item" src="images/icons/RipCheato.png">
        <br>
        <p data-chapter-key-count="12">0/11</p>
    </div>
    <div class="compact-misc-item compact-element">
        <div class="tooltip">
            <img id="Anti Guy" class="unselected optional-item" src="images/icons/Anti_Guy_Sprite_-_Paper_Mario.png">
            <span class="tooltiptext">Not in logic until Lemon Candy can be made (Cake Mix + Lemon)</span>
        </div>
    </div>
</div>`;

// The main requirements are grouped logically with their respective chapters.
// Additional requirements are typically partners or upgrades for mario.
// Any nested arrays means that if any condition from that group is true, the entire group is treated as true.
const extraChapterRequirements = {
    1: [
        "#Kooper" // switch to bring up bridge on pleasant path
    ],
    2: [
        ["#Bombette", "Super Hammer"], // need bombette to blow up rock in toad town (or super hammer for sewers)
        ["#Parakarry", "Super Hammer"] // this is just to access the ruins via mt rugged or sewers respectively
    ],
    3: [
        "#Parakarry", // need parakarry to get to Tubba's Castle
        "Super Boots" // need a boots upgrade to fight the heart
    ],
    4: [
        "#Bombette", // blow up the wall to general guy
        "#Watt", // see in the room before general guy
        ["#Bow", "#toybox-open"] // need Bow to get into toybox if it is not open by default
    ],
    5: [
        "#Sushie", // need sushie in order to place the jade raven
        ["#Parakarry", "#Lakilester"], // need one of these in order to get hammer upgrade
        [
            "#Watt", 
            "#whale-open", // watt or whale open to get to the island OR vvvv
            ["#Bombette", ["img[data-item-name='Odd Key']", "#blue-house-open"]] // bombette AND access to blue house for pipe
        ]
    ],
    6: ["#Lakilester", "Super Boots"], // both of these requirements are for top right room
    7: [
        "#Kooper", // switch on shiver mountain
        "#Bombette", // switch in crystal palace
        "Super Boots", // break the ice on shiver mountain
        ["#Sushie", "#blue-house-open", "img[data-item-name='Odd Key']"] // access to chapter 7 via blue house or past Blooper fight
    ],
    8: [
        "#Eldstar", 
        "#Mamar", 
        "#Skolar", 
        "#Muskular", 
        "#Misstar", 
        "#Klevar", 
        "#Kalmar",
        ["#Bombette", "#fast-bowser-castle"], // getting out of jail
        ["#Parakarry", "#fast-bowser-castle"], // basement
        ["#Bow", "#fast-bowser-castle"], // basement
        ["#Lakilester", "#fast-bowser-castle"] // basement
    ]
}

var urlParams = {};

function getUrlParamCount() {
    return Object.keys(urlParams).length;
}

function getUrlVars() {
    if (getUrlParamCount() === 0) {
        var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
            urlParams[key.toLowerCase()] = value;
        });
    }
    return urlParams;
}

function getUrlParam(parameter, defaultValue) {
    var urlParameter = defaultValue;
    if (parameter in urlParams) {
        urlParameter = urlParams[parameter];
    }
    return urlParameter;
}

function localStorageGetWithDefault(key, defaultValue) {
    const urlVal = getUrlParam(key, defaultValue);
    if (urlVal === defaultValue) {
        const value = localStorage.getItem(key);
        if (!value) {
            localStorage.setItem(key, defaultValue);
            return defaultValue;
        }
        return value;
    }
    return urlVal;
}

function checkIfChapterIsCompletable(chapter) {
    if (chapter <= 8) {
        var totalCount = extraChapterRequirements[chapter].length;
        var completedCount = 0;
        $(`img[data-chapter=${chapter}]`).each(function() {
            if ($(this).is(":visible")) {
                ++totalCount;
            }
            if (!$(this).hasClass("unselected")) {
                ++completedCount;
            }
        });
    
        $(`img[data-chapter-key=${chapter}]`).each(function() {
            totalCount += maxKeyCounts[chapter];
            if (chapter === 2 && currentKeyCounts[chapter] === 3) {
                --totalCount; // chapter 2 specifically only _requires_ 3 of the keys
            } else if (chapter === 8 && $("#fast-bowser-castle").is(':checked')) {
                totalCount -= maxKeyCounts[8];
            }
            if (!$(this).hasClass("unselected")) {
                completedCount += currentKeyCounts[chapter];
            }
        });

        function handleExtraChapterRequirements(requirementsArray, depth = 0) {
            var conditionsComplete = 0;

            for (var i = 0; i < requirementsArray.length; ++i) {
                var elem = $(requirementsArray[i]).first();
                var isChecked = elem.is(':checkbox') && elem.is(":checked");
                var selected = !elem.is(':checkbox') && !elem.hasClass("unselected");

                // if boots upgrade is required, increment when normal boots are not active
                if (requirementsArray[i] === "Super Boots") {
                    if ($("#Boots").length === 0) {
                        ++conditionsComplete;
                    }
                // if hammer upgrade is required, mark completed if the hammer is not default
                } else if (requirementsArray[i] === "Super Hammer") {
                    if ($("#Hammer").length === 0) {
                        ++conditionsComplete;
                    }
                } else if (Array.isArray(requirementsArray[i])) {
                    var completed = handleExtraChapterRequirements(requirementsArray[i], depth + 1);

                    // even layers of depth are AND statements, odd layers are OR statements
                    // this makes sense right now for how the arrays are nested in chapter 5
                    if ((completed === requirementsArray[i].length && depth % 2 === 0) 
                        || (completed >= 1 && depth % 2 === 1)) {
                        ++conditionsComplete;
                    }
                } else if (isChecked || selected) {
                    ++conditionsComplete;
                }
            }

            return conditionsComplete;
        }

        for (var i = 0; i < extraChapterRequirements[chapter].length; ++i) {
            if (extraChapterRequirements[chapter][i] === "Super Boots") {
                if ($("#Boots").length === 0) {
                    ++completedCount;
                }
            } else if (extraChapterRequirements[chapter][i] === "Super Hammer") {
                if ($("#Hammer").length === 0) {
                    ++completedCount;
                }
            // if a condition is an array, the condition is true if any element of the array is true
            } else if (Array.isArray(extraChapterRequirements[chapter][i])) {
                // for top level depth, conditions are an OR statement
                if (handleExtraChapterRequirements(extraChapterRequirements[chapter][i]) >= 1) {
                    ++completedCount;
                }
            } else if (!$(extraChapterRequirements[chapter][i]).first().hasClass("unselected")) {
                ++completedCount;
            }
        }
    
        var star_spirit = $(`[data-chapter-star='${chapter}']`);
        if (completedCount >= totalCount && star_spirit.hasClass("unselected")) {
            star_spirit.addClass("completable");
        } else {
            star_spirit.removeClass("completable");
        }
        //console.log(`${completedCount} / ${totalCount}`);
    }
}

function initializePage() {
    $('img').on('dragstart', function(){return false;});
    $('.star-spirit').height(60);
    $('.partner, .upgrade').height(60);
    $('.key-item, .optional-item').height(40);
    $('[id="Ultra Stone"]').height(50);

    $('.optional-item').unbind("click").click(function() {
        var isObtained = false;
        if ($(this).hasClass("unselected")) {
            $(this).removeClass("unselected");
            isObtained = true;
        } else {
            $(this).addClass("unselected");
        }

        // this is to account for the blue house being opened from the outside
        if ($(this).attr('id') === "Odd Key") {
            // there can be multiple odd key's on the page because of different
            // compact tracker layouts, so synchronize the hidden ones just to be sure
            //$('.blue-house-optional').toggleClass("unselected", !isObtained);
            checkIfChapterIsCompletable(5);
            checkIfChapterIsCompletable(7);
        }
    });

    // upgrade markers
    $('.upgrade').unbind("click").click(function() {
        switch ($(this).attr('id')) {
            case "Boots":
                $(this).attr('id', "Super Boots");
                $(this).attr('src', "images/upgrades/SuperBoots_PM.png")
                break;

            case "Super Boots":
                $(this).attr('id', "Ultra Boots");
                $(this).attr('src', "images/upgrades/UltraBoots_PM.png")
                break;

            case "Hammer":
                $(this).attr('id', "Super Hammer");
                $(this).attr('src', "images/upgrades/PM_Super_Hammer_Sprite.png")
                break;

            case "Super Hammer":
                $(this).attr('id', "Ultra Hammer");
                $(this).attr('src', "images/upgrades/PM_Ultra_Hammer_Sprite.png")
                break;
        }

        $('.main-tracker h2').text($(this).attr('id'));
        for (var i = 1; i <= 8; ++i) {
            checkIfChapterIsCompletable(i);
        }
    });

    $('.upgrade').unbind("contextmenu").contextmenu(function() {
        switch ($(this).attr('id')) {
            case "Ultra Boots":
                $(this).attr('id', "Super Boots");
                $(this).attr('src', "images/upgrades/SuperBoots_PM.png")
                break;

            case "Super Boots":
                $(this).attr('id', "Boots");
                $(this).attr('src', "images/upgrades/PM_Normal_Boots_Sprite.png")
                break;

            case "Ultra Hammer":
                $(this).attr('id', "Super Hammer");
                $(this).attr('src', "images/upgrades/PM_Super_Hammer_Sprite.png")
                break;

            case "Super Hammer":
                $(this).attr('id', "Hammer");
                $(this).attr('src', "images/upgrades/PM_Normal_Hammer_Sprite.png")
                break;
        }

        $('.main-tracker h2').text($(this).attr('id'));
        for (var i = 1; i <= 8; ++i) {
            checkIfChapterIsCompletable(i);
        }
    });

    // for partners, need to update all chapter completion statuses
    $('.partner').unbind("click").click(function() {
        if ($(this).hasClass("unselected")) {
            $(this).removeClass("unselected");
        } else {
            $(this).addClass("unselected");
        }

        for (var i = 1; i <= 8; ++i) {
            checkIfChapterIsCompletable(i);
        }
    });

    // set text display for the main items
    $('.main-tracker img').on('mouseenter', function() {
        $('.main-tracker h2').text($(this).attr('id'));
    });

    $('.main-tracker img').on('mouseleave', function() {
        $('.main-tracker h2').text("");
    });

    $('.compact-tracker img').on('mouseenter', function() {
        $('.compact-tracker h2').text($(this).attr('id'));
    });

    $('.compact-tracker img').on('mouseleave', function() {
        $('.compact-tracker h2').text("");
    });

    // misc tracker
    $('.misc-tracker img').on('mouseenter', function() {
        $('.misc-tracker h2').text($(this).attr('id'));
    });

    $('.misc-tracker img').on('mouseleave', function() {
        $('.misc-tracker h2').text("");
    });

    // keys tracker
    $('.keys-tracker img').on('mouseenter', function() {
        $('.keys-tracker h2').text($(this).attr('id'));
    });

    $('.keys-tracker img').on('mouseleave', function() {
        $('.keys-tracker h2').text("");
    });

    // koopa koot block names
    $('.koopa-koot-tracker img').on('mouseenter', function() {
        $('.koopa-koot-tracker h2').text($(this).attr('id'));
    });

    $('.koopa-koot-tracker img').on('mouseleave', function() {
        $('.koopa-koot-tracker h2').text("");
    });

    // dojo block names
    $('.dojo-tracker img').on('mouseenter', function() {
        $('.dojo-tracker h2').text($(this).attr('id'));
    });

    $('.dojo-tracker img').on('mouseleave', function() {
        $('.dojo-tracker h2').text("");
    });

    // required chapter items
    $("img[data-chapter]").unbind("click").click(function(){
        var c = parseInt($(this).attr("data-chapter"));
        if ($(this).hasClass("unselected")) {
            $(this).removeClass("unselected");
            $(this).removeClass("completable");
        } else {
            $(this).addClass("unselected");
            if ($("#compact-tracker").is(':checked') && $("#highlight-key").is(':checked')) {
                $(this).addClass("completable");
            }
        }

        checkIfChapterIsCompletable(c);
    });

    // chapter keys
    $("img[data-chapter-key]").unbind("click").click(function(){
        var c = parseInt($(this).attr("data-chapter-key"));
        $(this).removeClass("unselected");
        $(this).removeClass("completable");
        if (currentKeyCounts[c] < maxKeyCounts[c]) {
            ++currentKeyCounts[c];
            $(`p[data-chapter-key-count="${c}"]`).text(`${currentKeyCounts[c]}/${maxKeyCounts[c]}`);
        }

        checkIfChapterIsCompletable(c);
    });

    $("img[data-chapter-key]").unbind("contextmenu").contextmenu(function(){
        var c = parseInt($(this).attr("data-chapter-key"));
        if (currentKeyCounts[c] > 0) {
            --currentKeyCounts[c];
            $(`p[data-chapter-key-count="${c}"]`).text(`${currentKeyCounts[c]}/${maxKeyCounts[c]}`);
        }

        if (currentKeyCounts[c] === 0) {
            $(this).addClass("unselected");
            if ($(this).hasClass("key-item")) {
                if ($("#compact-tracker").is(':checked') && $("#highlight-key").is(':checked')) {
                    $(this).addClass("completable");
                }
            }
        }

        checkIfChapterIsCompletable(c);
        return false;
    });

    // star spirit trackers
    $(".star-spirit").unbind("click").click(function(){
        var c = parseInt($(this).attr("data-chapter-star"));
        if ($(this).hasClass("unselected")) {
            $(this).removeClass("unselected");
            $(this).removeClass("completable");
        } else {
            $(this).addClass("unselected");
            checkIfChapterIsCompletable(c);
        }
        checkIfChapterIsCompletable(8);
    });
}

$(document).ready(function(){
    getUrlVars();

    // disable some basic functionality
    $('html').contextmenu(function(){return false;});
    $('img').contextmenu(function(){return false;});

    initializePage();

    ////////////////////////////////////////////////////////////////
    // options menu
    ////////////////////////////////////////////////////////////////

    // hide options menu when clicking anywhere on the page
    $(document).click(function(e) {
        // if the option menu is open, and the click is outside the options menu, close it
        var container = $("#options-menu");
        if (container.hasClass("options-open") && !container.is(e.target) && container.has(e.target).length === 0) {
            $("#options-menu-toggle").click();
        }
    });

    // show / hide options menu
    $("#options-menu-toggle").click(function(e) {
        e.stopPropagation();
        $(this).toggleClass("options-open");
        $("#options-menu").toggleClass("options-open");
    });

    // load seed info from the generator
    $("#load-seed-button").click(function() {
        var user_seed = $("#randomizer-seed").val();
        var endpoint = `https://paper-mario-randomizer-server.ue.r.appspot.com/randomizer_settings/${user_seed}`;

        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 1) {
                $("#loading-icon").toggle(true);
            } else if (this.readyState == 4) {
                $("#loading-icon").toggle(false);
                if (this.status == 200) {
                    var data = JSON.parse(this.responseText);

                    if (data["ToyboxOpen"] != $("#toybox-open").is(':checked')) {
                        $("#toybox-open").click();
                    }

                    if (data["WhaleOpen"] != $("#whale-open").is(':checked')) {
                        $("#whale-open").click();
                    }

                    if (data["FlowerGateOpen"] != $("#chapter-6-open").is(':checked')) {
                        $("#chapter-6-open").click();
                    }

                    if (data["BlueHouseOpen"] != $("#blue-house-open").is(':checked')) {
                        $("#blue-house-open").click();
                    }
                    
                    if (data["ShortenBowsersCastle"] != $("#fast-bowser-castle").is(':checked')) {
                        $("#fast-bowser-castle").click();
                    }

                    // TODO: koopa koot is not randomized yet, add it here when it is
                    if ($("#koopa-koot-randomized").is(':checked')) {
                        $("#koopa-koot-randomized").click(); // disable koopa koot if enabled
                    }

                    if (data["IncludeDojo"] != $("#dojo-randomized").is(':checked')) {
                        $("#dojo-randomized").click();
                    }

                    alert(`Loaded settings for seed: ${user_seed}`);
                } else {
                    alert(`Failed to find seed: ${user_seed}`);
                }
            }
        }
        xmlhttp.open("GET", endpoint, true);
        xmlhttp.setRequestHeader("accept", "application/json, text/plain, */*");
        xmlhttp.setRequestHeader("sec-fetch-mode", "cors");
        xmlhttp.send();

        $(this).blur();
    });

    function resetPage() {
        // clear out all single click items
        $("img.optional-item, img.key-item, img.partner").each(function() {
            if (!$(this).hasClass("unselected")) {
                $(this).addClass("unselected");
            }
        });

        // clear upgrades
        $("img.upgrade").each(function() {
            for (var i = 0; i < 2; ++i) {
                $(this).contextmenu();
            }
        });

        // clear star spirits
        $("img.star-spirit").each(function() {
            if (!$(this).hasClass("completable") && !$(this).hasClass("unselected")) {
                $(this).addClass("unselected");
            }
        });

        // clear key counts
        $("img[data-chapter-key]").each(function() {
            var chapter = parseInt($(this).attr("data-chapter-key"));
            for (var i = 0; i < maxKeyCounts[chapter]; ++i) {
                $(this).contextmenu();
            }
        });

        // reset chapter completion states
        for (var i = 1; i <= 8; ++i) {
            checkIfChapterIsCompletable(i);
        }
    }

    // reset the tracker completely
    $("#reset-button").click(function() {
        var confirmation = confirm("Are you sure you want to reset the tracker status?");
        if (confirmation) {
            resetPage();
        }
        $(this).blur();
    });

    ////////////////////////////////////////////////////////////////
    // preset open areas
    ////////////////////////////////////////////////////////////////

    $("#toybox-open").click(function() {
        var isChecked = $(this).is(':checked');
        localStorage.setItem("toybox-open", isChecked);
        checkIfChapterIsCompletable(4);
    });

    $("#whale-open").click(function() {
        var isChecked = $(this).is(':checked');
        localStorage.setItem("whale-open", isChecked);
        checkIfChapterIsCompletable(5);
    });

    $("#chapter-6-open").click(function() {
        var isChecked = $(this).is(':checked');
        $(".ch6-optional").toggle(!isChecked);
        localStorage.setItem("chapter-6-open", isChecked);
    });

    $("#blue-house-open").click(function() {
        var isChecked = $(this).is(':checked');
        $(".blue-house-optional").each(function() {
            var compact_checked = $("#compact-tracker").is(':checked');
            var misc_checked = $("#combine-misc").is(':checked');
            // make sure to hide / show the correct odd key
            if ($(this).hasClass("compact-misc-item")) {
                $(this).toggle(!isChecked && misc_checked && compact_checked);
            } else {
                $(this).toggle(!isChecked);
            }
        });
        localStorage.setItem("blue-house-open", isChecked);
        checkIfChapterIsCompletable(5);
        checkIfChapterIsCompletable(7);
    });

    $("#fast-bowser-castle").click(function() {
        // simple hack to clear out the key count when toggling fast bowser castle
        for (var i = 0; i < 5; ++i) {
            $("img[id='Bowser\\'s Castle Key']").contextmenu();
        }

        var isChecked = $(this).is(':checked');
        $("#BowsersKeySlot").toggle(!isChecked);
        localStorage.setItem("fast-bowser-castle", isChecked);
        checkIfChapterIsCompletable(8);
    });

    ////////////////////////////////////////////////////////////////
    // additional randomization
    ////////////////////////////////////////////////////////////////

    $("#koopa-koot-randomized").click(function() {
        var isChecked = $(this).is(':checked');
        $(".koopa-koot-generated-item").toggle(isChecked);
        $(".koopa-koot-tracker").toggle(isChecked);
        localStorage.setItem("koopa-koot-randomized", isChecked);
    });

    $("#dojo-randomized").click(function() {
        var isChecked = $(this).is(':checked');
        $(".dojo-tracker").toggle(isChecked);
        localStorage.setItem("dojo-randomized", isChecked);
    });

    ////////////////////////////////////////////////////////////////
    // tracker specific settings
    ////////////////////////////////////////////////////////////////

    $("#user-notes").click(function() {
        var isChecked = $(this).is(':checked');
        $("#notes").toggle(isChecked);
        localStorage.setItem("user-notes", isChecked);
    });

    $("#recipe-tooltips").click(function() {
        var isChecked = $(this).is(':checked');
        $(".tooltiptext").toggle(isChecked);
        localStorage.setItem("recipe-tooltips", isChecked);
    });

    $("#background-color").on("input", function() {
        var color = $(this).val();
        $("body, html").css("background-color", color);
        localStorage.setItem("background-color", color);
    });

    $("#section-color").on("input", function() {
        var color = $(this).val();
        $(".section").css("background-color", color);
        localStorage.setItem("section-color", color);
    });

    ////////////////////////////////////////////////////////////////
    // Compact Tracker Initialization
    ////////////////////////////////////////////////////////////////
    
    function combineMiscAndCompact() {
        // reset the page state when changing tracker layouts
        resetPage();

        var compact_checked = $("#compact-tracker").is(':checked');
        var misc_checked = $("#combine-misc").is(':checked');

        if (compact_checked) {
            if (misc_checked) {
                $(".misc-tracker, .keys-tracker").toggle(false);
                $(".compact-misc-item").toggle(true);

                $("#main-tracker-name").text("Basically Everything");
                $("#main-tracker-name").css("font-size", "2em");
            } else {
                $(".misc-tracker, .keys-tracker").toggle(true);
                $(".compact-misc-item").toggle(false);

                $("#main-tracker-name").text("Required Items");
                $("#main-tracker-name").css("font-size", "2.75em");
            }
        } else {
            $(".misc-tracker, .keys-tracker").toggle(true);
        }

        // hide odd key if blue house is open
        var isChecked = $("#blue-house-open").is(':checked');
        $(".blue-house-optional").each(function() {
            // make sure to hide / show the correct odd key
            if ($(this).hasClass("compact-misc-item")) {
                $(this).toggle(!isChecked && misc_checked && compact_checked);
            } else {
                $(this).toggle(!isChecked);
            }
        });

        // hide crystal ball if koopa koot is not randomized
        isChecked = $("#koopa-koot-randomized").is(':checked');
        $(".koopa-koot-generated-item").toggle(isChecked);

        isChecked = $("#recipe-tooltips").is(':checked');
        $(".tooltiptext").toggle(isChecked);
    }

    $("#compact-tracker").click(function() {
        // make correct tracker visible
        var isChecked = $(this).is(':checked');
        var currentTracker = $(".main-tracker").html();
        $(".main-tracker").html(altTracker);
        $(".main-tracker").toggleClass("compact");
        altTracker = currentTracker;
        initializePage();
        localStorage.setItem("compact-tracker", isChecked);

        // hide/show compact tracker options
        $(".compact-tracker-options").toggle(isChecked);
        combineMiscAndCompact();

        // update bowser key visibility in the new tracker
        isChecked = $("#fast-bowser-castle").is(':checked');
        $("#BowsersKeySlot").toggle(!isChecked);

        // update seeds visibility
        isChecked = $("#chapter-6-open").is(':checked');
        $(".ch6-optional").toggle(!isChecked);

        updateKeyItemHighlight();
    });

    $("#combine-misc").click(function() {
        var isChecked = $(this).is(':checked');
        localStorage.setItem("combine-misc", isChecked);
        combineMiscAndCompact();
    });

    function updateKeyItemHighlight() {
        if ($("#compact-tracker").is(':checked') && $("#highlight-key").is(':checked')) {
            $("img.key-item").each(function() {
                if ($(this).hasClass("unselected")) {
                    $(this).addClass("completable");
                }
            });
        } else {
            $("img.key-item").each(function() {
                $(this).removeClass("completable");
            });
        }
    }

    $("#highlight-key").click(function() {
        var isChecked = $(this).is(':checked');
        localStorage.setItem("highlight-key", isChecked);
        updateKeyItemHighlight();
    });

    var use_compact_tracker = localStorageGetWithDefault("compact-tracker", false) == "true";
    if (use_compact_tracker) {
        $("#compact-tracker").click();
    }

    var combine_misc = localStorageGetWithDefault("combine-misc", false) == "true";
    if (combine_misc) {
        $("#combine-misc").click();
    }

    var highlight_key_items = localStorageGetWithDefault("highlight-key", false) == "true";
    if (highlight_key_items) {
        $("#highlight-key").click();
    }

    ////////////////////////////////////////////////////////////////
    // misc. local storage settings
    ////////////////////////////////////////////////////////////////

    var toybox_open = localStorageGetWithDefault("toybox-open", "true") == "true";
    if (!toybox_open) {
        $("#toybox-open").click();
    }

    var whale_open = localStorageGetWithDefault("whale-open", "true") == "true";
    if (!whale_open) {
        $("#whale-open").click();
    }

    var chapter6_open = localStorageGetWithDefault("chapter-6-open", false) == "true";
    if (chapter6_open) {
        $("#chapter-6-open").click();
    }

    var blue_house_open = localStorageGetWithDefault("blue-house-open", false) == "true";
    if (blue_house_open) {
        $("#blue-house-open").click();
    }

    var fast_bowser_castle = localStorageGetWithDefault("fast-bowser-castle", false) == "true";
    if (fast_bowser_castle) {
        $("#fast-bowser-castle").click();
    }

    var koopa_koot_randomized = localStorageGetWithDefault("koopa-koot-randomized", "true") == "true";
    if (!koopa_koot_randomized) {
        $("#koopa-koot-randomized").click();
    }

    var dojo_randomized = localStorageGetWithDefault("dojo-randomized", "true") == "true";
    if (!dojo_randomized) {
        $("#dojo-randomized").click();
    }

    var user_notes_enabled = localStorageGetWithDefault("user-notes", false) == "true";
    if (user_notes_enabled) {
        $("#user-notes").click();
    }

    var tooltips_enabled = localStorageGetWithDefault("recipe-tooltips", "true") == "true";
    if (!tooltips_enabled) {
        $("#recipe-tooltips").click();
    }

    var bg_color = localStorageGetWithDefault("background-color", "#2f4f4f");
    $("body, html").css("background-color", bg_color);
    $("#background-color").val(bg_color);

    var section_color = localStorageGetWithDefault("section-color", "#23233b");
    $(".section").css("background-color", section_color);
    $("#section-color").val(section_color);
});
