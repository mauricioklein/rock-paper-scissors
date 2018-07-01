const express = require('express');
const GameDecorator = require('../../src/decorators/game');

const router = (app) => {
  const route = express.Router()

  app.use('/game', route)

  route.post('/:algorithm', (req, res, next) => {
    const { algorithm } = req.params;
    const { p1_choice, p2_choice } = req.body
    const decorator = new GameDecorator(algorithm, p1_choice, p2_choice)

    res.setHeader('Content-Type', 'application/json')
    res.send(JSON.stringify(decorator.result()))
  })

  route.get('/', (req, res, next) => {
    res.render('index');
  });
}

module.exports = router;
