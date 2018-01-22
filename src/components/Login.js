import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../ducks/reducer';
import Auth0Lock from 'auth0-lock';
import axios from 'axios';

class Login extends Component {
    constructor(){
        super()

        this.lock = null
        this.login = this.login.bind(this)
    }

    componentWillMount() {
        var options = {
            allowAutocomplete: true,
            // theme: {
            //     logo: 'https://example.com/logo.png',
            //     primaryColor: '#31324F'
            //   }
          }
        this.lock = new Auth0Lock(process.env.REACT_APP_AUTH0_CLIENT_ID, process.env.REACT_APP_AUTH0_DOMAIN, options)
        this.lock.on('authenticated', authResult => {
            this.lock.getUserInfo(authResult.accessToken, (error, user) => {
                axios.post('/login', {userId: user.sub}).then(response => {
                    this.props.login(response.data.user)
                    this.props.history.push('/home')
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
                <div className="body">
                    <div className="splash">
                        <div className="logo"></div>
                        <div className="login button">
                            <button onClick={this.login}>Login/Register</button>
                        </div>
                        {/* <Link to="/home">I dont want to log in.</Link> */}
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(null, {login})(Login);