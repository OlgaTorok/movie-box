import React, { Component } from 'react';
import Movies from './Movies';
import axios from 'axios';
import './app.css';


// Component that contains the information for movies and gets invoked by the Movies component
class MovieList extends Component {
    constructor(props) {
        super(props);
        // Store the movie array in state
        this.state = { movies: [] };

        // Bind the functions for update and delete to classes
        this.updateMovies = this.updateMovies.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount() {
        // Get the movie data from the server
        this.updateMovies();
    }

    updateMovies() {
        // Send a GET request to the server for the movie data and then store it in state
        axios.get('api/movies')
            .then(response => {
                this.setState({ movies: response.data });
            })
            .catch(error => {
                console.log(error);
            });
    }

    handleDelete(movieId) {
        // Send a delete request to the server to remove the movie with the movieId
        axios
            .delete('api/movies', {
                data: {
                    id: movieId
                } 
            })
            .then(response => {
                // If the movie was deleted successfully, gey the new list of movies
                this.updateMovies();
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        // For each movie object produce a Movie Component
        const movieList = this.state.movies.map(m => (
            <Movies
                key = {m._id}
                id = {m._id}
                name = {m.name}
                description = {m.description}
                image = {m.image}
                released = {m.released}
                rating = {m.rating}
                updateMovies = {this.updateMovies}
                handleDelete = {this.handleDelete}
            />
        ));

        return (
            // Return the list of movies
            <div className="container">
                <div className="columns is-multiline is-mobile">{movieList}</div>
            </div>
        );
    }
}

export default MovieList;
