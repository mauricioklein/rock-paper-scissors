// const express = require("express")
const GameFactory = require("../games/factory")
const GamePresenter = require("../presenters/game")
const {
  render,
  renderFile,
  notFoundAsJson,
  notFoundAsHtml
} = require("./helpers")

class Router {
  static root(req, res) {
    res.writeHead(302, { "Location": "/game/paper-rock-scissors" })
    res.end()
  }

  static postGame(gameType, req, res) {
    const game = GameFactory.create(gameType)

    if(game === null) { return notFoundAsJson(res, gameType) }

    const p1Choice = req.body.p1_choice || game.randomChoice()
    const p2Choice = req.body.p2_choice || game.randomChoice()

    const presenter = new GamePresenter(gameType, p1Choice, p2Choice)
    const response = (presenter.response || presenter.error)

    render(res, JSON.stringify(response), "application/json")
  }

  static getGame(gameType, req, res) {
    const game = GameFactory.create(gameType)
    if(game === null) { return notFoundAsHtml(res) }

    renderFile(res, "views/index.html")
  }

  static getGameDescription(gameType, req, res) {
    const game = GameFactory.create(gameType)
    if(game === null) { return notFoundAsJson(res, gameType) }

    render(res, JSON.stringify(game.toString()), "application/json")
  }

  static serveStatic(res, filePath, contentType) {
    renderFile(res, `public/${filePath}`, contentType)
  }
}

module.exports = Router
