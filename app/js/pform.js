/*global $*/
"use strict";

var pForm = {};

pForm.createTextareas = function () {
    $(".textarea").attr("contenteditable", "true").attr("spellcheck", "false");
};

pForm.createSelects = function () {
    var select = $(".select");
    select.append("<div class=\"selected\"></div><div class=\"options\"></div>");
    select.click(function (e) {
        e.stopPropagation();
        var o = $(this).find(".options");
        $(".options").not(o).hide();
        if (o.is(":visible")) {
            o.hide();
        } else {
            o.show(0, function () {
                var op = $(this).find(".option[data-selected]");
                $(this).animate({scrollTop: op.outerHeight() * $(this).find(".option").index(op)}, 0);
            });
        }
    });
};

pForm.selectOption = function (option) {
    var selected = option.closest(".select").find(".selected");
    selected.empty();
    selected.append(option.html());
    if (option.attr("data-selected") !== "selected") {
        option.siblings().removeAttr("data-selected");
        option.attr("data-selected", "selected");
        selected.trigger("changed");
    }
};

pForm.addOption = function (select, dataTypes, data, label) {
    var i, s, option = "<div class=\"option\"";
    if (Array.isArray(dataTypes)) {
        for (i = 0; i < dataTypes.length; i += 1) {
            option += " data-" + dataTypes[i] + "=" + data[i];
        }
    } else if (dataTypes !== null) {
        option += " data-" + dataTypes + "=" + data;
    }
    option += ">" + label + "</div>";
    option = $(option);
    s = select.find(".selected");
    select.find(".options").append(option);
    if (s.text() === "") {
        s.append(label);
        option.attr("data-selected", "selected");
    }
    option.click(function () {
        pForm.selectOption($(this));
    });
};
