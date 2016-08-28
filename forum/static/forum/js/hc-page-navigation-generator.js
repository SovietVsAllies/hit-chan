"use strict";

function generatePageNavigation(currentPage, maxPage) {
    var pageStart = Math.max(currentPage - 5, 1);
    var pageEnd = Math.min(pageStart + 10, maxPage);
    var pageNavigation = document.getElementById("hc-page-navigation");
    var item;
    var span;
    var hyperlink;
    if (pageStart != 1) {
        item = document.createElement("li");
        hyperlink = document.createElement("a");
        hyperlink.setAttribute("href", "../1/");
        hyperlink.innerHTML = "首页";
        item.appendChild(hyperlink);
        pageNavigation.appendChild(item);
    }
    item = document.createElement("li");
    if (currentPage == 1) {
        item.className = "hc-page-disabled";
        span = document.createElement("span");
        span.innerHTML = "上一页";
        item.appendChild(span);
        pageNavigation.appendChild(item);
    } else {
        hyperlink = document.createElement("a");
        hyperlink.setAttribute("href", "../" + (currentPage - 1) + "/");
        hyperlink.innerHTML = "上一页";
        item.appendChild(hyperlink);
        pageNavigation.appendChild(item);
    }
    var i;
    for (i = pageStart; i <= pageEnd; i++) {
        item = document.createElement("li");
        if (i == currentPage) {
            item.className = "hc-page-active";
            span = document.createElement("span");
            span.innerHTML = i;
            item.appendChild(span);
            pageNavigation.appendChild(item);
        } else {
            hyperlink = document.createElement("a");
            hyperlink.setAttribute("href", "../" + i + "/");
            hyperlink.innerHTML = i;
            item.appendChild(hyperlink);
            pageNavigation.appendChild(item);
        }
    }
    item = document.createElement("li");
    if (currentPage == maxPage) {
        item.className = "hc-page-disabled";
        span = document.createElement("span");
        span.innerHTML = "下一页";
        item.appendChild(span);
        pageNavigation.appendChild(item);
    } else {
        hyperlink = document.createElement("a");
        hyperlink.setAttribute("href", "../" + (currentPage + 1) + "/");
        hyperlink.innerHTML = "下一页";
        item.appendChild(hyperlink);
        pageNavigation.appendChild(item);
    }
    if (pageEnd != maxPage) {
        item = document.createElement("li");
        hyperlink = document.createElement("a");
        hyperlink.setAttribute("href", "../" + maxPage + "/");
        hyperlink.innerHTML = "末页";
        item.appendChild(hyperlink);
        pageNavigation.appendChild(item);
    }
}
