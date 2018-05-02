const Router = require('express').Router
const Product = require('./model')

const router = new Router()

router.get('/products', (req, res) => {
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

router.get('/products/:id', (req, res) => {
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

router.post('/products', (req, res) => {
  const product = req.body
  console.log(product)
  Product.create(product)
  res.status(201)
  res.json(product)
  res.end()
})

router.put('/products/:id', (req, res) => {
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

  router.delete('/products/:id', (req, res) => {
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
module.exports = router
