/******************************************************************************
 * compact.js
 * 
 * Contains html replacement for the compact mode tracker.
*******************************************************************************/

///
/// Initialize callbacks for compact tracker settings.
///
function initializeCompactTrackerSettings() {
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

        // handle forest pass visibility
        isChecked = $("#forest-open").is(':checked');
        $("[id='Forest Pass']").each(function() {
            // make sure to hide / show the correct forest pass
            if ($(this).parent().hasClass("compact-misc-item")) {
                $(this).parent().toggle(!isChecked && misc_checked && compact_checked);
            } else {
                $(this).parent().toggle(!isChecked);
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

        // enforce letter visibility
        isChecked = $("#letters-randomized").is(':checked');
        $("[id=Letters]").each(function() {
            var elem = $(this).parent();
            if (elem.hasClass("compact-misc-item")) {
                elem.toggle(!isChecked && $("#combine-misc").is(':checked'));
            } else {
                elem.toggle(!isChecked);
            }
        });
    }

    $("#compact-tracker").click(function() {
        // make correct tracker visible
        var isChecked = $(this).is(':checked');
        $("#vertical_tracker").toggle();
        $("#compact_tracker").toggle();
        initializePage();
        localStorage.setItem("compact-tracker", isChecked);

        // hide/show compact tracker options
        $(".compact-tracker-options").toggle(isChecked && !$("#toggle-tracker-config td.section-toggle").hasClass("section-toggle-closed"));
        combineMiscAndCompact();

        // update bowser key visibility in the new tracker
        isChecked = $("#fast-bowser-castle").is(':checked');
        $("[id=BowsersKeySlot]").toggle(!isChecked);

        // update power star visibility in the new tracker
        isChecked = $("#power-star").is(':checked');
        maxKeyCounts[16] = parseInt($("#power-star-num").val());
        $(`p[data-chapter-key-count="16"]`).text(`${currentKeyCounts[16]}/${maxKeyCounts[16]}`);
        if(maxKeyCounts[16] >= 100){
            console.log(maxKeyCounts[16], "Cur count high");
            $(`p[data-chapter-key-count="16"]`).css("font-size", "1.125em");
        }else{
            console.log(maxKeyCounts[16], "Cur count low");
            $(`p[data-chapter-key-count="16"]`).css("font-size", "");
        }
        $("[id=PowerStarSlot]").toggle(isChecked);
        $("[id=StarRodSlot]").toggle(!isChecked);

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

    $("#tracker-logic").click(function() {
        useTrackerLogic = $(this).is(':checked');
        localStorage.setItem("tracker-logic", useTrackerLogic);
    });

    function sortCompactTracker(requiredFirst) {
        $(".compact-misc-item").css("order", (requiredFirst) ? 1 : 0);
    }
    
    $("#compact-tracker-order").on("change", function() {
        sortCompactTracker($(this).val() === "true");
        localStorage.setItem("compact-tracker-order", $(this).val());
    });
}

///
/// Load compact tracker config from localstorage.
///
function loadCompactTrackerSettings() {
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
}
