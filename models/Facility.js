const mongoose = require('mongoose')

const facilitySchema = mongoose.Schema({
    name: String,
    description: String,
    location: String,
    type: String,
    price: Number,
    images: [String],
    owner: { type: mongoose.Schema.Types.ObjectId, 
             ref: 'User' } 		
}, {
    timestamps: true
})

const Facility = mongoose.model("Facility", facilitySchema)

module.exports =  Facility 
