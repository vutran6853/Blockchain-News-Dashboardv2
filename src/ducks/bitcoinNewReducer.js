import axios from 'axios';

// Inital Value
const BITCOINDATA = 'BITCOINDATA';
const SEVENDAYINFO = 'SEVENDAYINFO';

// Initial State
const initialState = {
  bitcoinData: [],
  topTrendCoin: ['BTC','ZEC','DGD','LTC','DASH','DGB','ADA','ZEN','XMR','ETC','ETH', 'DOGE', 'BIX', 'XUC', 'BAT','BNB','BNT', 'BCH', 'BTS','CMT','DCN','ELF','EOS', 'FUN','GAS','GNT','GXS','HOT','NEO','NXT','OMG','OST','SNT','TRX','VET','XRP','XTZ','ZIL','ZRX', 'WOMEN', 'KMD','CNX','XVG','BCN','DCR','BCD','BTM','NXS','HSR','XZC','BTG','AID', 'MTL', 'GVT', 'CHAT', 'MTN', 'KNC', 'ZIP', 'DADI', 'ENG', 'HPB'],
  sevenDayBitcoinData: []
}

// Initial Action Creator For Payload
export function getBitcoinData() {
  let {topTrendCoin} = initialState
  return {
    type: BITCOINDATA,
    payload: axios.get(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${topTrendCoin}&tsyms=USD`)                
  }
}

export function getSevenDayInfo() {
  return {
    type: SEVENDAYINFO,
    payload: axios.get(`https://min-api.cryptocompare.com/data/histominute?fsym=BTC&tsym=GBP&limit=10`)        
                        
  }
}

// Handle State Changes
export default function bitcoinNewReducer(state = initialState, action) {
  switch(action.type) {
    case `${BITCOINDATA}_FULFILLED`:
    return {
      ...state,
      bitcoinData: action.payload,
    }
    case `${SEVENDAYINFO}_FULFILLED`:
     return {
      ...state,
      sevenDayBitcoinData: action.payload,
    }
    default: 
    return state;
  }
}
