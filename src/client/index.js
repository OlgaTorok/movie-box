import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './app.css';

ReactDOM.render(
    <div>
        <App />
        {/* Add the footer to the dom */}
        <footer>
            <div className="has-text-centered">
                <hr />
                <img src="images/logo.png" alt="Movies" width="100" />
                <p> Movie Box by Olga Torok</p>
                <a href="https://github.com/OlgaTorok/MovieBox/">
                    <img src="images/git.png" alt="Movies" width="40" height="40" />
                </a>
            </div>
        </footer>
    </div>, document.getElementById('root'));
