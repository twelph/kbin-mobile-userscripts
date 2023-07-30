const UsernameModifier = {
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

  applyToAll: function () {
    const usernameElements = document.querySelectorAll('.user-name');
    usernameElements.forEach((element) => this.transformUsername(element));
  },

  revertAll: function () {
    this.originalState.forEach((originalUsername, usernameElement) => {
      this.revertUsername(usernameElement);
    });
  },

  entryPoint: function (toggle) {
    if (toggle) {
      this.applyToAll();
    } else {
      this.revertAll();
    }
  }
};

UsernameModifier.entryPoint(true);
