const usernameModifier = {
  originalState: new Map(),

  transformUsername: function (usernameElement) {
    const originalUsername = usernameElement.textContent.trim();
    this.originalState.set(usernameElement, originalUsername);
    const newUsername = originalUsername.substring(0, 2).toUpperCase();
    usernameElement.textContent = newUsername;
  },

  revertUsername: function (usernameElement) {
    if (this.originalState.has(usernameElement)) {
      usernameElement.textContent = this.originalState.get(usernameElement);
      this.originalState.delete(usernameElement);
    }
  },

  applyToFirst: function () {
    const usernameElement = document.querySelector('.user-name');
    if (usernameElement) {
      this.transformUsername(usernameElement);
    }
  },

  revert: function () {
    this.originalState.forEach((originalUsername, usernameElement) => {
      this.revertUsername(usernameElement);
    });
  },

  entryPoint: function (toggle) {
    if (toggle) {
      this.applyToFirst();
    } else {
      this.revert();
    }
  }
};

usernameModifier.entryPoint(true);
