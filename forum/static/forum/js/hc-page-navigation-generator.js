"use strict";

function generatePageNavigation(currentPage, maxPage) {
    var pageStart = Math.max(currentPage - 5, 1);
    var pageEnd = Math.min(pageStart + 10, maxPage);
    var pageNavigation = document.getElementById("hc-page-navigation");
    var item;
    var span;
    var hyperlink;
    // Create a button to the first page if necessary.
    if (pageStart > 1) {
        item = document.createElement("li");
        item.className = "hc-page-enabled";
        span = document.createElement("span");
        hyperlink = document.createElement("a");
        hyperlink.setAttribute("href", "../1/");
        hyperlink.innerHTML = "首页";
        span.appendChild(hyperlink);
        item.appendChild(span);
        pageNavigation.appendChild(item);
    }
    // Create a button to the previous page.
    item = document.createElement("li");
    if (currentPage <= 1) {     // Disable the button with no previous page.
        item.className = "hc-page-disabled";
        span = document.createElement("span");
        span.innerHTML = "上一页";
        item.appendChild(span);
        pageNavigation.appendChild(item);
    } else {
        item.className = "hc-page-enabled";
        span = document.createElement("span");
        hyperlink = document.createElement("a");
        hyperlink.setAttribute("href", "../" + (currentPage - 1) + "/");
        hyperlink.innerHTML = "上一页";
        span.appendChild(hyperlink);
        item.appendChild(span);
        pageNavigation.appendChild(item);
    }
    // Create buttons with page number on.
    var i;
    for (i = pageStart; i <= pageEnd; i++) {
        item = document.createElement("li");
        if (i == currentPage) {
            item.className = "hc-page-onload";
            span = document.createElement("span");
            span.innerHTML = i;
            item.appendChild(span);
            pageNavigation.appendChild(item);
        } else {
            item.className = "hc-page-enabled";
            span = document.createElement("span");
            hyperlink = document.createElement("a");
            hyperlink.setAttribute("href", "../" + i + "/");
            hyperlink.innerHTML = i;
            span.appendChild(hyperlink);
            item.appendChild(span);
            pageNavigation.appendChild(item);
        }
    }
    // Create a button to the next page.
    item = document.createElement("li");
    if (currentPage >= maxPage) {
        item.className = "hc-page-disabled";
        span = document.createElement("span");
        span.innerHTML = "下一页";
        item.appendChild(span);
        pageNavigation.appendChild(item);
    } else {
        item.className = "hc-page-enabled";
        span = document.createElement("span");
        hyperlink = document.createElement("a");
        hyperlink.setAttribute("href", "../" + (currentPage + 1) + "/");
        hyperlink.innerHTML = "下一页";
        span.appendChild(hyperlink);
        item.appendChild(span);
        pageNavigation.appendChild(item);
    }
    // Create a button to the last page if necessary.
    if (pageEnd != maxPage) {
        item = document.createElement("li");
        item.className = "hc-page-enabled";
        span = document.createElement("span");
        hyperlink = document.createElement("a");
        hyperlink.setAttribute("href", "../" + maxPage + "/");
        hyperlink.innerHTML = "末页";
        span.appendChild(hyperlink);
        item.appendChild(span);
        pageNavigation.appendChild(item);
    }
}
