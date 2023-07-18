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

    const observer = new MutationObserver((mutationsList, observer) => {
        for(let mutation of mutationsList) {
            if (mutation.type === 'childList') {
                const optionsLayout = document.querySelector('.options__layout');
                if (optionsLayout) {
                    optionsLayout.parentNode.removeChild(optionsLayout);
                }
            }
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });
})();
