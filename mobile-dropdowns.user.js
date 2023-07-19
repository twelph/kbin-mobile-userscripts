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

  const observer = new MutationObserver(mutations => {
    mutations.some(mutation => {
      if (!mutation.addedNodes.length) return;
      const optionsMenu = document.querySelector('.options__main');
      if (!optionsMenu) return;

      const select = document.createElement('select');
      select.className = 'options__main dropdown';
      select.style.border = 'none';

      const selectDiv = document.createElement('div');
      selectDiv.append(select);
      selectDiv.style.display = 'inline-block';
      selectDiv.style.width = 'auto';

      const selectedOption = localStorage.getItem('selectedOption');

      Array.from(optionsMenu.children).forEach(option => {
        const selectOption = document.createElement('option');
        selectOption.textContent = option.textContent.trim();
        selectOption.value = option.firstElementChild.href;
        selectOption.selected = option.firstElementChild.classList.contains('active') || selectedOption === selectOption.value;
        select.append(selectOption);
      });

      optionsMenu.parentNode.replaceChild(selectDiv, optionsMenu);

      select.addEventListener('change', function() {
        localStorage.setItem('selectedOption', this.value);
        window.location.href = this.value;
      });

      observer.disconnect();
      return true;
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });

})();
