// Load express module
const express = require('express')

// Initialize router functionality from express framework.
const router = express.Router()

router.use(express.urlencoded({ extended: true }))

const ensureLoggedIn = require('../config/ensureLoggedIn')

// Require index controller
const indexCrl = require('../controllers/index')

// Routes
router.get('/', indexCrl.index_get)

// Export router
module.exports = router
