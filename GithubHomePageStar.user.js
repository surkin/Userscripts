// ==UserScript==
// @name                GithubHomePageStar
// @description         Show the latest 30 starred repos in Github home page.
// @description:zh-CN   在 Github 首页显示最近的 30 个 star 项目，部分参考自 zhihaofans 的 https://greasyfork.org/zh-CN/scripts/25101
// @description:zh-TW   在 Github 首頁顯示最近的 30 個 star 項目，部分參考自 zhihaofans 的 https://greasyfork.org/zh-CN/scripts/25101
// @author              ladit
// @version             1.0.3
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
  $.getJSON('https://api.github.com/users/' + userName + '/starred', function (starredRepos) {
    var isPublic = '';
    $.each(starredRepos, function (key, starredRepo) {
      if (starredRepo.private === true) {
        isPublic = 'private';
      } else {
        isPublic = 'public';
      }
      item = '<li class="' + isPublic + ' source "><a class="d-flex flex-items-baseline flex-items-center f5 mb-2" href="' + starredRepo.full_name + '"><div class="text-gray-light mr-2"><svg aria-label="Repository" class="octicon octicon-repo" viewBox="0 0 12 16" version="1.1" width="12" height="16" role="img"><path fill-rule="evenodd" d="M4 9H3V8h1v1zm0-3H3v1h1V6zm0-2H3v1h1V4zm0-2H3v1h1V2zm8-1v12c0 .55-.45 1-1 1H6v2l-1.5-1.5L3 16v-2H1c-.55 0-1-.45-1-1V1c0-.55.45-1 1-1h10c.55 0 1 .45 1 1zm-1 10H1v2h2v-1h3v1h5v-2zm0-10H2v9h9V1z"></path></svg></div><div class="width-full text-bold"><span class="css-truncate css-truncate-target" style="max-width: 100%" title="' + starredRepo.owner.login + '">' + starredRepo.owner.login + '</span>/<span class="css-truncate css-truncate-target" style="max-width: 100%" title="' + starredRepo.name + '">' + starredRepo.name + '</span></div></a></li>';
      itemsList += item;
    });
  });
  return '<div id="your_stars" class="Box Box--condensed mb-3 Details js-repos-container" data-pjax-container="" role="navigation"><div class="Box-header"><h3 class="Box-title d-flex flex-justify-between flex-items-center">Recent starred repos<a class="btn btn-sm btn-primary text-white" href="/' + userName + '?tab=stars">All stars</a></h3></div><div class="Box-body"><ul class="list-style-none pr-3" data-filterable-for="dashboard-repos-filter" data-filterable-type="substring">' + itemsList + '</ul></div></div>';
}

$(document).ready(function () {
  $.ajaxSettings.async = false;
  if ($('meta.js-ga-set').attr('content') == 'Logged In') {
    var userName = $('meta[name="user-login"]').attr('content');
    if (window.localStorage) {
      if (!localStorage.getItem('lastStoreStarredReposTime') || Number(localStorage.getItem('lastStoreStarredReposTime')) + 86400000 < $.now()) {
        var starredReposBlock = getStarredList(userName);
        localStorage.setItem('starredReposBlock', starredReposBlock);
        $('.dashboard-sidebar.column.one-third.pr-5.pt-3').append(starredReposBlock);
        localStorage.setItem('lastStoreStarredReposTime', $.now());
      } else {
        $('.dashboard-sidebar.column.one-third.pr-5.pt-3').append(localStorage.getItem('starredReposBlock'));
      }
    } else {
      $('.dashboard-sidebar.column.one-third.pr-5.pt-3').append(getStarredList(userName));
    }
  }
  $.ajaxSettings.async = true;
});
