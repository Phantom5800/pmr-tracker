// total check counts
var total_checks = 0;
var panel_checks = 0;
var coinsanity_checks = 0;

// current check counts
var current_checks = 0;
var current_panels = 0;
var current_coins = 0;

function countChecks() {
    // reset totals
    total_checks = 0;
    panel_checks = 0;
    coinsanity_checks = 0;

    $("#map-checks label").each(function() {
        if ($(this).text().includes("[Coinsanity]")) {
            if ($("#coins-randomized").is(':checked')) {
                ++coinsanity_checks;
                ++total_checks;
            }
        } else if ($(this).text().includes("[Panel]")) {
            if ($("#panels-randomized").is(':checked')) {
                ++panel_checks;
                ++total_checks;
            }
        } else if ($(this).text().includes("[Dojo]")) {
            if ($("#dojo-randomized").is(':checked')) {
                ++total_checks;
            }
        } else {
            ++total_checks;
        }
    });

    $("#total-checks").text(`Total Checks: 0/${total_checks}`);
    $("#coinsanity-checks").text(`Coinsanity: 0/${coinsanity_checks}`);
    $("#panel-checks").text(`Panels: 0/${panel_checks}`);
}

function toggleChecks(check, enable) {
    var changedMapGroups = [];

    $("#map-checks input").each(function() {
        var label = $(this).parent().text();
        if (label.includes(check)) {
            // uncheck things before disabling them
            if ($(this).is(':checked')) {
                $(this).click();
            }

            // disable the checkbox and the label
            $(this).attr("disabled", enable);
            $(this).parent().toggleClass("disabled", enable);

            var mapGroup = $(this).attr("data-map-group");
            if (changedMapGroups.indexOf(mapGroup) === -1) {
                changedMapGroups.push(mapGroup);
            }
        }
    });

    // update map states for everything that changed
    for (mapGroup in changedMapGroups) {
        updateCompletion(changedMapGroups[mapGroup], true);
    }
}

function updateCompletion(mapGroup, skipVisible = false) {
    var totalCount = 0;
    var completeCount = 0;
    $(`#map-checks input[data-map-group="${mapGroup}"]`).each(function() {
        if ($(this).is(':visible') || skipVisible) {
            ++totalCount;
            if ($(this).is(':checked') || $(this).is(':disabled')) {
                ++completeCount;
            }
        }
    });

    $(`td[data-checks-list="${mapGroup}"]`).toggleClass("complete", totalCount === completeCount);

    // see if all screens are complete
    totalCount = 0;
    completeCount = 0;
    $("td[data-checks-list]").each(function() {
        if ($(this).is(':visible') || skipVisible) {
            ++totalCount;
            if ($(this).hasClass("has-nothing") || $(this).hasClass("complete")) {
                ++completeCount;
            }
        }
    });

    $("button.map-select.selected").toggleClass("complete", totalCount === completeCount);
}

function updateSingleMapCheck(check) {
    updateCompletion(check.attr("data-map-group"));

    // update counts
    var label = check.parent().text();
    var count_dir = (check.is(':checked')) ? 1 : -1;
    if (label.includes("[Coinsanity]")) {
        current_coins += count_dir;
        current_checks += count_dir;
        $("#total-checks").text(`Total Checks: ${current_checks}/${total_checks}`);
        $("#coinsanity-checks").text(`Coinsanity: ${current_coins}/${coinsanity_checks}`);
    } else if (label.includes("[Panel]")) {
        current_panels += count_dir;
        current_checks += count_dir;
        $("#total-checks").text(`Total Checks: ${current_checks}/${total_checks}`);
        $("#panel-checks").text(`Panels: ${current_panels}/${panel_checks}`);
    } else {
        current_checks += count_dir;
        $("#total-checks").text(`Total Checks: ${current_checks}/${total_checks}`);
    }
}

function initializeMaps() {
    countChecks();

    // count how many checks per area
    var mapChecks = {};
    $("#map-checks div").each(function() {
        var key = $(this).attr("id").split("-").slice(0,2).join("-");
        if (!mapChecks[key]) {
            mapChecks[key] = 0;
        }
        mapChecks[key] += $(this).children("ul").children("li").length;
    });
    for (map in mapChecks) {
        console.log(`${map} - ${mapChecks[map]}`);
    }

    // select a set of maps
    $("button.map-select").click(function() {
        $("button.map-select").removeClass("selected");
        $(this).addClass("selected");

        $("table.map td").removeClass("selected");
        $("#map-grid div").toggle(false);
        $("#map-checks div").toggle(false);
        $(`#map-grid #${$(this).attr("data-map")}`).toggle(true);
    });

    // select a map screen to see what checks are available
    $("table.map td").click(function() {
        $("table.map td").removeClass("selected");
        $(this).addClass("selected");

        $("#map-checks div").toggle(false);
        $(`#map-checks div#${$(this).attr("data-checks-list")}`).toggle(true);
    });

    // mark off a single check
    $("#map-checks input").click(function() {
        updateSingleMapCheck($(this));
    });
}

function resetMapChecks() {
    $("#map-checks input").each(function() {
        if ($(this).is(':checked')) {
            $(this).click();
        }
    });

    $("td[data-checks-list]").removeClass("complete");
    $("button.map-select").removeClass("complete");
}

// this function needs to be called after initializeMaps as it will rebind new events for some checks
// in order to synchronize the progress tracker and the map tracker
function synchronizeMapsAndTracker() {
    $("img[data-anti-guy]").each(function() {
        $(this).unbind("click").click(function() {
            $("img[data-anti-guy]").each(function() {
                $(this).toggleClass("unselected");
            });

                $("input[data-anti-guy]").attr("checked", !$(this).hasClass("unselected"));
        });
    });

    $("input[data-anti-guy]").unbind("click").click(function() {
        var isChecked = $(this).is(':checked');
        updateSingleMapCheck($(this));
        $("img[data-anti-guy]").each(function() {
            $(this).toggleClass("unselected", !isChecked);
        });
    });
}
