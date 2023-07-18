// ==UserScript==
// @name         Remove Search
// @namespace    https://github.com/twelph/kbin-mobile-userscripts/
// @version      1
// @description  Remove Search link and icon from kbin.social
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

    const observer = new MutationObserver((mutationsList, observer) => {
        for(let mutation of mutationsList) {
            if (mutation.type === 'childList') {
                var searchLink = document.querySelector('a[aria-label="Search"]');
                if (searchLink) {
                    searchLink.parentNode.removeChild(searchLink);
                }
            }
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });
})();
