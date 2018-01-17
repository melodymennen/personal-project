import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { login } from '../ducks/reducer';
import { connect } from 'react-redux';
import Header from './Header';
import axios from 'axios';

class Home extends Component {
   
    componentDidMount() {
        axios.get('/user-data').then(response => {
            if(response.data){
                this.props.login(response.data)
            } else {
                this.props.history.push('/')
            }
        })
    }

    render () {
        return (
            <div>
                {!this.props.user && 
                    <div>
                        uh oh.. you must <Link to='/'>Log in</Link>
                    </div>
                }
                {this.props.user && 
                    <div>
                        <div>
                            <Header />
                        </div>
                        <div>
                            Home <br />
                            <Link to='/all'>view all recipes </Link>
                            <Link to='/categories'>view recipes by category </Link>
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