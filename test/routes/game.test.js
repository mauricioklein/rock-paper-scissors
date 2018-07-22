/* eslint camelcase: off */

const httpMocks = require("node-mocks-http")
const { expect } = require("chai")

const Router = require("../../src/routes/game")

describe("Router", () => {
  describe("#root", () => {
    const { req, res } = httpMocks.createMocks()

    it("should redirect to paper-rock-scissors game", (done) => {
      Router.root(req, res)

      expect(res._headers).to.deep.equal({
        Location: "/game/paper-rock-scissors"
      })
      expect(res._isEndCalled()).to.equal(true)

      done()
    })
  })

  describe("#getGameDescription", () => {
    it("should get the description for paper-rock-scissors game", (done) => {
      const { req, res } = httpMocks.createMocks()

      Router.getGameDescription("paper-rock-scissors", req, res)

      validateJson(res, {
        type: "paper-rock-scissors",
        options: ["paper","rock","scissors"]
      })

      done()
    })

    it("should get the description for paper-rock-scissors-lizard-spock game", (done) => {
      const { req, res } = httpMocks.createMocks()

      Router.getGameDescription("paper-rock-scissors-lizard-spock", req, res)

      validateJson(res, {
        type: "paper-rock-scissors-lizard-spock",
        options: ["paper","rock","scissors", "lizard", "spock"]
      })

      done()
    })

    it("should return not found if the game type is unknown", (done) => {
      const { req, res } = httpMocks.createMocks()

      Router.getGameDescription("foobar", req, res)

      expect(res.statusCode).to.equal(404)

      done()
    })
  })

  describe("POST /game/:algorithm", () => {
    describe("with valid game type", () => {
      it("should return valid response for player 1 win", (done) => {
        const { req, res } = httpMocks.createMocks({
          body: { p1_choice: "paper", p2_choice: "rock" }
        })

        Router.postGame("paper-rock-scissors", req, res)

        validateJson(res, {
          player_1_choice: "paper",
          player_2_choice: "rock",
          winner: "Player 1"
        })

        done()
      })

      it("should return valid response for player 2 win", (done) => {
        const { req, res } = httpMocks.createMocks({
          body: { p1_choice: "rock", p2_choice: "paper" }
        })

        Router.postGame("paper-rock-scissors", req, res)

        validateJson(res, {
          player_1_choice: "rock",
          player_2_choice: "paper",
          winner: "Player 2"
        })

        done()
      })

      it("should return valid response for draw", (done) => {
        const { req, res } = httpMocks.createMocks({
          body: { p1_choice: "rock", p2_choice: "rock" }
        })

        Router.postGame("paper-rock-scissors", req, res)

        validateJson(res, {
          player_1_choice: "rock",
          player_2_choice: "rock",
          winner: "Draw"
        })

        done()
      })
    })

    describe("with invalid game type", () => {
      const gameType = "foobar"

      describe("and both player choices are provided", () => {
        it("should return error", (done) => {
          const { req, res } = httpMocks.createMocks({
            body: { p1_choice: "rock", p2_choice: "rock" }
          })

          Router.postGame(gameType, req, res)

          expect(res.statusCode).to.equal(404)

          done()
        })
      })

      describe("and one of the player's choice is missing", () => {
        it("should return error", (done) => {
          const { req, res } = httpMocks.createMocks({
            body: { p1_choice: "rock", p2_choice: null }
          })

          Router.postGame(gameType, req, res)

          expect(res.statusCode).to.equal(404)

          done()
        })
      })
    })

    describe("with missing player choice", () => {
      const options = [ "paper", "rock", "scissors" ]

      describe("and missing choice is from player 1", () => {
        it("should return a random option for player 1", (done) => {
          const { req, res } = httpMocks.createMocks({
            body: { p1_choice: null, p2_choice: "rock" }
          })

          Router.postGame("paper-rock-scissors", req, res)

          const body = JSON.parse(res._getData())

          expect(options).to.include(body.player_1_choice)
          expect(body.player_2_choice).to.equal("rock")
          expect(res._isEndCalled()).to.equal(true)
          expect(res._isJSON()).to.equal(true)

          done()
        })
      })

      describe("and missing choice is from player 2", () => {
        it("should return a random option for player 2", (done) => {
          const { req, res } = httpMocks.createMocks({
            body: { p1_choice: "rock", p2_choice: null }
          })

          Router.postGame("paper-rock-scissors", req, res)

          const body = JSON.parse(res._getData())

          expect(body.player_1_choice).to.equal("rock")
          expect(options).to.include(body.player_2_choice)
          expect(res._isEndCalled()).to.equal(true)
          expect(res._isJSON()).to.equal(true)

          done()
        })
      })
    })
  })
})

const validateJson = (res, expectedJson) => {
  expect(res._isEndCalled()).to.equal(true)
  expect(res._isJSON()).to.equal(true)
  expect(JSON.parse(res._getData())).to.deep.equal(expectedJson)
}
