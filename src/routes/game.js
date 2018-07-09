const express = require("express")
const GameFactory = require("../games/factory")
const GamePresenter = require("../presenters/game")

const router = (app) => {
  const route = express.Router()

  // Accessing root redirects to the default game
  // (paper-rock-scissors)
  app.get("/", (_, res) => res.redirect("/game/paper-rock-scissors"))

  app.use("/game", route)

  route.post("/:gameType", (req, res) => {
    const { gameType } = req.params

    const game = GameFactory.create(gameType)
    const p1_choice = req.body.p1_choice || game.randomChoice()
    const p2_choice = req.body.p2_choice || game.randomChoice()

    const presenter = new GamePresenter(gameType, p1_choice, p2_choice)
    const response = (presenter.result || presenter.error)

    res.setHeader("Content-Type", "application/json")
    res.send(JSON.stringify(response))
  })

  route.get("/:gameType", (req, res) => {
    const { gameType } = req.params
    const game = GameFactory.create(gameType)

    if(game == null) {
      res.render("error", { message: `${gameType} isn't a valid game` })
    } else {
      res.render("index", { game: game })
    }
  })
}

module.exports = router
