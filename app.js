const express = require('express');
const movieRoute = require('./src/routes/movies.route');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const base = '/api';
app.use(base.concat('/movie'), movieRoute);
app.use('*', (req, res, next) => {
    res.status(404).json({
        error: 'not found'
    });
});

module.exports = app;