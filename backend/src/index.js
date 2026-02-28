const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

const authRoutes = require('./routes/authRoutes');
const courseRoutes = require('./routes/courseRoutes');
const certificateRoutes = require('./routes/certificateRoutes');
const quizRoutes = require('./routes/quizRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const labRoutes = require('./routes/labRoutes');
const applicationRoutes = require('./routes/applicationRoutes');
const institutionRoutes = require('./routes/institutionRoutes');

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/certificates', certificateRoutes);
app.use('/api/quizzes', quizRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/labs', labRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/institutions', institutionRoutes);

app.get('/', (req, res) => {
    res.json({ message: 'Nurdine Learning Platform API is running' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Keep process alive if app.listen fails to do so for some reason
setInterval(() => { }, 1000 * 60 * 60);
