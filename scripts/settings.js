/******************************************************************************
 * settings.js
 * 
 * Contains functions related to page settings.
*******************************************************************************/

///
/// Initialize the callbacks for setting what areas are open from the start.
///
function initializeOpenAreasSettings() {
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

    $("#seeds-required").change(function() {
        var requiredCount = $(this).prop('selectedIndex');
        localStorage.setItem("seeds-required", requiredCount);

        for (var i = 1; i <= 4; ++i) {
            $(`.seed-${i}`).toggle(i > 4 - requiredCount);
        }
        if (!isPageReloading) getAvailableChecks("chapter-6-entry");
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

    $("#starting-location").change(function() {
        if (!isPageReloading) getAvailableChecks("starting-location");
        localStorage.setItem("starting-location", $("#starting-location").val());
        checkIfChapterIsCompletable(2);
        checkIfChapterIsCompletable(5);
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

    $("#power-star").click(function() {
        // simple hack to clear out the key count when toggling power star hunt
        for (var i = 0; i < currentKeyCounts[16]; ++i) {
            $("img[id='Power Stars Found']").contextmenu();
        }

        var isChecked = $(this).is(':checked');
        $("#PowerStarSlot").toggle(isChecked);
        $("#StarRodSlot").toggle(!isChecked);
        localStorage.setItem("power-star", isChecked);
        checkIfChapterIsCompletable(8);
    });

    $("#power-star-skip").click(function() {
        var isChecked = $(this).is(':checked');
        localStorage.setItem("power-star-skip", isChecked);
        checkIfChapterIsCompletable(8);
    });

    $("#power-star-num").change(function() {
        var starNum = parseInt($(this).val());
        maxKeyCounts[16] = starNum;
        currentKeyCounts[16] = 0;
        localStorage.setItem("power-star-num", starNum);
        $(`p[data-chapter-key-count="16"]`).text(`${currentKeyCounts[16]}/${maxKeyCounts[16]}`);
        if(maxKeyCounts[16] >= 100){
            console.log(maxKeyCounts[16], "Cur count high");
            $(`p[data-chapter-key-count="16"]`).css("font-size", "1.125em");
        }else{
            console.log(maxKeyCounts[16], "Cur count low");
            $(`p[data-chapter-key-count="16"]`).css("font-size", "");
        }
        checkIfChapterIsCompletable(8);
    });
}

function loadOpenAreaSettings() {
    var toybox_open = localStorageGetWithDefault("toybox-open", "true") == "true";
    if (!toybox_open) {
        $("#toybox-open").click();
    }

    var whale_open = localStorageGetWithDefault("whale-open", "true") == "true";
    if (!whale_open) {
        $("#whale-open").click();
    }

    var seeds_required = localStorageGetWithDefault("seeds-required", 4);
    $("#seeds-required").prop('selectedIndex', seeds_required);
    $("#seeds-required").change();

    var blue_house_open = localStorageGetWithDefault("blue-house-open", false) == "true";
    if (blue_house_open) {
        $("#blue-house-open").click();
    }

    var starting_location = localStorageGetWithDefault("starting-location", "ToadTown");
    $("#starting-location").val(starting_location);
    $("#starting-location").change();

    var fast_bowser_castle = localStorageGetWithDefault("fast-bowser-castle", false) == "true";
    if (fast_bowser_castle) {
        $("#fast-bowser-castle").click();
    }

    var power_star = localStorageGetWithDefault("power-star", false) == "true";
    if (power_star) {
        $("#power-star").click();
    }

    var power_star_skip = localStorageGetWithDefault("power-star-skip", false) == "true";
    if (power_star_skip) {
        $("#power-star-skip").click();
    }
}

///
/// Initialize callbacks for settings that add additional randomization to a seed.
///
function initializeOptionalRandomizedSettings() {
    $("#koopa-koot-randomized").click(function() {
        var isChecked = $(this).is(':checked');
        localStorage.setItem("koopa-koot-randomized", isChecked);
        updateKootItemsAndCoins();
        countChecks();
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

    $("#shops-randomized").click(function() {
        var isChecked = $(this).is(':checked');
        localStorage.setItem("shops-randomized", isChecked);
        toggleChecks("[Shop]", !isChecked);
        $("#flag-shopsanity").toggle(isChecked);
        countChecks();

        $("#flag-rowf").toggle(isChecked && $("#rowf-randomized").is(':checked'));
        $("#flag-merlow").toggle(isChecked && $("#merlow-randomized").is(':checked'));
        $(".shopsanity-subsetting").toggle(isChecked && seedSettingsExpanded);
    });

    $("#rowf-randomized").click(function() {
        var isChecked = $(this).is(':checked');
        localStorage.setItem("shops-rowf", isChecked);
        toggleChecks("[Shop]", !isChecked);
        $("#flag-rowf").toggle(isChecked);
        countChecks();
    });

    $("#merlow-randomized").click(function() {
        var isChecked = $(this).is(':checked');
        localStorage.setItem("merlow-randomized", isChecked);
        toggleChecks("[Shop]", !isChecked);
        $("#flag-merlow").toggle(isChecked);
        countChecks();
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
        $("#flag-overworld-coins").toggle(isChecked);
        countChecks();
    });

    $("#coin-blocks-randomized").click(function() {
        var isChecked = $(this).is(':checked');
        localStorage.setItem("coin-blocks-randomized", isChecked);
        toggleChecks("[Coin Block]", !isChecked);
        $("#flag-coin-block").toggle(isChecked);
        countChecks();
    });

    $("#foliage-coins-randomized").click(function() {
        var isChecked = $(this).is(':checked');
        localStorage.setItem("foliage-coins-randomized", isChecked);
        toggleChecks("[Foliage Coin]", !isChecked);
        $("#flag-foliage-coins").toggle(isChecked);
        countChecks();
    });

    $("#koot-coins-randomized").click(function() {
        var isChecked = $(this).is(':checked');
        localStorage.setItem("koot-coins-randomized", isChecked);
        updateKootItemsAndCoins();
        countChecks();
    });

    $("#letters-randomized").click(function() {
        var isChecked = $(this).is(':checked');
        localStorage.setItem("letters-randomized", isChecked);
        toggleChecks("[Letter]", !isChecked);
        $("#flag-letters").toggle(isChecked);
        countChecks();
        $("div.letter-tracker").toggle(isChecked);
        $("#Letters").parent().toggle(!isChecked);
    });

    $("#trading-event-randomized").click(function() {
        var isChecked = $(this).is(':checked');
        toggleChecks("[Trade]", !isChecked);
        $("#flag-tradingevent").toggle(isChecked);
        countChecks();
        localStorage.setItem("trading-event-randomized", isChecked);
    });

    $("#gear-shuffle").change(function() {
        var shuffleMode = $(this).prop('selectedIndex');
        localStorage.setItem("gear-shuffle", shuffleMode);
    });
}

function updateKootItemsAndCoins(){
    console.log("Runnig update koot");
    var enableKootItems = $("#koopa-koot-randomized").is(':checked');
    var enableKootCoins = enableKootItems && $("#koot-coins-randomized").is(':checked');

    toggleChecks("[Koot]", !enableKootItems);
    $(".koopa-koot-generated-item").toggle(!enableKootItems);
    $(".koopa-koot-tracker").toggle(!enableKootItems);

    toggleChecks("[Koot Coin]", !enableKootCoins);
    $("#flag-koot-coins").toggle(!enableKootCoins);
}

function loadOptionalRandomizedSettings() {
    var shops_randomized = localStorageGetWithDefault("shops-randomized", "true") == "true";
    if (!shops_randomized) {
        $("#shops-randomized").click();
    }

    var rowf_randomized = localStorageGetWithDefault("rowf-randomized", "true") == "true";
    if (!rowf_randomized) {
        $("#rowf-randomized").click();
    }

    var merlow_randomized = localStorageGetWithDefault("merlow-randomized", "true") == "true";
    if (!merlow_randomized) {
        $("#merlow-randomized").click();
    }

    var keys_randomized = localStorageGetWithDefault("keys-randomized", "true") == "true";
    if (!keys_randomized) {
        $("#keys-randomized").click();
    }

    var panels_randomized = localStorageGetWithDefault("panels-randomized", "true") == "true";
    if (!panels_randomized) {
        $("#panels-randomized").click();
    }

    var overworld_coins_randomized = localStorageGetWithDefault("coins-randomized", "true") == "true";
    if (!overworld_coins_randomized) {
        $("#coins-randomized").click();
    }

    var foliage_coins_randomized = localStorageGetWithDefault("foliage-coins-randomized", "true") == "true";
    if (!foliage_coins_randomized) {
        $("#foliage-coins-randomized").click();
    }

    var coin_blocks_randomized = localStorageGetWithDefault("coin-blocks-randomized", "true") == "true";
    if (!coin_blocks_randomized) {
        $("#coin-blocks-randomized").click();
    }

    var letters_randomized = localStorageGetWithDefault("letters-randomized", "true") == "true";
    if (!letters_randomized) {
        $("#letters-randomized").click();
    }

    var koopa_koot_randomized = localStorageGetWithDefault("koopa-koot-randomized", false) == "true";
    if (koopa_koot_randomized) {
        $("#koopa-koot-randomized").click();
    }

    var koot_coins_randomized = localStorageGetWithDefault("koot-coins-randomized", false) == "true";
    if (koot_coins_randomized) {
        $("#koot-coins-randomized").click();
    }

    var trading_event_randomized = localStorageGetWithDefault("trading-event-randomized", false) == "true";
    if (trading_event_randomized) {
        $("#trading-event-randomized").click();
    }

    var gear_shuffle = localStorageGetWithDefault("gear-shuffle", 0);
    $("#gear-shuffle").prop('selectedIndex', gear_shuffle);
    $("#gear-shuffle").change();

    var dojo_randomized = localStorageGetWithDefault("dojo-randomized", false) == "true";
    if (dojo_randomized) {
        $("#dojo-randomized").click();
    }

    updateKootItemsAndCoins();
}

///
/// Initialize callbacks for settings that modify site usability.
///
function initializeUsabilitySettings() {
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

    $("#how-to-fields").click(function() {
        var isChecked = $(this).is(':checked');
        $("div.info-block").toggle(isChecked);
        localStorage.setItem("how-to-fields", isChecked);
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

    $("#show-num-checks").click(function() {
        var isChecked = $(this).is(':checked');
        localStorage.setItem("show-num-checks", isChecked);
        if(!isChecked){
            //Replace all zone names
            $('button.map-select').each(function(){
                if($(this).data('origName') != undefined){
                    $(this).html($(this).data('origName'));
                }
            });
        }
    });

    $("#remove-disabled-checks").click(function() {
        var isChecked = $(this).is(':checked');
        localStorage.setItem("remove-disabled-checks", isChecked);
        removeDisabledChecks(isChecked);
    });
}

function removeDisabledChecks(shouldHide) {
    $('#map-checks label').show();
    if(!shouldHide){
        $('#map-checks label.disabled').show();
    }else{
        $('#map-checks label.disabled').hide();
    }
}

function loadUsabilitySettings() {
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

    var howto_enabled = localStorageGetWithDefault("how-to-fields", "true") == "true";
    if (!howto_enabled) {
        $("#how-to-fields").click();
    }

    var show_num_checks = localStorageGetWithDefault("show-num-checks", false) == "true";
    if (show_num_checks) {
        $("#show-num-checks").click();
    }

    var remove_disabled_checks = localStorageGetWithDefault("remove-disabled-checks", false) == "true";
    if (remove_disabled_checks) {
        $("#remove-disabled-checks").click();
    }

    var bg_color = localStorageGetWithDefault("background-color", "#2f4f4f");
    $("body, html").css("background-color", bg_color);
    $("#background-color").val(bg_color);

    var section_color = localStorageGetWithDefault("section-color", "#23233b");
    $(".section").css("background-color", section_color);
    $("#section-color").val(section_color);
}
