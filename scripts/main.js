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

// alternate tracker html, default tracker is in index.html, so this version is a more compact layout
var altTracker = `<table width="100%">
<tr style="height: 4em;">
    <td style="text-align: left; width: 60%;">
        <h1>Required Items</h1>
    </td>
    <td style="text-align: right;">
        <h2></h2>
    </td>
</tr>
</table>
<div style="display: flex;flex-wrap:wrap;padding-left:10px;">
    <div class="compact-element"><img data-chapter-star="1" id="chapter_1" class="unselected star-spirit" src="images/icons/Eldstar_PM.png"></div>
    <div class="compact-element"><img data-chapter-star="2" id="chapter_2" class="unselected star-spirit" src="images/icons/Mamar_PM.png"></div>
    <div class="compact-element"><img data-chapter-star="3" id="chapter_3" class="unselected star-spirit" src="images/icons/Skolar_PM.png"></div>
    <div class="compact-element"><img data-chapter-star="4" id="chapter_4" class="unselected star-spirit" src="images/icons/Muskular_PM.png"></div>
    <div class="compact-element"><img data-chapter-star="5" id="chapter_5" class="unselected star-spirit" src="images/icons/Misstar_PM.png"></div>
    <div class="compact-element"><img data-chapter-star="6" id="chapter_6" class="unselected star-spirit" src="images/icons/Klevar_PM.png"></div>
    <div class="compact-element"><img data-chapter-star="8" id="chapter_7" class="unselected star-spirit" src="images/icons/Kalmar_PM.png"></div>
    <div class="compact-element"><img data-chapter-star="8" id="chapter_8" class="unselected star-spirit" src="images/icons/PM_Starrod.png"></div>
    <div class="compact-element"><img id="Goombario" class="unselected partner" src="images/partners/goombario.png"></div>
    <div class="compact-element"><img id="Kooper" class="unselected partner" src="images/partners/kooper.png"></div>
    <div class="compact-element"><img id="Bombette" class="unselected partner" src="images/partners/bombette.png"></div>
    <div class="compact-element"><img id="Parakarry" class="unselected partner" src="images/partners/parakarr.png"></div>
    <div class="compact-element"><img id="Bow" class="unselected partner" src="images/partners/bow.png"></div>
    <div class="compact-element"><img id="Watt" class="unselected partner" src="images/partners/watt.png"></div>
    <div class="compact-element"><img id="Sushie" class="unselected partner" src="images/partners/sushie.png"></div>
    <div class="compact-element"><img id="Lakilester" class="unselected partner" src="images/partners/lakilester.png"></div>
    <div class="compact-element">
        <img data-chapter-key="1" id="Fortress Key" class="unselected key-item" src="images/icons/FortressKey_PM.png">
        <br>
        <p id="chapter-1-key-count">0/4</p>
    </div>
    <div class="compact-element"><img data-chapter="2" id="Pulse Stone" class="unselected key-item" src="images/icons/PulseStone.gif"></div>
    <div class="compact-element"><img data-chapter="2" id="Pyramid Stone" class="unselected key-item" src="images/icons/PyramidStone.gif"></div>
    <div class="compact-element"><img data-chapter="2" id="Diamond Stone" class="unselected key-item" src="images/icons/DiamondStone.png"></div>
    <div class="compact-element"><img data-chapter="2" id="Lunar Stone" class="unselected key-item" src="images/icons/LunarStone.gif"></div>
    <div class="compact-element">
        <img data-chapter-key="2" id="Ruins Key" class="unselected key-item" src="images/icons/Ruins_Key.png">
        <br>
        <p id="chapter-2-key-count">0/4</p>
    </div>
    <div class="compact-element"><img data-chapter="3" id="Boo's Portrait" class="unselected key-item" src="images/icons/Boo'sPortrait_PM.png"></div>
    <div class="compact-element">
        <img data-chapter-key="3" id="Tubba Castle Key" class="unselected key-item" src="images/icons/Tubba_Blubba_Castle_Key.png">
        <br>
        <p id="chapter-3-key-count">0/3</p>
    </div>
    <div class="compact-element"><img data-chapter="4" id="Toy Train" class="unselected key-item" src="images/icons/ToyTrain_PM.png"></div>
    <div class="compact-element"><img data-chapter="4" id="Cake" class="unselected key-item" src="images/icons/Cake.gif"></div>
    <div class="compact-element"><img data-chapter="5" id="Jade Raven" class="unselected key-item" src="images/icons/JadeRaven_PM.png"></div>
    <div class="ch6-optional compact-element"><img data-chapter="6" id="Magical Seed 1" class="unselected key-item" src="images/icons/MagicalSeed1.png"></div>
    <div class="ch6-optional compact-element"><img data-chapter="6" id="Magical Seed 2" class="unselected key-item" src="images/icons/MagicalSeed2.png"></div>
    <div class="ch6-optional compact-element"><img data-chapter="6" id="Magical Seed 3" class="unselected key-item" src="images/icons/MagicalSeed3.png"></div>
    <div class="ch6-optional compact-element"><img data-chapter="6" id="Magical Seed 4" class="unselected key-item" src="images/icons/MagicalSeed4.png"></div>
    <div class="compact-element"><img data-chapter="6" id="Magical Bean" class="unselected key-item" src="images/icons/MagicBean_PM.png"></div>
    <div class="compact-element"><img data-chapter="6" id="Fertile Soil" class="unselected key-item" src="images/icons/Fertilesoil.png"></div>
    <div class="compact-element"><img data-chapter="6" id="Miracle Water" class="unselected key-item" src="images/icons/MiracleWater_PM.png"></div>
    <div class="compact-element"><img data-chapter="7" id="Warehouse Key" class="unselected key-item" src="images/icons/OddKey.gif"></div>
    <div class="compact-element"><img data-chapter="7" id="Bucket" class="unselected key-item" src="images/icons/Bucket.png"></div>
    <div class="compact-element"><img data-chapter="7" id="Scarf" class="unselected key-item" src="images/icons/Scarf.gif"></div>
    <div class="compact-element"><img data-chapter="7" id="Star Stone" class="unselected key-item" src="images/icons/StarStone_PM.png"></div>
    <div class="compact-element"><img data-chapter="7" id="Red Key" class="unselected key-item" src="images/icons/PM_Red_Key.png"></div>
    <div class="compact-element"><img data-chapter="7" id="Palace Key" class="unselected key-item" src="images/icons/PM_Palace_Key.png"></div>
    <div id="BowsersKeySlot" class="compact-element">
        <img data-chapter-key="8" id="Bowser's Castle Key" class="unselected key-item" src="images/icons/PM_Bowser_Castle_Key.png">
        <br>
        <p id="chapter-8-key-count">0/5</p>
    </div>
    <div class="compact-element"><img id="Boots" class="boots upgrade" src="images/upgrades/PM_Normal_Boots_Sprite.png"></div>
    <div class="compact-element"><img id="Hammer" class="hammer upgrade" src="images/upgrades/PM_Normal_Hammer_Sprite.png"></div>
</div>`;

