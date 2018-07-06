"use strict"

const GameFactory = require('../games/factory')

class Game {
  constructor(algorithm, p1Choice, p2Choice) {
    this.algorithm = algorithm
    this.p1Choice = p1Choice
    this.p2Choice = p2Choice

    this._calculate()
  }

  _calculate() {
    const { algorithm, p1Choice, p2Choice } = this

    this.result = null
    this.error = null

    const game = GameFactory.create(algorithm)

    if(game === null) {
      this.error = this._error(`${algorithm} isn't a valid game type`)
      return
    }

    const res = game.calculateWinner(p1Choice, p2Choice)
    this.result = this._success(p1Choice, p2Choice, this._winner(res))
  }

  _winner(result) {
    switch(result) {
      case -1:
        return "Player 1"
      case 1:
        return "Player 2"
      default:
        return "Draw"
    }
  }

  _success(p1Choice, p2Choice, winner) {
    return {
      player_1_choice: p1Choice,
      player_2_choice: p2Choice,
      winner: winner
    }
  }

  _error(description) {
    return {
      error: description
    }
  }
}

module.exports = Game;
