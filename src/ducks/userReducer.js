import axios from 'axios';

// Inital Value
let GET_USER = 'GET_USER';

// Initial State
let initialState = {
  userData: []
}

// Initial Action Creator For Payload
export function getUserData() {
  return {
    type: GET_USER,
    payload: axios.get('/api/user')
  }
}

// Handle State Changes
export default function getUserReducer(state = initialState, action) {
  switch(action.type) {
    case `${GET_USER}_FULFILLED`:
    return {
      ...state,
      userData: action.payload.data
    }
    default: 
    return state;
  }
}