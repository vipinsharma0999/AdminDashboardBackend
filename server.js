// server.js

const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

const authRoutes = require('./src/app/routes/authRoutes');
const userRoutes = require('./src/app/routes/userRoutes');
const donationRoutes = require('./src/app/routes/donationRoutes');
const bookingRoutes = require('./src/app/routes/bookingRoutes');
const feedbackRoutes = require('./src/app/routes/feedbackRoutes');
const slotRoutes = require('./src/app/routes/slotRoutes');
const otpRoutes = require('./src/app/routes/otpRoutes');

const app = express();
app.use(express.json());

require('dotenv').config();

// Serve Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/donations', donationRoutes);
app.use('/bookings', bookingRoutes);
app.use('/feedback', feedbackRoutes);
app.use('/slots', slotRoutes);
app.use('/otp', otpRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Swagger UI is available at http://localhost:${PORT}/api-docs`);
});
