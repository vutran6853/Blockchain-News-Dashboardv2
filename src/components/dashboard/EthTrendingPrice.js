import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import './dashboard.css';

class EthTrendingPrice extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isHighPrice: []
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps != this.props && prevProps.data.ETH) {
      let prevPropsData = prevProps.data.ETH;
      let propsData = this.props.data.ETH;
      let prevPropsDataValue = []
      let propsDataValue = []

      for(let key in prevPropsData) {
        prevPropsDataValue.push(prevPropsData[key])
        propsDataValue.push(propsData[key])
      }

      let finalResult = [];
      for(let i = 0; i < prevPropsDataValue.length; i++) {
        if(propsDataValue[i] > prevPropsDataValue[i] ) {
          finalResult.push(true)
        } else if (propsDataValue[i] === prevPropsDataValue[i]) {
          finalResult.push('')
        } else {
          finalResult.push(false)
        }
        this.setState({ isHighPrice: finalResult })
      }
    } else {
      // console.log('false')
    }
  }

  handlePriceChangeindex0(num) {
    let { isHighPrice } = this.state;

    for(let i = 0; i < isHighPrice.length; i++) {
      if(isHighPrice[i] === true) {
        return 'highPriceBox';
      } else if(isHighPrice[i] === false) {
        return 'lowPriceBox'
      } else {
        return ''
      }
     }

  }

  handlePriceChangeindex1(num) {
    let { isHighPrice } = this.state;

    for(let i = 1; i < isHighPrice.length; i++) {
      if(isHighPrice[i] === true) {
        return 'highPriceBox';
      } else if(isHighPrice[i] === false) {
        return 'lowPriceBox'
      } else {
        return ''
      }
    }
  }

  handlePriceChangeindex2(num) {
    let { isHighPrice } = this.state;

    for(let i = 2; i < isHighPrice.length; i++) {
      if(isHighPrice[i] === true) {
        return 'highPriceBox';
      } else if(isHighPrice[i] === false) {
        return 'lowPriceBox'
      } else {
        return ''
      }
    }
  }

  handleIronChange0(num) {
    let { isHighPrice } = this.state
    
    for(let i = 0; i < isHighPrice.length; i++) {
      if(isHighPrice[i] === true) {
        return 'arrow-up'
      } else if(isHighPrice[i] === false) {
        return 'arrow-down'
      } else {
        return ''
      }
    }
  }

  handleIronChange1(num) {
    let { isHighPrice } = this.state

    for(let i = 1; i < isHighPrice.length; i++) {
      if(isHighPrice[i] === true) {
        return 'arrow-up'
      } else if(isHighPrice[i] === false) {
        return 'arrow-down'
      } else {
        return ''
      }
    }
  }

  handleIronChange2(num) {
    let { isHighPrice } = this.state

    for(let i = 2; i < isHighPrice.length; i++) {
      if(isHighPrice[i] === true) {
        return 'arrow-up'
      } else if(isHighPrice[i] === false) {
        return 'arrow-down'
      } else {
        return ''
      }
    }
  }

  render() { 
    let trendingCryptoETH  = this.props.data;
    let singleObjectETH = trendingCryptoETH.ETH;
    let displayName = [];
    let displayETH = [];

    for(let key in singleObjectETH) {
      displayName.push(key)
      displayETH.push(singleObjectETH[key])
    }

    return ( 
      <div  className='displayTrendingCoinBox d-flex flex-column'>
        <div>
          <span className={ 'coinapi' + this.handlePriceChangeindex0(displayETH) } >{ displayName[0] } $ : { displayETH[0] }</span>
          <span className={ this.handleIronChange0(displayETH) } ></span>
        </div>

        <div>
        <span className={ 'coinapi' + this.handlePriceChangeindex1(displayETH) } >{ displayName[1] } € : { displayETH[1] }</span>
          <span className={ this.handleIronChange1(displayETH) } ></span>
        </div>

        <div>
          <span className={ 'coinapi' + this.handlePriceChangeindex2(displayETH) } >{ displayName[2] } ¥ : { displayETH[2] }</span>
          <span className={ this.handleIronChange2(displayETH) }></span>
        </div>
       
      </div>
     );
  }
}
 
export default EthTrendingPrice;