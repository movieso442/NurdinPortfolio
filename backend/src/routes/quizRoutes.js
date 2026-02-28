const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');
const { verifyToken } = require('../middleware/auth');

router.get('/module/:moduleId', verifyToken, quizController.getQuizzesByModule);
router.post('/submit', verifyToken, quizController.submitQuiz);
router.get('/my-results', verifyToken, quizController.getStudentResults);

module.exports = router;
