import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const App = ({ children }) =>
    <div>
        <h1><% appName %></h1>
        { children }
        <footer>
            <Link to="/"><% appName %></Link>
        </footer>
    </div>;

App.propTypes = {
    children: PropTypes.object
};

export default App;
