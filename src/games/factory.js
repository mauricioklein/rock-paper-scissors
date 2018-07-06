"use strict"

const PaperRockScissors = require('./paper_rock_scissors');

class Factory {
  static create(klass){
    switch(klass) {
      case "paper-rock-scissors": return new PaperRockScissors()
      default: return null
    }
  }
}

module.exports = Factory;
