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
        var d;
        var replyContent;
        var quote;
        var ruleBeforeReplies;
        var ruleBetweenReplies;
		var list = document.getElementById("hc-threadANDreply-list");
		if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
			d = new Date();
			threadAndReplies = JSON.parse(xmlHttp.responseText);

		    item = document.createElement("div");
		    item.className = "hc-thread";

            threadInfo = document.createElement("div");
            threadInfo.className = "hc-thread-info";

            span = document.createElement("span");
            quote = document.createElement("a");
            quote.className = "quote-before-title";
            span.className = "hc-thread-info-title";
            span.innerHTML = threadAndReplies.title + "&nbsp";
            threadInfo.appendChild(quote);
            threadInfo.appendChild(span);

            span = document.createElement("span");
            span.className = "hc-thread-info-username";
            span.innerHTML = threadAndReplies.username + "&nbsp" + "&nbsp";
            threadInfo.appendChild(span);

            span = document.createElement("span");
            span.className = "hc-thread-info-time";
            d.setTime(Date.parse(threadAndReplies.created_at));
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
            span.innerHTML = "UID: " + threadAndReplies.user;
            threadInfo.appendChild(span);

            item.appendChild(threadInfo);

            threadContent = document.createElement("div");
            threadContent.className = "hc-thread-content";
            threadContent.innerHTML = threadAndReplies.text;
            item.appendChild(threadContent);

            list.appendChild(item);
            ruleBeforeReplies = document.createElement("hr");
            ruleBeforeReplies.className = "rule-before-replies";
            list.appendChild(ruleBeforeReplies);

            length = threadAndReplies.replies.length;
            for (i = 0; i < length; i++) {
            	item = document.createElement("div");
            	item.className = "hc-reply";

	            replyInfo = document.createElement("div");
	            replyInfo.className = "hc-reply-info";

                span = document.createElement("span");
                span.className = "hc-reply-info-title";
                span.innerHTML = threadAndReplies.replies[i].title + "&nbsp";
                replyInfo.appendChild(span);

	            span = document.createElement("span");
	            span.className = "hc-reply-info-username";
                span.innerHTML = threadAndReplies.replies[i].username + "&nbsp"
                        + "&nbsp";
	            replyInfo.appendChild(span);

	            span = document.createElement("span");
	            span.className = "hc-reply-info-time";
                d.setTime(Date.parse(threadAndReplies.replies[i].created_at));
                if (d.getMinutes() < 10) {
                    span.innerHTML = d.getHours() + ':0' + d.getMinutes() + "&nbsp" +
                        "&nbsp" + d.getFullYear() + '-' + (d.getMonth() + 1) +
                        '-' + d.getDate() + "&nbsp" + "&nbsp";
                } else {
                    span.innerHTML = d.getHours() + ':' + d.getMinutes() + "&nbsp" +
                        "&nbsp" + d.getFullYear() + '-' + (d.getMonth() + 1) +
                        '-' + d.getDate() + "&nbsp" + "&nbsp";
                }
	            replyInfo.appendChild(span);

	            span = document.createElement("span");
	            span.className = "hc-reply-info-uid";
	            span.innerHTML = "UID: " + threadAndReplies.replies[i].user;
	            replyInfo.appendChild(span);

	            item.appendChild(replyInfo);

	            replyContent = document.createElement("div");
	            replyContent.className = "hc-reply-content";
	            replyContent.innerHTML = threadAndReplies.replies[i].text;
	            item.appendChild(replyContent);

	            list.appendChild(item);
                ruleBetweenReplies = document.createElement("hr");
                ruleBetweenReplies.className = "rule-between-replies";
                list.appendChild(ruleBetweenReplies);
            }
            if (threadAndReplies.reply_count <= 0) {
            	generatePageNavigation(page, 1);
            } else {
            	generatePageNavigation(page, Math.ceil(threadAndReplies.reply_count / 20));
        	}
		}
	}
	xmlHttp.open("GET", "/forum/api/thread/?id=" + threadId + "&page=" + page, true);
    xmlHttp.send();
}