const moviesDAO = require('../dao/movies.DAO');

const apiGetMovies = async (req, res, next) => {
    const movies = await moviesDAO.getMovies();
    res.json(movies);
}

const apiPostMovie = async (req, res, next) => {
    const movieFromBody = req.body;
    const insertResult = await moviesDAO.insertMovie(movieFromBody);
    
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
    try {
        const movieID = req.params.id;
        const movieFromBody = req.body;
        const updateResult = await moviesDAO.updateMovie(movieID, movieFromBody);

        if (updateResult.error) {
            res.json({
                error: `Unable to update movie ${updateResult.error}`
            });
            return;
        }
        if (updateResult.modifiedCount == 0) {
            res.json({
                error: `Unable to update movie`
            });
            return;
        }
        const updatedMovie = await moviesDAO.getMovieByID(movieID);
        res.json(updatedMovie)
    } catch (e) {
        console.error(`API update movie: ${e}`);
        res.status(500).json({
            error: e
        });
    }
}

const apiDeleteMovie = async (req, res, next) => {
    try {
        const movieID = req.params.id;
        const delResult = await moviesDAO.deleteMovieByID(movieID);

        if (delResult.error) {
            res.json({
                error: `Unable to delete movie ${delResult.error}`
            });
            return;
        }
        if (delResult.deletedCount == 0) {
            res.json({
                error: `Unable to delete movie`
            });
            return;
        }

        res.json(delResult);
    } catch (e) {
        console.error(`API delete movie: ${e}`);
        res.status(500).json({
            error: e
        });
    }
}

module.exports = {
    apiGetMovies,
    apiPostMovie,
    apiGetMovieDetail,
    apiUpdateMovie,
    apiDeleteMovie
}