const express = require('express')
const Users = require('../models/users')
const jwt = require('jsonwebtoken')
const router = express.Router()

router.get('/', async(req, res) => {
    try{
        const findUsers = await Users.find()
        res.json(findUsers)
    }catch(err){
        res.send('Error'+ err)
    }
}) 
    

router.get("/:id", async(req, res) => {
    try{
        const findUser = await Users.findById(req.params.id)
        res.json(findUser)
    }catch(err){
        res.send('Error'+ err)
    }
})

router.post("/", verifyToken, (req, res) =>{
       try{
        jwt.verify(req.token, 'secret-key', async(err, authData) => {
            if(err) {
             res.sendStatus(403)
            } else {
                const user = new Users({
                 userId: req.body.userId,
                 password: req.body.password,
                 name: req.body.name,
                 gender: req.body.gender,
                 email: req.body.email,
                 dob: req.body.dob,
                 phoneNumber: req.body.phoneNumber,
                 userRole: req.body.userRole,
                 productId: req.body.productId            
             })
             
                const postUser = await user.save()
                res.status(200).json({postUser, authData})
             }
            })
        } catch(err){
            res.send('Error'+ err)
        }
})       
       
router.patch("/:id", async(req, res) => {
    try{
        const updateUser = await Users.findById(req.params.id)
        updateUser.productId = req.body.productId
        const updateResponse = await updateUser.save()
        res.json(updateResponse)
    }catch(err){
        res.send('Error' + err)
    }
})

router.delete("/:id", async(req, res) => {
    try{
        console.log(req.params.id)
        const deletedUser = await Users.remove({_id: req.params.id})
        res.json(deletedUser)
    }catch(err){
        res.send('Error' + err)
    }
})

router.put("/:id", async(req, res) => {
    try{
        const updateUser = await Users.findById(req.params.id)
        const user = new Users({
            userId: req.body.userId,
            password: req.body.password,
            name: req.body.name,
            gender: req.body.gender,
            email: req.body.email,
            dob: req.body.dob,
            phoneNumber: req.body.phoneNumber,
            userRole: req.body.userRole,
            productId: req.body.productId   
        })
        Users.updateOne({ id: req.params.id }, req.body).then(result => {
            res.json({ message: "Update successful!" });
          });
    } catch(err){
        res.send('Error' + err).status(500)
    }
})

router.post("/login/", async(req, res) => {
    const user = req.body

    jwt.sign({user}, 'secret-key', (err, token) => {
        res.json({token})
    })
})

function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization']

    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(' ')
        const bearerToken = bearer[1]
        req.token = bearerToken
        next()
    } else {
        res.sendStatus(403);
    }
}

//module.exports.getUsers = getUsers;
// module.exports.getUser = getUser;
// module.exports.insertUser = insertUser;
// module.exports.patchUser = patchUser;
// module.exports.deleteUser = deleteUser;
// module.exports.putUser = putUser;
// module.exports.login = login;

module.exports = router
module.exports.verifyToken = verifyToken