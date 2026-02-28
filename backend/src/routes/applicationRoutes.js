const express = require('express');
const router = express.Router();
const ApplicationController = require('../controllers/applicationController');
const { verifyToken, isAdmin } = require('../middleware/auth');

router.get('/', verifyToken, isAdmin, ApplicationController.getAllApplications);
router.post('/:id/approve', verifyToken, isAdmin, ApplicationController.approveApplication);
router.post('/:id/reject', verifyToken, isAdmin, ApplicationController.rejectApplication);

module.exports = router;
