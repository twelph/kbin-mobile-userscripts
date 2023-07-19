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
    var btn = document.querySelector('button[aria-label="Filter by time"]');
    if (btn) {
        if (toggle) {
            btn.style.display = 'none';
        } else {
            btn.style.display = 'block';
        }
    }
}

hideFilterByTimeButton(true);
