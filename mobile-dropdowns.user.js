// ==UserScript==
// @name         Convert Lists To Dropdown
// @namespace    https://github.com/twelph/kbin-mobile-userscripts/
// @version      1
// @description  Convert lists into a dropdowns on kbin.social
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

    // Create a MutationObserver instance
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {

            // Check if new nodes are added
            if(mutation.addedNodes.length) {

                // Select the options menu
                var optionsMenu = document.querySelector('.options__main');

                // If optionsMenu exists
                if(optionsMenu) {
                    // Create a new select element
                    var select = document.createElement('select');
                    select.className = 'options__main dropdown';

                    // Add the select to a new div
                    var selectDiv = document.createElement('div');
                    selectDiv.appendChild(select);

                    // Set the style attributes on the div
                    selectDiv.style.display = 'inline-block';
                    selectDiv.style.width = 'auto';

                    // Iterate over each option in the menu
                    for (var i = 0; i < optionsMenu.children.length; i++) {
                        var option = optionsMenu.children[i];

                        // Create a new option element for the select
                        var selectOption = document.createElement('option');
                        selectOption.textContent = option.textContent.trim();
                        selectOption.value = option.firstElementChild.href;

                        // Add the option to the select
                        select.appendChild(selectOption);
                    }

                    // Replace the options menu with the selectDiv
                    optionsMenu.parentNode.replaceChild(selectDiv, optionsMenu);

                    // Add event listener to change location on selection
                    select.addEventListener('change', function() {
                        window.location.href = this.value;
                    });

                    // Disconnect the observer when we're done
                    observer.disconnect();
                }
            }
        });
    });

    // Start observing the document with the configured parameters
    observer.observe(document.body, { childList: true, subtree: true });

})();
