import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Auth0Lock from 'auth0-lock';

class Login extends Component {
    render() {

        return (
            <div>
                <div>Site Name/Logo</div>
                <div><Link path to='/home'>Login/Register</Link></div>
            </div>
        )
    }
}

export default Login;