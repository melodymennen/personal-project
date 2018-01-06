import React, { Component } from 'react';
import { connect } from 'react-redux';
import {updateName, updateCategory, updateIngredients, updateDirections, updateNotes} from '../ducks/reducer';

class NewRecipe extends Component {

    render () {
        return (
            <div>
                Recipe Name 
                <input placeholder='recipe name' onChange={e => updateName(e.target.value)}/>
                Category 
                <select onChange={e => updateCategory(e.target.value)}>
                    <option>select</option>
                    <option>appetizers</option>
                    <option>main</option>
                    <option>dessert</option>
                    <option>etc</option>
                </select>
                Ingredients 
                <input placeholder='recipe ingredients' onChange={e => updateIngredients(e.target.value)}/>
                Directions 
                <input placeholder='recipe directions' onChange={e => updateDirections(e.target.value)}/>
                Notes 
                <input placeholder='notes' onChange={e => updateNotes(e.target.value)}/>
            </div>
        )
    }
}

function mapStateToProps(state){
    const {name, category_id, ingredients, directions, notes} = state;
    return {
        name, category_id, ingredients, directions, notes
    }
}

export default connect(mapStateToProps, {updateName, updateCategory, updateIngredients, updateDirections, updateNotes})(NewRecipe);