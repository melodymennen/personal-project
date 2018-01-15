import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';

class Home extends Component {

    render () {
        return (
            <div>
                <div>
                    <Header />
                </div>
                <div>
                    Home
                    <Link to='/all'>view all recipes </Link>
                    <Link to='/categories'>view by categories </Link>
                    find new recipes
                </div>
            </div>
        )
    }
}

export default Home;