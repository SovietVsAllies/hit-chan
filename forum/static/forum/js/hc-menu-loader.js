"use strict";

function loadHcMenu(callback) {
    callback = (typeof callback !== "undefined" ? callback : function(boards) {})
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        var i;
        var boards;
        var menu;
        var item;
        var hyperlink;
        var length;
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            boards = JSON.parse(xmlHttp.responseText);
            menu = document.getElementById("hc-menu-content");
            length = boards.length;
            for (i = 0; i < length; i++) {
                item = document.createElement("li");
                hyperlink = document.createElement("a");
                hyperlink.textContent = boards[i].name;
                hyperlink.setAttribute("href", "/forum/b/" + boards[i].id + "/");
                item.appendChild(hyperlink);
                menu.appendChild(item);
            }
            callback(boards);
        }
    }
    xmlHttp.open("GET", "/forum/api/get_board_list/", true);
    xmlHttp.send();
}
