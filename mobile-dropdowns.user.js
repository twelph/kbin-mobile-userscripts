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

// An immediately invoked function expression (IIFE) to avoid global namespace pollution
(() => {
  // Flag to keep track of whether option has been found
  let isOptionFound = false;

  // Add a style element to initially hide the original menu
  const styleElement = addStyleElement();

  // Use MutationObserver to watch for changes in the DOM
  const observer = new MutationObserver((mutations) => {
    if (isOptionFound) return;

    mutations.some((mutation) => {
      const { addedNodes } = mutation;

      if (addedNodes.length === 0) return false;

      const menuElement = document.querySelector('.options__main');

      if (!menuElement) return false;

      isOptionFound = true;

      createDropdownMenu(menuElement);

      // Remove the style element to show the dropdown
      styleElement.parentNode.removeChild(styleElement);

      observer.disconnect();

      return true;
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });

  function addStyleElement() {
    const styleElement = document.createElement('style');
    styleElement.innerHTML = '.options__main { display: none; }';
    document.head.appendChild(styleElement);
    return styleElement;
  }

  function createDropdownMenu(menuElement) {
    const dropdown = createDropdown();
    const dropdownContainer = createDropdownContainer(menuElement, dropdown);

    // Remove scroll element if it exists
    const scrollElement = document.querySelector('.scroll');
    if (scrollElement) scrollElement.remove();
  }

  function createDropdown() {
    const dropdown = document.createElement('select');
    dropdown.className = 'options__main dropdown';

    styleDropdown(dropdown);

    const options = createOptions();
    options.forEach((option) => dropdown.append(option));

    dropdown.addEventListener('change', handleChange);

    return dropdown;
  }

  function styleDropdown(dropdown) {
    dropdown.style.border = 'none';

    const bodyStyle = getComputedStyle(document.body);
    dropdown.style.backgroundColor = bodyStyle.backgroundColor;
    dropdown.style.color = bodyStyle.color;
  }

  function createDropdownContainer(menuElement, dropdown) {
    const container = document.createElement('div');
    container.style.display = 'inline-block';
    container.style.width = 'auto';
    container.append(dropdown);
    menuElement.parentNode.replaceChild(container, menuElement);
    return container;
  }

  function createOptions() {
    const selectedOption = localStorage.getItem('selectedOption');
    const menuOptions = Array.from(document.querySelector('.options__main').children);
    const isActive = checkIfActive(menuOptions, selectedOption);
    const optionElements = [createDefaultOption(isActive), ...menuOptions.map(createOption)];

    return optionElements;
  }

  function checkIfActive(menuOptions, selectedOption) {
    return menuOptions.some((option) => {
      const childElement = option.firstElementChild;

      return childElement.classList.contains('active') || selectedOption === childElement.href;
    });
  }

  function createDefaultOption(isActive) {
    if (isActive) return;

    const defaultOption = document.createElement('option');
    defaultOption.textContent = 'Select';
    defaultOption.value = '';
    return defaultOption;
  }

  function createOption(menuOption) {
    const optionElement = document.createElement('option');
    const childElement = menuOption.firstElementChild;
    const selectedOption = localStorage.getItem('selectedOption');

    optionElement.textContent = menuOption.textContent.trim();
    optionElement.value = childElement.href;
    optionElement.selected = childElement.classList.contains('active') || selectedOption === optionElement.value;

    return optionElement;
  }

  function handleChange(event) {
    const selectedOption = event.target.value;
    localStorage.setItem('selectedOption', selectedOption);
    window.location.href = selectedOption;
  }
})();
    localStorage.setItem('selectedOption', event.target.value);
    window.location.href = event.target.value;
  }
})();
