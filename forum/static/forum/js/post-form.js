"use strict";

function setInputEnabled(input, enabled) {
    input.prop("disabled", !enabled);
}

$(document).ready(function() {
    setInputEnabled($(".post-form-submit input"), false);
    $(".post-form-input textarea").on("keyup", function() {
        setInputEnabled(
            $(".post-form-submit input"),
            $(".post-form-input textarea").val().trim().length > 0);
    });
});
