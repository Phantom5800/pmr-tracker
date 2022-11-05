/******************************************************************************
 * export.js
 * 
 * Contains functions related to export / import of save state.
*******************************************************************************/

function savePageState() {
    var imageStates = {
        items: {},
        checks: {}
    };
    $("img.star-spirit, img.key-item, img.optional-item, img.koot-item, img.upgrade, img.partner").each(function() {
        if ($(this).is(':visible')) {
            var chapterKey = $(this).attr("data-chapter-key");
            var keyCount = 0;
            if (chapterKey) {
                keyCount = currentKeyCounts[parseInt(chapterKey)];
            } else {
                keyCount = $(this).hasClass("unselected") ? 0 : 1;
            }
    
            imageStates.items[$(this).attr('id')] = keyCount;
        }
    });

    $("input[data-map-group]").each(function() {
        var name = `${$(this).attr("data-map-group")} + ${$(this).parent().text()}`;
        imageStates.checks[name] = $(this).is(':checked') ? 1 : 0;
    });

    var json = JSON.stringify(imageStates);
    var blob = new Blob([json], {type: "text/json"});
    var file = window.URL.createObjectURL(blob);

    var fileLink = document.createElement("a");
    fileLink.download = `pmr-tracker-state.json`;
    fileLink.href = file;
    fileLink.click();

    window.URL.revokeObjectURL(file);
}

function loadPageState() {
    resetPage();

    var fileDialog = document.createElement("input");
    fileDialog.type = "file";
    fileDialog.accept = ".json, text/json";
    fileDialog.click();
    fileDialog.onchange = function() {
        if (fileDialog.files.length > 0) {
            var fileReader = new FileReader();
            fileReader.onload = function() {
                var json = fileReader.result;
                var obj = JSON.parse(json);

                for (var key in obj.items) {
                    if (key.includes("Boots") || key.includes("Hammer")) {
                        var marioupgrade = key.substring(key.lastIndexOf(' ') + 1);
                        if (key.includes("Super")) {
                            $(`img[id="${marioupgrade}"]`).click();
                        } else if (key.includes("Ultra")) {
                            $(`img[id="${marioupgrade}"]`).click();
                            $(`img[id="Super ${marioupgrade}"]`).click();
                        }
                    } else {
                        for (var i = 0; i < obj.items[key]; ++i) {
                            $(`img[id="${key}"]`).each(function() {
                                if ($(this).is(':visible')) {
                                    $(this).click();
                                }
                            });
                        }
                    }
                }

                for (var key in obj.checks) {
                    if (obj.checks[key]) {
                        var data_group = key.substring(0, key.indexOf(' '));
                        var check_string = key.substring(key.lastIndexOf('+') + 2);
    
                        $(`input[data-map-group="${data_group}"]`).each(function() {
                            if ($(this).parent().text() === check_string) {
                                $(this).attr("checked", true);
                                updateSingleMapCheck($(this), true);
                            }
                        });
                    }
                }
            }
            fileReader.readAsText(fileDialog.files[0]);
        }
    }
}
