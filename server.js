import express from  'express'
import connectionToDB from './conf/db.js'
import bodyParser from 'express'
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();


const app = express()
const PORT = process.env.PORT || 3000
// router import 
import userRouter from './routes/user.router.js'
import productRouter from './routes/product.router.js'
import cartRouter from './routes/cart.router.js'
import addressRouter from './routes/address.router.js'
import paymentRouter from './routes/payment.router.js'

const allowedOrigins = [
    "https://abhi-ecom-frontend-4pey.vercel.app",  
    "https://abhi-ecom-frontend-4pey-dfh4369vy-khiladi19s-projects.vercel.app"
];

app.use(cors({
    origin:allowedOrigins,
    methods:["GET","POST","PUT","DELETE"],
    credentials:true, 
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
app.listen(PORT,async()=>{
    await connectionToDB()
    console.log(`Server is running at http://localhost:${PORT}`);
})

