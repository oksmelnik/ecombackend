const express = require('express')
const db = require('./database')
const bodyParser = require('body-parser')

const app = express()
app.listen(4000, () => console.log('Express API listening on port 4000'))

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

app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE')

  next()
})



app.get('/products', (req, res) => {
  const products = Product
    .findAll()
    .then((products) => {
      res.json(products)
    })
    .catch((err) => {
      console.error(err)
      res.status(500)
      res.json({ message: 'Oops! There was an error getting the product. Please try again' })
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
        res.json({ message: 'Product not found!' })
      }
    })
    .catch((err) => {
      console.error(err)
      res.status(500)
      res.json({ message: 'Oops! There was an error getting the product. Please try again' })
    })
})

app.post('/products', (req, res) => {
  const product = req.body
  console.log(product)
  Product.create(product)
  res.status(201)
  res.json(product)
  res.end()
})

app.put('/products/:id', (req, res) => {
  const productId = Number(req.params.id)
    const updates = req.body

    Product.findById(productId)
      .then(entity => {
        return entity.update(updates)
      })
      .then(final => {
        res.send(final)
      })
      .catch(error => {
        res.status(500).send({
          message: `Something went wrong`,
          error
        })
      })
  })

  app.delete('/products/:id', (req, res) => {
    const productId = Number(req.params.id)

      Product.findById(productId)
        .then(entity => {
          return entity.destroy()
        })
        .then(final => {
        res.json({ message: 'Product was deleted!' })
        })
        .catch(error => {
          res.status(500).send({
            message: `Something went wrong`,
            error
          })
        })
    })
