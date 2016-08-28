"use strict";

function loadThreadList(boardId, page) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        var i;
        var threads;
        var item;
        var threadInfo;
        var threadContent;
        var span;
        var length;
        var list = document.getElementById("hc-thread-list");
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            threads = JSON.parse(xmlHttp.responseText);
            length = threads.length;
            for (i = 0; i < length; i++) {
                item = document.createElement("div");
                threadInfo = document.createElement("div");
                threadInfo.className = "hc-thread-info";
                span = document.createElement("span");
                span.className = "hc-thread-info-title";
                span.innerHTML = threads[i].title;
                threadInfo.appendChild(span);
                span = document.createElement("span");
                span.className = "hc-thread-info-username";
                span.innerHTML = threads[i].username;
                threadInfo.appendChild(span);
                span = document.createElement("span");
                span.className = "hc-thread-info-time";
                span.innerHTML = threads[i].created_at;
                threadInfo.appendChild(span);
                span = document.createElement("span");
                span.className = "hc-thread-info-uid";
                span.innerHTML = threads[i].user;
                threadInfo.appendChild(span);
                item.appendChild(threadInfo);
                threadContent = document.createElement("div");
                threadContent.className = "hc-thread-content";
                threadContent.innerHTML = threads[i].text;
                item.appendChild(threadContent);
                list.appendChild(item);
            }
        }
    }
    xmlHttp.open("GET", "/forum/api/show_board/?id=" + boardId + "&page=" + page, true);
    xmlHttp.send();
}
