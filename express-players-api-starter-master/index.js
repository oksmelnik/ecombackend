const express = require('express')
const bodyParser = require('body-parser')
const db = require('./models')

const app = express()
app.use(bodyParser.json())
const port = process.env.PORT || 3030

const { Player } = db

app.get('/players', (req, res) => {
  const players = Player
    .findAll()
    .then((players) => {
      res.json(players)
    })
    .catch((err) => {
      console.error(err)
      res.status(500)
      res.json({ message: 'Oops! There was an error getting the players. Please try again' })
    })
})

app.get('/players/:id', (req, res) => {
  const players = Player
    .findById(req.params.id)
    .then((player) => {
      if (player) {
        res.json(player)
      } else {
        res.status(404)
        res.json({ message: 'Player not found!' })
      }
    })
    .catch((err) => {
      console.error(err)
      res.status(500)
      res.json({ message: 'Oops! There was an error getting the player. Please try again' })
    })
})

app.patch('/players/:id', (req, res) => {
  const players = Player
    .findById(req.params.id)
    .then((player) => {
      if (player) {
        player.score = req.body.score
        player
          .save()
          .then((updatedPlayer) => {
            res.json(updatedPlayer)
          })
          .catch((err) => {
            res.status(422)
            res.json({ message: err.message })
          })
      } else {
        res.status(404)
        res.json({ message: 'Player not found!' })
      }
    })
    .catch((err) => {
      console.error(err)
      res.status(500)
      res.json({ message: 'Oops! There was an error getting the player. Please try again' })
    })
})

app.listen(port, () => {
  console.log(`
Server is listening on ${port}.

Open http://localhost:${port}

to see the app in your browser.
    `)
})
