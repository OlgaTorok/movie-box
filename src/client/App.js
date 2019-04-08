import React from 'react';
import { Route, NavLink, BrowserRouter } from 'react-router-dom';
import Home from './Home';
import CreateMovie from './CreateMovie';
import EditMovie from './EditMovie';
import MovieList from './MovieList';


// Main component containing the navigation routes
const App = () => {
    return(
        <div>
            <BrowserRouter>
                <nav>
                    <h1 className=" logo"><img src="images/logo.png" alt="Movies" /> MOVIE BOX</h1>
                    <ul className="header">
                        <li><NavLink exact to="/">Home</NavLink></li>
                        <li><NavLink exact to="/create">Add Movies</NavLink></li>
                        <li><NavLink exact to="/edit">Edit Movies</NavLink></li>
                    </ul>
                    <div className="content">
                        <Route exact path="/" component={Home} />
                        <Route path="/create" component={CreateMovie} />
                        <Route path="/edit" component={MovieList}/>
                        <Route path="/edit-movie/:id" component={EditMovie}/>
                    </div>
                </nav>
            </BrowserRouter>
        </div>
    );
};

export default App;