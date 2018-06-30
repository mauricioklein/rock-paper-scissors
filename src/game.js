"use strict"

class Game {
  constructor(rules) {
    this.rules = rules
  }

  getOptions() {
    const keys = Object.keys(this.rules);
    const values = keys.map(key => this.rules[key])
    return [
      ...(
        new Set([...keys, ...values])
      )
    ].sort()
  }
}

module.exports = Game;
