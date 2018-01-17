import React from 'react';
import { Route, HashRouter } from 'react-router-dom';
import CategorySelect from './components/CategorySelect';
import AllRecipes from './components/AllRecipes';
import NewRecipe from './components/NewRecipe';
import Favorites from './components/Favorites';
import Category from './components/Category'
import Recipe from './components/Recipe';
import Login from './components/Login';
import Home from './components/Home';

export default (
    <HashRouter>
        <div>
            <Route exact path = '/(access_token.*)?' component={Login} />
            <Route path = '/home' component={Home} />
            <Route path = '/new-recipe' component={NewRecipe} />
            <Route path = '/all' component={AllRecipes} />
            <Route path = '/categories' component={CategorySelect} />
            <Route path = '/favorites' component={Favorites} />
            <Route path = '/recipes/:recipe_id' component={Recipe} />
            <Route path = '/categories/:category_id' component={Category} />
        </div>
    </HashRouter>
)