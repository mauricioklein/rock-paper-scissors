"use strict"

const Game = require('./game')

class PaperRockScissorsLizardSpock extends Game {
  constructor() {
    const winningRules = {
      'paper': ['rock', 'spock'],
      'rock': ['scissors', 'lizard'],
      'scissors': ['paper', 'lizard'],
      'lizard': ['paper', 'spock'],
      'spock': ['rock', 'scissors']
    }

    super(winningRules)
  }

  type() { return "paper-rock-scissors-lizard-spock" }
}

module.exports = PaperRockScissorsLizardSpock;
