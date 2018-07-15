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

  static discoverGameType(path) {
    const paths = path.split("/")
    return paths[paths.length - 1]
  }

  static createNodeOption(optionName, callback) {
    const node = document.createElement("input")

    node.className = "option"
    node.type = "image"
    node.id = `gameOption-${optionName}`
    node.src = `/images/game-options/${optionName}.png`
    node.value = optionName

    node.onclick = ev => callback(ev)

    return node
  }
}

Object.freeze(Helper)

module.exports = Helper
