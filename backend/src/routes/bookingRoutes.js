const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const { verifyToken, isAdmin } = require('../middleware/auth');

router.post('/', verifyToken, bookingController.createBooking);
router.get('/my', verifyToken, bookingController.getMyBookings);
router.patch('/:id/status', verifyToken, isAdmin, bookingController.updateBookingStatus);

module.exports = router;
