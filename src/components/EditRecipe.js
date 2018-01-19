import React, { Component } from 'react';
import { login } from '../ducks/reducer';
import { connect } from 'react-redux';
import Header from './Header';
import axios from 'axios';

class EditRecipe extends Component {
    constructor(){
        super()

        this.state = {
            id: 0,
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

    componentDidMount() {
        axios.get('/user-data').then(response => {
            if(response.data){
                this.props.login(response.data)
            } else {
                this.props.history.push('/')
            }
        })
        axios.get(`/api/recipes/${this.props.match.params.recipe_id}`).then(response => {
            this.setState({
                id: response.data[0].id,
                name: response.data[0].name,
                category: response.data[0].category_id,
                ingredients: response.data[0].ingredients,
                directions: response.data[0].directions,
                notes: response.data[0].notes
            })
        })
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
            id: this.state.id,
            name: this.state.name,
            category: this.state.category,
            ingredients: this.state.ingredients, 
            directions: this.state.directions,
            notes: this.state.notes
        }

        axios.put(`/api/recipes/${this.props.match.params.recipe_id}`, body).then(() => {
            this.props.history.push(`/recipes/${this.state.id}`)            
        })
    }

    render () {
        return (
            <div>
                <div>
                    <Header />
                </div>
                <div className="input-wrapper">
                    Recipe Name 
                    <input placeholder='recipe name' className="name input" value={this.state.name} onChange={e => this.updateName(e.target.value)}/>
                    Category 
                    <select value={this.state.category} className="category dropdown" onChange={e => this.updateCategory(e.target.value)}>
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
                    <textarea placeholder='recipe ingredients' className="ingredients input big-input" value={this.state.ingredients} onChange={e => this.updateIngredients(e.target.value)}/>
                    Directions 
                    <textarea placeholder='recipe directions' className="directions input big-input" value={this.state.directions} onChange={e => this.updateDirections(e.target.value)}/>
                    Notes 
                    <textarea placeholder='notes' className="notes input big-input" value={this.state.notes} onChange={e => this.updateNotes(e.target.value)}/>
                    <button className="button" onClick={() => this.handleSubmit()}>Save Recipe</button>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    const { user } = state
    return {
        user
    }
}

export default connect(mapStateToProps, {login})(EditRecipe);