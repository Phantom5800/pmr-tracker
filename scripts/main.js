const maxKeyCounts = {
    1: 4,
    2: 4,
    3: 3,
    4: 0,
    5: 11,
    6: 26,
    7: 0,
    8: 5
};

var currentKeyCounts = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0
};

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
        $('#main-name-field').text($(this).attr('id'));
    });

    $('.main-tracker img').on('mouseleave', function() {
        $('#main-name-field').text("");
    });

    // misc tracker
    $('.misc-tracker img').on('mouseenter', function() {
        $('#misc-name-field').text($(this).attr('id'));
    });

    $('.misc-tracker img').on('mouseleave', function() {
        $('#misc-name-field').text("");
    });

    // koopa koot block names
    $('.koopa-koot-tracker img').on('mouseenter', function() {
        $('#secondary-name-field').text($(this).attr('id'));
    });

    $('.koopa-koot-tracker img').on('mouseleave', function() {
        $('#secondary-name-field').text("");
    });

    // add all the tracker hooks for clicking on images
    for (var i = 1; i <= 8; ++i) {
        // required chapter items
        $(`*[data-chapter="${i}"]`).click(function(){
            var c = parseInt($(this).attr("data-chapter"));
            if ($(this).hasClass("unselected")) {
                $(this).removeClass("unselected");
            } else {
                $(this).addClass("unselected");
            }
        });

        // chapter keys
        $(`*[data-chapter-key="${i}"]`).click(function(){
            var c = parseInt($(this).attr("data-chapter-key"));
            $(this).removeClass("unselected");
            if (currentKeyCounts[c] < maxKeyCounts[c]) {
                ++currentKeyCounts[c];
                $(`#chapter-${c}-key-count`).text(`${currentKeyCounts[c]}/${maxKeyCounts[c]}`);
            }
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
            if ($(this).hasClass("unselected")) {
                $(this).removeClass("unselected");
            } else {
                $(this).addClass("unselected");
            }
        });
    }
});
