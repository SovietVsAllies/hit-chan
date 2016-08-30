"use strict";

function loadThreadList(boardId, page) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        var i;
        var board;
        var threads;
        var item;
        var threadInfo;
        var threadContent;
        var span;
        var hyperlink;
        var length;
        var d;
        var ruleBetweenThreads;
        var list = document.getElementById("hc-thread-list");
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            d = new Date();
            board = JSON.parse(xmlHttp.responseText);
            threads = board.threads;
            length = threads.length;
            for (i = 0; i < length; i++) {
                item = document.createElement("div");
                item.className = "hc-thread";

                threadInfo = document.createElement("div");
                threadInfo.className = "hc-thread-info";

                span = document.createElement("span");
                span.className = "hc-thread-info-title";
                span.innerHTML = threads[i].title + "&nbsp";
                threadInfo.appendChild(span);

                span = document.createElement("span");
                span.className = "hc-thread-info-username";
                span.innerHTML = threads[i].username + "&nbsp" + "&nbsp";
                threadInfo.appendChild(span);

                span = document.createElement("span");
                span.className = "hc-thread-info-time";
                d.setTime(Date.parse(threads[i].created_at));
                if (d.getMinutes() < 10) {
                    span.innerHTML = d.getHours() + ':0' + d.getMinutes() + "&nbsp" +
                        "&nbsp" + d.getFullYear() + '-' + (d.getMonth() + 1) +
                        '-' + d.getDate() + "&nbsp" + "&nbsp";
                } else {
                    span.innerHTML = d.getHours() + ':' + d.getMinutes() + "&nbsp" +
                        "&nbsp" + d.getFullYear() + '-' + (d.getMonth() + 1) +
                        '-' + d.getDate() + "&nbsp" + "&nbsp";
                }
                threadInfo.appendChild(span);

                span = document.createElement("span");
                span.className = "hc-thread-info-uid";
                span.innerHTML = "UID: " + threads[i].user;
                threadInfo.appendChild(span);

                hyperlink = document.createElement("a");
                hyperlink.setAttribute("href", "/forum/t/" + threads[i].id + "/");
                hyperlink.innerHTML = "回应";
                threadInfo.appendChild(hyperlink);

                item.appendChild(threadInfo);

                threadContent = document.createElement("div");
                threadContent.className = "hc-thread-content";
                threadContent.innerHTML = threads[i].text;
                item.appendChild(threadContent);

                list.appendChild(item);
                ruleBetweenThreads = document.createElement("hr");
                ruleBetweenThreads.className = "rule-between-threads";
                list.appendChild(ruleBetweenThreads);
            }
            generatePageNavigation(page, board.page_count);
            document.getElementById("title").innerHTML = board.name + "-匿名版-HitChan";
        }
    }
    xmlHttp.open("GET", "/forum/api/show_board/?id=" + boardId + "&page=" + page, true);
    xmlHttp.send();
}
