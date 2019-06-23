import axios from 'axios';

// Inital Value
const MASTERCOINLIST = 'MASTERCOINLIST';
const BITCOINIMAGE = 'BITCOINIMAGE';

// Initial State
const initialState = {
  allCoinList: [],
  favCoinId: [],
  bitcoinImage: []
}

// Initial Action Creator For Payload
export function getAllCoinData() {
  return {
    type: MASTERCOINLIST,
    payload: axios.get('/api/allbitcoinlist')
  }
}

export function getBitcoinImageData() {
  return {
    type: BITCOINIMAGE,
    payload: axios.get('/api/bitcoinImage')
  }
}

// Handle State Changes
export default function allBitcoinListReducer(state = initialState, action) {
  switch(action.type) {
    case `${MASTERCOINLIST}_FULFILLED`:
    return {
      ...state,
      allCoinList: action.payload
    }
    case `${BITCOINIMAGE}_FULFILLED`:
    return{
      ...state,
      bitcoinImage: action.payload
    }
    default: 
    return state;
  }
}