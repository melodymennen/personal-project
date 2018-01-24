import React, { Component } from 'react';
import { login } from '../ducks/reducer';
import { connect } from 'react-redux';
import FileUpload from './FileUpload';
import request from 'superagent';
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
            notes: '', 
            pictureUrl: ''
        }

        this.updateName = this.updateName.bind(this)
        this.updateCategory = this.updateCategory.bind(this)
        this.updateIngredients = this.updateIngredients.bind(this)
        this.updateDirections = this.updateDirections.bind(this)
        this.updateNotes = this.updateNotes.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.onDrop = this.onDrop.bind(this)
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
                notes: response.data[0].notes,
                pictureUrl: response.data[0].pictureUrl
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

    onDrop = (files) => {
        request
        .post('/upload')
        .attach('recipe_image', files[0])
        .end((error, response) => {
            if (error) console.log('on drop error',error)
            console.log('File Uploaded Succesfully')
            console.log(response.text)
            this.setState({ pictureUrl: response.text})
        })
    }

    handleSubmit(){
        const body = {
            id: this.state.id,
            name: this.state.name,
            category: this.state.category,
            ingredients: this.state.ingredients, 
            directions: this.state.directions,
            notes: this.state.notes,
            picture_url: this.state.pictureUrl
        }

        axios.put(`/api/recipes/${this.props.match.params.recipe_id}`, body).then(() => {
            this.props.history.push(`/recipes/${this.state.id}`)            
        })
    }

    render () {
        const array = this.state.ingredients.split('\n')
        console.log(array)
        return (
            <div>
                <div>
                    <Header page="Edit Recipe"/>
                </div>
                <div className="top">
                    <div className="input-wrapper">
                        <div className="left">
                            Recipe Name 
                            <input placeholder='recipe name' maxLength="55" className="name input" value={this.state.name} onChange={e => this.updateName(e.target.value)}/>
                            Ingredients 
                            <textarea placeholder='recipe ingredients' className="ingredients input big-input" value={this.state.ingredients} onChange={e => this.updateIngredients(e.target.value)}/>
                        </div>
                        <div className="right">
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
                            Directions 
                            <textarea placeholder='recipe directions' className="directions input big-input" value={this.state.directions} onChange={e => this.updateDirections(e.target.value)}/>
                        </div>
                    </div>
                    <div className="lower">
                        <div>
                            Notes 
                            <textarea placeholder='notes' className="notes input big-input" value={this.state.notes} onChange={e => this.updateNotes(e.target.value)}/>
                        </div>
                        <div>
                            <FileUpload onDrop={this.onDrop} className="dropzone" value={this.state.pictureUrl}/>
                            <button className="button" onClick={() => this.handleSubmit()}>Save Recipe</button>
                        </div>
                    </div>
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