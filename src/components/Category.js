import React, { Component } from 'react';
import { login } from '../ducks/reducer';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from './Header';
import axios from 'axios';

class Category extends Component {
    constructor(){
        super()

        this.state = {
            category: []
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
        axios.get(`/api/categories/${this.props.match.params.category_id}`).then(response => {
            this.setState({category: response.data})
         })
    }

    render () {
        console.log(this.state)
        const category = this.state.category.map(item => {
            return (
                <div>
                    <Link to={`/recipes/${item.id}`}><div>{item.name}</div></Link>
                </div>
            )
        })
        return (
            <div>
                <div>
                    <Header />
                </div>
                <div>
                    Category
                    {category}
                </div>
            </div>
        )
    }
}

export default connect(null, {login})(Category);