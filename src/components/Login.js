import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
    return (
        <header>
            <div>Site Name/Logo</div>
            <div><Link path to='/home'>Login/Register</Link></div>
        </header>
    )
}

export default Login;