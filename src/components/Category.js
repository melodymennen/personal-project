import React, { Component } from 'react';
import { login } from '../ducks/reducer';
import { connect } from 'react-redux';
import Header from './Header';
import axios from 'axios';

class Category extends Component {

    componentDidMount() {
        axios.get('/user-data').then(response => {
            if(response.data){
                this.props.login(response.data)
            } else {
                this.props.history.push('/')
            }
        })
    }

    render () {
        return (
            <div>
                <div>
                    <Header />
                </div>
                <div>
                    Category
                </div>
            </div>
        )
    }
}

export default connect(null, {login})(Category);