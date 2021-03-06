"use strict";

function changeHeight(number) {
    var list = document.getElementById("side-bar-category-" + number);
    if (list.style.height == "0px") {
        list.style.height = (list.children.length * 35) + "px";
    } else {
        list.style.height = "0px";
    }
}

function loadSideBar() {
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
                if (category < 1 || 7 < category) {
                    category = 1;
                }
                if (checkWhetherBoard === "b" && checkId === boards[i].id.toString()) {
                    hyperlink.className = "active";
                    currentCategory = category;
                }
                item.appendChild(hyperlink);
                document.getElementById("side-bar-category-" + category).appendChild(item);
            }
            if (currentCategory < 1 || currentCategory > 7) {
                for (i2 = 1; i2 <= 7; i2++) {
                    document.getElementById("side-bar-checkbox-" + i2).checked = true;
                    changeHeight(i2);
                }
            } else {
                changeHeight(currentCategory);
                document.getElementById("side-bar-checkbox-" + currentCategory).checked = true;
            }
        }
    }
    xmlHttp.open("GET", "/forum/api/get_board_list/", true);
    xmlHttp.send();
}
