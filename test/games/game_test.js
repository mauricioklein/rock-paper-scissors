const chai = require('chai')
const Game = require('../../src/games/game')

const { expect } = chai;

describe('Game', () => {
  const winningRules = {
    a: ["b"],
    b: ["c"],
    c: ["a", "d"],
    d: []
  }
  const game = new Game(winningRules)
  const options = [ "a", "b", "c", "d" ]

  describe('#getOptions', () => {
    it('should return all possible options', () => {
      expect(game.getOptions()).to.deep.equal(options)
    })
  })

  describe('#calculateWinner', () => {
    it('a must win of b', () => {
      expect(game.calculateWinner('a', 'b')).to.equal(-1)
      expect(game.calculateWinner('b', 'a')).to.equal(1)
    })

    it('b must win of c', () => {
      expect(game.calculateWinner('b', 'c')).to.equal(-1)
      expect(game.calculateWinner('c', 'b')).to.equal(1)
    })

    it('c must win of a and d', () => {
      expect(game.calculateWinner('c', 'a')).to.equal(-1)
      expect(game.calculateWinner('c', 'd')).to.equal(-1)
      expect(game.calculateWinner('a', 'c')).to.equal(1)
      expect(game.calculateWinner('d', 'c')).to.equal(1)
    })

    it('d must lose for everybody', () => {
      expect(game.calculateWinner('d', 'a')).to.equal(1)
      expect(game.calculateWinner('d', 'b')).to.equal(1)
      expect(game.calculateWinner('d', 'c')).to.equal(1)
    })

    it('equal choises must raise a draw', () => {
      expect(game.calculateWinner('a', 'a')).to.equal(0)
      expect(game.calculateWinner('b', 'b')).to.equal(0)
      expect(game.calculateWinner('c', 'c')).to.equal(0)
      expect(game.calculateWinner('d', 'd')).to.equal(0)
    })
  })

  describe('#type', () => {
    it('should return null', () => {
      expect(game.type()).to.be.null
    })
  })

  describe('#randomChoice', () => {
    it('should return a valid option', () => {
      expect(options).to.include(game.randomChoice())
    })
  })
})
