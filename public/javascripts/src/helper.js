class Helper {
  static imgPath(imgName) {
    return `/images/game-options/${imgName}.png`
  }

  static winnerLine(winner) {
    switch(winner) {
      case "Player 1":
        return "You won!"

      case "Player 2":
        return "You lost!"

      default:
        return "Draw!"
    }
  }
}

Object.freeze(Helper)

module.exports = Helper
