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

(() => {
  let isFound = false;

  const observer = new MutationObserver((mutations) => {
    if (isFound) return;

    mutations.some((mutation) => {
      const { addedNodes } = mutation;

      if (!addedNodes.length) return false;

      const menu = document.querySelector('.options__main');

      if (!menu) return false;

      isFound = true;

      const select = document.createElement('select');
      select.className = 'options__main dropdown';
      select.style.border = 'none';

      const bodyStyle = getComputedStyle(document.body);
      select.style.backgroundColor = bodyStyle.backgroundColor;
      select.style.color = bodyStyle.color;

      const div = document.createElement('div');
      const selected = localStorage.getItem('selectedOption');
      const children = Array.from(menu.children);

      const isActive = children.some((option) => {
        const child = option.firstElementChild;
        return child.classList.contains('active') || selected === child.href;
      });

      const options = [];

      if (!isActive) {
        const defaultOption = document.createElement('option');
        defaultOption.textContent = 'Select';
        defaultOption.value = '';
        options.push(defaultOption);
      }

      children.forEach((option) => {
        const opt = document.createElement('option');
        const child = option.firstElementChild;
        opt.textContent = option.textContent.trim();
        opt.value = child.href;
        opt.selected = child.classList.contains('active') || selected === opt.value;
        options.push(opt);
      });

      options.forEach((option) => select.append(option));

      div.append(select);
      div.style.display = 'inline-block';
      div.style.width = 'auto';
      menu.parentNode.replaceChild(div, menu);

      select.addEventListener('change', function eventListener() {
        localStorage.setItem('selectedOption', this.value);
        window.location.href = this.value;
      });

      const scroll = document.querySelector('.scroll');

      if (scroll) scroll.remove();

      observer.disconnect();

      return true;
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });
})();
