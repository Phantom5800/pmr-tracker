/******************************************************************************
 * main.js
 * 
 * Contains core site functionality.
*******************************************************************************/

function localStorageGetWithDefault(key, defaultValue) {
    const value = localStorage.getItem(key);
    if (!value) {
        localStorage.setItem(key, defaultValue);
        return defaultValue;
    }
    return value;
}

function updateKoopaKootAvailable() {
    $(".koot-item").each(function() {
        var chapterRequired = parseInt($(this).attr('data-koot-chapter'));
        var chaptersCompleted = 0;
        $(".star-spirit").each(function() {
            if ($(this).is(':visible') && !$(this).hasClass("unselected")) {
                chaptersCompleted += 1;
            }
        });
        if (chaptersCompleted >= chapterRequired) {
            $(this).addClass("completable");
        } else {
            $(this).removeClass("completable");
        }
    });
}

function checkIfChapterIsCompletable(chapter) {
    if (!useTrackerLogic) return;

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
            } else if (chapter === 8 && ($("#fast-bowser-castle").is(':checked') || $("#power-star-skip").is(':checked'))){
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
                var selected = elem.is(':selected') || elem.length && !elem.is(':checkbox') && !elem.is('option') && !elem.hasClass("unselected");

                // if boots upgrade is required, increment when normal boots are not active
                if (requirementsArray[i] === "Super Boots") {
                    if ($("[id='Super Boots']").length || $("[id='Ultra Boots']").length) {
                        ++conditionsComplete;
                    }
                // if hammer upgrade is required, mark completed if the hammer is not default
                } else if (requirementsArray[i] === "Super Hammer") {
                    if ($("[id='Super Hammer']").length || $("[id='Ultra Hammer']").length) {
                        ++conditionsComplete;
                    }
                // ultra hammer needs special case for gear shuffle
                } else if (requirementsArray[i] === "Ultra Hammer") {
                    if ($("[id='Ultra Hammer']").length) {
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
                if ($("[id='Super Boots']").length || $("[id='Ultra Boots']").length) {
                    ++completedCount;
                }
            } else if (extraChapterRequirements[chapter][i] === "Super Hammer") {
                if ($("[id='Super Hammer']").length || $("[id='Ultra Hammer']").length) {
                    ++completedCount;
                }
            } else if (extraChapterRequirements[chapter][i] === "Ultra Hammer") {
                if ($("[id='Ultra Hammer']").length) {
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

    $('img.optional-item, img.koot-item').each(function() {
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

    $('img.optional-item, img.koot-item').unbind("contextmenu").contextmenu(function() {
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

        if (!isPageReloading) {
            getAvailableChecks($(this).attr('id').replace("'","\\\\\'"));
        }
    });

    $('.koot-item').unbind("click").click(function() {
        $(this).toggleClass("unselected");

        if (!isPageReloading) {
            getAvailableChecks($(this).attr('id').replace("'","\\\\\'"));
        }
    });

    // upgrade markers
    $('.upgrade').unbind("click").click(function() {
        switch ($(this).attr('id')) {
            case "Boot-less":
                $(this).attr('id', "Boots");
                $(this).attr('src', "images/upgrades/PM_Normal_Boots_Sprite.png")
                $(this).attr('data-state', 0);
                break;

            case "Boots":
                $(this).attr('id', "Super Boots");
                $(this).attr('src', "images/upgrades/SuperBoots_PM.png")
                $(this).attr('data-state', 1);
                break;

            case "Super Boots":
                $(this).attr('id', "Ultra Boots");
                $(this).attr('src', "images/upgrades/UltraBoots_PM.png")
                $(this).attr('data-state', 2);
                break;

            case "Hammer-less":
                $(this).attr('id', "Hammer");
                $(this).attr('src', "images/upgrades/PM_Normal_Hammer_Sprite.png")
                $(this).attr('data-state', 0);
                break;

            case "Hammer":
                $(this).attr('id', "Super Hammer");
                $(this).attr('src', "images/upgrades/PM_Super_Hammer_Sprite.png")
                $(this).attr('data-state', 1);
                break;

            case "Super Hammer":
                $(this).attr('id', "Ultra Hammer");
                $(this).attr('src', "images/upgrades/PM_Ultra_Hammer_Sprite.png")
                $(this).attr('data-state', 2);
                break;
        }

        $('.main-tracker h2').text($(this).attr('id'));
        for (var i = 1; i <= 8; ++i) {
            checkIfChapterIsCompletable(i);
        }

        if (!isPageReloading) {
            getAvailableChecks($(this).attr('id').replace("'","\\\\\'"));
        }
    });

    $('.upgrade').unbind("contextmenu").contextmenu(function() {
        switch ($(this).attr('id')) {
            case "Ultra Boots":
                $(this).attr('id', "Super Boots");
                $(this).attr('src', "images/upgrades/SuperBoots_PM.png")
                $(this).attr('data-state', 1);
                break;

            case "Super Boots":
                $(this).attr('id', "Boots");
                $(this).attr('src', "images/upgrades/PM_Normal_Boots_Sprite.png")
                $(this).attr('data-state', 0);
                break;

            case "Boots":
                $(this).attr('id', "Boot-less");
                $(this).attr('src', "images/upgrades/PM_No_Boots.png")
                $(this).attr('data-state', -1);
                break;
            
            case "Ultra Hammer":
                $(this).attr('id', "Super Hammer");
                $(this).attr('src', "images/upgrades/PM_Super_Hammer_Sprite.png")
                $(this).attr('data-state', 1);
                break;

            case "Super Hammer":
                $(this).attr('id', "Hammer");
                $(this).attr('src', "images/upgrades/PM_Normal_Hammer_Sprite.png")
                $(this).attr('data-state', 0);
                break;

            case "Hammer":
                $(this).attr('id', "Hammer-less");
                $(this).attr('src', "images/upgrades/PM_No_Hammer.png")
                $(this).attr('data-state', -1);
                break;
        }

        $('.main-tracker h2').text($(this).attr('id'));
        for (var i = 1; i <= 8; ++i) {
            checkIfChapterIsCompletable(i);
        }

        if (!isPageReloading) {
            getAvailableChecks($(this).attr('id').split(' ').at(-1).split('-').at(0));
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

        if (!isPageReloading) {
            getAvailableChecks($(this).attr('id').replace("'","\\\\\'"));
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

        if (!isPageReloading) {
            if (c == 6) {
                if ($(this).attr('id').includes("Magical Seed")) {
                    getAvailableChecks("chapter-6-entry");
                    return;
                }
            }
            getAvailableChecks($(this).attr('id').replace("'","\\\\\'"));
        }
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

        if (!isPageReloading) {
            getAvailableChecks("'chapter':" + $(this).attr('data-chapter-key'));
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

        if (!isPageReloading) {
            getAvailableChecks("'chapter':" + $(this).attr('data-chapter-key'));
        }
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
        updateKoopaKootAvailable();
        if (!isPageReloading) {
            getAvailableChecks($(this).attr('id'));
            getAvailableChecks($('.star-spirit:not(.unselected)').length);
        }
    });

    synchronizeMapsAndTracker();
}

$(document).ready(function(){
    useTrackerLogic = localStorageGetWithDefault("tracker-logic", "true") == "true";
    if (!useTrackerLogic) {
        $("#tracker-logic").click();
    }

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

        container = $("#tracker-settings-menu");
        if (container.hasClass("options-open") && !container.is(e.target) && container.has(e.target).length === 0) {
            $("#settings-menu-toggle").click();
        }
    });

    // show / hide options menu
    $("#options-menu-toggle").click(function(e) {
        e.stopPropagation();
        $(this).toggleClass("options-open");
        $("#options-menu").toggleClass("options-open");
    });

    $("#settings-menu-toggle").click(function(e) {
        e.stopPropagation();
        $(this).toggleClass("options-open");
        $("#tracker-settings-menu").toggleClass("options-open");
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

                    if (data["MagicalSeedsRequired"] != $("#seeds-required").prop('selectedIndex')) {
                        var seedsRequired = Math.min(data["MagicalSeedsRequired"], 4); // 5 is random so ... just show them all
                        $("#seeds-required").prop('selectedIndex', seedsRequired);
                        $("#seeds-required").change();
                    }

                    if (data["BlueHouseOpen"] != $("#blue-house-open").is(':checked')) {
                        $("#blue-house-open").click();
                    }

                    if (data["StartingMap"] != $("#starting-location").val()) {
                        $("#starting-location").val(data["StartingMap"]);
                    }
                    
                    if ((data["BowsersCastleMode"] >= 1) != $("#fast-bowser-castle").is(':checked')) {
                        $("#fast-bowser-castle").click();
                    }

                    if (data["IncludeShops"] != $("#shops-randomized").is(':checked')) {
                        $("#shops-randomized").click();
                    }

                    if (data["ProgressionOnRowf"] != $("#rowf-randomized").is(':checked')) {
                        $("#rowf-randomized").click();
                    }

                    if (data["ProgressionOnMerlow"] != $("#merlow-randomized").is(':checked')) {
                        $("#merlow-randomized").click();
                    }

                    if (data["KeyitemsOutsideDungeon"] != $("#keys-randomized").is(':checked')) {
                        $("#keys-randomized").click();
                    }

                    if (data["IncludePanels"] != $("#panels-randomized").is(':checked')) {
                        $("#panels-randomized").click();
                    }

                    if (data["IncludeCoinsOverworld"] != $("#coins-randomized").is(':checked')) {
                        $("#coins-randomized").click();
                    }

                    if (data["IncludeCoinsBlocks"] != $("#coin-blocks-randomized").is(':checked')) {
                        $("#coin-blocks-randomized").click();
                    }

                    if (data["IncludeCoinsFoliage"] != $("#foliage-coins-randomized").is(':checked')) {
                        $("#foliage-coins-randomized").click();
                    }

                    if (data["IncludeCoinsFavors"] != $("#koot-coins-randomized").is(':checked')) {
                        $("#koot-coins-randomized").click();
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

                    if (data["IncludeRadioTradeEvent"] != $("#trading-event-randomized").is(':checked')) {
                        $("#trading-event-randomized").click();
                    }

                    if (data["StarHunt"] != $("#power-star").is(':checked')) {
                        $("#power-star").click();
                    }

                    if (data["StarHuntEndsGame"] != $("#power-star-skip").is(':checked')) {
                        $("#power-star-skip").click();
                    }

                    if(data["StarHuntRequired"] != $("#power-star-num").val()){
                        $("#power-star-num").val(parseInt(data['StarHuntRequired']));
                        currentKeyCounts[16] = 0;
                        maxKeyCounts[16] = parseInt(data['StarHuntRequired']);
                        $(`p[data-chapter-key-count="16"]`).text(`${currentKeyCounts[16]}/${maxKeyCounts[16]}`);
                        if(maxKeyCounts[16] >= 100){
                            console.log(maxKeyCounts[16], "Cur count high");
                            $(`p[data-chapter-key-count="16"]`).css("font-size", "1.125em");
                        }else{
                            console.log(maxKeyCounts[16], "Cur count low");
                            $(`p[data-chapter-key-count="16"]`).css("font-size", "");
                        }
                    }

                    if (data["GearShuffleMode"] != $("#gear-shuffle").prop('selectedIndex')) {
                        $("#gear-shuffle").prop('selectedIndex', data["GearShuffleMode"]);
                        $("#gear-shuffle").change();
                    }

                    var startingBoots = data["StartingBoots"];
                    var startingHammer = data["StartingHammer"];
                    while($("img.boots").attr('data-state') > startingBoots) {
                        $("img.boots").contextmenu();
                    }
                    while($("img.hammer").attr('data-state') > startingHammer) {
                        $("img.hammer").contextmenu();
                    }
                    while($("img.boots").attr('data-state') < startingBoots) {
                        $("img.boots").click();
                    }
                    while($("img.hammer").attr('data-state') < startingHammer) {
                        $("img.hammer").click();
                    }

                    removeDisabledChecks($("#remove-disabled-checks").is(":checked"));

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
        seedSettingsExpanded = !seedSettingsExpanded;
        $("#toggle-seed-settings td.section-toggle").toggleClass("section-toggle-closed");
        $("tr.seed-setting").toggle();
        $("tr.shopsanity-subsetting").toggle($("#shops-randomized").is(':checked') && seedSettingsExpanded);
    });

    initializeOpenAreasSettings();
    initializeOptionalRandomizedSettings();
    initializeUsabilitySettings();

    loadOpenAreaSettings();
    loadOptionalRandomizedSettings();
    loadUsabilitySettings();

    $("[type='checkbox']").click(function() {
        if (!isPageReloading) {
            if ($(this).attr('data-map-group')) getAvailableChecks($(this).attr('data-map-group'));
            else getAvailableChecks($(this).attr('id'));
        }
    });

    ////////////////////////////////////////////////////////////////
    // Compact Tracker Initialization
    ////////////////////////////////////////////////////////////////
    initializeCompactTrackerSettings();
    loadCompactTrackerSettings();

    getAvailableChecks();
});

var isPageReloading = false;
function resetPage() {
    isPageReloading = true;
    // clear out all single click items
    $("img.optional-item, img.key-item, img.partner, img.koot-item").each(function() {
        if (!$(this).hasClass("unselected")) {
            $(this).addClass("unselected");
        }
    });

    // clear upgrades
    $("img.upgrade").each(function() {
        while($(this).attr('id') !== "Boots" && $(this).attr('id') !== "Hammer") {
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
    $("#shops-randomized").click();
    $("#panels-randomized").click();
    $("#coins-randomized").click();
    $("#coin-blocks-randomized").click();
    $("#foliage-coins-randomized").click();
    $("#letters-randomized").click();
    $("#koot-coins-randomized").click();
    $("#koopa-koot-randomized").click();
    $("#trading-event-randomized").click();

    $("#shops-randomized").click();
    $("#panels-randomized").click();
    $("#coins-randomized").click();
    $("#coin-blocks-randomized").click();
    $("#foliage-coins-randomized").click();
    $("#letters-randomized").click();
    $("#koot-coins-randomized").click();
    $("#koopa-koot-randomized").click();
    $("#trading-event-randomized").click();

    $("#seeds-required").change();
    $("#starting-location").change();
    isPageReloading = false;
    getAvailableChecks();
}
