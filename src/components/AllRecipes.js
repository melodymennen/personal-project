import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import axios from 'axios';

class AllRecipes extends Component {

    componentWillMount() {
        axios.get('/api/recipes', {user: this.props.user}).then(user => {
            console.log(this.props.user)
            // const recipes = response.data
        })
    }

    render () {
        
        return (
            <div>
                <div>
                    <Header />
                </div>
                <div>
                    AllRecipes
                    {/* {recipes} */}
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

export default connect(mapStateToProps)(AllRecipes);