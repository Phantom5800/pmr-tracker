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
            ["#Bombette", ["img[data-item-name='Odd Key']", "#blue-house-open"]], // bombette AND access to blue house for pipe
            ["Super Boots", "#Sushie"] // boots and sushie to reach shortcut from the left
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

    $('img.star-spirit').each(function() {
        var star_spirit = $(this);

        if ($(this).siblings("div").length === 0) {
            jQuery('<div>', {
                class: 'chapter-level'
            }).appendTo($(this).parent())
            .click(function() {
                star_spirit.click();
            })
            .contextmenu(function() {
                star_spirit.contextmenu();
            });
        } else {
            $(this).siblings("div").unbind("click").click(function() {
                star_spirit.click();
            })
            .unbind("contextmenu").contextmenu(function() {
                star_spirit.contextmenu();
            });
        }
    });

    $('img.star-spirit').unbind("contextmenu").contextmenu(function() {
        var value = parseInt($(this).siblings('div').text() || 0);
        value = (value + 1) % 8;
        $(this).siblings('div').text(value);
        $(this).siblings('div').toggle(value > 0);
    });

    $('div.colorblind-label').unbind("click").click(function() {
        $(this).siblings("img").click();
    });

    $('div.colorblind-label').unbind("contextmenu").contextmenu(function() {
        $(this).siblings("img").contextmenu();
    });

    $('img.optional-item').each(function() {
        var item = $(this);
        var id = item.attr('id');
        if (id !== "Ultra Stone" && id !== "Anti Guy" && id !== "Lee" && id !== "Chan") {
            if (item.siblings(".item-turnin").length === 0) {
                jQuery('<div>', {
                    class: 'item-turnin'
                }).appendTo(item.parent())
                .click(function() {
                    item.click();
                })
                .contextmenu(function() {
                    item.contextmenu();
                })
                .mouseenter(function() {
                    item.mouseenter();
                })
                .mouseleave(function() {
                    item.mouseleave();
                })
                .text("\u2714")
                .toggle(false);
            } else {
                item.siblings(".item-turnin").unbind("click").click(function() {
                    item.click();
                })
                .unbind("contextmenu").contextmenu(function() {
                    item.contextmenu();
                });
            }
        }
    });

    $('img.optional-item').unbind("contextmenu").contextmenu(function() {
        $(this).siblings(".item-turnin").toggle();
    });

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
            $('.blue-house-optional img').toggleClass("unselected", !isObtained);
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

    // letter block names
    $('.letter-tracker img').on('mouseenter', function() {
        $('.letter-tracker h2').text($(this).attr('id'));
    });

    $('.letter-tracker img').on('mouseleave', function() {
        $('.letter-tracker h2').text("");
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

        var previousCount = currentKeyCounts[c];
        if (currentKeyCounts[c] < maxKeyCounts[c]) {
            ++currentKeyCounts[c];
            $(`p[data-chapter-key-count="${c}"]`).text(`${currentKeyCounts[c]}/${maxKeyCounts[c]}`);
        }

        // for rip cheato, update tooltip for how much more money is needed
        if (c === 12) {
            var coinCounts = [2,2,4,4,8,8,16,16,32,32,64];
            var totalCoins = 0;
            for (var i = currentKeyCounts[c]; i < maxKeyCounts[c]; ++i) {
                totalCoins += coinCounts[i];
            }
            $(".rip-cheato-money").each(function() {$(this).text(`Total Coins Needed: ${totalCoins} (Only first 6 can be progression items)`)});
        }

        if ($(this).attr('data-key-sync')) {
            synchronizeMapsKey($(this), currentKeyCounts[c], previousCount);
        }
        checkIfChapterIsCompletable(c);
    });

    $("img[data-chapter-key]").unbind("contextmenu").contextmenu(function(){
        var c = parseInt($(this).attr("data-chapter-key"));
        var previousCount = currentKeyCounts[c];
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

        // for rip cheato, update tooltip for how much more money is needed
        if (c === 12) {
            var coinCounts = [2,2,4,4,8,8,16,16,32,32,64];
            var totalCoins = 0;
            for (var i = currentKeyCounts[c]; i < maxKeyCounts[c]; ++i) {
                totalCoins += coinCounts[i];
            }
            $(".rip-cheato-money").each(function() {$(this).text(`Total Coins Needed: ${totalCoins} (Only first 6 can be progression items)`)});
        }        

        if ($(this).attr('data-key-sync')) {
            synchronizeMapsKey($(this), currentKeyCounts[c], previousCount);
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

    synchronizeMapsAndTracker();
}

$(document).ready(function(){
    getUrlVars();

    // disable some basic functionality
    $('html').contextmenu(function(){return false;});
    $('img').contextmenu(function(){return false;});

    initializeMaps();
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
                    
                    if ((data["BowsersCastleMode"] >= 1) != $("#fast-bowser-castle").is(':checked')) {
                        $("#fast-bowser-castle").click();
                    }

                    if (data["IncludeShops"] != $("#shops-randomized").is(':checked')) {
                        $("#shops-randomized").click();
                    }

                    if (data["KeyitemsOutsideDungeon"] != $("#keys-randomized").is(':checked')) {
                        $("#keys-randomized").click();
                    }

                    if (data["IncludePanels"] != $("#panels-randomized").is(':checked')) {
                        $("#panels-randomized").click();
                    }

                    if (data["IncludeCoins"] != $("#coins-randomized").is(':checked')) {
                        $("#coins-randomized").click();
                    }

                    // letter settings:
                    // 0 = none
                    // 1 = no letter chain
                    // 2 = final chain reward
                    // 3 = all letters
                    if ((data["IncludeLettersMode"] >= 1) != $("#letters-randomized").is(':checked')) {
                        $("#letters-randomized").click(); // disable letters if enabled
                    }

                    // koopa koot settings:
                    // 0 = none
                    // 1 = koot rewards
                    // 2 = koot rewards and items
                    if ((data["IncludeFavorsMode"] >= 1) != $("#koopa-koot-randomized").is(':checked')) {
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

    // reset the tracker completely
    $("#reset-button").click(function() {
        var confirmation = confirm("Are you sure you want to reset the tracker status?");
        if (confirmation) {
            resetPage();
        }
        $(this).blur();
    });

    $("#save-button").click(function() {
        savePageState();
        $(this).blur();
    });

    $("#load-button").click(function() {
        loadPageState();
        $(this).blur();
    });

    // hide or show seed specific settings
    $("#toggle-tracker-config").click(function() {
        $("#toggle-tracker-config td.section-toggle").toggleClass("section-toggle-closed");
        $("tr.tracker-setting").each(function() {
            if ($(this).hasClass("compact-tracker-options")) {
                $(this).toggle($("#compact-tracker").is(':checked') && !$("#toggle-tracker-config td.section-toggle").hasClass("section-toggle-closed"));
            } else {
                $(this).toggle();
            }
        });
    });

    $("#toggle-seed-settings").click(function() {
        $("#toggle-seed-settings td.section-toggle").toggleClass("section-toggle-closed");
        $("tr.seed-setting").toggle();
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
        $("#flag-koopakoot").toggle(isChecked);
    });

    $("#dojo-randomized").click(function() {
        var isChecked = $(this).is(':checked');
        var isCompactMiscCombined = $("#compact-tracker").is(':checked') && $("#combine-misc").is(':checked');
        toggleChecks("[Dojo]", !isChecked);
        $("#flag-dojo").toggle(isChecked);
        countChecks();
        localStorage.setItem("dojo-randomized", isChecked);
    });

    ////////////////////////////////////////////////////////////////
    // tracker specific settings
    ////////////////////////////////////////////////////////////////

    $("#colorblind").click(function() {
        var isChecked = $(this).is(':checked');
        $(".colorblind-label").toggle(isChecked);
        localStorage.setItem("colorblind", isChecked);
    });

    $("#useless-items").click(function() {
        var isChecked = $(this).is(':checked');
        $(".useless-item").toggle(isChecked);
        localStorage.setItem("useless-items", isChecked);
    });

    $("#seed-flags").click(function() {
        var isChecked = $(this).is(':checked');
        $("#enabled-settings").toggle(isChecked);
        localStorage.setItem("seed-flags", isChecked);
    });

    $("#game-maps").click(function() {
        var isChecked = $(this).is(':checked');
        $(".map-display").toggle(isChecked);
        localStorage.setItem("game-maps", isChecked);
    });

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

        $(".colorblind-label").toggle($("#colorblind").is(':checked'));
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

        // handle dojo visibility
        isChecked = $("#dojo-randomized").is(':checked');
        var isCompactMiscCombined = compact_checked && misc_checked;
        $(".dojo-optional").toggle(isChecked && isCompactMiscCombined);
        $(".dojo-tracker").toggle($("#dojo-randomized").is(':checked') && !isCompactMiscCombined);

        // show/hide useless items
        isChecked = $("#useless-items").is(':checked');
        $(".useless-item").toggle(isChecked);

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
        $(".compact-tracker-options").toggle(isChecked && !$("#toggle-tracker-config td.section-toggle").hasClass("section-toggle-closed"));
        combineMiscAndCompact();

        // update bowser key visibility in the new tracker
        isChecked = $("#fast-bowser-castle").is(':checked');
        $("#BowsersKeySlot").toggle(!isChecked);

        // update seeds visibility
        isChecked = $("#chapter-6-open").is(':checked');
        $(".ch6-optional").toggle(!isChecked);

        updateKeyItemHighlight();
        sortCompactTracker($("#compact-tracker-order").find(':selected').val() === "true");
    });

    $("#combine-misc").click(function() {
        var isChecked = $(this).is(':checked');
        localStorage.setItem("combine-misc", isChecked);
        combineMiscAndCompact();
        synchronizeMapsAndTracker();
        sortCompactTracker($("#compact-tracker-order").val() === "true");
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

    function sortCompactTracker(requiredFirst) {
        $(".compact-misc-item").css("order", (requiredFirst) ? 1 : 0);
    }
    
    $("#compact-tracker-order").on("change", function() {
        sortCompactTracker($(this).val() === "true");
        localStorage.setItem("compact-tracker-order", $(this).val());
    });

    var compact_tracker_order = localStorageGetWithDefault("compact-tracker-order", "false") == "true";
    if (compact_tracker_order) {
        $("#compact-tracker-order").val("true");
    }

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
    // map exclusive settings
    ////////////////////////////////////////////////////////////////
    $("#shops-randomized").click(function() {
        var isChecked = $(this).is(':checked');
        localStorage.setItem("shops-randomized", isChecked);
        $("#flag-shopsanity").toggle(isChecked);
    });

    $("#keys-randomized").click(function() {
        var isChecked = $(this).is(':checked');
        localStorage.setItem("keys-randomized", isChecked);
        $("#flag-keysanity").toggle(isChecked);
    });

    $("#panels-randomized").click(function() {
        var isChecked = $(this).is(':checked');
        localStorage.setItem("panels-randomized", isChecked);
        toggleChecks("[Panel]", !isChecked);
        $("#flag-panels").toggle(isChecked);
        countChecks();
    });

    $("#coins-randomized").click(function() {
        var isChecked = $(this).is(':checked');
        localStorage.setItem("coins-randomized", isChecked);
        toggleChecks("[Coinsanity]", !isChecked);
        $("#flag-coinsanity").toggle(isChecked);
        countChecks();
    });

    $("#letters-randomized").click(function() {
        var isChecked = $(this).is(':checked');
        localStorage.setItem("letters-randomized", isChecked);
        toggleChecks("[Letter]", !isChecked);
        $("#flag-letters").toggle(isChecked);
        countChecks();
        $("div.letter-tracker").toggle(isChecked);
    });

    var shops_randomized = localStorageGetWithDefault("shops-randomized", "true") == "true";
    if (!shops_randomized) {
        $("#shops-randomized").click();
    }

    var keys_randomized = localStorageGetWithDefault("keys-randomized", "true") == "true";
    if (!keys_randomized) {
        $("#keys-randomized").click();
    }

    var panels_randomized = localStorageGetWithDefault("panels-randomized", "true") == "true";
    if (!panels_randomized) {
        $("#panels-randomized").click();
    }

    var coins_randomized = localStorageGetWithDefault("coins-randomized", "true") == "true";
    if (!coins_randomized) {
        $("#coins-randomized").click();
    }

    var letters_randomized = localStorageGetWithDefault("letters-randomized", "true") == "true";
    if (!letters_randomized) {
        $("#letters-randomized").click();
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

    var dojo_randomized = localStorageGetWithDefault("dojo-randomized", false) == "true";
    if (dojo_randomized) {
        $("#dojo-randomized").click();
    }

    var colorblind_mode = localStorageGetWithDefault("colorblind", "true") == "true";
    if (!colorblind_mode) {
        $("#colorblind").click();
    }

    var show_useless_items = localStorageGetWithDefault("useless-items", "true") == "true";
    if (!show_useless_items) {
        $("#useless-items").click();
    }

    var seed_flags = localStorageGetWithDefault("seed-flags", false) == "true";
    if (seed_flags) {
        $("#seed-flags").click();
    }

    var maps_enabled = localStorageGetWithDefault("game-maps", "true") == "true";
    if (!maps_enabled) {
        $("#game-maps").click();
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

    // clear chapter difficulty marks
    $("img.star-spirit").each(function() {
        $(this).siblings("div").each(function() {
            var val = parseInt($(this).text()) || 0;
            while (val > 0) {
                $(this).contextmenu();
                val = (val + 1) % 8;
            }
        });
    });

    // clear checked off items
    $("img.optional-item").each(function() {
        var siblings = $(this).siblings("div.item-turnin");
        if (siblings.length > 0 && siblings.is(':visible')) {
            $(this).contextmenu();
        }
    });

    // reset chapter completion states
    for (var i = 1; i <= 8; ++i) {
        checkIfChapterIsCompletable(i);
    }

    resetMapChecks();
    $("#panels-randomized").click();
    $("#panels-randomized").click();
    $("#coins-randomized").click();
    $("#coins-randomized").click();
}

function savePageState() {
    var imageStates = {
        items: {},
        checks: {}
    };
    $("img.star-spirit, img.key-item, img.optional-item, img.upgrade, img.partner").each(function() {
        if ($(this).is(':visible')) {
            var chapterKey = $(this).attr("data-chapter-key");
            var keyCount = 0;
            if (chapterKey) {
                keyCount = currentKeyCounts[parseInt(chapterKey)];
            } else {
                keyCount = $(this).hasClass("unselected") ? 0 : 1;
            }
    
            imageStates.items[$(this).attr('id')] = keyCount;
        }
    });

    $("input[data-map-group]").each(function() {
        var name = `${$(this).attr("data-map-group")} + ${$(this).parent().text()}`;
        imageStates.checks[name] = $(this).is(':checked') ? 1 : 0;
    });

    var json = JSON.stringify(imageStates);
    var blob = new Blob([json], {type: "text/json"});
    var file = window.URL.createObjectURL(blob);

    var fileLink = document.createElement("a");
    fileLink.download = `pmr-tracker-state.json`;
    fileLink.href = file;
    fileLink.click();

    window.URL.revokeObjectURL(file);
}

function loadPageState() {
    resetPage();

    var fileDialog = document.createElement("input");
    fileDialog.type = "file";
    fileDialog.accept = ".json, text/json";
    fileDialog.click();
    fileDialog.onchange = function() {
        if (fileDialog.files.length > 0) {
            var fileReader = new FileReader();
            fileReader.onload = function() {
                var json = fileReader.result;
                var obj = JSON.parse(json);

                for (var key in obj.items) {
                    if (key.includes("Boots") || key.includes("Hammer")) {
                        var marioupgrade = key.substring(key.lastIndexOf(' ') + 1);
                        if (key.includes("Super")) {
                            $(`img[id="${marioupgrade}"]`).click();
                        } else if (key.includes("Ultra")) {
                            $(`img[id="${marioupgrade}"]`).click();
                            $(`img[id="Super ${marioupgrade}"]`).click();
                        }
                    } else {
                        for (var i = 0; i < obj.items[key]; ++i) {
                            $(`img[id="${key}"]`).each(function() {
                                if ($(this).is(':visible')) {
                                    $(this).click();
                                }
                            });
                        }
                    }
                }

                for (var key in obj.checks) {
                    if (obj.checks[key]) {
                        var data_group = key.substring(0, key.indexOf(' '));
                        var check_string = key.substring(key.lastIndexOf('+') + 2);
    
                        $(`input[data-map-group="${data_group}"]`).each(function() {
                            if ($(this).parent().text() === check_string) {
                                $(this).attr("checked", true);
                                updateSingleMapCheck($(this), true);
                            }
                        });
                    }
                }
            }
            fileReader.readAsText(fileDialog.files[0]);
        }
    }
}
