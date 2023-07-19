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
  let foundMenu = false;

  const observer = new MutationObserver((mutationsList) => {
    if (foundMenu) return;

    for(const mutation of mutationsList) {
      if (mutation.type !== 'childList' || !mutation.addedNodes.length) continue;

      const menuElement = document.querySelector('.options__main');
      if (!menuElement) continue;

      foundMenu = true;

      const selectElement = createSelectElement(menuElement);
      const divElement = createDivElement(selectElement);

      menuElement.parentNode.replaceChild(divElement, menuElement);
      
      removeScrollElement();

      observer.disconnect();
      break;
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });

  function createSelectElement(menuElement) {
    const selectElement = document.createElement('select');
    selectElement.className = 'options__main dropdown';
    selectElement.style.border = 'none';

    const bodyStyle = getComputedStyle(document.body);
    selectElement.style.backgroundColor = bodyStyle.backgroundColor;
    selectElement.style.color = bodyStyle.color;

    const selectedOption = localStorage.getItem('selectedOption');
    const menuChildren = Array.from(menuElement.children);
    const isActive = menuChildren.some((option) => {
      const child = option.firstElementChild;
      return child.classList.contains('active') || selectedOption === child.href;
    });

    const options = [];
    if (!isActive) {
      const defaultOption = document.createElement('option');
      defaultOption.textContent = 'Select';
      defaultOption.value = '';
      options.push(defaultOption);
    }

    menuChildren.forEach((option) => {
      const opt = document.createElement('option');
      const child = option.firstElementChild;
      opt.textContent = option.textContent.trim();
      opt.value = child.href;
      opt.selected = child.classList.contains('active') || selectedOption === opt.value;
      options.push(opt);
    });

    options.forEach((option) => selectElement.append(option));

    selectElement.addEventListener('change', function () {
      localStorage.setItem('selectedOption', this.value);
      window.location.href = this.value;
    });

    return selectElement;
  }

  function createDivElement(selectElement) {
    const divElement = document.createElement('div');
    divElement.append(selectElement);
    divElement.style.display = 'inline-block';
    divElement.style.width = 'auto';
    return divElement;
  }

  function removeScrollElement() {
    const scrollElement = document.querySelector('.scroll');
    if (scrollElement) scrollElement.remove();
  }

})();

  observer.observe(document.body, { childList: true, subtree: true });

})();
