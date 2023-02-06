const express = require('express')
const router = express.Router()
const Users = require('../models/users')
const yaml = require('js-yaml');
const fs   = require('fs');

router.get('/', async(req, res) => {

    try {
        const doc = yaml.load(fs.readFileSync('./config/config.yaml', 'utf8'))
        //console.log(doc.data.pipeline)
        const pipeline = doc.data.pipeline 
    
      let agg = Users.aggregate(pipeline).exec((err, result) => {
        if (err) throw err;
        //console.log(result);
        res.json(result)
    })
}
    catch (e) {
        console.log(e)
      }

})


//console.log(agg)

module.exports = router