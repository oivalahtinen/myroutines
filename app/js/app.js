/*global $, document, window, location, alert, pForm*/
"use strict";

// Tän vois heivata johonkin hornaan tästä
// --->
var views = [
    "login",
    "user-registration",
    "home",
];
for (var i = 0; i < views.length; i ++) {
    $.ajax({
        //async: false,
        url: "views/" + views[i] + ".html",
    }).done(function (contentHtml) {
        $("body").append(contentHtml);
    });
}
// <---

var user = {
    credentials: {
        mail: null,
        password: null,
    },
    id: null,
};

user.save = function () {
    var d = new Date();
    d.setTime(d.getTime() + (1 * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = "id=" + user.id + "; " + expires;
    document.cookie = "mail=" + user.credentials.mail + "; " + expires;
    document.cookie = "password=" + user.credentials.password + "; " + expires;
}

user.load = function () {
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i ++) {
        var c = ca[i];
        while (c.charAt(0) == " ") {
            c = c.substring(1);
        }
        if (c.indexOf("id") == 0) {
            user.id = c.substring(3, c.length);
        } else if (c.indexOf("mail") == 0) {
            user.credentials.mail = c.substring(5, c.length);
        } else if (c.indexOf("password") == 0) {
            user.credentials.password = c.substring(9, c.length);
        }
    }
}

function forIn(object, callBack) {
    var key;
    for (key in object) {
        if (object.hasOwnProperty(key)) {
            callBack(key);
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
        url: 'http://127.0.0.1/myroutines' + url,
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

    user.load();
    page.change(location.hash.substring(1));

    $("#login-submit").click(function (e) {
        e.preventDefault();
        user.credentials.mail = $("#login-mail").val();
        user.credentials.password = $("#login-password").val();
        request("/api/login", function (data) {
            user.id = data.ID;
            user.save();
            page.change("home", true);
        });
    });

    $("#logout-button").click(function (e) {
        page.change("login", true);
    });

    window.onpopstate = function () {
        page.change(location.hash.substring(1));
    };

    $("a").click(function (e) {
        e.preventDefault();
        var href = $(this).attr("href");
        //window.history.pushState(null, "", "#" + href);
        page.change(href, true);
    });

    $("html").click(function () {
        $(".options").hide();
    });
});
