const express = require('express')
const { postProductController, getProductByIdController, deleteProductByIdController, getAllProducts, putProductController } = require('./products.controller')

const productRouter = express.Router()




productRouter.get('/', getAllProducts)
productRouter.post('/', postProductController)
productRouter.put('/:pid',putProductController)
productRouter.delete('/:pid', deleteProductByIdController)
productRouter.get('/:pid', getProductByIdController)


module.exports = {productRouter}