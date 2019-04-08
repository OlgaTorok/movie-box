import React, { Component } from 'react';
import axios from 'axios';

// Component representing the form that adds new movies
class CreateMovie extends Component {
    constructor(props) {
        super(props);
        // Store the form fields in state
        this.state = {name: '', description: '', image: '', released: '', rating: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        
        this.setState({[name]: value});
    }

    handleSubmit(event) {
        event.preventDefault();
        // Send a post request with the state to the server 
        axios.post('/api/movies', this.state)
            // If the movie was added sucessfully go to home
            .then(res => this.props.history.push('/')) // if successful go to home
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        return (
            <div className="columns">
                <div className="column is-2"></div>
                <div className="column is-8">
                    <div className="box">
                        {/* Call the handle submit function for posting the form */}
                        <form onSubmit={this.handleSubmit}>
                            <h2 className="title">Add Movie</h2>
                            <hr />
                            {/* Call the state for all form inputs */}
                            <div className="field">
                                <div className="control">
                                    <label> <strong>Title</strong>
                                        <input className="input is-info is-rounded" type="text" name="name" value={this.state.name} onChange={this.handleChange} />
                                    </label>
                                </div>
                            </div>
                            <div className="field">
                                <div className="control">
                                    <label> <strong>Overview</strong>
                                        <textarea  className="textarea is-info is-rounded" type="text" name="description" value={this.state.description} onChange={this.handleChange}></textarea>
                                    </label>
                                </div>
                            </div>
                            <div className="field">
                                <div className="control">
                                    <label> <strong>Year released</strong>
                                        <input className="input is-info is-rounded" type="number" name="released" value={this.state.released} onChange={this.handleChange} />
                                    </label>
                                </div>
                            </div>
                            <div className="field">
                                <div className="control">
                                    <label> <strong>Rating</strong>
                                        <input className="input is-info is-rounded" type="text" name="rating" value={this.state.rating} onChange={this.handleChange} />
                                    </label>
                                </div>
                            </div>
                            <div className="field">
                                <div className="control">
                                    <label> <strong>Image</strong>
                                        <input className="input is-info is-rounded" type="text" name="image" value={this.state.image} onChange={this.handleChange} />
                                    </label>
                                </div>
                            </div>
                            <hr />
                            <input className="button info" type="submit" value="Submit" />
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default CreateMovie;
