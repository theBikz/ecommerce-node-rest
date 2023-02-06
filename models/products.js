const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({

    productId: {
        type: String,
        required: true
    },

	productName: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    MFD: {
        type: String,
        required: true
    },

    EXP: {
        type: String,
        required: true
    }

})

module.exports = mongoose.model('Products', productSchema)