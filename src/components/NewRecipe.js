import React, { Component } from 'react';
import { connect } from 'react-redux';
import {updateName, updateCategory, updateIngredients, updateDirections, updateNotes} from '../ducks/reducer';

class NewRecipe extends Component {

    handleSubmit(){
        const body = {

        }
    }

    render () {
        return (
            <div>
                Recipe Name 
                <input placeholder='recipe name' onChange={e => updateName(e.target.value)}/>
                Category 
                <select onChange={e => updateCategory(e.target.value)}>
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
                <input placeholder='recipe ingredients' onChange={e => updateIngredients(e.target.value)}/>
                Directions 
                <input placeholder='recipe directions' onChange={e => updateDirections(e.target.value)}/>
                Notes 
                <input placeholder='notes' onChange={e => updateNotes(e.target.value)}/>
                <button onClick={() => handleSubmit()}>Save Recipe</button>
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