const chai = require("chai")
const PaperRockScissorsLizardSpock = require("../../src/games/paper_rock_scissors_lizard_spock")
const Winner = require("../../src/games/winner")

const { expect } = chai

describe("PaperRockScissorsLizardSpock", () => {
  const game = new PaperRockScissorsLizardSpock()
  const options = [ "paper", "rock", "scissors", "lizard", "spock" ]

  describe("#getOptions", () => {
    it("should return all possible options", () => {
      expect(game.getOptions()).to.deep.equal(options)
    })
  })

  describe("#calculateWinner", () => {
    it("paper must win of rock and spock", () => {
      expect(game.calculateWinner("paper", "rock")).to.equal(Winner.Player1)
      expect(game.calculateWinner("paper", "spock")).to.equal(Winner.Player1)
      expect(game.calculateWinner("rock", "paper")).to.equal(Winner.Player2)
      expect(game.calculateWinner("spock", "paper")).to.equal(Winner.Player2)
    })

    it("rock must win of scissors and lizard", () => {
      expect(game.calculateWinner("rock", "scissors")).to.equal(Winner.Player1)
      expect(game.calculateWinner("rock", "lizard")).to.equal(Winner.Player1)
      expect(game.calculateWinner("scissors", "rock")).to.equal(Winner.Player2)
      expect(game.calculateWinner("lizard", "rock")).to.equal(Winner.Player2)
    })

    it("scissors must win of paper and lizard", () => {
      expect(game.calculateWinner("scissors", "paper")).to.equal(Winner.Player1)
      expect(game.calculateWinner("scissors", "lizard")).to.equal(Winner.Player1)
      expect(game.calculateWinner("paper", "scissors")).to.equal(Winner.Player2)
      expect(game.calculateWinner("lizard", "scissors")).to.equal(Winner.Player2)
    })

    it("lizard must win of paper and spock", () => {
      expect(game.calculateWinner("lizard", "paper")).to.equal(Winner.Player1)
      expect(game.calculateWinner("lizard", "spock")).to.equal(Winner.Player1)
      expect(game.calculateWinner("paper", "lizard")).to.equal(Winner.Player2)
      expect(game.calculateWinner("spock", "lizard")).to.equal(Winner.Player2)
    })

    it("spock must win of rock and scissord", () => {
      expect(game.calculateWinner("spock", "rock")).to.equal(Winner.Player1)
      expect(game.calculateWinner("spock", "scissors")).to.equal(Winner.Player1)
      expect(game.calculateWinner("rock", "spock")).to.equal(Winner.Player2)
      expect(game.calculateWinner("scissors", "spock")).to.equal(Winner.Player2)
    })

    it("equal choices must raise a draw", () => {
      expect(game.calculateWinner("paper", "paper")).to.equal(Winner.Draw)
      expect(game.calculateWinner("rock", "rock")).to.equal(Winner.Draw)
      expect(game.calculateWinner("scissors", "scissors")).to.equal(Winner.Draw)
      expect(game.calculateWinner("lizard", "lizard")).to.equal(Winner.Draw)
      expect(game.calculateWinner("spock", "spock")).to.equal(Winner.Draw)
    })
  })

  describe("#type", () => {
    it("should return \"paper-rock-scissors-lizard-spock\"", () => {
      expect(game.type()).to.equal("paper-rock-scissors-lizard-spock")
    })
  })

  describe("#randomChoice", () => {
    it("should return a valid option", () => {
      expect(options).to.include(game.randomChoice())
    })
  })
})
