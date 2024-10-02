// Load dependency
const dayjs = require('dayjs')
var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

const Facility = require('../models/Facility');

//add facility
exports.facility_create_get = (req, res) => {
    res.render("facility/add") 
}

exports.facility_create_post = (req, res) => {
    console.log(req.body)
    let facility = new Facility(req.body)

    // save facility 
    facility.save().then( () => {
        res.redirect('/facility/index')
    }).catch( (err) => {
        console.log(err)
        res.send("Please try again later!")
    })
}

// Get all facilities
exports.facility_index_get = (req, res) => {
    Facility.find().populate('owner', 'username')
        .then( (facilities) => res.render('facility/index', { facilities, dayjs }))
        .catch((err) => {
            console.log(err)
        });
};

// Get facility by ID
exports.facility_show_id = (req, res) => {
    console.log(req.query.id)
    Facility.findById(req.query.id).populate('owner', 'username')
        .then((facility) => {
            res.render('facility/detail', { facility, dayjs }); // Render details page
        })
        .catch((err) => {
            console.log(err)
        });
};
