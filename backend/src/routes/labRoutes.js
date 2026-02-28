const express = require('express');
const router = express.Router();
const labController = require('../controllers/labController');
const { verifyToken, isAdmin } = require('../middleware/auth');

router.post('/submit', verifyToken, labController.submitLab);
router.get('/submissions', verifyToken, labController.getLabSubmissions);
router.get('/submissions/:lessonId', verifyToken, labController.getLabSubmissions);
router.patch('/review/:id', verifyToken, isAdmin, labController.reviewLab);

module.exports = router;
