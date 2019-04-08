import React, { Component } from 'react';
import axios from 'axios';
import Images from './Images';


// Parent component that contains search and sort for movies
// Gets invoked by the Images component
class Home extends Component {
    constructor(props) {
        super(props);

        // Set the state for the movies, search and sort
        this.state = {
            movies: [],
            searchMovie: '',
            alphabetical: 'az'
        };
        
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        // When component is mounted, a GET request is sent to the server for the API
        axios.get('api/movies')
            .then(response => {
                this.setState({ movies: response.data });
            })
            .catch(error => {
                console.log(error);
            });
    }

    // Set the functions to handle the input values for search and sort
    handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    render() {

        let sortedMovies;
        // Sort the movies by their name in alphabetcal order
        if(this.state.alphabetical === 'az') {
            sortedMovies = this.state.movies.sort((a, b) => a.name > b.name ? 1 : -1);
        } else {
            sortedMovies = this.state.movies.sort((a, b) => a.name < b.name ? 1 : -1);
        }

        let filterMovies = sortedMovies;

        
        if(this.state.searchMovie) {
            // If text is types in search box, search for movie names that include those letters 
            // Set the movie names to lowercase letters
            filterMovies = this.state.movies.filter(m => m.name.toLowerCase().includes(this.state.searchMovie.toLowerCase()));
        }

        // For each movie returned after filter, produce an Images commponent
        const moviesImg = filterMovies.map(m => {
            return (
                <Images
                    key = {m._id}
                    name = {m.name}
                    description = {m.description}
                    image = {m.image}
                    released = {m.released}
                    rating = {m.rating}
                />
            );
        });

        return (
            <div>
                <div>
                    <h2>Discover Awesome Movies</h2>
                    <p>Welcome to Movie Box. Here you can find the latest movies available.</p>
                </div>
                <br />
                {/* Add the search bar with the sort field */}
                <div className="columns">
                    <div className="column is-6">
                        <form onSubmit={this.handleSubmit}>
                            <div className="field">
                                <div className="control">
                                    <input 
                                        className="input is-info" 
                                        type="text"
                                        placeholder="Search" 
                                        name="searchMovie"
                                        value={this.state.value} 
                                        onChange={this.handleChange} 
                                    />
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="column is-6">
                        <div className="field">
                            <div className="control">
                                <div className="select is-info">
                                    <select name="alphabetical" value={this.state.alphabetical} onChange={this.handleChange}>
                                        <option value="az">A to Z</option>
                                        <option value="za">Z to A</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="columns is-multiline">{moviesImg}</div>
                </div>
            </div>
        );
    }
}

export default Home;
