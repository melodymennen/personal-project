import React, { Component } from 'react';
import Header from './Header';

class NewRecipe extends Component {
    constructor(){
        super()

        this.state = {

        }

        this.updateName = this.updateName.bind(this)
        this.updateCategory = this.updateCategory.bind(this)
        this.updateIngredients = this.updateIngredients.bind(this)
        this.updateDirections = this.updateDirections.bind(this)
        this.updateNotes = this.updateNotes.bind(this)
    }

    updateName(){}

    updateCategory(){}

    updateIngredients(){}

    updateDirections(){}

    updateNotes(){}

    // handleSubmit(){
    //     const body = {

    //     }
    // }

    render () {
        return (
            <div>
                <div>
                    <Header />
                </div>
                <div>
                    Recipe Name 
                    <input placeholder='recipe name' onChange={e => this.updateName(e.target.value)}/>
                    Category 
                    <select onChange={e => this.updateCategory(e.target.value)}>
                        <option>select</option>
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
                    <input placeholder='recipe ingredients' onChange={e => this.updateIngredients(e.target.value)}/>
                    Directions 
                    <input placeholder='recipe directions' onChange={e => this.updateDirections(e.target.value)}/>
                    Notes 
                    <input placeholder='notes' onChange={e => this.updateNotes(e.target.value)}/>
                    <button onClick={() => this.handleSubmit()}>Save Recipe</button>
                </div>
            </div>
        )
    }
}


export default NewRecipe;