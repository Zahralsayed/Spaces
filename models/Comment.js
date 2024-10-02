const mongoose = require('mongoose')

const commentSchema = mongoose.Schema({
    facilityId: { type: mongoose.Schema.Types.ObjectId, 
                ref: 'Facility' }, // Reference to the facility
    userId: { type: mongoose.Schema.Types.ObjectId,    
            ref: 'User' }, // Reference to the user
    comment: String,
    rate: { type: Number, min: 1, max: 5 } // Add rate field with constraints
   }, {
    timestamps: true
})

const Comment = mongoose.model("Comment", commentSchema)

module.exports =  Comment 
