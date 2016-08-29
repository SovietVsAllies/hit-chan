"use script";

function loadReplyList(threadId, page) {
	var i;
	var length;
	var item;
	var threadInfo;
	var span;
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.onreadystatechange = function() {
		if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
			threadAndReplies = JSON.parse(xmlHttp.responText);
			length = threadAndReplies.length - 1;

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

            for (i = 0; i < length; i++) {
            	item = document.createElement("div");

	            replyInfo = document.createElement("div");
	            replyInfo.className = "hc-reply-info";

	            span = document.createElement("span");
	            span.className = "hc-reply-info-username";
	            span.innerHTML = threadAndReplies.replies.username;
	            replyInfo.appendChild(span);

	            span = document.createElement("span");
	            span.className = "hc-reply-info-time";
	            span.innerHTML = threadAndReplies.replies.created_at;
	            replyInfo.appendChild(span);

	            span = document.createElement("span");
	            span.className = "hc-reply-info-uid";
	            span.innerHTML = threadAndReplies.replies.user;
	            replyInfo.appendChild(span);

	            item.appendChild(replyInfo);

	            replyContent = document.createElement("div");
	            replyContent.className = "hc-reply-content";
	            replyContent.innerHTML = threadAndReplies.replies.text;
	            item.appendChild(replyContent);
            }
		}
		generatePageNavigation(page, threadAndReplies.reply_count);
	}
	xmlHttp.open("GET", "/forum/api/thread/?id=" + threadId + "&page=" + page, true);
    xmlHttp.send();
}