const Product = require('../models/product.model');
const mongoose = require('mongoose');

module.exports.findAllProducts = (req, res) => {
    Product.find()
        .then(products => res.json(products))
        .catch(err => res.json({ error: err }))
}

module.exports.findOneProductById = (req, res) => {
    Product.findOne({ _id: req.params.id })
        .then(oneProduct => res.json({ oneProductById: oneProduct }))
        .catch(err => res.json({ error: err }))
}
module.exports.createNewProduct = (req, res) => {
    Product.create(req.body)
        .then(newProduct => res.json({ newProduct: newProduct }))
        .catch(err => res.json({ error: err }))
}

module.exports.findProductAndUpdate = (req, res) => {
    Product.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true }) //MongoDB and Mongoose do not run validations on an edit out of the boc; must explicitly run runValidators.
        .then(data => res.json({ data: data }))
        .catch(err => res.json({ error: err }))

}

module.exports.findOneProductAndDelete = (req, res) => {
    Product.deleteOne({ _id: req.params.id })
        .then(result => res.json({ result: result }))
        .catch(err => res.json({ error: err }))
}

module.exports.findRandomProduct = (req, res) => {
    Product.find()
    .then(products => {
        const randomProductIndex = Math.floor(Math.random() * products.length)
        res.json({result: products[randomProductIndex]})
    })
    .catch(err => res.json({ error: err }))
}