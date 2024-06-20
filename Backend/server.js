const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./Router/UserRoutes'); // Import the user routes

dotenv.config();

const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

mongoose.connect(process.env.URI)
    .then(() => {
        console.log('Connected successfully to MongoDB');

        const PORT = process.env.PORT || 5000;
        app.listen(PORT, (err) => {
            if (err) {
                console.error('Error starting server:', err);
            } else {
                console.log(`Server is running on PORT ${PORT}`);
            }
        });
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
        process.exit(1); // Exit the application if MongoDB connection fails
    });

// Define your routes here
app.use(userRoutes); // Use the user routes

// Add more routes as needed
app.get('/', (req, res) => {
    res.send('Hello World!');
});
