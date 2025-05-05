// server.js
const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const mongoose = require('mongoose');
const http = require("http");
const cookieParser = require("cookie-parser");
const cors = require('cors');

// handlers
const adminRoutes = require('./routes/adminRoutes.js');
const quizRoutes = require('./routes/quizRoutes.js');
const questionRoutes = require('./routes/questionRoutes.js');
const attemptRoutes = require('./routes/attemptRoutes.js');
const connectToDatabase = require('./config/db.js');

// Importing Middlewares
const errorMiddleware = require("./middlewares/error-middleware");


const PORT = process.env.PORT || 5000;
const app = express();
const server = http.createServer(app);

app.use(cookieParser());

const allowedOrigins = [
    'http://localhost:5173',
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, origin); // ✅ Allow only one
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
}));
app.use(express.json());

app.use((req, res, next) => {
    console.log(`Received ${req.method} request to ${req.url}`);
    console.log(`Request body, ${req.body}`);
    console.log(`Request IP, ${req.ip}`);
    // console.log(`Incoming request: ${req.method} ${req.url} from ${req.ip}`);

    next();
});

// Routes
app.use('/api/admin', adminRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api/question', questionRoutes);
app.use('/api/attempt', attemptRoutes);

// Error Catch
app.use(errorMiddleware);

// Log Broadcasting
connectToDatabase()
    .then(() => {
        console.log("Connected to MongoDB successfully");
        server.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    });
process.on("SIGINT", () => {
    console.log("Shutting down server...");
    server.close(() => {
        console.log("Server shut down gracefully.");
        process.exit(0);
    });
});