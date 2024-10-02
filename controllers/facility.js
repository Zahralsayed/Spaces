// Load dependency
const dayjs = require('dayjs')
var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

const Facility = require('../models/Facility');
const Comment = require('../models/comment')



// image file  dependincess
const multer = require('multer');
const path = require('path'); // Add this line to import the path module

// Set up multer storage (as shown previously)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/'); // Directory to store uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  }
});

// Initialize multer
const upload = multer({ storage: storage }).single('image'); // Expecting a single file upload with field name 'image'


//add facility
exports.facility_create_get = (req, res) => {
    res.render("facility/add") 
}

exports.facility_create_post = (req, res) => {

 // Handle file upload
 upload(req, res, (err) => {
  if (err) {
    console.log("File upload error:", err);
    return res.send('Error uploading file');
  }

  // Add the image path to req.body
  req.body.image = req.file ? req.file.filename : null;


    console.log(req.body)
    let facility = new Facility(req.body)

    // save facility 
    facility.save().then( () => {
        res.redirect(`/facility/type/${facility.type}`)
    }).catch( (err) => {
        console.log(err)
        res.send("Please try again later!")
    })
})
}


// Get facility by ID for editing
exports.facility_edit_get = (req, res) => {
    const facilityId = req.params.id // Get the facility ID from the URL
    Facility.findById(facilityId)
      .then((facility) => {
        res.render('facility/edit', { facility }) // Render edit form with existing facility data
      })
      .catch((err) => {
        console.log(err)
        res.send('Facility not found!')
      })
  }
  
  // Update facility
  exports.facility_edit_post = (req, res) => {
    const facilityId = req.params.id // Get the facility ID from the URL
    const facilityType = req.query.type
    Facility.findByIdAndUpdate(facilityId, req.body, { new: true })
      .then(() => {
        res.redirect(`/facility/type/${facilityType}`) // Redirect to the index page after update
      })
      .catch((err) => {
        console.log(err)
        res.send('Please try again later!')
      })
  }
  


// Get all facilities
exports.facility_index_get = (req, res) => {

    const type = req.query.type; // Get type from query parameters
    const query = type ? { type } : {}; // Create a query object

    Facility.find(query).populate('owner', 'username')
        .then( (facilities) => res.render('facility/index', { facilities, dayjs }))
        .catch((err) => {
            console.log(err)
        });
};


// Get facility by ID
exports.facility_show_id = (req, res) => {
    console.log(req.query.id)
    Facility.findById(req.query.id)
      .populate('owner', 'username')
      .then((facility) => {
        console.log("facility image", facility.image); // Log the image value here
        Comment.find({ facilityId: facility._id }).populate('userId')
          .then((comments) => {
            console.log(comments)
            res.render('facility/detail', { facility, dayjs, comments }) // Render details page
          })
          .catch((err) => {
            console.log(err)
          })
      })
      .catch((err) => {
        console.log(err)
      })
  }

    
// Delete facility
exports.facility_delete_post = (req, res) => {
    const facilityId = req.params.id // Get the facility ID from the URL
    const facilityType = req.body.type
    Facility.findByIdAndDelete(facilityId)
    .then(deletedFacility => {
        if (deletedFacility) {
            // Redirect to the type page (assuming you have a way to identify the type)
            res.redirect(`/facility/type/${deletedFacility.type}`); // Update this line based on your route structure
        } else {
            res.status(404).send("Facility not found.");
        }
    })
    .catch(err => {
        console.error(err);
        res.send("Error deleting facility.");
    });
};



exports.facility_by_type_get = (req, res) => {
    const facilityType = req.params.type;

    Facility.find({ type: facilityType }) // Adjust this based on your model's schema
        .populate('owner', 'username')
        .then((facilities) => {
            res.render('facility/type', { facilities, facilityType, dayjs }); // Create a new EJS view to display the facilities
        })
        .catch((err) => {
            console.error(err);
            res.send("Error retrieving facilities by type.");
        });
};