const extraChapterRequirements = {
    1: ["#Kooper"],
    2: ["#Bombette", "#Parakarry"],
    3: ["#Parakarry", "Super Boots"],
    4: ["#Bombette", "#Watt", ["#Bow", "#toybox-open"]],
    5: ["#Sushie", ["#Parakarry", "#Lakilester"]],
    6: ["#Lakilester", "Super Boots"],
    7: ["#Kooper", "#Bombette", "Super Boots", ["#Sushie", "#blue-house-open"]],
    8: ["#chapter_1", "#chapter_2", "#chapter_3", "#chapter_4", "#chapter_5", "#chapter_6", "#chapter_7"]
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

        for (var i = 0; i < extraChapterRequirements[chapter].length; ++i) {
            // if boots upgrade is required, increment when normal boots are not active
            if (extraChapterRequirements[chapter][i] === "Super Boots") {
                if ($("#Boots").length === 0) {
                    ++completedCount;
                }
            } else if (Array.isArray(extraChapterRequirements[chapter][i])) {
                for (var j = 0; j < extraChapterRequirements[chapter][i].length; ++j) {
                    var isChecked = $(extraChapterRequirements[chapter][i][j]).is(':checkbox') &&
                        $(extraChapterRequirements[chapter][i][j]).is(":checked");
                    var selected = !$(extraChapterRequirements[chapter][i][j]).is(':checkbox') &&
                        !$(extraChapterRequirements[chapter][i][j]).hasClass("unselected");
                    if (isChecked || selected) {
                        ++completedCount;
                        break;
                    } 
                }
            } else if (!$(extraChapterRequirements[chapter][i]).hasClass("unselected")) {
                ++completedCount;
            }
        }
    
        var star_spirit = $(`#chapter_${chapter}`);
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
    $('.star-spirit').height(60);
    $('.partner, .upgrade').height(60);
    $('.key-item, .optional-item').height(40);

    $('.optional-item').unbind("click").click(function() {
        if ($(this).hasClass("unselected")) {
            $(this).removeClass("unselected");
        } else {
            $(this).addClass("unselected");
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
        } else {
            $(this).addClass("unselected");
        }

        checkIfChapterIsCompletable(c);
    });

    // chapter keys
    $("img[data-chapter-key]").unbind("click").click(function(){
        var c = parseInt($(this).attr("data-chapter-key"));
        $(this).removeClass("unselected");
        if (currentKeyCounts[c] < maxKeyCounts[c]) {
            ++currentKeyCounts[c];
            $(`#chapter-${c}-key-count`).text(`${currentKeyCounts[c]}/${maxKeyCounts[c]}`);
        }

        checkIfChapterIsCompletable(c);
    });

    $("img[data-chapter-key]").unbind("contextmenu").contextmenu(function(){
        var c = parseInt($(this).attr("data-chapter-key"));
        if (currentKeyCounts[c] > 0) {
            --currentKeyCounts[c];
            $(`#chapter-${c}-key-count`).text(`${currentKeyCounts[c]}/${maxKeyCounts[c]}`);
        }

        if (currentKeyCounts[c] === 0) {
            $(this).addClass("unselected");
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
}

$(document).ready(function(){
    getUrlVars();

    // disable some basic functionality
    $('html').contextmenu(function(){return false;});
    $('img').contextmenu(function(){return false;});

    initializePage();

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

    $("#toybox-open").click(function() {
        var isChecked = $(this).is(':checked');
        localStorage.setItem("toybox-open", isChecked);
        checkIfChapterIsCompletable(4);
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

    $("#compact-tracker").click(function() {
        var isChecked = $(this).is(':checked');
        var currentTracker = $(".main-tracker").html();
        $(".main-tracker").html(altTracker);
        $(".main-tracker").toggleClass("compact");
        altTracker = currentTracker;
        initializePage();
        localStorage.setItem("compact-tracker", isChecked);

        // update bowser key visibility in the new tracker
        isChecked = $("#fast-bowser-castle").is(':checked');
        $("#BowsersKeySlot").toggle(!isChecked);

        // update seeds visibility
        isChecked = $("#chapter-6-open").is(':checked');
        $(".ch6-optional").toggle(!isChecked);
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

    // local storage settings
    var toybox_open = localStorageGetWithDefault("toybox-open", "true") == "true";
    if (!toybox_open) {
        $("#toybox-open").click();
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

    var dojo_randomized = localStorageGetWithDefault("dojo-randomized", "true") == "true";
    if (!dojo_randomized) {
        $("#dojo-randomized").click();
    }

    var use_compact_tracker = localStorageGetWithDefault("compact-tracker", false) == "true";
    if (use_compact_tracker) {
        $("#compact-tracker").click();
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
