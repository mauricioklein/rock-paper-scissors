const chai = require('chai')
const GamePresenter = require('../../src/presenters/game')

const { expect } = chai;

describe('Presenter::Game', () => {
  describe('with PaperRockScissors algorithm', () => {
    const algorithm = 'paper-rock-scissors'

    it('renders success when player 1 wins', () => {
      const presenter = new GamePresenter(algorithm, 'paper', 'rock')

      expect(presenter.error).to.be.null
      expect(presenter.result).to.deep.equal({
        player_1_choice: 'paper',
        player_2_choice: 'rock',
        winner: 'Player 1'
      })
    })

    it('renders success when player 2 wins', () => {
      const presenter = new GamePresenter(algorithm, 'rock', 'paper')

      expect(presenter.error).to.be.null
      expect(presenter.result).to.deep.equal({
        player_1_choice: 'rock',
        player_2_choice: 'paper',
        winner: 'Player 2'
      })
    })

    it('renders success when draw', () => {
      const presenter = new GamePresenter(algorithm, 'rock', 'rock')

      expect(presenter.error).to.be.null
      expect(presenter.result).to.deep.equal({
        player_1_choice: 'rock',
        player_2_choice: 'rock',
        winner: 'Draw'
      })
    })
  })

  describe('with unknown algorithm', () => {
    const algorithm = 'foobar'

    it('renders error', () => {
      const presenter = new GamePresenter(algorithm, '', '')

      expect(presenter.result).to.be.null
      expect(presenter.error).to.deep.equal({
        error: "foobar isn't a valid game type"
      })
    })
  })
})
