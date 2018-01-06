import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header>
            <div><Link path to='/home'>site name</Link></div>
            <div><Link path to='/new-recipe'>new recipe</Link></div>
            <div>favorites</div>
        </header>
    )
}

export default Header;