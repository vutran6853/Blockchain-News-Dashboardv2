import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getBitcoinData, getSevenDayInfo } from '../../ducks/bitcoinNewReducer';
import { getAllCoinData, getBitcoinImageData } from '../../ducks/allBitcoinListReducer';
import BitcoinMarketTableNav from './BitcoinMarketTableNav';
import { Switch } from 'antd'
import './bitcoinMarket.css';

class BitcoinMarket extends Component {
  constructor(props) {
    super(props);

    // INITIAL LOCAL STATE IF NEEDED
    this.state = {
      allBitcoinPrice: [],
      singleObjectArrayBitcoinInfo: [],
      sevenDayBitcoinData: [],
      allbitcoinImageArray: [],
      isHighPriceMap: [],
      id: "Turn Lights On",
      current: 1
    }
  }

  componentDidMount() {
    setInterval(() => {
      this.props.getBitcoinData()
      .then((response) => {
        this.setState({ allBitcoinPrice: response.value.data.DISPLAY })
      });
    }, 3000)
   
    this.props.getBitcoinImageData()
    .then((response) => {
      this.setState({ allbitcoinImageArray: response.value.data ? response.value.data.map((value) => {
        return value.bitcoin_imageurl
       }) : null })
    });
  }

  // GET PREVPRO AND PREVSTATE TO CHECK AND COMPARE DATA
  componentDidUpdate(prevProps, prevState) {
    if(prevProps != this.props && prevProps.bitcoinNew.bitcoinData.data) {
      let prevPropsData = prevProps.bitcoinNew.bitcoinData.data.RAW;
      let propsData = this.props.bitcoinNew.bitcoinData.data.RAW;
      let singlePricePrevProps = []
      let singlePricePropsData = []

      for(let key in prevPropsData) {
        singlePricePrevProps.push(prevPropsData[key].USD.PRICE)
        singlePricePropsData.push(propsData[key].USD.PRICE)
      }

      let test1 = []

      for(let i = 0; i < singlePricePrevProps.length; i++) {
        let currentDoctored = this.applyJitter(singlePricePropsData[i])
       if(currentDoctored > singlePricePrevProps[i]) {
         test1.push(true)
       } else if(currentDoctored === singlePricePrevProps[i]) {
         test1.push('')
       } else {
         test1.push(false)
       }
      }

      this.setState({isHighPriceMap: test1});
    } else {
      // console.log('FALSE')
    }
  }

  handlePriceChange = (num) => {
    let { isHighPriceMap } = this.state
    if(isHighPriceMap[num] === true) {
      return 'highPriceBox'
    } else if(isHighPriceMap[num] === false) {
      return 'lowPriceBox'
    }
    return ''
  }

  handleIronChange = (num) => {
    let { isHighPriceMap } = this.state
    if(isHighPriceMap[num] === true) {
      return 'arrow-up'
    } else if(isHighPriceMap[num] === false) {
      return 'arrow-down'
    }
    return ''
  }

  changeTheme = (value) => {
    this.setState({ id: value ? 'Turn_Lights_On' : 'Turn_Lights_off' })
  }

  handleClick = (e) => {
    this.setState({ current: e.key })
  }

  applyJitter = (float) => {
    let rand = Math.random();

    if(rand > .666) {
      return float + 0.1;
    } else if (rand < .333) {
      return float - 0.1;
    } else {
      return float;
    }
  }

  render() {
    let { allBitcoinPrice, allbitcoinImageArray } = this.state
    let singleObjectCoinInfo = []             // <- ALL SINGLE OBJECT ARRAY STORE

    for(let key in allBitcoinPrice) {
      singleObjectCoinInfo.push(allBitcoinPrice[key].USD)
    }

    let displayCyproList = singleObjectCoinInfo.map((value, index) => {
      return (
        <div className="cryptoMarketTable-item">
          <p>{ index }</p>
          <span>
            <img src={ allbitcoinImageArray[index] }></img>
            <p>{ value.FROMSYMBOL }</p>
          </span>
          <p>
            <span className={ 'priceBox' + this.handlePriceChange(index) }>{ value.PRICE }</span>
            <span className={ this.handleIronChange(index) }></span>
          </p>
          <p>{ value.HIGH24HOUR }</p>
          <p>{ value.LOWDAY }</p>
          <p>{ value.MKTCAP }</p>
          <p>
            <span className="changeprice24Box">{ value.CHANGEPCT24HOUR }%</span>
          </p>
        </div>
      )
    });

    return ( 
      <div id={ this.state.id }  className="container">
        <div className="cryptoMarketTable"
             id={ this.state.id } 
             onClick={ this.handleClick }   
             selectedkeys={ [this.state.current] }>
             <BitcoinMarketTableNav/>
             { displayCyproList }
        </div>
        <div className='switchToggleBackgroundColor'>
          <Switch checked={ this.state.id === 'Turn_Lights_On'}
                  onChange={ this.changeTheme }
                  checkedChildren="Turn Lights On"
                  unCheckedChildren="Turn Lights off">
          </Switch>
        </div>
      </div>
     );
  }
}

function mapStateToProps(state) {
  return state
}

export default connect(mapStateToProps, { getBitcoinData, getSevenDayInfo, getAllCoinData, getBitcoinImageData } )(BitcoinMarket);