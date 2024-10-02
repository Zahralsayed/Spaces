const express = require('express');
const router = express.Router();

router.use(express.urlencoded({ extended: true }))

const facilityCtrl = require('../controllers/facility');

router.get('/add', facilityCtrl.facility_create_get)
router.post('/add', facilityCtrl.facility_create_post)

router.get('/index', facilityCtrl.facility_index_get); 

router.get('/detail', facilityCtrl.facility_show_id); 
module.exports = router;
