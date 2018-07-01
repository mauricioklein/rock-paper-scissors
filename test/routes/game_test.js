const request = require('supertest')
const express = require('express')
const bodyParser = require('body-parser');

const chai = require('chai')
const gameRoutes = require('../../src/routes/game')

const { expect } = chai;

describe('/games/:algorithm', () => {
  const app = express()
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
  const router = gameRoutes(app)

  describe('with valid game type', () => {
    it('should return valid response for player 1 winner', (done) => {
      request(app)
        .post('/game/paper_rock_scissors')
        .set('Content-Type', 'application/json')
        .send({p1_choice: "paper", p2_choice: "rock"})
        .expect(200, {
          player_1_choice: "paper",
          player_2_choice: "rock",
          winner: "Player 1"
        }, done)
    })

    it('should return valid response for player 2 winner', (done) => {
      request(app)
        .post('/game/paper_rock_scissors')
        .set('Content-Type', 'application/json')
        .send({p1_choice: "rock", p2_choice: "paper"})
        .expect(200, {
          player_1_choice: "rock",
          player_2_choice: "paper",
          winner: "Player 2"
        }, done)
    })

    it('should return valid response for draw', (done) => {
      request(app)
        .post('/game/paper_rock_scissors')
        .set('Content-Type', 'application/json')
        .send({p1_choice: "rock", p2_choice: "rock"})
        .expect(200, {
          player_1_choice: "rock",
          player_2_choice: "rock",
          winner: "Draw"
        }, done)
    })
  })

  describe('with invalid game type', () => {
    it('should return error if algorithm is unknown', (done) => {
      request(app)
        .post('/game/foobar')
        .set('Content-Type', 'application/json')
        .send({p1_choice: "rock", p2_choice: "rock"})
        .expect(200, {
          error: "foobar isn't a valid game type"
        }, done)
    })    
  })
})
