const express = require('express');
const movieCtrl = require('../controllers/movies.controller');

const movieRoute = express.Router();

movieRoute.route('/')
    .get(movieCtrl.apiGetMovies)
    .post(movieCtrl.apiPostMovie)

movieRoute.route('/:id')
    .get(movieCtrl.apiGetMovieDetail)
    .put(movieCtrl.apiUpdateMovie)

module.exports = movieRoute;