"use strict";

function loadThreadList(boardId, page) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        var i;
        var board;
        var threads;
        var item;
        var replyCount;
        var threadInfo;
        var countANDcontent;
        var replyCount;
        var threadContent;
        var span;
        var hyperlink;
        var length;
        var d;
        var ruleBetweenThreads;
        var list = document.getElementById("thread-list");
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            board = JSON.parse(xmlHttp.responseText);
            threads = board.threads;
            length = threads.length;
            for (i = 0; i < length; i++) {
                item = document.createElement("div");
                item.className = "thread";

                threadInfo = document.createElement("div");
                threadInfo.className = "thread-info";

                span = document.createElement("span");
                span.className = "thread-info-title";
                span.appendChild(document.createTextNode(threads[i].title));
                threadInfo.appendChild(span);

                span = document.createElement("span");
                span.className = "thread-info-username";
                span.appendChild(document.createTextNode(threads[i].username));
                threadInfo.appendChild(span);

                if (threads[i].email !== "") {
                    span = document.createElement("span");
                    span.className = "thread-info-email";
                    span.appendChild(document.createTextNode(threads[i].email));
                    threadInfo.appendChild(span);
                }

                span = document.createElement("span");
                span.className = "thread-info-time";
                d = moment(threads[i].created_at, "ddd MMM DD HH:mm:ss Z YYYY").toDate();
                if (d.getMinutes() < 10) {
                    span.innerHTML = d.getHours() + ':0' + d.getMinutes() + "&nbsp" +
                        "&nbsp" + d.getFullYear() + '-' + (d.getMonth() + 1) +
                        '-' + d.getDate();
                } else {
                    span.innerHTML = d.getHours() + ':' + d.getMinutes() + "&nbsp" +
                        "&nbsp" + d.getFullYear() + '-' + (d.getMonth() + 1) +
                        '-' + d.getDate();
                }
                threadInfo.appendChild(span);

                span = document.createElement("span");
                span.className = "thread-info-uid";
                span.appendChild(document.createTextNode("UID: " + threads[i].user));
                threadInfo.appendChild(span);

                hyperlink = document.createElement("a");
                hyperlink.setAttribute("href", "/forum/t/" + threads[i].id + "/");
                hyperlink.innerHTML = "回应";
                threadInfo.appendChild(hyperlink);

                item.appendChild(threadInfo);

                countANDcontent = document.createElement("div");
                countANDcontent.className = "thread-countANDcontent";

                replyCount = document.createElement("div");
                replyCount.className = "thread-reply-count";
                replyCount.appendChild(document.createTextNode(threads[i].reply_count));
                countANDcontent.appendChild(replyCount);

                threadContent = document.createElement("div");
                threadContent.className = "thread-content";
                threadContent.appendChild(document.createTextNode(threads[i].text));
                countANDcontent.appendChild(threadContent);

                item.appendChild(countANDcontent);

                list.appendChild(item);
                ruleBetweenThreads = document.createElement("hr");
                ruleBetweenThreads.className = "rule-between-blocks";
                list.appendChild(ruleBetweenThreads);
            }
            generatePageNavigation(page, board.page_count);
            document.getElementById("board-title").appendChild(document.createTextNode(
                board.name));
            document.getElementById("title").appendChild(document.createTextNode(
                board.name + "-匿名版-HitChan"));
        }
    }
    xmlHttp.open("GET", "/forum/api/show_board/?id=" + boardId + "&page=" + page, true);
    xmlHttp.send();
}
