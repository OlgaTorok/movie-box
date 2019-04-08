import React from 'react';
import { Link } from 'react-router-dom';


// Component that represents a single movie box containing the edit and delete buttons
class Movies extends React.Component {

    render() {
        return (
            <div className="column is-12 is-mobile">
                <div className="box">
                    <div className="level">
                        <div className="level-item">
                            <figure className="image">
                                <img src={this.props.image} alt={this.props.name}></img>
                            </figure>
                        </div>
                        <div className="level">
                            <div className="content">
                                <p>
                                    <small className="button is-rounded is-info is-outlined is-medium">{this.props.rating}</small> &nbsp;  <strong className="title">{this.props.name}</strong>
                                    <br />
                                    <span><strong>Year released: </strong><small>{this.props.released}</small></span>
                                    <br />
                                    <span>{this.props.description}</span>
                                    <span>{this.props.description}</span>
                                </p>
                                {/* Edit button navigates to a new component via the BrowserRouter */}
                                <Link to={`/edit-movie/${this.props.id}`}><button type="button" className="button info">Edit</button></Link>
                                {/* Delete button invokes a function in the parent component */}
                                <button type="button" className="button danger" onClick={() => {this.props.handleDelete(this.props.id);}}>Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Movies;
