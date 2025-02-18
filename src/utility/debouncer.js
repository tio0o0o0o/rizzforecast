class Debouncer {
  #isCountingDown = false;
  #timeout;

  debounce(func, delay) {
    if (this.#isCountingDown) {
      clearTimeout(this.#timeout);
    }
    this.#isCountingDown = true;
    this.#timeout = setTimeout(() => {
      this.#isCountingDown = false;
      func();
    }, delay);
  }
}

module.exports = Debouncer;
