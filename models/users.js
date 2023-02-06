const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

	userId: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
	name: {
        type: String,
        required: true
    },
	gender: {
        type: String,
        required: true
    },
	email: {
        type: String,
        required: true
    },
	dob: {
        type: String,
        required: true
    },
	phoneNumber: {
        type: String,
        required: true
    },
    userRole: {
        type: String,
        required: true
    },
    productId: {
        type: String
    }

})

module.exports = mongoose.model('Users', userSchema)