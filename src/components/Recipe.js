import React, { Component } from 'react';
import MdEdit from 'react-icons/lib/md/edit';
import MdDelete from 'react-icons/lib/md/delete';
import Heart from 'react-icons/lib/ti/heart-full-outline';
import TiMail from 'react-icons/lib/md/email';
import Header from '../components/Header';
import { login } from '../ducks/reducer';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

class Recipe extends Component {
    constructor(){
        super()

        this.state = {
            recipe: [],
            number: 0
        }

        this.addToFavorites = this.addToFavorites.bind(this)
        this.deleteRecipe = this.deleteRecipe.bind(this)
        this.sendText = this.sendText.bind(this)
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

    sendText(){
        var num = prompt('Please enter your phone number')
        if(num % 1 ===0 && num.length === 10) {
            this.setState({number: num})
        } else {
            alert('You did not enter a valid number')
        }
        // axios.post('/api/send-ingredients', {
        //     ingredients: this.state.recipe[0].ingredients,
        //     number: '+1' + this.state.number
        // }).then(res => res.status(200).json('success'))
    }

    render() {
        const recipe = this.state.recipe.map(item => {
            const array = item.ingredients.split('\n')
            const ingredients = array.map(ingredient => {
                return (
                    <li>{ingredient}</li>
                )
            })
            return (
                <div key={item.id}>
                    <div className="recipe-name">{item.name}</div>
                    <div className="icon-wrapper">
                        <div className="icons" onClick={this.addToFavorites}><Heart/></div>
                        <Link to={`/edit-recipe/${this.state.recipe[0].id}`} className="icons"><MdEdit/></Link>
                        <div className="icons"onClick={() => this.deleteRecipe(this.state.recipe[0].id)}><MdDelete/></div>
                        <div className="mail icons" onClick={this.sendText}><TiMail/></div>
                    </div>
                    <ul className="ingredients">{ingredients}</ul>
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
                <div className="back">
                    <Link to="/all-recipes">back to all recipes</Link>
                </div>
                <div className="recipe">
                    {recipe}
                </div>
            </div>
        )
    }
}

export default connect(null, {login})(Recipe);