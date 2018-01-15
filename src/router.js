import React from 'react';
import { Route, HashRouter } from 'react-router-dom';
import CategorySelect from './components/CategorySelect';
import AllRecipes from './components/AllRecipes';
import NewRecipe from './components/NewRecipe';
import Favorites from './components/Favorites';
import Login from './components/Login';
import Home from './components/Home';

export default (
    <HashRouter>
        <div>
            <Route exact path = '/' component={Login} />
            <Route path = '/home' component={Home} />
            <Route path = '/new-recipe' component={NewRecipe} />
            <Route path = '/all' component={AllRecipes} />
            <Route path = '/categories' component={CategorySelect} />
            <Route path = '/favorites' component={Favorites} />
        </div>
    </HashRouter>
)