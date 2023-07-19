// ==UserScript==
// @name         Remove Change View Option
// @namespace    https://github.com/twelph/kbin-mobile-userscripts/
// @version      1
// @description  Remove the Change View option from kbin.social
// @author       Twelph
// @match        https://kbin.social/*
// @match        https://lab2.kbin.pub/*
// @match        https://lab3.kbin.pub/*
// @match        https://fedia.io/*
// @match        https://karab.in/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // This function toggles the visibility of options layout
    window.toggleOptionsLayout = function(toggle) {
        const optionsLayout = document.querySelector('.options__layout');
        if (optionsLayout) {
            if (toggle) {
                optionsLayout.style.display = 'none';
            } else {
                optionsLayout.style.display = 'block';
            }
        }
    }
})();
