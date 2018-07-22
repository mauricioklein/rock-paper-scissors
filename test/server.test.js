/* eslint camelcase: off */

const request = require("supertest")
const { expect } = require("chai")

const Server = require("../src/server")
const { requestHandler } = require("../src/router")
const { bodyParser } = require("../src/middlewares")

const createServer = () => {
  const server = new Server(requestHandler)

  server.use(bodyParser)
  server.startListeners()

  return server.httpServer
}

describe("Routes", () => {
  describe("GET /", () => {
    const server = createServer()

    it("should redirect to paper-rock-scissors game", (done) => {
      request(server)
        .get("/")
        .expect(302)
        .expect("Location", "/game/paper-rock-scissors")
        .end(done)
    })
  })

  describe("GET /:gameType/description", () => {
    const server = createServer()

    it("should get the description for paper-rock-scissors game", (done) => {
      request(server)
        .get("/game/paper-rock-scissors/description")
        .expect(200, {
          type: "paper-rock-scissors",
          options: ["paper","rock","scissors"]
        }, done)
    })

    it("should get the description for paper-rock-scissors-lizard-spock game", (done) => {
      request(server)
        .get("/game/paper-rock-scissors-lizard-spock/description")
        .expect(200, {
          type: "paper-rock-scissors-lizard-spock",
          options: ["paper","rock","scissors", "lizard", "spock"]
        }, done)
    })

    it("should return not found if the game type is unknown", (done) => {
      request(server)
        .get("/game/foobar/description")
        .expect(404)
        .end(done)
    })
  })

  describe("POST /game/:algorithm/calculate", () => {
    const server = createServer()

    describe("with valid game type", () => {
      it("should return valid response for player 1 win", (done) => {
        request(server)
          .post("/game/paper-rock-scissors/calculate")
          .set("Content-Type", "application/json")
          .send({p1_choice: "paper", p2_choice: "rock"})
          .expect(200, {
            player_1_choice: "paper",
            player_2_choice: "rock",
            winner: "Player 1"
          }, done)
      })

      it("should return valid response for player 2 win", (done) => {
        request(server)
          .post("/game/paper-rock-scissors/calculate")
          .set("Content-Type", "application/json")
          .send({p1_choice: "rock", p2_choice: "paper"})
          .expect(200, {
            player_1_choice: "rock",
            player_2_choice: "paper",
            winner: "Player 2"
          }, done)
      })

      it("should return valid response for draw", (done) => {
        request(server)
          .post("/game/paper-rock-scissors/calculate")
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
      const gameType = "foobar"

      describe("and both player choices are provided", () => {
        it("should return error", (done) => {
          request(server)
            .post(`/game/${gameType}/calculate`)
            .set("Content-Type", "application/json")
            .send({p1_choice: "rock", p2_choice: "rock"})
            .expect(404)
            .end(done)
        })
      })

      describe("and one of the player's choice is missing", () => {
        it("should return error", (done) => {
          request(server)
            .post(`/game/${gameType}/calculate`)
            .set("Content-Type", "application/json")
            .send({p1_choice: "rock", p2_choice: null})
            .expect(404)
            .end(done)
        })
      })
    })

    describe("with missing player choice", () => {
      const options = [ "paper", "rock", "scissors" ]

      describe("and missing choice is from player 1", () => {
        it("should return a random option for player 1", (done) => {
          request(server)
            .post("/game/paper-rock-scissors/calculate")
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
          request(server)
            .post("/game/paper-rock-scissors/calculate")
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
