// server.js
const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const mongoose = require('mongoose');
const adminRoutes = require('./routes/adminRoutes.js');
const quizRoutes = require('./routes/quizRoutes.js');
const questionRoutes = require('./routes/questionRoutes.js');
const attemptRoutes = require('./routes/attemptRoutes.js');
const { connectDB } = require('./config/db.js');

// dotenv.config();
// connectDB();

const app = express();
app.use(express.json());

// Routes
app.use('/api/admin', adminRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api/question', questionRoutes);
app.use('/api/attempt', attemptRoutes);

const PORT = process.env.PORT || 5000;
connectDB().then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}) 
