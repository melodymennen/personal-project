import React, { Component } from 'react';
import { login } from '../ducks/reducer';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from './Header';
import axios from 'axios';

class CategorySelect extends Component {
    constructor(){
        super()

        this.state = {
            categories: []
        }

    }

    componentDidMount() {
        axios.get('/user-data').then(response => {
            if(response.data){
                this.props.login(response.data)
            } else {
                this.props.history.push('/')
            }
        })
        axios.get('/api/categories').then(response => {
            this.setState({categories: response.data})
        })
    }

    render () {
        const categories = this.state.categories.map(item => {
            return (
                <div key={item.id}>
                    <Link to={`/categories/${item.id}`}><div>{item.category}</div></Link>
                </div>
            )
        })

        return (
            <div>
                <div>
                    <Header />
                </div>
                <div>
                    categories
                    {categories}
                </div>
            </div>
        )
    }
}

export default connect(null, {login})(CategorySelect);