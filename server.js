const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const dataRouter = require('./route/DataRouter');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: '*',
    }
});

// Middleware setup
app.use(cors());
app.use(bodyParser.json({ limit: '1mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '1mb' }));

// MongoDB connection
const url = 'mongodb+srv://adventis02:adventis02@cluster0.wnnut.mongodb.net/data';
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("DB connected..."))
    .catch((error) => console.error("Error connecting to MongoDB:", error));

// API routes should come before the catch-all route
app.use('/api', dataRouter);

// Serve static files for Angular
const frontendPath = path.join(__dirname, 'browser');
app.use(express.static(frontendPath));

// Catch-all route: For any route that isn't an API route,
// send the Angular app's index.html so Angular can handle routing.
app.get('*', (req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
});

// Other endpoints if needed
app.get('/some-endpoint', (req, res) => {
  // Your endpoint logic
});

// Set a global timeout for requests
const timeoutDuration = 60000; // 60 seconds
app.use((req, res, next) => {
    res.setTimeout(timeoutDuration, () => {
        console.error('Request has timed out.');
        res.status(408).send('Request has timed out.');
    });
    next();
});

// Start the server
server.listen(4000, () => {
    console.log("Node.js server running on port 4000 ...");
});
