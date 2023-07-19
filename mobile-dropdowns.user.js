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

// Anonymous function to avoid global namespace pollution
(() => {
  let optionFound = false;

  // Add a style element to hide the original menu initially
  const styleElement = document.createElement('style');
  styleElement.innerHTML = '.options__main { display: none; }';
  document.head.appendChild(styleElement);

  // Utilize MutationObserver to watch for changes in the DOM
  const observer = new MutationObserver((mutations) => {
    if (optionFound) return;

    mutations.some((mutation) => {
      const { addedNodes } = mutation;

      if (!addedNodes.length) return false;

      const menuElement = document.querySelector('.options__main');

      if (!menuElement) return false;

      optionFound = true;

      createDropdownMenu(menuElement);

      // Remove the style element to unhide the dropdown
      styleElement.parentNode.removeChild(styleElement);

      observer.disconnect();

      return true;
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });

  /**
   * Function to create a dropdown menu
   *
   * @param {Element} menuElement - The menu element to replace with a dropdown
   */
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

    // Check if any option is active
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

  /**
   * Function to create an option element
   *
   * @param {Element} option - The option to create an element for
   * @returns {Element} The created option element
   */
  function createOptionElement(option) {
    const optionElement = document.createElement('option');
    const childElement = option.firstElementChild;
    const selectedOption = localStorage.getItem('selectedOption');
    optionElement.textContent = option.textContent.trim();
    optionElement.value = childElement.href;
    optionElement.selected = childElement.classList.contains('active') || selectedOption === optionElement.value;
    return optionElement;
  }

  /**
   * Event handler for option change
   *
   * @param {Event} event - The change event
   */
  function handleOptionChange(event) {
    localStorage.setItem('selectedOption', event.target.value);
    window.location.href = event.target.value;
  }
})();
