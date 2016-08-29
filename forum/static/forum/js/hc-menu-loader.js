"use strict";

function loadHcMenu() {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        var i;
        var boards;
        var menu;
        var item;
        var hyperlink;
        var length;
        var checkId;
        var checkWhetherBoard;
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            checkId = document.URL.split("/").slice(-3)[0];
            checkWhetherBoard = document.URL.split("/").slice(-4)[0];

            boards = JSON.parse(xmlHttp.responseText);
            menu = document.getElementById("hc-menu-content");
            length = boards.length;
            for (i = 0; i < length; i++) {
                item = document.createElement("li");
                hyperlink = document.createElement("a");
                hyperlink.text = boards[i].name;
                hyperlink.setAttribute("href", "/forum/b/" + boards[i].id + "/");
                if (checkWhetherBoard === "b" && checkId === boards[i].id.toString()) {
                    hyperlink.className = "active";
                }
                item.appendChild(hyperlink);
                menu.appendChild(item);
            }
        }
    }
    xmlHttp.open("GET", "/forum/api/get_board_list/", true);
    xmlHttp.send();
}
