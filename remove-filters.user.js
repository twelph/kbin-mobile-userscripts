// ==UserScript==
// @name         Remove Filter Dropdown
// @namespace    https://github.com/twelph/kbin-mobile-userscripts/
// @version      1
// @description  Remove the filter dropdown from kbin.social
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
