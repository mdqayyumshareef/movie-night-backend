const ObjectID = require('mongodb').ObjectId;

const movieSchema = {
    $jsonSchema: {
        bsonType: 'object',
        additionalProperties: false,
        required: ['name', 'genre', 'image', 'releaseYear'],
        properties: {
            _id: {
                bsonType: 'objectId'
            },
            name: {
                bsonType: 'string',
                description: 'must be a string and is required'
            },
            genre: {
                bsonType: 'string',
                description: 'must be a string and is required'
            },
            image: {
                bsonType: 'string',
                description: 'must be a string and is required'

            },
            releaseYear: {
                bsonType: 'string',
                description: 'must be a string and is required'
            }
        }
    }
}

let movies;

const injectDB = async (db) => {
    if (movies) {
        return;
    } else {
        try {
            movies = await db.collection('movies');
            await db.command({ collMod: 'movies', validator: movieSchema });
        } catch (e) {
            console.error(`Unable to establish connection in moviesDAO ${e}`);
        }
    }
}

const getMovies = async () => {
    try {
        const query = await movies.find({}).sort({ _id: -1 });
        const docs = await query.toArray();
        return docs;
    } catch (e) {
        console.error(`Unable to issue find command ${e}`);
        return { error: e }
    }
}

const getMovieByID = async (id) => {
    try {
        const doc = await movies.findOne({ _id: ObjectID(id) });
        return doc;
    } catch (e) {
        console.error(`Unable to issue find command ${e}`);
        return { error: e }
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

const updateMovie = async (id, movieDetals) => {
    try {
        const result = await movies.updateOne(
            { _id: ObjectID(id) },
            { $set: movieDetals }
        );
        return result;
    } catch (e) {
        console.error(`Unable to issue update command ${e}`);
        return { error: e };
    }
}

const deleteMovieByID = async (id) => {
    try {
        const deleteResult = await movies.deleteOne({ _id: ObjectID(id) });
        return deleteResult;
    } catch (e) {
        console.error(`Unable to issue delete command ${e}`);
        return { error: e }
    }
}

module.exports = {
    injectDB,
    getMovies,
    getMovieByID,
    insertMovie,
    updateMovie,
    deleteMovieByID
}