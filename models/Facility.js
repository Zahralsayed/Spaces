const mongoose = require('mongoose')

const facilitySchema = mongoose.Schema({
    name: String,
    description: String,
    location: String,
    type: String,
    price: Number,
    image: String,
    phoneNumber: Number,
    owner: { type: mongoose.Schema.Types.ObjectId, 
             ref: 'User' } ,	
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
	
}, {
    timestamps: true
})

const Facility = mongoose.model("Facility", facilitySchema)

module.exports =  Facility 