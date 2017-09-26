// ==UserScript==
// @name                FZUMet2DirectDownload
// @description         FZU met2 direct download
// @author              ladit
// @version             0.1
// @namespace           https://github.com/ladit/Userscripts
// @homepageURL         https://github.com/ladit/Userscripts
// @supportURL          https://github.com/ladit/Userscripts
// @grant               none

// @match               http://met2.fzu.edu.cn/meol/common/script/preview/*
// @run-at              document-start
// ==/UserScript==

(function() {
  window.location.replace(document.URL.replace('preview/download_preview.jsp', 'download.jsp'));
  setTimeout('window.close()', 1000);
})();

