"use strict";

function setHeight(number) {
    var list = document.getElementById("hc-menu-category-" + number);
    if (list.style.height == "0px") {
        list.style.height = (list.children.length * 25) + "px";
    } else {
        list.style.height = "0px";
    }
}

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
        var category;
        var currentCategory;
        var i2;
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            checkId = document.URL.split("/").slice(-3)[0];
            checkWhetherBoard = document.URL.split("/").slice(-4)[0];

            boards = JSON.parse(xmlHttp.responseText);
            boards.sort(function(lhs, rhs) {
                return lhs.rank - rhs.rank;
            });
            currentCategory = -1;
            length = boards.length;
            for (i = 0; i < length; i++) {
                item = document.createElement("li");
                hyperlink = document.createElement("a");
                hyperlink.text = boards[i].name;
                hyperlink.setAttribute("href", "/forum/b/" + boards[i].id + "/");
                category = parseInt(boards[i].category);
                if (category < 1 || 6 < category) {
                    category = 1;
                }
                if (checkWhetherBoard === "b" && checkId === boards[i].id.toString()) {
                    hyperlink.id = "active";
                    currentCategory = category;
                }
                item.appendChild(hyperlink);
                document.getElementById("hc-menu-category-" + category).appendChild(item);
            }
            if (currentCategory < 1 || currentCategory > 6) {
                for (i2 = 1; i2 <= 6; i2++) {
                    setHeight(i2);
                }
            } else {
                setHeight(currentCategory);
            }
        }
    }
    xmlHttp.open("GET", "/forum/api/get_board_list/", true);
    xmlHttp.send();
}
