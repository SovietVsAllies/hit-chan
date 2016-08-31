"use strict";

function setInputEnabled(input, enabled) {
    input.prop("disabled", !enabled);
}

$(document).ready(function() {
    setInputEnabled($(".hc-post-form-submit input"), false);
    $(".hc-post-form-input textarea").on("keyup", function() {
        setInputEnabled(
                $(".hc-post-form-submit input"),
                $(".hc-post-form-input textarea").val().trim().length > 0);
    });
});
