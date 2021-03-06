const path = require("path")
const GameRouter = require("./routes/game")

const requestHandler = (req, res, _) => {
  const file = fileInfo(req)

  switch(req.url) {
    case "/":
      GameRouter.root(req, res)
      break

    case "/game/paper-rock-scissors":
      GameRouter.getGame("paper-rock-scissors", req, res)
      break

    case "/game/paper-rock-scissors-lizard-spock":
      GameRouter.getGame("paper-rock-scissors-lizard-spock", req, res)
      break

    case "/game/paper-rock-scissors/description":
      GameRouter.getGameDescription("paper-rock-scissors", req, res)
      break

    case "/game/paper-rock-scissors-lizard-spock/description":
      GameRouter.getGameDescription("paper-rock-scissors-lizard-spock", req, res)
      break

    case "/game/paper-rock-scissors/calculate":
      GameRouter.postGame("paper-rock-scissors", req, res)
      break

    case "/game/paper-rock-scissors-lizard-spock/calculate":
      GameRouter.postGame("paper-rock-scissors-lizard-spock", req, res)
      break

    default:
      GameRouter.serveStatic(res, file.path, file.contentType)
  }
}

const fileInfo = (req) => {
  const filePath = req.url === "/" ? "./index.html" : "." + req.url
  const fileExt = path.extname(filePath)

  let contentType

  switch(fileExt) {
    case ".js":
      contentType = "text/javascript"
      break

    case ".css":
      contentType = "text/css"
      break

    case ".png":
      contentType = "image/png"
      break

    default:
      contentType = "text/html"
      break
  }

  return {
    path: filePath,
    contentType: contentType
  }
}

module.exports = {
  requestHandler: requestHandler
}
