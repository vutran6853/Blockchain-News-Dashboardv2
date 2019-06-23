import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Bar } from 'react-chartjs-2';
import { getChartsData } from '../../ducks/chartsReducer';
import { getBitcoinData } from '../../ducks/bitcoinNewReducer';
import './charts.css';

class BitcoinVolume24 extends Component {
  constructor(props) {
    super(props);

    // LOCAL STATE IF NEEDED
    this.state = {
      bitcoinInfo: [],
      data1:  {
        labels: ['Ethereum (ETH)','Bitcoin Cash (BCH)','Ethereum Classic (ETC)', 'EOS (EOS)', 'Litecoin (LTC)','Dash (DASH)','Dogecoin (DOGE)','XRP (XRP)','NEO (NEO)','QTUM (QTUM)','ZCash (ZEC)','Stellar (XLM)','True Chain (TRUE)','BiboxCoin (BIX)','Bytom (BTM)','Monero (XMR)','Tronix (TRX)','Infinity Economics (XIN)','OmiseGo (OMG)','Waves (WAVES)'],
          datasets: [ 
            {
              data: [],
              backgroundColor: ['#FF6384','#36A2EB','#FFCE56', '#FFCE56', 'blue','#FF6384','#36A2EB','#FFCE56', '#FFCE56', 'blue','#FF6384','#36A2EB','#FFCE56', '#FFCE56', 'blue','#FF6384','#36A2EB','#FFCE56', '#FFCE56', 'blue'],
              hoverBackgroundColor: ['#FF6384','#36A2EB','#FFCE56', '#FFCE56', 'blue']
            }
          ]
      },
    }

  }

  // GET DATA FROM REDUX AND STORE TO LOCAL STATE
  componentDidMount() {
    this.props.getChartsData()
    .then((response) => this.setState({ bitcoinInfo:  response.value.data  }));
  } 

  render() { 
     let chartsData = this.props.chartsbitcoinData.data

     for(let key in chartsData) {
       this.state.data1.datasets[0].data.push(chartsData[key].bitcoin_volume24hourto)
     }
    
    return ( 
      <div className='container barchartBox'>
        <p className='h3'>BitCoin BY VOLUME IN LAST 24 (USD)</p>
        <Bar data={ this.state.data1 } width={ 10 } height={ 5 }/>
      </div>
     );
  }
}

// IMPORT Charts REDUCER SINCE WE HAVE MULT REDUCER SET-UP
const mapStateToProps = (state) => ({ ...state.charts, ...state.bitcoinNew })

export default connect(mapStateToProps, { getChartsData, getBitcoinData })  (BitcoinVolume24);
