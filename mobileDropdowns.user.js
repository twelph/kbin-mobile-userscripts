const originalState = {};

function init () {
  const settings = getModSettings('mobileDropdowns');
  if (settings.filter) {
    const mainOptionsList = Array.from(document.querySelectorAll('.options__main'));
    if (!mainOptionsList.length) return;
    mainOptionsList.forEach((mainOptions, i) => {
      originalState[`mainOptions${i}`] = mainOptions.cloneNode(true);
      const select = createSelect(mainOptions);
      replaceOptions(mainOptions, select);
    });
  }
  if (settings.view) {
    const scrollElement = document.querySelector('.scroll');
    if (scrollElement) {
      originalState.scrollDisplay = scrollElement.style.display;
    }
    hideScroll();
  }
}

function teardown () {
  const mainOptionsList = Array.from(document.querySelectorAll('.options__main'));
  const scrollElement = document.querySelector('.scroll');
  mainOptionsList.forEach((mainOptions, i) => {
    if (mainOptions && originalState[`mainOptions${i}`]) {
      mainOptions.parentNode.replaceChild(originalState[`mainOptions${i}`], mainOptions);
    }
  });
  if (scrollElement && originalState.scrollDisplay) {
    scrollElement.style.display = originalState.scrollDisplay;
  }
}

function createSelect (mainOptions) {
  const select = document.createElement('select');
  select.className = 'options__main dropdown';
  select.style.cssText = 'margin-left: 2px; height: fit-content; font-size: 0.9em; padding: 9px; margin-bottom: 2px; width: 30%;';
  addDefaultOption(select);
  addOptions(mainOptions, select);
  select.onchange = handleSelectChange;
  return select;
}

function addDefaultOption (select) {
  const defaultOption = document.createElement('option');
  defaultOption.textContent = 'Select an Option';
  defaultOption.value = '';
  defaultOption.selected = true;
  defaultOption.disabled = true;
  defaultOption.hidden = true;
  select.appendChild(defaultOption);
}

function addOptions (mainOptions, select) {
  const options = Array.from(mainOptions.children);
  options.forEach(option => {
    const newOption = document.createElement('option');
    newOption.textContent = option.textContent.trim();
    newOption.value = option.firstElementChild.getAttribute('href');
    newOption.selected = option.firstElementChild.classList.contains('active');
    select.appendChild(newOption);
  });
}

function handleSelectChange (event) {
  if (event.target.value !== '') {
    window.location.assign(event.target.value);
  }
}

function replaceOptions (mainOptions, select) {
  const divElement = document.createElement('div');
  divElement.style.display = 'inline-block';
  divElement.appendChild(select);
  mainOptions.parentNode.replaceChild(divElement, mainOptions);
}

function hideScroll () {
  const scrollElement = document.querySelector('.scroll');
  if (scrollElement) {
    scrollElement.style.display = 'none';
  }
}

function mobileDropdownsInit (toggle) {
  if (toggle) {
    init();
  } else {
    teardown();
  }
}

window.mobileDropdownsInit = mobileDropdownsInit;
