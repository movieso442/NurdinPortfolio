const express = require('express');
const router = express.Router();
const CourseController = require('../controllers/courseController');
const { verifyToken, isAdmin } = require('../middleware/auth');

router.get('/', CourseController.getAllCourses);
router.post('/', verifyToken, isAdmin, CourseController.createCourse);
router.get('/:id', verifyToken, CourseController.getCourseWithProgression);
router.put('/:id', verifyToken, isAdmin, CourseController.updateCourse);
router.delete('/:id', verifyToken, isAdmin, CourseController.deleteCourse);

module.exports = router;
