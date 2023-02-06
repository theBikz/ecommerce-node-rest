const express = require('express')
const { verify } = require('jsonwebtoken')
const mongoose = require('mongoose')
const url = 'mongodb://localhost:27017/ecom'

mongoose.connect(url, {useNewUrlParser:true})
const con = mongoose.connection

con.on('open', () => {
    console.log('connected')
})
const app = express()
app.use(express.json())

const productRouter = require('./routes/products')
app.use('/v1/product', productRouter)

// app.get('/product/v1', productRouter.getProducts)
// app.get('/product/v1/:id', productRouter.getProduct)
// app.post('/product/v1/', productRouter.insertProduct)
// app.patch('/product/v1/:id', productRouter.patchProduct)
// app.put('/product/v1/:id', productRouter.putProduct)
// app.delete('/product/v1/:id', productRouter.deleteProduct)

const userRouter = require('./routes/users')
app.use('/v1/user', userRouter)
// app.get('/v1/user/', userRouter.getUsers)
// app.get('/v1/user/:id', userRouter.getUser)
// app.post('/v1/user/', userRouter.insertUser)
// app.patch('/v1/user/:id', userRouter.patchUser)
// app.put('/v1/user/:id', userRouter.putUser)
// app.delete('/v1/user/:id', userRouter.deleteUser)
// app.post('/v1/user/login/', userRouter.login)

const orderRouter = require('./routes/orders')
app.use('/v1/orders', orderRouter)


app.listen(9000, ()=>{
    console.log('server started')
})