const chai = require('chai')
const Factory = require('../../src/games/factory')
const PaperRockScissors = require('../../src/games/paper_rock_scissors')

const { expect } = chai;

describe('Factory', () => {
  describe('#create', () => {
    describe('when game type is "paper-rock-scissors"', () => {
      const game = Factory.create('paper-rock-scissors')

      it('should return a "PaperRockScissors" class instance', () => {
        expect(game instanceof PaperRockScissors).to.be.true
      })
    })

    describe('when game type is not mapped', () => {
      const game = Factory.create('foobar')

      it('should return null', () => {
        expect(game).to.be.null
      })
    })
  })
})
