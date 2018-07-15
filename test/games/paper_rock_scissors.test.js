const chai = require("chai")
const PaperRockScissors = require("../../src/games/paper_rock_scissors")
const Winner = require("../../src/games/winner")

const { expect } = chai

describe("PaperRockScissors", () => {
  const game = new PaperRockScissors()
  const options = [ "paper", "rock", "scissors" ]

  describe("#getOptions", () => {
    it("should return all possible options", () => {
      expect(game.getOptions()).to.deep.equal(options)
    })
  })

  describe("#calculateWinner", () => {
    it("paper must win of rock", () => {
      expect(game.calculateWinner("paper", "rock")).to.equal(Winner.Player1)
      expect(game.calculateWinner("rock", "paper")).to.equal(Winner.Player2)
    })

    it("rock must win of scissors", () => {
      expect(game.calculateWinner("rock", "scissors")).to.equal(Winner.Player1)
      expect(game.calculateWinner("scissors", "rock")).to.equal(Winner.Player2)
    })

    it("scissors must win of paper", () => {
      expect(game.calculateWinner("scissors", "paper")).to.equal(Winner.Player1)
      expect(game.calculateWinner("paper", "scissors")).to.equal(Winner.Player2)
    })

    it("equal choices must raise a draw", () => {
      expect(game.calculateWinner("paper", "paper")).to.equal(Winner.Draw)
      expect(game.calculateWinner("rock", "rock")).to.equal(Winner.Draw)
      expect(game.calculateWinner("scissors", "scissors")).to.equal(Winner.Draw)
    })
  })

  describe("#type", () => {
    it("should return \"paper-rock-scissors\"", () => {
      expect(game.type()).to.equal("paper-rock-scissors")
    })
  })

  describe("#toString", () => {
    it("should return an object with the game representation", () => {
      expect(game.toString()).to.deep.equal({
        type: "paper-rock-scissors",
        options: options
      })
    })
  })

  describe("#randomChoice", () => {
    it("should return a valid option", () => {
      expect(options).to.include(game.randomChoice())
    })
  })
})
