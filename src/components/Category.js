import React, { Component } from 'react';
import { login } from '../ducks/reducer';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from './Header';
import axios from 'axios';

class Category extends Component {
    constructor(){
        super()

        this.state = {
            category: [],
            page: ''
        }
    }

    componentWillMount(){
        document.title='WTFSIMTE'
    }

    componentDidMount() {
        axios.get('/user-data').then(response => {
            if(response.data){
                this.props.login(response.data)
            } else {
                this.props.history.push('/')
            }
        })
        axios.get(`/api/categories/${this.props.match.params.category_id}`).then(response => {
            this.setState({category: response.data})
         })
    }

    render () {
        const category = this.state.category.map(item => {
            return (
                <div key={item.id}>
                    <Link to={`/recipes/${item.id}`}><div className="tile">{item.name}</div></Link>
                </div>
            )
        })
        return (
            <div>
                <div className="cat-page">
                    <div>
                        <Header page={this.state.page}/>
                    </div>
                    <div className="back">
                        <Link to="/all-categories">back to all categories</Link>
                    </div>
                    {this.state.category && 
                        <div className="tile-wrapper">
                            {category}
                        </div>
                    }
                    {this.state.category.length === 0 && 
                        <div className="no-favs">There are no recipes to display. Add a recipe to begin!</div>
                    }
                </div>
            </div>
        )
    }
}

export default connect(null, {login})(Category);