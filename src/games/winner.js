const Winner = {
  Player1: Symbol(),
  Player2: Symbol(),
  Draw: Symbol(),
  
  toString: function(winner) {
    switch(winner) {
      case this.Player1:
        return "Player 1"
      case this.Player2:
        return "Player 2"
      default:
        return "Draw"
    }
  }
}

Object.freeze(Winner)

module.exports = Winner
