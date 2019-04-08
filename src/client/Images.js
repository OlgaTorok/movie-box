import React, { Component } from 'react';


// Component representing a single movies card containing a toggle function
class Images extends Component {

    constructor(props) {
        super(props);

        // Set the state for toggle 
        this.state = {
            show : false
        };

        // Bind the toggle function to the class
        this.toggleShow = this.toggleShow.bind(this);
    }

    // Add the function with set state for show/hide button
    toggleShow() {
        this.setState({
            show: !this.state.show
        });
    }

    render() {
        return (
            <div className="column is-4">
                <div className="box">
                    <div className="media">
                        {/* Add toggle to the image */}
                        <div className="padd" onClick={this.toggleShow}><img src={this.props.image} alt={this.props.name}></img></div>
                        <div className="media-content">
                            {/* Toggle the movie info when image is clcked */}
                            { this.state.show && <p onClick={this.toggleShow}>
                                <br/>
                                <strong className="title is-4">{this.props.name}</strong><br/>
                                <span><strong>Rating:</strong> {this.props.rating}</span>
                                <br />
                                <span><strong>Year released:</strong> {this.props.released}</span>
                                <br/>
                                {this.props.description}
                                <br />
                            </p>
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Images;
