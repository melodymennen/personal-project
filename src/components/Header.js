import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header>
            <div><Link to="/home">site name</Link></div>
            <div><Link to="/new-recipe">new recipe</Link></div>
            <div><Link to="/favorites">favorites</Link></div>
        </header>
    )
}

export default Header;