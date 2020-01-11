require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;
const app = require('./app');
const moviesDAO = require('./src/dao/movies.DAO');

const port = process.env.PORT || 3000;
const db_uri = process.env.DB_URI;
const dbName = process.env.DB_NAME;

MongoClient.connect(db_uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(async client => {
    const database = client.db(dbName);

    // Inject DB Collections
    await moviesDAO.injectDB(database);

    app.listen(port, () => {
        console.log(`Connected to DB, server started on ${port}`);
    });
}).catch(err => {
    console.error(err);
    process.exit(1);
});