"use strict"

class Game {
  constructor(winningRules) {
    this.winningRules = winningRules
  }

  type() { return null }

  getOptions() {
    return Object.keys(this.winningRules);
  }

  calculateWinner(p1Choice, p2Choice) {
    if(p1Choice === p2Choice) {
      return 0
    }

    const p1WinningRules = this.winningRules[p1Choice]
    return p1WinningRules.includes(p2Choice) ? -1 : 1
  }

  randomChoice() {
    const options = this.getOptions()
    const randomIndex = Math.floor(Math.random() * options.length)

    return options[randomIndex]
  }
}

module.exports = Game;
