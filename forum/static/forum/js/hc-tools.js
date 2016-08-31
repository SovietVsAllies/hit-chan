"use strict";

$(document).ready(function() {
    var offset = 250;
    var duration = 300;
    $(".hc-tool").click(function(event) {
        event.preventDefault();
        $("html, body").animate({scrollTop: 0}, duration);
        return false;
    });
});
