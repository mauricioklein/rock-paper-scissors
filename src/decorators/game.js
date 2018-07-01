"use strict"

const PaperRockScissors = require('../games/paper_rock_scissors')

class Game {
  constructor(algorithm, p1Choice, p2Choice) {
    this.algorithm = algorithm
    this.p1Choice = p1Choice
    this.p2Choice = p2Choice

    this.game = this._instantiateGame(algorithm)
  }

  result() {
    const { game, algorithm, p1Choice, p2Choice } = this

    if(game === undefined) {
      return this._error(`${algorithm} isn't a valid game type`)
    }

    const result = game.calculateWinner(p1Choice, p2Choice)
    return this._success(p1Choice, p2Choice, this._winner(result))
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


  _instantiateGame(algorithm) {
    switch(algorithm) {
      case 'paper_rock_scissors':
        return new PaperRockScissors()

      default:
        return undefined
    }
  }
}

module.exports = Game;
