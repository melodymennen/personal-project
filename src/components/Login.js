import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
    return (
        <div>
            <div>Site Name/Logo</div>
            <div><Link path to='/home'>Login/Register</Link></div>
        </div>
    )
}

export default Login;