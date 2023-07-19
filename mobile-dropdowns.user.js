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
  let optionFound = false, scrollElementFound = false;
  const styleElement = document.createElement('style');
  styleElement.innerHTML = '.options__main, .scroll { display: none; }';
  document.head.appendChild(styleElement);

  const observer = new MutationObserver((mutations) => {
    if (optionFound && scrollElementFound) return;
    mutations.some((mutation) => {
      const { addedNodes } = mutation;
      if (!addedNodes.length) return false;
      const menuElement = document.querySelector('.options__main');
      const scrollElement = document.querySelector('.scroll');
      if (!menuElement && !scrollElement) return false;
      if (menuElement && !optionFound) {
        optionFound = true;
        createDropdownMenu(menuElement);
      }
      if (scrollElement && !scrollElementFound) {
        scrollElementFound = true;
        scrollElement.style.display = 'none';
      }
      if (optionFound) {
        styleElement.parentNode.removeChild(styleElement);
        observer.disconnect();
      }
      return true;
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });

  function createDropdownMenu(menuElement) {
    const dropdown = document.createElement('select');
    dropdown.className = 'options__main dropdown';
    dropdown.style.border = 'none';
    const bodyStyle = getComputedStyle(document.body);
    dropdown.style.backgroundColor = bodyStyle.backgroundColor;
    dropdown.style.color = bodyStyle.color;
    const dropdownContainer = document.createElement('div');
    const selectedOption = localStorage.getItem('selectedOption');
    const menuOptions = Array.from(menuElement.children);
    const isActive = menuOptions.some((option) => {
      const childElement = option.firstElementChild;
      return childElement.classList.contains('active') || selectedOption === childElement.href;
    });
    const optionElements = [];
    if (!isActive) {
      const defaultOption = document.createElement('option');
      defaultOption.textContent = 'Select';
      defaultOption.value = '';
      optionElements.push(defaultOption);
    }
    menuOptions.forEach((option) => {
      const optionElement = createOptionElement(option);
      optionElements.push(optionElement);
    });
    optionElements.forEach((option) => dropdown.append(option));
    dropdownContainer.append(dropdown);
    dropdownContainer.style.display = 'inline-block';
    dropdownContainer.style.width = 'auto';
    menuElement.parentNode.replaceChild(dropdownContainer, menuElement);
    dropdown.addEventListener('change', handleOptionChange);
    const scrollElement = document.querySelector('.scroll');
    if (scrollElement) scrollElement.remove();
  }

  function createOptionElement(option) {
    const optionElement = document.createElement('option');
    const childElement = option.firstElementChild;
    const selectedOption = localStorage.getItem('selectedOption');
    optionElement.textContent = option.textContent.trim();
    optionElement.value = childElement.href;
    optionElement.selected = childElement.classList.contains('active') || selectedOption === optionElement.value;
    return optionElement;
  }

  function handleOptionChange(event) {
    localStorage.setItem('selectedOption', event.target.value);
    window.location.href = event.target.value;
  }
})();
