const express = require('express');
const GameFactory = require('../games/factory');
const GamePresenter = require('../presenters/game');

const router = (app) => {
  const route = express.Router()

  app.use('/game', route)

  route.post('/:algorithm', (req, res, next) => {
    const { algorithm } = req.params;
    const { p1_choice, p2_choice } = req.body
    const presenter = new GamePresenter(algorithm, p1_choice, p2_choice)

    const response = (presenter.result || presenter.error)

    res.setHeader('Content-Type', 'application/json')
    res.send(JSON.stringify(response))
  })

  route.get('/:algorithm', (req, res, next) => {
    const { algorithm } = req.params;
    const game = GameFactory.create(algorithm)

    if(game == null) {
      res.render('error', { message: `${algorithm} isn't a valid game` })
    } else {
      res.render('index', { algorithm: algorithm, game: game });
    }
  });
}

module.exports = router;
