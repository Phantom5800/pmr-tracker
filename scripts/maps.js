function initializeMaps() {
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
        var totalCount = 0;
        var completeCount = 0;
        var mapGroup = $(this).attr("data-map-group");
        $(`#map-checks input[data-map-group="${mapGroup}"]`).each(function() {
            if ($(this).is(':visible')) {
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
            if ($(this).is(':visible')) {
                ++totalCount;
                if ($(this).hasClass("has-nothing") || $(this).hasClass("complete")) {
                    ++completeCount;
                }
            }
        });

        $("button.map-select.selected").toggleClass("complete", totalCount === completeCount);
    });

    // NOTE: for disabling a check, need to add disabled attribute to the input field and a
    //       "disabled" class to the label
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
