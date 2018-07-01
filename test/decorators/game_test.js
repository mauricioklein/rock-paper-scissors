const chai = require('chai')
const GameDecorator = require('../../src/decorators/game')

const { expect } = chai;

describe('Decorator::Game', () => {
  describe('with PaperRockScissors algorithm', () => {
    const algorithm = 'paper_rock_scissors'

    it('renders success when player 1 wins', () => {
      const decorator = new GameDecorator(algorithm, 'paper', 'rock')
      expect(decorator.result()).to.deep.equal({
        player_1_choice: 'paper',
        player_2_choice: 'rock',
        winner: 'Player 1'
      })
    })

    it('renders success when player 2 winning', () => {
      const decorator = new GameDecorator(algorithm, 'rock', 'paper')
      expect(decorator.result()).to.deep.equal({
        player_1_choice: 'rock',
        player_2_choice: 'paper',
        winner: 'Player 2'
      })
    })

    it('renders success when draw', () => {
      const decorator = new GameDecorator(algorithm, 'rock', 'rock')
      expect(decorator.result()).to.deep.equal({
        player_1_choice: 'rock',
        player_2_choice: 'rock',
        winner: 'Draw'
      })
    })
  })

  describe('with unknown algorithm', () => {
    const algorithm = 'foobar'

    it('renders error', () => {
      const decorator = new GameDecorator(algorithm, '', '')
      expect(decorator.result()).to.deep.equal({
        error: "foobar isn't a valid game type"
      })
    })
  })
})
