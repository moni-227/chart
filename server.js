const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path'); // Ensure you include the path module


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
app.use(bodyParser.json({ limit: '1mb' })); // Adjust limit for large payloads if needed
app.use(bodyParser.urlencoded({ extended: true, limit: '1mb' }));




// MongoDB connection
const url = 'mongodb+srv://adventis02:adventis02@cluster0.wnnut.mongodb.net/data';
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("DB connected..."))
    .catch((error) => console.error("Error connecting to MongoDB:", error));


app.use('/api', dataRouter);




// Your other middleware and routes
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

// Socket.IO connection
io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });

    // Example of handling a detection update event
    socket.on('detection_update', (data) => {
        // Emit data to clients or handle it as necessary
        io.emit('detection_update', data);
    });
});

// Handle all other routes
app.get('*', (req, res) => {
    
    res.status(404).send('Not Found'); // Respond with 404 for unmatched routes
});

// Start the server
server.listen(4000 , () => {
    console.log("Node.js server running on port 4000 ...");
});
