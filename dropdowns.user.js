let originalState = {};

function init() {
  const mainOptions = document.querySelector('.options__main');
  if (!mainOptions) return;

  originalState = { ...originalState, mainOptions: mainOptions.cloneNode(true) };

  const select = createSelect(mainOptions);
  replaceOptions(mainOptions, select);

  const scrollElement = document.querySelector('.scroll');
  if (scrollElement) {
    originalState = { ...originalState, scrollDisplay: scrollElement.style.display };
  }

  hideScroll();
}

function teardown() {
  const mainOptions = document.querySelector('.options__main');
  const scrollElement = document.querySelector('.scroll');

  if (mainOptions && originalState.mainOptions) {
    mainOptions.parentNode.replaceChild(originalState.mainOptions, mainOptions);
  }

  if (scrollElement && originalState.scrollDisplay) {
    scrollElement.style.display = originalState.scrollDisplay;
  }
}

function createSelect(mainOptions) {
  const parentStyles = getComputedStyle(mainOptions.parentElement);

  const select = document.createElement('select');
  select.className = 'options__main dropdown';
  select.style.cssText = `border:none;background-color:${parentStyles.backgroundColor};color:${parentStyles.color};`;

  addDefaultOption(select);
  addOptions(mainOptions, select);

  select.onchange = handleSelectChange;

  return select;
}

function addDefaultOption(select) {
  const defaultOption = document.createElement('option');
  defaultOption.textContent = 'Select';
  defaultOption.value = '';
  defaultOption.selected = true;
  select.appendChild(defaultOption);
}

function addOptions(mainOptions, select) {
  Array.from(mainOptions.children).forEach((option) => {
    const newOption = document.createElement('option');
    newOption.textContent = option.textContent.trim();
    newOption.value = option.firstElementChild.href;
    newOption.selected = option.firstElementChild.classList.contains('active');
    select.appendChild(newOption);
  });
}

function handleSelectChange(event) {
  if (event.target.value !== '') {
    window.location.href = event.target.value;
  }
}

function replaceOptions(mainOptions, select) {
  const divElement = document.createElement('div');
  divElement.style.cssText = 'display:inline-block;width:auto;';
  divElement.appendChild(select);
  mainOptions.parentNode.replaceChild(divElement, mainOptions);
}

function hideScroll() {
  const scrollElement = document.querySelector('.scroll');
  if (scrollElement) {
    scrollElement.style.display = 'none';
  }
}

function dropdownsInit(toggle) {
  return toggle ? init() : teardown();
}

window.dropdownsInit = dropdownsInit;
