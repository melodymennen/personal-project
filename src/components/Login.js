import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import login from '../ducks/reducer';
import Auth0Lock from 'auth0-lock';
import axios from 'axios';

class Login extends Component {
    constructor(){
        super()

        this.lock = null
        this.login = this.login.bind(this)
    }

    componentWillMount() {
        this.lock = new Auth0Lock(process.env.REACT_APP_AUTH0_CLIENT_ID, process.env.REACT_APP_AUTH0_DOMAIN)
        this.lock.on('authenticated', authResult => {
            this.lock.getUserInfo(authResult.accessToken, (error, user) => {
                axios.post('/login', {userId: user.sub}).then(response => {
                    this.props.login(response.data.user)
                    this.props.history('/home')
                })
            })
        })
    }

    login(){
        this.lock.show()
    }

    render() {

        return (
            <div>
                <div>Site Name/Logo</div>
                <div><button onClick={this.login}>Login/Register</button></div>
                <Link to='/home'>I dont want to log in.</Link>
            </div>
        )
    }
}

const mapDispatchToProps = {
    login
}

export default connect(null, mapDispatchToProps)(Login);