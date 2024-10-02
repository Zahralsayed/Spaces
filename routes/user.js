const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const checkRole = require('../middleware/checkRole'); 

router.post('/add-role', checkRole(['admin']), userCtrl.addRoleToUser);

router.post('/update-role', checkRole(['admin']), userCtrl.updateUserRole);

router.post('/remove-role', checkRole(['admin']), userCtrl.removeRoleFromUser);

module.exports = router;
