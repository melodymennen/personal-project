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
                    Home <br />
                    <Link to='/all'>view all recipes </Link>
                    <Link to='/categories'>view recipes by category </Link>
                </div>
            </div>
        )
    }
}

export default Home;