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
    11: 160, // star pieces
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

function localStorageGetWithDefault(key, defaultValue) {
    const value = localStorage.getItem(key);
    if (!value) {
        localStorage.setItem(key, defaultValue);
        return defaultValue;
    }
    return value;
}

function checkIfChapterIsCompletable(chapter) {
    if (chapter <= 8) {
        var totalCount = 0;
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
            if (!$(this).hasClass("unselected")) {
                completedCount += currentKeyCounts[chapter];
            }
        });
    
        var star_spirit = $(`#chapter_${chapter}`);
        if (completedCount === totalCount && star_spirit.hasClass("unselected")) {
            star_spirit.addClass("completable");
        } else {
            star_spirit.removeClass("completable");
        }
        console.log(`${completedCount} / ${totalCount}`);
    }
}

$(document).ready(function(){
    // disable some basic functionality
    $('img').on('dragstart', function(){return false;});
    $('html').contextmenu(function(){return false;});
    $('img').contextmenu(function(){return false;});

    $('.star-spirit').height(60);
    $('.partner, .upgrade').height(60);
    $('.key-item, .optional-item').height(40);

    $('.partner, .optional-item, .upgrade').click(function() {
        if ($(this).hasClass("unselected")) {
            $(this).removeClass("unselected");
        } else {
            $(this).addClass("unselected");
        }
    });

    // set text display for the main items
    $('.main-tracker img').on('mouseenter', function() {
        $('.main-tracker h2').text($(this).attr('id'));
    });

    $('.main-tracker img').on('mouseleave', function() {
        $('.main-tracker h2').text("");
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

    // add all the tracker hooks for clicking on images
    for (var i = 1; i <= 14; ++i) {
        // required chapter items
        $(`*[data-chapter="${i}"]`).click(function(){
            var c = parseInt($(this).attr("data-chapter"));
            if ($(this).hasClass("unselected")) {
                $(this).removeClass("unselected");
            } else {
                $(this).addClass("unselected");
            }

            checkIfChapterIsCompletable(c);
        });

        // chapter keys
        $(`*[data-chapter-key="${i}"]`).click(function(){
            var c = parseInt($(this).attr("data-chapter-key"));
            $(this).removeClass("unselected");
            if (currentKeyCounts[c] < maxKeyCounts[c]) {
                ++currentKeyCounts[c];
                $(`#chapter-${c}-key-count`).text(`${currentKeyCounts[c]}/${maxKeyCounts[c]}`);
            }

            checkIfChapterIsCompletable(c);
        });

        $(`*[data-chapter-key="${i}"]`).contextmenu(function(){
            var c = parseInt($(this).attr("data-chapter-key"));
            if (currentKeyCounts[c] > 0) {
                --currentKeyCounts[c];
                $(`#chapter-${c}-key-count`).text(`${currentKeyCounts[c]}/${maxKeyCounts[c]}`);
            }

            if (currentKeyCounts[c] === 0) {
                $(this).addClass("unselected");
            }

            return false;
        });

        // star spirit trackers
        $(`#chapter_${i}`).click(function(){
            var c = parseInt($(this).attr("data-chapter-star"));
            if ($(this).hasClass("unselected")) {
                $(this).removeClass("unselected");
                $(this).removeClass("completable");
            } else {
                $(this).addClass("unselected");
                checkIfChapterIsCompletable(c);
            }
        });
    }

    // options menu
    $(document).click(function(e) {
        // if the option menu is open, and the click is outside the options menu, close it
        var container = $("#options-menu");
        if (container.hasClass("options-open") && !container.is(e.target) && container.has(e.target).length === 0) {
            $("#options-menu-toggle").click();
        }
    });

    $("#options-menu-toggle").click(function(e) {
        e.stopPropagation();
        $(this).toggleClass("options-open");
        $("#options-menu").toggleClass("options-open");
    });

    $("#chapter-6-open").click(function() {
        var isChecked = $(this).is(':checked');
        $(".ch6-optional").toggle(!isChecked);
        localStorage.setItem("chapter-6-open", isChecked);
    });

    $("#blue-house-open").click(function() {
        var isChecked = $(this).is(':checked');
        $(".blue-house-optional").toggle(!isChecked);
        localStorage.setItem("blue-house-open", isChecked);
    });

    $("#koopa-koot-randomized").click(function() {
        var isChecked = $(this).is(':checked');
        $(".koopa-koot-tracker").toggle(isChecked);
        localStorage.setItem("koopa-koot-randomized", isChecked);
    });

    $("#dojo-randomized").click(function() {
        var isChecked = $(this).is(':checked');
        $(".dojo-tracker").toggle(isChecked);
        localStorage.setItem("dojo-randomized", isChecked);
    });

    $("#recipe-tooltips").click(function() {
        var isChecked = $(this).is(':checked');
        $(".tooltiptext").toggle(isChecked);
        localStorage.setItem("recipe-tooltips", isChecked);
    });

    // local storage settings
    var chapter6_open = localStorageGetWithDefault("chapter-6-open", false) == "true";
    if (chapter6_open) {
        $("#chapter-6-open").click();
    }

    var blue_house_open = localStorageGetWithDefault("blue-house-open", false) == "true";
    if (blue_house_open) {
        $("#blue-house-open").click();
    }

    var koopa_koot_randomized = localStorageGetWithDefault("koopa-koot-randomized", true) == "true";
    if (!koopa_koot_randomized) {
        $("#koopa-koot-randomized").click();
    }

    var dojo_randomized = localStorageGetWithDefault("dojo-randomized", true) == "true";
    if (!dojo_randomized) {
        $("#dojo-randomized").click();
    }

    var tooltips_enabled = localStorageGetWithDefault("recipe-tooltips", true) == "true";
    if (!tooltips_enabled) {
        $("#recipe-tooltips").click();
    }
});
