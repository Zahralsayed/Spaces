const Comment = require('../models/comment')
const Facility = require('../models/Facility')


// Create a new comment
exports.comment_create_post = (req, res) => {
  const commentData = {
    facilityId: req.body.facilityId,
    userId: req.user._id, // Ensure req.user is populated
    comment: req.body.comment,
    rate: req.body.rate
  }

  console.log('Comment Data:', commentData) // Log comment data

  const comment = new Comment(commentData)
  comment
    .save()
    .then(() => {
      return Facility.findByIdAndUpdate(req.body.facilityId, {
        $push: { comments: comment._id }
      })
    })
    .then(() => {
      res.redirect(`/facility/detail?id=${req.body.facilityId}`)
    })
    .catch((err) => {
      console.log(err)
      res.send('Error saving comment!')
    })
}

// Get comments for a specific facility
exports.comment_create_get = (req, res) => {
  const facilityId = req.query.id

  Facility.findById(facilityId)
    // .populate('comments', 'username')
    .then((facility) => {
      if (!facility) {
        return res.status(404).send('Facility not found')
      }

      console.log('Facility with comments:', facility) // Log facility data

      res.render('facility/detail', {
        facility,
        comments: facility.comments || [] // Ensure it’s an array
      })
    })
    .catch((err) => {
      console.log(err)
      res.status(500).send('Error retrieving facility data')
    })
}


    
// Delete comment
exports.comment_delete_post = (req, res) => {
  const commentId = req.params.id; // Get the comment ID from the URL
  Comment.findByIdAndDelete(commentId)
      .then(() => {
          res.redirect('/facility/index'); // Redirect after deletion
      })
      .catch((err) => {
          console.log(err);
          res.status(500).send("Error deleting comment.");
      });
};
