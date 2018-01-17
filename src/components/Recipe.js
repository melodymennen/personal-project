import React, { Component } from 'react';
import Header from '../components/Header';
import { login } from '../ducks/reducer';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

class Recipe extends Component {
    constructor(){
        super()

        this.state = {
            recipe: []
        }

        this.addToFavorites = this.addToFavorites.bind(this)
    }

    componentDidMount() {
        axios.get('/user-data').then(response => {
            if(response.data){
                this.props.login(response.data)
            } else {
                this.props.history.push('/')
            }
        })
        axios.get(`/api/recipes/${this.props.match.params.recipe_id}`).then(response => {
               this.setState({recipe: response.data})
            })
    }

    addToFavorites(){
        const body = {
            recipe: this.state.recipe[0]
        }

        axios.post('/api/favorites', body).then(() => {
            console.log('recipe added to favorites')
        })
    }

    deleteRecipe(recipe_id){
        axios.delete(`/api/recipes/${recipe_id}`).then(() => {
            this.props.history.push('/all-recipes') 
        })
    }

    render() {
        const recipe = this.state.recipe.map(item => {
            return (
                <div key={item.id}>
                    <h1>{item.name}</h1>
                    <button onClick={this.addToFavorites}>Add to Favorites</button>
                    <Link to={`/edit-recipe/${this.state.recipe[0].id}`}>Edit Recipe</Link>
                    <button onClick={() => this.deleteRecipe(this.state.recipe[0].id)}>Delete Recipe</button>
                    <p>{item.ingredients}</p>
                    <p>{item.directions}</p>
                    <p>{item.notes}</p>
                </div>
            )
        })

        return (
            <div>
                <div>
                    <Header />
                </div>
                <div>
                    Recipe
                    {recipe}
                </div>
            </div>
        )
    }
}

export default connect(null, {login})(Recipe);