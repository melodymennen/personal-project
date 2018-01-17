import React, { Component } from 'react';
import { login } from '../ducks/reducer';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from './Header';
import axios from 'axios';

class Favorites extends Component {
    constructor(){
        super()

        this.state = {
            favorites: []
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
        axios.get(`/api/favorites/${this.props.match.params.user_id}`).then(response => {
            this.setState({favorites: response.data})
        })
    }

    render () {
        console.log(this.state)
        const favorites = this.state.favorites.map(item => {
            return (
                <div>
                    <Link to={`/recipes/${item.recipe_id}`}><div>{item.name}</div></Link>
                </div>
            )
        })
        return (
            <div>
                <div>
                    <Header />
                </div>
                <div>
                    Favorites
                    {favorites}
                </div>
            </div>
        )
    }
}

export default connect(null, {login})(Favorites);