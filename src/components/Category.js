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
        const category = this.state.category.map(item => {
            return (
                <div key={item.id}>
                    <Link to={`/recipes/${item.id}`}><div className="tile">{item.name}</div></Link>
                </div>
            )
        })
        return (
            <div>
                <div>
                    <Header />
                </div>
                <div className="tile-wrapper">
                    {category}
                </div>
            </div>
        )
    }
}

export default connect(null, {login})(Category);