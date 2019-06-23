import React, { Component } from 'react'
import { connect } from 'react-redux';
import { HorizontalBar } from 'react-chartjs-2';
import { getBitcoinData } from '../../ducks/bitcoinNewReducer';
import './charts.css'

let lodash = require('lodash');

class TopCoinChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bitcoinInfo2: [],
      data5: [],
      label5: [], 
      data2: {
        labels: [],
          datasets: [ 
            {
              data: [],
              backgroundColor: ['green','Yellow','blue', 'red', 'lightblue','lightgreen', 'pink','Yellow','blue', 'red', 'blue'],
              hoverBackgroundColor: ['green','Yellow','blue', 'red', 'lightblue','lightgreen', 'pink','Yellow','blue', 'red', 'blue']
            }
          ]
      }
     }

    this.bitcoinPrice2Bar = this.bitcoinPrice2Bar.bind(this)
  }

  componentDidMount() {
    this.props.getBitcoinData()
    .then((response) => this.setState({ bitcoinInfo2: response.value.data }));
  } 

  //  FUNCTION FOR BAR GRAPH INFO .../// 
  bitcoinPrice2Bar() {
    let { bitcoinInfo2, data5, label5 } = this.state;
    let { data } = this.state.data2.datasets[0];
    let { labels } = this.state.data2
    let displayLayerBitcoinInfo = bitcoinInfo2.RAW;
    let matchData = {};  
    let top11Coin = []; // <- STORE ONLY 11 COIN 

    ////// THIS SECTION OF CODE WILL CREATE NEW OJBECT WITH DATA,LABELS    //////
    let lodashMap = lodash.map(displayLayerBitcoinInfo)

    lodashMap.forEach((element, index) => {
      data5.push(element.USD.PRICE)
      label5.push(element.USD.FROMSYMBOL)
      label5.forEach((key, index) => {    // <= CREATE NEW OJBECT WITH DATA, LABELS
        matchData[key] = data5[index]
      });
    });

    //// THIS SECTION OF CODE WILL FIND ONLY TOP 10 COIN FROM LIST IS >= 10  ////
    let miniArray = Object.entries(matchData)   // <= COVENT OBJECT TO NEW ARRAY WITH KEY AND VALUE

    miniArray.map((value, index) => {
      if(value[1] >= 10) {
        top11Coin.push(value)
      }
    });
    
    top11Coin.map((value, index) => {
      data.push(value[1])
      labels.push(value[0])
    });
  }

  render() {
    this.bitcoinPrice2Bar()   // <- INVOKE FUNCTION

    return ( 
      <div className='container horizontalBarBox'>
        <p className='h3'>Top 10 Coin BY PRICE (USD)</p>
        <HorizontalBar data={ this.state.data2 } width={ 10 } height={ 5 }/>
      </div>
     );
  }
}
 
// IMPORT Charts REDUCER SINCE WE HAVE MULT REDUCER SET-UP
const mapStateToProps = (state) => ({ ...state.bitcoinNew })

export default connect(mapStateToProps, { getBitcoinData }) (TopCoinChart);