import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


// Component representing a form that updates a movie
class EditMovie extends Component {
    constructor(props) {
        super(props);
        // Store the movie information into state
        this.state = {_id: '', name: '', description: '', image: '', released: '', rating: ''};

        // Binding the function to the classes
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeDescription = this.handleChangeDescription.bind(this);
        this.handleChangeImage = this.handleChangeImage.bind(this);
        this.handleChangeReleased = this.handleChangeReleased.bind(this);
        this.handleChangeRating = this.handleChangeRating.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        // Get the movie data with the specific id and add them to state
        axios.get('/api/movies/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    name: response.data.name,
                    description: response.data.description,
                    image: response.data.image,
                    released: response.data.released,
                    rating: response.data.rating,
                });
            });
    }
    
    // Set the functions to handle the input values
    handleChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }

    handleChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }

    handleChangeImage(e) {
        this.setState({
            image: e.target.value
        });
    }

    handleChangeReleased(e) {
        this.setState({
            released: e.target.value
        });
    }

    handleChangeRating(e) {
        this.setState({
            rating: e.target.value
        });
    }

    // Function that handles the changed values 
    handleSubmit(event) {
        event.preventDefault();
        // Create an object with the movie values from form
        const obj = {
            _id: this.props.match.params.id,
            name: this.state.name,
            description: this.state.description,
            image: this.state.image,
            released: this.state.released,
            rating: this.state.rating
        };

        // Send a PUT request to the server with the updated values
        axios.put('/api/movies', obj)
            .then(res => this.props.history.push('/')) // if successful go to home
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        return (
            <div>
                <div className="columns">
                    <div className="column is-2"></div>
                    <div className="column is-8">
                        <div className="box">
                            <h2 className="title">Edit Movie</h2>
                            <hr />
                            {/* Call the handle submit function for posting the form */}
                            <form onSubmit={this.handleSubmit}>
                                {/* Set the values wih the set state for each input */}
                                <div className="field">
                                    <div className="control">
                                        <label><strong>Title</strong>
                                            <input className="input is-info is-rounded" type="text" name="name" value={this.state.name} onChange={this.handleChangeName} />
                                        </label>
                                    </div>
                                </div>
                                <div className="field">
                                    <div className="control">
                                        <label> <strong>Overview</strong>
                                            <textarea  className="textarea is-info is-rounded" type="text" name="description" value={this.state.description} onChange={this.handleChangeDescription}></textarea>
                                        </label>
                                    </div>
                                </div>
                                <div className="field">
                                    <div className="control">
                                        <label> <strong>Year released</strong>
                                            <input className="input is-info is-rounded" type="text" name="released" value={this.state.released} onChange={this.handleChangeReleased} />
                                        </label>
                                    </div>
                                </div>
                                <div className="field">
                                    <div className="control">
                                        <label> <strong>Rating</strong>
                                            <input className="input is-info is-rounded" type="text" name="rating" value={this.state.rating} onChange={this.handleChangeRating} />
                                        </label>
                                    </div>
                                </div>
                                <div className="field">
                                    <div className="control">
                                        <label> <strong>Image</strong>
                                            <input className="input is-info is-rounded" type="text" name="image" value={this.state.image} onChange={this.handleChangeImage} />
                                        </label>
                                    </div>
                                </div>
                                <hr />
                                {/* Cancel the edit or submit the changes */}
                                <Link to="/edit" className="button danger nav-link">Cancel</Link>
                                <input className="button info" type="submit" value="Submit" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default EditMovie;
