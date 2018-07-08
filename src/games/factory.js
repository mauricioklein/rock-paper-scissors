"use strict"

const PaperRockScissors = require('./paper_rock_scissors');
const PaperRockScissorsLizardSpock = require('./paper_rock_scissors_lizard_spock');

class Factory {
  static create(klass){
    switch(klass) {
      case "paper-rock-scissors":
        return new PaperRockScissors()

      case "paper-rock-scissors-lizard-spock":
        return new PaperRockScissorsLizardSpock()

      default: return null
    }
  }
}

module.exports = Factory;
