import express from 'express'
import { allOrder, checkout, userOrder, verify } from '../controllers/payment.controller.js'
const router = express.Router()
import {Authenticated} from '../middlewares/auth.middleware.js'

router.post('/create-order',checkout)
router.post('/verify-payment',verify)
// userOrder
router.get('/userorder',Authenticated,userOrder)
// specific order
router.get('/allorder',allOrder)

export default router