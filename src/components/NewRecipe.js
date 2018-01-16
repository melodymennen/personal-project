import React, { Component } from 'react';
import Header from './Header';
import axios from 'axios';

class NewRecipe extends Component {
    constructor(){
        super()

        this.state = {
            name: '',
            category: 0, 
            ingredients: '',
            directions: '',
            notes: ''
        }

        this.updateName = this.updateName.bind(this)
        this.updateCategory = this.updateCategory.bind(this)
        this.updateIngredients = this.updateIngredients.bind(this)
        this.updateDirections = this.updateDirections.bind(this)
        this.updateNotes = this.updateNotes.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    updateName(value){
        this.setState({name: value})
    }

    updateCategory(value){
        this.setState({category: value})
    }

    updateIngredients(value){
        this.setState({ingredients: value})
    }

    updateDirections(value){
        this.setState({directions: value})
    }

    updateNotes(value){
        this.setState({notes: value})
    }

    handleSubmit(){
        const body = {
            name: this.state.name,
            category: this.state.category,
            ingredients: this.state.ingredients, 
            directions: this.state.directions,
            notes: this.state.notes
        }

        if(this.state.category === 0){
            alert('please select a category')
        } else {
            axios.post('/api/recipes', body).then(() => {
                this.setState({
                    name: '',
                    category: 0, 
                    ingredients: '',
                    directions: '',
                    notes: ''
                })
            })
        }
    }

    render () {
        return (
            <div>
                <div>
                    <Header />
                </div>
                <div>
                    Recipe Name 
                    <input placeholder='recipe name' value={this.state.name} onChange={e => this.updateName(e.target.value)}/>
                    Category 
                    <select value={this.state.category} onChange={e => this.updateCategory(e.target.value)}>
                        <option value="0">select</option>
                        <option value='1'>appetizers</option>
                        <option value='2'>beverages</option>
                        <option value='3'>breads</option>
                        <option value='4'>breakfast</option>
                        <option value='5'>desserts</option>
                        <option value='6'>lunch</option>
                        <option value='7'>main dishes</option>
                        <option value='8'>side dishes</option>
                        <option value='9'>soups/salads</option>
                    </select>
                    Ingredients 
                    <input placeholder='recipe ingredients' value={this.state.ingredients} onChange={e => this.updateIngredients(e.target.value)}/>
                    Directions 
                    <input placeholder='recipe directions' value={this.state.directions} onChange={e => this.updateDirections(e.target.value)}/>
                    Notes 
                    <input placeholder='notes' value={this.state.notes} onChange={e => this.updateNotes(e.target.value)}/>
                    <button onClick={() => this.handleSubmit()}>Save Recipe</button>
                </div>
            </div>
        )
    }
}


export default NewRecipe;