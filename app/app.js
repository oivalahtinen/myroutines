/*global $, document, window, location, alert, pForm*/
"use strict";

var user = {
    credentials: {
        mail: null,
        password: null,
    }
};

function forIn(object, callBack) {
    var key;
    for (key in object) {
        if (object.hasOwnProperty(key)) {
            callBack(key, object);
        }
    }
}

function addIcons() {
    $("[data-icon]").each(function () {
        $(this).css("background-image", "url(\"img/" + $(this).attr("data-icon") + ".png\")");
    });
}

function request(params, callBack) {
    var url, data, method;
    if (typeof params === "object") {
        alert("object");
        data = {};
    } else if (typeof params === "string") {
        url = params;
        method = "GET";
    }

    $.ajax({
        url: '/myroutines' + url,
        data: data,
        dataType: "json",
        type: method,
        headers: {
            credentials: JSON.stringify(user.credentials),
        },
    })
        .done(function (response) {
            if (response.status === "success") {
                callBack(response.data);
            } else if (response.status === "fail") {
                alert("API Failure");
            } else if (response.status === "error") {
                alert("API Error: " + response.message + " (" + url + ")");
            }
        })
        .fail(function () {
            alert("Error connecting API");
        });
}

function toggleMenu() {
    var menuPosition, menuButtonMargin, pagePadding;
    if ($("#menu-container").position().left === 0) {
        if ($(window).width() >= 1000) {
            menuPosition = "-320px";
            menuButtonMargin = "330px";
            pagePadding = "10px";
        } else {
            menuPosition = "-320px";
            menuButtonMargin = "330px";
            pagePadding = "10px";
        }
    } else {
        if ($(window).width() >= 1000) {
            menuPosition = "0px";
            menuButtonMargin = "10px";
            pagePadding = "320px";
        } else {
            menuPosition = "0px";
            menuButtonMargin = "10px";
            pagePadding = "10px";
        }
    }
    $("#page").animate({
        "padding-left": pagePadding
    });
    $("#menu-container").animate({
        "left": menuPosition,
    }, function () {
        if ($("#menu-container").position().left === 0) {
            $("#page").removeAttr("style");
            $("#page").show();
        }
    });
    $("#menu-button").fadeOut(200).animate({
        "margin-left": menuButtonMargin
    }, function () {
        $(this).fadeIn(200);
    });
}

var page = {
    data: [],
    created: [],
    createdCb: [],
    enterCb: [],
    showCb: [],
    onCreate: function (p, callBack) {
        this.createdCb["page-" + p] = callBack;
        this.data["page-" + p] = {};
    },
    onEnter: function (p, callBack) {
        this.enterCb["page-" + p] = callBack;
    },
    onShow: function (p, callBack) {
        this.showCb["page-" + p] = callBack;
    },
    ready: function (p) {
        if (this.createdCb["page-" + p] !== undefined && this.created["page-" + p] === undefined) {
            this.createdCb["page-" + p]();
            this.created["page-" + p] = true;
        }
        if (this.enterCb["page-" + p] !== undefined) {
            this.enterCb["page-" + p]();
        }
    },
    change: function (pageName, pushState) {
        pageName = pageName === "" ? "login" : pageName;
        pushState = pushState === undefined ? false : pushState;
        if (pushState === true) {
            window.history.pushState(null, "", "#" + pageName);
        }

        var p = $("#page"),
            oldPage = $("#page-" + p.attr("data-page")),
            pageElem = $("#page-" + pageName),
            speed = 200,
            top = "0",
            menu = $("#menu-container, #menu-button, #settings-button, #logout-button"),
            content = $("#content"),
            newPage = pageElem.children().first();

        page.ready(pageName);
        p.animate(
            {"top" : "-" + p.height() + "px"},
            speed,
            function () {
                p.attr("data-page", pageName);
                $("#header > h2").text(pageElem.attr("data-title"));
                content.children().first().detach().appendTo(oldPage);
                oldPage.children().first().addClass(content.attr("class"));
                content.removeAttr("class");
                p.removeAttr("class");
                p.addClass(pageElem.attr("class"));
                p.show();
                newPage.detach().appendTo(content);
                content.addClass(newPage.attr("class"));
                newPage.removeAttr("class");
                if (pageName === "login") {
                    menu.hide();
                    p.show();
                    p.width(400);
                    top = "30%";
                } else {
                    p.css("width", "100%");
                    menu.fadeIn();
                }
                p.animate(
                    {"top" : top},
                    speed,
                    function () {
                        if (page.showCb["page-" + pageName] !== undefined) {
                            page.showCb["page-" + pageName]();
                        }
                    }
                );
            }
        );
    }
};

$(document).ready(function () {
    addIcons();
    pForm.createTextareas();
    pForm.createSelects();
    page.change(location.hash.substring(1));
    $("#login-submit").click(function (e) {
        e.preventDefault();
        user.credentials.mail = $("#login-mail").val();
        user.credentials.password = $("#login-password").val();
        request("/api/login", function () {
            page.change("home", true);
        });
    });

    window.onpopstate = function () {
        page.change(location.hash.substring(1));
    };

    $("a").click(function (e) {
        e.preventDefault();
        var href = $(this).attr("href");
        window.history.pushState(null, "", "#" + href);
        page.change(href);
    });

    $("html").click(function () {
        $(".options").hide();
    });

    $("#menu-button").click(function () {
        toggleMenu();
    });
});
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
/*global $, page, request, pForm*/
"use strict";

page.onCreate("user-registration", function () {
    request("/api/person", function (data) {
        var person;
        for (person in data) {
            if (data.hasOwnProperty(person)) {
                pForm.addOption($("#select-person"), "id",
                    data[person].ID, data[person].Lastname + ", "
                    + data[person].Firstname);
            }
        }
    });
    $("#select-person").on("changed", function () {
    });
});
