import { React } from 'react';
import { Route, HashRouter } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import NewRecipe from './components/NewRecipe';
import CategorySelect from './components/CategorySelect';

// export default (
//     <HashRouter>
//         <div>
//             <Route exact path = '/' component={Login} />
//             <Route path = '/home' component={Home} />
//             <Route path = '/new-recipe' component={NewRecipe} />
//             <Route path = '/categories' component={CategorySelect} />
//         </div>
//     </HashRouter>
// );