"use strict"

const Game = require("./game")

class PaperRockScissors extends Game {
  constructor() {
    const winningRules = {
      "paper": ["rock"],
      "rock": ["scissors"],
      "scissors": ["paper"]
    }

    super(winningRules)
  }

  type() { return "paper-rock-scissors" }
}

module.exports = PaperRockScissors
