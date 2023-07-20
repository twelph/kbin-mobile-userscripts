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
  // Select the main options element
  const mainOptions = document.querySelector('.options__main');
  if (!mainOptions) return;

  // Get the styles of the parent element
  const parentStyles = getComputedStyle(mainOptions.parentElement);

  // Create a new select element
  const selectElement = createSelectElement(parentStyles);

  // Add options to the select element
  addOptionsToSelect(mainOptions, selectElement);

  // Handle select element change event
  selectElement.onchange = handleSelectChange;

  // Replace the main options with the new select element
  replaceMainOptionsWithSelect(mainOptions, selectElement);

  // Hide the scroll element if present
  hideScrollElement();
})();

// Function to create a select element
function createSelectElement(parentStyles) {
  const selectElement = document.createElement('select');
  selectElement.className = 'options__main dropdown';
  selectElement.style.cssText = `border:none;background-color:${parentStyles.backgroundColor};color:${parentStyles.color};`;
  return selectElement;
}

// Function to add options to the select element
function addOptionsToSelect(mainOptions, selectElement) {
  Array.from(mainOptions.children).forEach((option) => {
    const newOption = document.createElement('option');
    newOption.textContent = option.textContent.trim();
    newOption.value = option.firstElementChild.href;
    newOption.selected = option.firstElementChild.classList.contains('active');
    selectElement.appendChild(newOption);
  });
}

// Function to handle select element change event
function handleSelectChange(event) {
  window.location.href = event.target.value;
}

// Function to replace the main options with the new select element
function replaceMainOptionsWithSelect(mainOptions, selectElement) {
  const divElement = document.createElement('div');
  divElement.style.cssText = 'display:inline-block;width:auto;';
  divElement.appendChild(selectElement);
  mainOptions.parentNode.replaceChild(divElement, mainOptions);
}

// Function to hide the scroll element
function hideScrollElement() {
  const scrollElement = document.querySelector('.scroll');
  if (scrollElement) scrollElement.style.display = 'none';
}
