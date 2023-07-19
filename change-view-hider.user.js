// ==UserScript==
// @name         kbin change view hider
// @namespace    https://github.com/twelph/kbin-mobile-userscripts/
// @version      1
// @description  Hide the change view button
// @author       Twelph
// @match        https://kbin.social/*
// @match        https://lab2.kbin.pub/*
// @match        https://lab3.kbin.pub/*
// @match        https://fedia.io/*
// @match        https://karab.in/*
// @grant        none
// ==/UserScript==

function hideChangeViewButton(toggle) {
  const btn = document.querySelector('button[aria-label="Change view"]');

  if (btn) {
    btn.style.display = toggle ? 'none' : 'block';
  }
}

hideChangeViewButton(true);
