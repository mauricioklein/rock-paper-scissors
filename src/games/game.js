"use strict"

const Winner = require("./winner")

class Game {
  constructor(winningRules) {
    this.winningRules = winningRules
  }

  type() { return null }

  getOptions() {
    return Object.keys(this.winningRules)
  }

  /**
   * Calculates the winner, based on the choice of both players
   *
   * @param {String} p1Choice
   *   The shape selected by player 1
   * @param {String} p2Choice
   *   The shape selected by player 2
   *
   * @return {Winner}
   *    "Winner.Player1" if player 1 is the winner
   *    "Winner.Player2" if player 2 is the winner
   *    "Winner.Draw"    in case of draw
   */
  calculateWinner(p1Choice, p2Choice) {
    if(p1Choice === p2Choice) {
      return Winner.Draw
    }

    const p1WinningRules = this.winningRules[p1Choice]
    return p1WinningRules.includes(p2Choice) ? Winner.Player1 : Winner.Player2
  }

  randomChoice() {
    const options = this.getOptions()
    const randomIndex = Math.floor(Math.random() * options.length)

    return options[randomIndex]
  }
}

module.exports = Game
