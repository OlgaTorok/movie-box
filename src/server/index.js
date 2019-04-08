const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const bodyParser = require('body-parser');


const server = express();
const dbname = 'movie-roulette';
let db;


// Serves files from the dist directory
server.use(express.static('dist'));

// URL to the database
// const dbroute = process.env.MONGODB_URL || `mongodb://localhost:27017/${dbname}`;
const dbroute = process.env.MONGODB_URL || `mongodb+srv://Admin:admin@movies-jdmu8.mongodb.net/${dbname}?retryWrites=true`;


// The bodyParser renders the body to a readable json format
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

// Connects to the databse and start the express server
MongoClient.connect(dbroute, (err, client) => {
    if (err) throw err;

    db = client.db(dbname);
    // Start the express web server
    server.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
});


// Retrieves all movie objects from database
server.get('/api/movies', (req, res) => {
    db.collection('movies').find().toArray((err, result) => {
        if (err) { throw err; } else { console.log('DB connected ');
        }
        console.log(result);
        res.send(result);
    });
});


// Retrieves a movie with a given id from database
server.get('/api/movies/:id', (req, res) => {
    db.collection('movies').findOne({
        _id: new ObjectID(req.params.id)
    }, (err, result) => {
        if (err) throw err;

        console.log(result);
        res.send(result);
    });
});


// Creates a new movie based on information supplied user
server.post('/api/movies', (req, res) => {
    db.collection('movies').insertOne(req.body, (err, result) => {
        if (err) throw err;

        console.log('created in database');
        res.redirect('/');
    });
});


// Updates a movie based on information supplied by user
server.put('/api/movies', (req, res) => {
    // Get the id of the movie to be updated
    const id = req.body._id;
    // Remove the id so it won't be overwritten when updating
    delete req.body._id;
    // Find the movie matching the id and update the details
    db.collection('movies').updateOne({ _id: new ObjectID(id) }, { $set: req.body }, (err, result) => {
        if (err) throw err;
        console.log('updated in database');
        return res.send({
            success: true
        });
    });
});


// Deletes the movie with a specific id from database
server.delete('/api/movies', (req, res) => {
    db.collection('movies').deleteOne({
        _id: new ObjectID(req.body.id)
    }, err => {
        if (err) return res.send(err);

        console.log('deleted from database');
        return res.send({
            success: true
        });
    });
});

