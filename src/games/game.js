"use strict"

class Game {
  constructor(winningRules) {
    this.winningRules = winningRules
  }

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
}

module.exports = Game;
