// ==UserScript==
// @name                GithubHomePageStar
// @description         Show the latest 30 starred repos in Github home page.
// @description:zh-CN   在 Github 首页显示最近的 30 个 star 项目，部分参考自 zhihaofans 的 https://greasyfork.org/zh-CN/scripts/25101
// @description:zh-TW   在 Github 首頁顯示最近的 30 個 star 項目，部分參考自 zhihaofans 的 https://greasyfork.org/zh-CN/scripts/25101
// @author              ladit
// @version             1.0.1
// @namespace           https://greasyfork.org/zh-CN/scripts/33511
// @homepageURL         https://github.com/ladit/Userscripts
// @supportURL          https://github.com/ladit/Userscripts
// @grant               none

// @require             https://cdn.bootcss.com/jquery/1.9.1/jquery.min.js
// @match               https://github.com/
// ==/UserScript==

function getStarredList(userName) {
  var itemsList = '';
  var item = '';
  $.getJSON("https://api.github.com/users/" + userName + "/starred", function (starredRepos) {
    var starredReposCount = starredRepos.length;
    var isPublic = '';
    $.each(starredRepos, function (key, starredRepo) {
      if (starredRepo.private === true) {
        isPublic = "private";
      } else {
        isPublic = 'public';
      }
      item = '<li class="' + isPublic + ' source"><a href="/' + starredRepo.full_name + '" class="mini-repo-list-item css-truncate" data-ga-click="Dashboard, click, Popular repos list item - context:user visibility:public fork:false"><svg aria-label="Repository" class="octicon octicon-repo repo-icon" height="16" role="img" version="1.1" viewBox="0 0 12 16" width="12"><path fill-rule="evenodd" d="M4 9H3V8h1v1zm0-3H3v1h1V6zm0-2H3v1h1V4zm0-2H3v1h1V2zm8-1v12c0 .55-.45 1-1 1H6v2l-1.5-1.5L3 16v-2H1c-.55 0-1-.45-1-1V1c0-.55.45-1 1-1h10c.55 0 1 .45 1 1zm-1 10H1v2h2v-1h3v1h5v-2zm0-10H2v9h9V1z"/></svg><span class="repo-and-owner css-truncate-target"><span class="owner css-truncate-target" title="' + starredRepo.owner.login + '">' + starredRepo.owner.login + '</span>/<span class="repo" title="' + starredRepo.name + '">' + starredRepo.name + '</span></span><span class="stars">' + starredRepo.stargazers_count + '<svg aria-label="stars" class="octicon octicon-star" height="16" role="img" version="1.1" viewBox="0 0 14 16" width="14"><path fill-rule="evenodd" d="M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74z"/></svg></span></a></li>';
      itemsList += item;
    });
  });
  return '<div id="your_stars" class="boxed-group flush js-repos-container" data-pjax-container role="navigation"><div class="boxed-group-action"><a href="/' + userName + '?tab=stars" class="btn btn-sm btn-primary" data-ga-click="Dashboard, click, Sidebar header new repo button - context:user">All stars</a></div><h3>Recent 30 starred repos</h3><div class="boxed-group-inner"><ul class="mini-repo-list">' + itemsList + '</ul></div></div>';    
}

$(document).ready(function () {
  $.ajaxSettings.async = false;
  if ($("meta.js-ga-set").attr('content') == "Logged In") {
    var userName = $("meta[name='user-login']").attr('content');
    if (window.localStorage) {
      if (!localStorage.getItem('lastStoreStarredReposTime') || localStorage.getItem('lastStoreStarredReposTime') + 86400000 < $.now()) {
        var starredReposBlock = getStarredList(userName);
        localStorage.setItem('starredReposBlock', starredReposBlock);
        $(".dashboard-sidebar.column.one-third").append(starredReposBlock);
        localStorage.setItem('lastStoreStarredReposTime', $.now());
      } else {
        $(".dashboard-sidebar.column.one-third").append(localStorage.getItem('starredReposBlock'));
      }
    } else {
      $(".dashboard-sidebar.column.one-third").append(getStarredList(userName));
    }
  }
  $.ajaxSettings.async = true;
});