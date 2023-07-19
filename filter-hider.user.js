// ==UserScript==
// @name         kbin filter hider
// @namespace    https://github.com/twelph/kbin-mobile-userscripts/
// @version      1
// @description  Hide filter by time button
// @author       Twelph
// @match        https://kbin.social/*
// @match        https://lab2.kbin.pub/*
// @match        https://lab3.kbin.pub/*
// @match        https://fedia.io/*
// @match        https://karab.in/*
// @grant        none
// ==/UserScript==

function hideFilterByTimeButton(toggle) {
  const btn = document.querySelector('button[aria-label="Filter by time"]');

  if (btn) {
    btn.style.display = toggle ? 'none' : 'block';
  }
}

hideFilterByTimeButton(true);
