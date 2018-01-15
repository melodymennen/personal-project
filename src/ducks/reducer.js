const initialState = { 
    user: null
}


const LOGIN = 'LOGIN';


function reducer (state = initialState, action){
    switch (action.type) {
        case LOGIN: 
            return {...state, user: action.payload};
        default:
            return state;
    }
}


export function login (user) {
    return {
        type: LOGIN,
        payload: user
    }
}

export default reducer; 