const initialState = { 
    id: '', 
    name: '',
    category_id: 0, 
    ingredients: '',
    directions: '', 
    notes: '',
    favorites: false
}


const UPDATE_ID = 'UPDATE_ID';
const UPDATE_NAME = 'UPDATE_NAME';
const UPDATE_CATEGORY = 'UPDATE_CATEGORY';
const UPDATE_INGREDIENTS = 'UPDATE_INGREDIENTS';
const UPDATE_DIRECTIONS = 'UPDATE_DIRECTIONS';
const UPDATE_NOTES = 'UPDATE_NOTES';
const UPDATE_FAVORITES = 'UPDATE_FAVORITES';


function reducer (state = initialState, action){
    switch (action.type) {
        case UPDATE_ID: 
            return {...state, id: action.payload};
        case UPDATE_NAME: 
            return {...state, name: action.payload};
        case UPDATE_CATEGORY: 
            return {...state, category_id: action.payload};
        case UPDATE_INGREDIENTS: 
            return {...state, ingredients: action.payload};
        case UPDATE_DIRECTIONS: 
            return {...state, directions: action.payload};
        case UPDATE_NOTES: 
            return {...state, notes: action.payload};
        case UPDATE_FAVORITES: 
            return {...state, favorites: action.payload};
        default:
            return state;
    }
}


export function updateId (id) {
    return {
        type: UPDATE_ID,
        payload: id
    }
}

export function updateName (name) {
    return {
        type: UPDATE_NAME,
        payload: name
    }
}

export function updateCategory (category) {
    return {
        type: UPDATE_CATEGORY,
        payload: category
    }
}

export function updateIngredients (ingredients) {
    return {
        type: UPDATE_INGREDIENTS,
        payload: ingredients
    }
}

export function updateDirections (directions) {
    return {
        type: UPDATE_DIRECTIONS,
        payload: directions
    }
}

export function updateNotes (notes) {
    return {
        type: UPDATE_NOTES,
        payload: notes
    }
}

export function updateFavorites (favorites) {
    return {
        type: UPDATE_FAVORITES,
        payload: favorites
    }
}

export default reducer; 