"use script";

function loadReplyList(threadId, page) {

	var xmlHttp = new XMLHttpRequest();
	xmlHttp.onreadystatechange = function() {
		var i;
		var length;
		var item;
		var threadInfo;
		var threadContent;
		var span;
		var threadAndReplies;
		var list = document.getElementById("hc-threadANDreply-list");
		if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
			threadAndReplies = JSON.parse(xmlHttp.responseText);

		    item = document.createElement("div");

            threadInfo = document.createElement("div");
            threadInfo.className = "hc-thread-info";

            span = document.createElement("span");
            span.className = "hc-thread-info-title";
            span.innerHTML = threadAndReplies.title;
            threadInfo.appendChild(span);

            span = document.createElement("span");
            span.className = "hc-thread-info-username";
            span.innerHTML = threadAndReplies.username;
            threadInfo.appendChild(span);

            span = document.createElement("span");
            span.className = "hc-thread-info-time";
            span.innerHTML = threadAndReplies.created_at;
            threadInfo.appendChild(span);

            span = document.createElement("span");
            span.className = "hc-thread-info-uid";
            span.innerHTML = threadAndReplies.user;
            threadInfo.appendChild(span);

            item.appendChild(threadInfo);

            threadContent = document.createElement("div");
            threadContent.className = "hc-thread-content";
            threadContent.innerHTML = threadAndReplies.text;
            item.appendChild(threadContent);

            list.appendChild(item);
            list.appendChild(document.createElement("hr"));

            length = threadAndReplies.replies.length;
            for (i = 0; i < length; i++) {
            	var replyContent;
            	item = document.createElement("div");

	            replyInfo = document.createElement("div");
	            replyInfo.className = "hc-reply-info";

	            span = document.createElement("span");
	            span.className = "hc-reply-info-username";
	            span.innerHTML = threadAndReplies.replies[i].username;
	            replyInfo.appendChild(span);

	            span = document.createElement("span");
	            span.className = "hc-reply-info-time";
	            span.innerHTML = threadAndReplies.replies[i].created_at;
	            replyInfo.appendChild(span);

	            span = document.createElement("span");
	            span.className = "hc-reply-info-uid";
	            span.innerHTML = threadAndReplies.replies[i].user;
	            replyInfo.appendChild(span);

	            item.appendChild(replyInfo);

	            replyContent = document.createElement("div");
	            replyContent.className = "hc-reply-content";
	            replyContent.innerHTML = threadAndReplies.replies[i].text;
	            item.appendChild(replyContent);

	            list.appendChild(item);
                list.appendChild(document.createElement("hr"));
            }
            generatePageNavigation(page, Math.ceil(threadAndReplies.reply_count / 20));
		}
	}
	xmlHttp.open("GET", "/forum/api/thread/?id=" + threadId + "&page=" + page, true);
    xmlHttp.send();
}