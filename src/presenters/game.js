"use strict"

const GameFactory = require("../games/factory")
const Winner = require("../../src/games/winner")

class Game {
  constructor(algorithm, p1Choice, p2Choice) {
    this.algorithm = algorithm
    this.p1Choice = p1Choice
    this.p2Choice = p2Choice
  }

  get response() {
    return this._calculate().response
  }

  get error() {
    return this._calculate().error
  }

  _calculate() {
    // Memoize
    if(this.result) { return this.result }

    const { algorithm, p1Choice, p2Choice } = this
    const game = GameFactory.create(algorithm)

    this.result = { response: null, error: null }

    if(game === null) {
      this.result.error = this._error(`${algorithm} isn't a valid game type`)
      return this.result
    }

    const winner = game.calculateWinner(p1Choice, p2Choice)

    this.result.response = this._success(p1Choice, p2Choice, Winner.toString(winner))

    return this.result
  }

  _success(p1Choice, p2Choice, winner) {
    /* eslint camelcase: off */
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

module.exports = Game
