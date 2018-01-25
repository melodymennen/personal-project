import React, { Component } from 'react';
import { login } from '../ducks/reducer';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from './Header';
import axios from 'axios';

class AllRecipes extends Component {
    constructor(){
        super()

        this.state = {
            recipes: []
        }
    }

    componentWillMount(){
        document.title='WTFSIMTE - All Recipes'
    }

    componentDidMount() {
        axios.get('/user-data').then(response => {
            if(response.data){
                this.props.login(response.data)
            } else {
                this.props.history.push('/')
            }
        })
        axios.get('/api/recipes').then(response => {
               this.setState({recipes: response.data})
            })
    }

    render () {
        const recipes = this.state.recipes.map((item) => {
            return (
                <div key={item.id}>
                    <Link to={`/recipes/${item.id}`}><div className="tile">{item.name}</div></Link>
                </div>
            )
        })

        return (
            <div>
                <div className="page">
                    <div>
                        <Header page="All Recipes"/>
                    </div>
                    <div className="back">
                        <Link to="/home">back to home</Link>
                    </div>
                    <div className="tile-wrapper">
                        {recipes}
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

export default connect(mapStateToProps, {login})(AllRecipes);