const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');
const { verifyToken } = require('../middleware/auth');

router.post('/apply', AuthController.submitApplication);
router.post('/login', AuthController.login);
router.get('/me', verifyToken, AuthController.getMe);
router.get('/users', verifyToken, AuthController.getUsers);

module.exports = router;
