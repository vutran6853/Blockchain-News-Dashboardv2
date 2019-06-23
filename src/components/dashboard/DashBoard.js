import React, { Component } from 'react';
import BtcTrendingPrice from './BtcTrendingPrice';
import EthTrendingPrice from './EthTrendingPrice';
// import ZecTrendingPrice from './ZecTrendingPrice';
// import { Col } from 'reactstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './dashboard.css';
import axios from 'axios';
import CryptoTrendingPrice from './CryptoTrendingPrice';

class DashBoard extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      currentTrendingBTCPrice: [],
      currentTrendingETHPrice: [],
      currentTrendingZECPrice: [],
      nameTrendingPrice: ['BTC', 'ETH', 'ZEC'],
      displayTrendingPrice: []
    }
  }

  componentDidMount() {
    setInterval(() => {
      axios.get('https://min-api.cryptocompare.com/data/histominute?fsym=ETH&tsym=GBP&limit=30')
      .then((response) => this.setState({ currentTrendingETHPrice: response.data.Data }))
      .catch((error) => console.log(`Fail to Fetch Data ${ error }`))  
    }, 1000)

    ////////////////////////////////////////////////////////////////////////////////////////////////////

    setInterval(() => {
      axios.get('https://min-api.cryptocompare.com/data/histominute?fsym=BTC&tsym=GBP&limit=30')
      .then((response) => this.setState({ currentTrendingBTCPrice: response.data.Data }))
      .catch((error) => console.log(`Fail to Fetch Data ${ error }`))
    }, 1000)

    ////////////////////////////////////////////////////////////////////////////////////////////////////
    
    setInterval(() => {
      axios.get(`https://min-api.cryptocompare.com/data/pricemulti?fsyms=${ this.state.nameTrendingPrice }&tsyms=USD,EUR,JPY`)
      .then((response) => this.setState({ displayTrendingPrice: response.data }))
      .catch((error) => console.log('Fail to Fetch Data', error))
    }, 6000)
  }
  
  render() {
    let { currentTrendingBTCPrice, currentTrendingETHPrice, displayTrendingPrice, nameTrendingPrice } = this.state;
     return (
        <div className="dashboard-container">
            <div className="">
              {/* <Col xs='8'> */}
                <CryptoTrendingPrice priceData={ currentTrendingBTCPrice } name={ nameTrendingPrice[0] }/>
              {/* </Col> */}
              {/* <Col xs='4'> */}
                <BtcTrendingPrice data={ displayTrendingPrice }/>
              {/* </Col> */}
            </div>
            
            <div className="">
              {/* <Col xs='8'> */}
                <CryptoTrendingPrice priceData={ currentTrendingETHPrice } name={ nameTrendingPrice[1] }/>
              {/* </Col> */}
              {/* <Col xs='4'> */}
                <EthTrendingPrice data={ displayTrendingPrice }/>
              {/* </Col> */}
            </div>

            <div className="missionSectionBox">
              <p className="display-6 p-5">Our Mission</p>
              <p>Our vision is to make one central app to manage all your business solutions on one platform</p>
            </div>
            
            {/* <DashBoardNews/> */}
        </div>
     );
  }
}
 
export default DashBoard;

