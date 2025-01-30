import express from 'express'
const router = express.Router()
import { addProduct, deleteProductById, getProduct, getProductById, updateProductById} from '../controllers/product.controller.js'

// add product
router.post('/addproduct',addProduct)
// all product
router.get('/all',getProduct)
// get product by Id 
router.get('/:id',getProductById)
// update product by Id
router.put('/:id',updateProductById)
// delete product
router.delete('/:id',deleteProductById)
export default router