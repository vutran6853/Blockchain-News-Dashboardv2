import axios from 'axios';

// Inital Value
let GET_BITCOININFO = 'GET_BITCOININFO';
let GET_HISTORYCOIN = 'GET_HISTORYCOIN';

// Initial State
let initialState = {
  chartsbitcoinData: [],
  historyCoinData: []
}

// Initial Action Creator For Payload
export function getChartsData() {
  return {
    type: GET_BITCOININFO,
    payload: axios.get('/api/bitcoin')
  }
}

export function getHistoryCoinData() {
  return {
    type: GET_HISTORYCOIN,
    payload: axios.get('https://apiv2.bitcoinaverage.com/indices/global/history/BTCUSD?period=alltime&?format=json')
  }
}

// Handle State Changes
export default function getChartsReducer(state = initialState, action) {
  switch(action.type) {
    case `${GET_BITCOININFO}_FULFILLED`:
    return {
      ...state,
      chartsbitcoinData: action.payload
    }
    case `${ GET_HISTORYCOIN }_FULFILLED`:
    return {
      ...state,
      historyCoinData: action.payload
    }
    default: 
    return state;
  }
}