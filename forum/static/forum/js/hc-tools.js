"use strict";

$(document).ready(function() {
    $(".hc-tool").css({"display": "none"});
    var offset = 250;
    var duration = 300;
    $(window).scroll(function() {
        if ($(this).scrollTop() > offset) {
            $(".hc-tool").fadeIn(duration);
        } else {
            $(".hc-tool").fadeOut(duration);
        }
    });
    $(".hc-tool").click(function(event) {
        event.preventDefault();
        $("html, body").animate({scrollTop: 0}, duration);
        return false;
    });
});
