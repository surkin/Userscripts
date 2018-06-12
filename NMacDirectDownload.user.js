// ==UserScript==
// @name                NMacDirectDownload
// @description         Skip NMac download page.
// @description:zh-CN   跳过 NMac 的多余下载引导页面
// @author              ladit
// @version             1.0.0
// @namespace           https://greasyfork.org/zh-CN/scripts/
// @homepageURL         https://github.com/ladit/Userscripts
// @supportURL          https://github.com/ladit/Userscripts
// @grant               none
// @run-at              document-idle
// @match               https://nmac.to/dl/*
// ==/UserScript==


window.location.replace(document.querySelector('a.btn.btn-medium.btn-block').href);
