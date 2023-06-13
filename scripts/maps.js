/******************************************************************************
 * maps.js
 * 
 * Contains functions related to the map tracker portion of the site.
*******************************************************************************/

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
        } else if ($(this).text().includes("[Coin Block]")) {
            if ($("#coin-blocks-randomized").is(':checked')) {
                ++coinsanity_checks;
                ++total_checks;
            }
        } else if ($(this).text().includes("[Foliage Coin]")) {
            if ($("#foliage-coins-randomized").is(':checked')) {
                ++coinsanity_checks;
                ++total_checks;
            }
        } else if ($(this).text().includes("[Koot Coin]")) {
            if ($("#koopa-koot-randomized").is(':checked') && $("#koot-coins-randomized").is(':checked')) {
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
        } else if ($(this).text().includes("[Koot]")) {
            if ($("#koopa-koot-randomized").is(':checked') && !$(this).hasClass('disabled')) {
                ++total_checks;
            }
        } else if ($(this).text().includes("[Letter]")) {
            if ($("#letters-randomized").is(':checked')) {
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
    for (var mapGroup in changedMapGroups) {
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


    $("div.map-buttons button").each(function() {
        // see if all screens are complete
        totalCount = 0;
        completeCount = 0;
        $(`div#${$(this).attr("data-map")} td[data-checks-list]`).each(function() {
            if ($(this).is(':visible') || skipVisible) {
                ++totalCount;
                if ($(this).hasClass("has-nothing") || $(this).hasClass("complete")) {
                    ++completeCount;
                }
            }
        });
    
        if (totalCount > 0) {
            $(this).toggleClass("complete", totalCount === completeCount);
        }
    });
}

function updateSingleMapCheck(check, skipVisible = false) {
    updateCompletion(check.attr("data-map-group"), skipVisible);

    var isChecked = check.is(':checked');

    // update counts
    var label = check.parent().text();
    var count_dir = (isChecked) ? 1 : -1;
    if (label.includes("[Coinsanity]") || label.includes("[Coin Block]") || label.includes("[Foliage Coin]") || label.includes("[Koot Coin]")) {
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
    for (var map in mapChecks) {
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

    // marks off all checks for a given map on right-click
    $("table.map td").contextmenu(function(e) {
        $(`#${$(this).attr("data-checks-list")} input:not(:disabled):not(:checked)`).each(function() {
            $(this).click();
        });
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
    $("td[data-checks-list]").removeClass("unavailable");
    $("button.map-select").removeClass("unavailable");
}

// this function needs to be called after initializeMaps as it will rebind new events for some checks
// in order to synchronize the progress tracker and the map tracker
function synchronizeMapsAndTracker() {/*
    $("img[data-sync]").each(function() {
        var sync = $(this).attr("data-sync");
        $(this).unbind("click").click(function() {
            $(`img[data-sync="${sync}"]`).each(function() {
                $(this).toggleClass("unselected");
            });

            var isSelected = !$(this).hasClass("unselected");

            $(`input[data-sync="${sync}"]`).each(function() {
                $(this).attr("checked", isSelected);
                updateSingleMapCheck($(this), true);
            });
        });
    });

    $("input[data-sync]").unbind("click").click(function() {
        var isChecked = $(this).is(':checked');
        var sync = $(this).attr("data-sync");
        updateSingleMapCheck($(this));
        $(`img[data-sync="${sync}"]`).each(function() {
            $(this).toggleClass("unselected", !isChecked);
        });
    });

    $("input[data-key-sync]").unbind("click").click(function() {
        var isChecked = $(this).is(':checked');
        var sync = $(this).attr("data-key-sync");
        var sync = sync.split("=")[0];

        $(`img[data-key-sync="${sync}"]`).each(function() {
            if ($(this).is(':visible')) {
                if (isChecked) {
                    $(this).click();
                } else {
                    $(this).contextmenu();
                }
            }
        });

        updateSingleMapCheck($(this));
    });*/
}

function synchronizeMapsKey(keyObj, current, previous) {/*
    if (current === previous) {
        return;
    }

    var sync = keyObj.attr("data-key-sync");
    if (current < previous) {
        var check = $(`input[data-key-sync="${sync}=${previous}"]`);
        check.attr("checked", false);
        updateSingleMapCheck(check, true);
    } else {
        var check = $(`input[data-key-sync="${sync}=${current}"]`);
        check.attr("checked", true);
        updateSingleMapCheck(check, true);
    }*/
}

function getAvailableChecks(check) {
    if (!useTrackerLogic) return;
    if (!$("#game-maps").is(':checked')) return; // don't update maps if maps aren't visible

    //var t = Date.now();
    var affectedMaps = new Set();
    if (check && check.toString().startsWith('maps')) affectedMaps.add(check);
    // Loop over map checks relating to the item updated
    $(check !== undefined ? (typeof(check) == typeof(1) ? "[data-requirements-glitchless*='" + check + "'],[data-requirements-glitchless*='" + (check + 1) + "']" : "[data-requirements-glitchless*=\"" + check + "\"]") : "[data-requirements-glitchless]").each(function() {
        // Each check has a logical set of requirements
        // Strings are the name of the item required
        // Numbers are numbers of Star Spirits required
        // Arrays suggest any of their elements fulfills the same requirement
        // - Sub-arrays require all elements to fulfill the requirement
        // Objects are used for chapter keys in the format {chapter: <chapter number>, keys: <# keys>}
        // As an example, the requirements for the Bombette check are listed as ['Kooper',[[{'chapter':1,'keys':1},'Bombette'],{'chapter':1,'keys':2}]]
        // This means you need Kooper (to get the bridge to enter the fortress) and either 1 key and Bombette (to enter the first door and blow up the jail wall) or 2 keys (to get to the trap door)
        // The code below parses the list of requirements and determines if they are met
        var reqs = JSON.parse('[' + $(this).attr('data-requirements-glitchless').replaceAll("'", '"').replaceAll('\\"', "'") + ']');
        var available = true;
        for (var req of reqs) {
            if (Array.isArray(req)) {
                for (var subreq of req) {
                    if (Array.isArray(subreq)) {
                        for (var subsubreq of subreq) {
                            if (typeof(subsubreq) == typeof(1)) {
                                available = $('.star-spirit:not(.unselected)').length >= subsubreq;
                            } else if (typeof(subsubreq) == typeof('') && subsubreq.startsWith("starting-location:")) {
                                available = subsubreq.includes($("#starting-location").val());
                            } else if (typeof(subsubreq) == typeof('')) {
                                available = $("[id=\"" + subsubreq + "\"]").length && $("[id=\"" + subsubreq + "\"]:not(.unselected)").length && ($("input[id=\"" + subsubreq + "\"]:checked").length || !$("input[id=\"" + subsubreq + "\"]").length);
                            } else {
                                available = parseInt($("[data-chapter-key-count='" + subsubreq.chapter + "']").text().split('/')[0]) >= subsubreq.keys;
                            }
                            if (!available) break;
                        }
                    } else if (typeof(subreq) == typeof(1)) {
                        available = $('.star-spirit:not(.unselected)').length >= subreq;
                    } else if (typeof(subreq) == typeof('') && subreq.startsWith("starting-location:")) {
                        available = subreq.includes($("#starting-location").val());
                    } else if (typeof(subreq) == typeof('')) {
                        available = $("[id=\"" + subreq + "\"]").length && $("[id=\"" + subreq + "\"]:not(.unselected)").length && ($("input[id=\"" + subreq + "\"]:checked").length || !$("input[id=\"" + subreq + "\"]").length);
                    } else {
                        available = parseInt($("[data-chapter-key-count='" + subreq.chapter + "']").text().split('/')[0]) >= subreq.keys;
                    }
                    if (available) break;
                }
            } else if (typeof(req) == typeof(1)) {
                available = $('.star-spirit:not(.unselected)').length >= req;
            } else if (req === "chapter-6-entry") {
                var requiredSeedCnt = $("#seeds-required").prop('selectedIndex');
                available = true;
                for (var i = 4; i > 4 - requiredSeedCnt; --i) {
                    if ($(`[id="Magical Seed ${i}"]`).is(':visible') && !$(`[id="Magical Seed ${i}"]`).hasClass('unselected')) {
                        continue;
                    }
                    available = false;
                    break;
                }
            } else if (typeof(req) == typeof('') && req.startsWith("starting-location:")) {
                available = req.includes($("#starting-location").val());
            } else if (typeof(req) == typeof('')) {
                available = $("[id=\"" + req + "\"]").length && $("[id=\"" + req + "\"]:not(.unselected)").length && ($("input[id=\"" + req + "\"]:checked").length || !$("input[id=\"" + req + "\"]").length);
            } else {
                available = parseInt($("[data-chapter-key-count='" + req.chapter + "']").text().split('/')[0]) >= req.keys;
            }
            if (!available) break;
        }
        if (!available) {
            $(this).parent().addClass('unavailable');
        }
        else {
            $(this).parent().removeClass('unavailable');
        }
        affectedMaps.add($(this).attr('data-map-group'));
    });
    //console.log(Date.now() - t);
    $("[data-checks-list]").each(function() {
        if (!affectedMaps.has($(this).attr('data-checks-list'))) return;
        if (!$('label:has([data-map-group=' + $(this).attr('data-checks-list') + ']:not(:checked)):not(.disabled):not(.unavailable)').length) {
            $(this).addClass('unavailable');
        }
        else {
            $(this).removeClass('unavailable');
        }
    });
    $("[data-map]").each(function() {
        if (!$('[id=' + $(this).attr('data-map') + '] [data-checks-list]:not(.has-nothing):not(.complete):not(.unavailable)').length) {
            $(this).addClass('unavailable');
        }
        else {
            $(this).removeClass('unavailable');
        }
    });
    //console.log(Date.now() - t);
    if($("#show-num-checks").is(":checked")) {
        updateNumChecks();
    }
}

function updateNumChecks(){
	$('button.map-select').each(function(){
		switch($(this).data('map')){
			case 'prologue-map':
				var id = 'maps-prologue';
				break;
			case 'toad-town-map':
				var id = 'maps-toad-town';
				break;
			case 'sewers-map':
				var id = 'maps-sewer';
				break;
			case 'pleasant-path-map':
				var id = 'maps-pleasant';
				break;
			case 'koopa-village-map':
				var id = 'maps-koopa';
				break;
			case 'kbf-map':
				var id = 'maps-kbf';
				break;
			case 'mt-rugged-map':
				var id = 'maps-mt-rugged';
				break;
			case 'desert-map':
				var id = 'maps-desert';
				break;
			case 'ruins-map':
				var id = 'maps-ruin';
				break;
			case 'forest-map':
				var id = 'maps-forest';
				break;
			case 'boo-mansion-map':
				var id = 'maps-boo';
				break;
			case 'gusty-gulch-map':
				var id = 'maps-gusty';
				break;
			case 'tubbas-castle-map':
				var id = 'maps-tubba';
				break;
			case 'toybox-map':
				var id = 'maps-toybox';
				break;
			case 'yoshi-map':
				var id = 'maps-yoshi';
				break;
			case 'mt-lavalava-map':
				var id = 'maps-lavalav';
				break;
			case 'flower-fields-map':
				var id = 'maps-flower';
				break;
			case 'shiver-region-map':
				var id = 'maps-shiver';
				break;
			case 'crystal-palace-map':
				var id = 'maps-crystal';
				break;
			default:
				break;
		}
		if($(this).data('origName') == undefined){
			$(this).data('origName', $(this).html());
		}

        $(this).html($(this).data('origName') + ' (' + $('[id^="' + id + '"] label:not(".disabled"):not(".unavailable") input:not(:checked)').length + '/' + $('[id^="' + id + '"] label:not(".disabled") input:not(:checked)').length + ')');

	});
}