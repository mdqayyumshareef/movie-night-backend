const ObjectID = require('mongodb').ObjectId;

let movies;

const injectDB = async (db) => {
    if (movies) {
        return;
    } else {
        try {
            movies = db.collection('movies');
        } catch (e) {
            console.error(`Unable to establish connection in moviesDAO ${e}`);
        }
    }
}

const getMovies = async () => {
    try {
        const query = await movies.find({});
        const docs = await query.toArray();
        return docs;
    } catch (e) {
        console.error(`Unable to issue find command ${e}`);
        return { docs: [] }
    }
}

const getMovieByID = async (id) => {
    try {
        const doc = await movies.findOne({ _id: ObjectID(id) });
        return doc;
    } catch (e) {
        console.error(`Unable to issue find command ${e}`);
        return { doc: {} }
    }
}

const insertMovie = async (movie) => {
    try {
        const result = await movies.insertOne(movie);
        return { id: result.insertedId }
    } catch (e) {
        console.error(`Unable to issue insert command ${e}`);
        return { error: e }
    }
}

module.exports = {
    injectDB,
    getMovies,
    getMovieByID,
    insertMovie
}