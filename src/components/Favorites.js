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
        const favorites = this.state.favorites.map(item => {
            return (
                <div key={item.id}>
                    <Link to={`/recipes/${item.recipe_id}`}><div className="tile">{item.name}</div></Link>
                </div>
            )
        })
        return (
            <div>
                <div className="fav-page">
                    <div>
                        <Header page="Favorites"/>
                    </div>
                    <div className="back">
                        <Link to="/home">back to home</Link>
                    </div>
                    <div className="tile-wrapper">
                        {favorites}
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(null, {login})(Favorites);