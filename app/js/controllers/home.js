/*global $, page, request, pForm*/
"use strict";

page.onCreate("home", function () {
    request("/api/user/" + user.id + "/routine", function (routines) {
        for (var i = 0; i < routines.length; i ++) {
            $("#menu").append("<a href=\”\" class=\"menu-item\" data-icon=\"home-white\">" + routines[i].Name + "</a>");
        }
    });
});
