import React, { Component } from 'react';
import BtcTrendingPrice from './BtcTrendingPrice';
import EthTrendingPrice from './EthTrendingPrice';
import TrendingPriceChart from './TrendingPriceChart';
import DashBoardNews from './DashBoardNews';

// import 'bootstrap/dist/css/bootstrap.min.css';
import './dashboard.css';
import axios from 'axios';

class DashBoard extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      currentTrendingBTCPrice: [],
      currentTrendingETHPrice: [],
      currentTrendingZECPrice: [],
      nameTrendingPrice: ['BTC', 'ETH', 'ZEC'],
      displayTrendingPrice: [],
      cryptoNews: []
    }
  }

  componentDidMount() {
    this.initDataRequest()

    axios.get('https://min-api.cryptocompare.com/data/v2/news/?lang=EN')
    .then((response) => this.setState({ cryptoNews: response.data.Data.splice(0, 9) }))
    .catch((error) => console.log(`Unable to fetch Data at Dashboard. ${ error }`))
  }

  initDataRequest = () => {
    setInterval(() => {
      axios.get('https://min-api.cryptocompare.com/data/histominute?fsym=ETH&tsym=GBP&limit=30')
      .then((response) => this.setState({ currentTrendingETHPrice: response.data.Data }))
      .catch((error) => console.log(`Unable to fetch Data at Dashboard. ${ error }`))  
    }, 2000)

    ////////////////////////////////////////////////////////////////////////////////////////////////////

    setInterval(() => {
      axios.get('https://min-api.cryptocompare.com/data/histominute?fsym=BTC&tsym=GBP&limit=30')
      .then((response) => this.setState({ currentTrendingBTCPrice: response.data.Data }))
      .catch((error) => console.log(`Unable to fetch Data at Dashboard. ${ error }`))
    }, 2000)

    ////////////////////////////////////////////////////////////////////////////////////////////////////
    
    setInterval(() => {
      axios.get(`https://min-api.cryptocompare.com/data/pricemulti?fsyms=${ this.state.nameTrendingPrice }&tsyms=USD,EUR,JPY`)
      .then((response) => this.setState({ displayTrendingPrice: response.data }))
      .catch((error) => console.log(`Unable to fetch Data at Dashboard. ${ error }`))
    }, 6000)
  }
  
  render() {
    let { currentTrendingBTCPrice, currentTrendingETHPrice, displayTrendingPrice, nameTrendingPrice } = this.state;
    
    return (
      <div className="dashboard-container">
        <TrendingPriceChart priceData={ currentTrendingBTCPrice } name={ nameTrendingPrice[0] }/>

        <BtcTrendingPrice data={ displayTrendingPrice }/>

        <TrendingPriceChart priceData={ currentTrendingETHPrice } name={ nameTrendingPrice[1] }/>

        <EthTrendingPrice data={ displayTrendingPrice }/>

        <div className="dashboard-item-banner">
          <h3>Our Mission</h3>
          <p>Our vision is to make one central app to manage all your business solutions on one platform</p>
          <p>CryptoZone is the perfect place to learn about Crypto currencies and start to understand some of the fundamental concepts behind the blockchain.</p>
        </div>

        <div className="dashboard-item-news">
          <DashBoardNews news={ this.state.cryptoNews }/>
        </div>
      </div>
    );
  }
}
 
export default DashBoard;

