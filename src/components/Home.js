import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { login } from '../ducks/reducer';
import { connect } from 'react-redux';
import Header from './Header';
import axios from 'axios';

class Home extends Component {
    constructor(){
        super()

        this.state = {
            recipeId: 0
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
        axios.get('/api/recipes/random').then(response => {
            this.setState({recipeId: response.data.id})
        })
    }

    render () {
        return (
            <div>
                {!this.props.user && 
                    <div className="uh-oh">
                        uh oh.. you must <Link to="/">Log in</Link>
                    </div>
                }
                {this.props.user && 
                    <div className="home">
                        <div>
                            <Header />
                        </div>
                        <div className="welcome">
                            Welcome, {this.props.user.name}!
                        </div>
                        <div className="tile-wrapper">
                            <Link to="/all-recipes"><div className="tile">view all recipes</div> </Link>
                            <Link to="/all-categories"><div className="tile">view recipes by category</div> </Link>
                            <Link to={`/recipes/${this.state.recipeId}`}><div className="tile">view random recipe</div> </Link>
                        </div>
                    </div>
                }
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

export default connect(mapStateToProps, {login})(Home);