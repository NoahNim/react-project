import { csrfFetch } from './csrf';

//initial state
const initialState = { user: null }

//action types
const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';

//action creators
const setUser = user => ({
    type: SET_USER,
    payload: user
})
export const removeUser = () => {
    return {
        type: REMOVE_USER,
    }
}

//thunks
export const loginUser = (user) => async dispatch => {
    const { credential, password } = user;
    const res = await csrfFetch('/api/session ', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({credential, password})
    });
    const data = await res.json();
    dispatch(setUser(data.user));
    return res;
}

const sessionReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case SET_USER:
            newState = Object.assign({}, state);
            newState.user = action.payload
            return newState
        case REMOVE_USER:
            newState = Object.assign({}, state);
            newState.user = null;
            return newState;
        default:
            return state;
    }
}

export default sessionReducer;

