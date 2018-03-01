const express = require('express')
const db = require('./database')

const app = express()
app.listen(4001, () => console.log('Express API listening on port 4001'))

var Sequelize = require('sequelize')
var sequelize = new Sequelize('postgres://postgres:secret@localhost:5432/postgres')

var Product = sequelize.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  },
  image: Sequelize.STRING
}, {
  tableName: 'products',
  timestamps: false
})



app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE')
  next()
})

Product.findById(1).then(product => console.log(JSON.stringify(product)))

app.get('/products', (req, res) => {
  const products = Product
    .findAll()
    .then((products) => {
      res.json(products)
    })
    .catch((err) => {
      console.error(err)
      res.status(500)
      res.json({ message: 'Oops! There was an error getting the players. Please try again' })
    })
})

app.get('/products/:id', (req, res) => {
  const products = Product
    .findById(req.params.id)
    .then((products) => {
      if (products) {
        res.json(products)
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
