const express = require('express')
const Products = require('../models/products')
const router = express.Router()
const jwtVerify = require('./users')
const jwt = require('jsonwebtoken')


router.get("/", async(req, res) => {
    try{
        const findProducts = await Products.find()
        res.json(findProducts)
    }catch(err){
        res.send('Error'+ err)
    }
})

router.get("/:id", async(req, res) => {
    try{
        const findProduct = await Products.findById(req.params.id)
        res.json(findProduct)
    }catch(err){
        res.send('Error'+ err)
    }
})

router.post("/", jwtVerify.verifyToken, (req, res) => {
    jwt.verify(req.token, 'secret-key', async(err, authData) =>{
        try{
        if(err) {
            res.sendStatus(403)
           } else {
            const product = new Products({
                productId: req.body.productId,
                productName: req.body.productName,
                price: req.body.price,
                MFD: req.body.MFD,
                EXP: req.body.EXP
            })
        
            const postProduct = await product.save()
            res.json({postProduct, authData})
        
           }
    }catch(err){
        res.send('Error'+ err)
    }
})
        
})

router.patch("/:id", jwtVerify.verifyToken, async(req, res) => {
    jwt.verify(req.token, 'secret-key', async(err, authData) =>{
    try{
        if(err) {
            res.sendStatus(403)
           } else {
            const updateProduct = await Products.findById(req.params.id)
            updateProduct.price = req.body.price
            const updateResponse = await updateProduct.save()
            res.json(updateResponse)
           }
        
    }catch(err){
        res.send('Error' + err)
    }
}
)
})

router.delete("/:id", async(req, res) => {
    jwt.verify(req.token, 'secret-key', async(err, authData) =>{
    try{
        if(err) {
            res.sendStatus(403)
           } else {
            console.log(req.params.id)
            const deletedProduct = await Products.remove({_id: req.params.id})
            res.json(deletedProduct)
           }
      
    }catch(err){
        res.send('Error' + err)
    }
}
)
})

router.put('/:id', async(req, res) => {
    jwt.verify(req.token, 'secret-key', async(err, authData) =>{
    try{
        if(err) {
            res.sendStatus(403)
           } else {
            const updateProduct = await Products.findById(req.params.id)
            const product = new Products({
                productId: req.body.productId,
                productName: req.body.productName,
                price: req.body.price,
                MFD: req.body.MFD,
                EXP: req.body.EXP
            })
            Products.updateOne({ id: req.params.id }, req.body).then(result => {
                res.json({ message: "Update successful!" });
              });
           }
      
    } catch(err){
        res.send('Error' + err).status(500)
    }
}
)
})

module.exports = router