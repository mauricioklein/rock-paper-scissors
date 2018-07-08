const chai = require("chai")
const PaperRockScissors = require("../../src/games/paper_rock_scissors")

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
      expect(game.calculateWinner("paper", "rock")).to.equal(-1)
      expect(game.calculateWinner("rock", "paper")).to.equal(1)
    })

    it("rock must win of scissors", () => {
      expect(game.calculateWinner("rock", "scissors")).to.equal(-1)
      expect(game.calculateWinner("scissors", "rock")).to.equal(1)
    })

    it("scissors must win of paper", () => {
      expect(game.calculateWinner("scissors", "paper")).to.equal(-1)
      expect(game.calculateWinner("paper", "scissors")).to.equal(1)
    })

    it("equal choises must raise a draw", () => {
      expect(game.calculateWinner("paper", "paper")).to.equal(0)
      expect(game.calculateWinner("rock", "rock")).to.equal(0)
      expect(game.calculateWinner("scissors", "scissors")).to.equal(0)
    })
  })

  describe("#type", () => {
    it("should return \"paper-rock-scissors\"", () => {
      expect(game.type()).to.equal("paper-rock-scissors")
    })
  })

  describe("#randomChoice", () => {
    it("should return a valid option", () => {
      expect(options).to.include(game.randomChoice())
    })
  })
})
