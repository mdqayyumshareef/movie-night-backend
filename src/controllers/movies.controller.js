const moviesDAO = require('../dao/movies.DAO');

const apiGetMovies = async (req, res, next) => {
    const movies = await moviesDAO.getMovies();
    res.json(movies);
}

const apiPostMovie = async (req, res, next) => {
    const movieFromBody = req.body;
    let movie = {
        name: movieFromBody.name,
        genre: movieFromBody.genre,
        image: movieFromBody.image || null,
        releaseYear: movieFromBody.releaseYear || null
    }
    const insertResult = await moviesDAO.insertMovie(movie);
    if (insertResult.id) {
        const doc = await moviesDAO.getMovieByID(insertResult.id);
        res.json(doc);
        return;
    }
    res.json({
        error: `Unable to insert movie ${insertResult.error}`
    });
}

const apiGetMovieDetail = async (req, res, next) => {
    const id = req.params.id;
    const movie = await moviesDAO.getMovieByID(id);
    res.json(movie);
}

const apiUpdateMovie = async (req, res, next) => {
    // TODO: Update movie
    res.json({
        result: 'success'
    });
}

module.exports = {
    apiGetMovies,
    apiPostMovie,
    apiGetMovieDetail,
    apiUpdateMovie
}