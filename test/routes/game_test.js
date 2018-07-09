const request = require("supertest")
const express = require("express")
const bodyParser = require("body-parser")

const chai = require("chai")
const gameRoutes = require("../../src/routes/game")

const { expect } = chai

const setupApp = () => {
  const app = express()
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
  gameRoutes(app)
  return app
}

describe("Routes", () => {
  describe("GET /", () => {
    const app = setupApp()

    it("should redirect to paper-rock-scissors game", (done) => {
      request(app)
        .get("/")
        .expect(302)
        .expect("Location", "/game/paper-rock-scissors")
        .end(done)
    })
  })

  describe("POST /game/:algorithm", () => {
    const app = setupApp()

    describe("with valid game type", () => {
      it("should return valid response for player 1 win", (done) => {
        request(app)
          .post("/game/paper-rock-scissors")
          .set("Content-Type", "application/json")
          .send({p1_choice: "paper", p2_choice: "rock"})
          .expect(200, {
            player_1_choice: "paper",
            player_2_choice: "rock",
            winner: "Player 1"
          }, done)
      })

      it("should return valid response for player 2 win", (done) => {
        request(app)
          .post("/game/paper-rock-scissors")
          .set("Content-Type", "application/json")
          .send({p1_choice: "rock", p2_choice: "paper"})
          .expect(200, {
            player_1_choice: "rock",
            player_2_choice: "paper",
            winner: "Player 2"
          }, done)
      })

      it("should return valid response for draw", (done) => {
        request(app)
          .post("/game/paper-rock-scissors")
          .set("Content-Type", "application/json")
          .send({p1_choice: "rock", p2_choice: "rock"})
          .expect(200, {
            player_1_choice: "rock",
            player_2_choice: "rock",
            winner: "Draw"
          }, done)
      })
    })

    describe("with invalid game type", () => {
      it("should return error", (done) => {
        request(app)
          .post("/game/foobar")
          .set("Content-Type", "application/json")
          .send({p1_choice: "rock", p2_choice: "rock"})
          .expect(200, {
            error: "foobar isn't a valid game type"
          }, done)
      })
    })

    describe("with missing player choice", () => {
      const options = [ "paper", "rock", "scissors" ]

      describe("and missing choice is from player 1", () => {
        it("should return a random option for player 1", (done) => {
          request(app)
            .post("/game/paper-rock-scissors")
            .set("Content-Type", "application/json")
            .send({p1_choice: null, p2_choice: "rock"})
            .expect(200)
            .expect((response) => {
              const { player_1_choice, player_2_choice } = response.body

              expect(options).to.include(player_1_choice)
              expect(player_2_choice).to.equal("rock")
            })
            .end(done)
        })
      })

      describe("and missing choice is from player 2", () => {
        it("should return a random option for player 2", (done) => {
          request(app)
            .post("/game/paper-rock-scissors")
            .set("Content-Type", "application/json")
            .send({p1_choice: "rock", p2_choice: null})
            .expect(200)
            .expect((response) => {
              const { player_1_choice, player_2_choice } = response.body

              expect(player_1_choice).to.equal("rock")
              expect(options).to.include(player_2_choice)
            })
            .end(done)
        })
      })
    })
  })
})
