const initialState = { 
    user: null
}


const UPDATE_ID = 'UPDATE_ID';


function reducer (state = initialState, action){
    switch (action.type) {
        case UPDATE_ID: 
            return {...state, id: action.payload};
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

export default reducer; 