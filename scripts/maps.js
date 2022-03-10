function initializeMaps() {
    $("table.map td").click(function() {
        $("table.map td").removeClass("selected");
        $(this).addClass("selected");

        $("#map-checks div").toggle(false);
        $(`#map-checks div#${$(this).attr("data-checks-list")}`).toggle(true);
    });

    $("#map-checks input").click(function() {
        var totalCount = 0;
        var completeCount = 0;
        var mapGroup = $(this).attr("data-map-group");
        $(`#map-checks input[data-map-group="${mapGroup}"]`).each(function() {
            if ($(this).is(':visible')) {
                ++totalCount;
                if ($(this).is(':checked')) {
                    ++completeCount;
                }
            }
        });

        $(`td[data-checks-list="${mapGroup}"]`).toggleClass("complete", totalCount === completeCount);
    });
}
