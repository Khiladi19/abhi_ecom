import express from  'express'
import connectionToDB from './conf/db.js'
import bodyParser from 'express'
import cors from 'cors'
import {config} from 'dotenv';
config();
const app = express()
const Port = process.env.Port 
// router import 
import userRouter from './routes/user.router.js'
import productRouter from './routes/product.router.js'
import cartRouter from './routes/cart.router.js'
import addressRouter from './routes/address.router.js'
import paymentRouter from './routes/payment.router.js'


app.use(cors({
    origin:true,
    methods:["GET","POST","PUT","DELETE"],
    credentials:true
}))
app.use(bodyParser.json())

// Routes 
app.use('/api/user',userRouter)
app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/address',addressRouter)
app.use('/api/payment',paymentRouter)


app.use('/ping',(req,res)=>{
    res.send('Hello Abhishek ')
})
app.all('*',(req,res)=>{
    res.status(404).send('OOPS!! 404 Page Not Found')
})


// port listen 
app.listen(Port,async()=>{
    await connectionToDB
    `http://localhost:${Port}`
})

