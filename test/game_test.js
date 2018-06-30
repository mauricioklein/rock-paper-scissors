const chai = require('chai')
const Game = require('../src/game')

const { expect } = chai;

describe('Game', () => {
  describe('#getOptions', () => {
    const game = new Game({ a: "b", c: "d" })

    it('should return all possible options', () => {
      expect(game.getOptions()).to.deep.equal([ "a", "b", "c", "d" ])
    })
  })
})
