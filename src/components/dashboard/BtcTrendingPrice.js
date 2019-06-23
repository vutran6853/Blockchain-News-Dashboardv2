import React, { Component } from 'react';
import './dashboard.css'

class BtcTrendingPrice extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isHighPrice: []
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps != this.props && prevProps.data.BTC) {
      let prevPropsData = prevProps.data.BTC;
      let propsData = this.props.data.BTC;
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
    let { isHighPrice } = this.state

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
    let { isHighPrice } = this.state

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
    let { isHighPrice } = this.state

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
    let trendingCryptoBTC  = this.props.data;
    let singleObjectBTC = trendingCryptoBTC.BTC;
    let displayName = [];
    let displayBTC = [];

    for(let key in singleObjectBTC) {
      displayName.push(key)
      displayBTC.push(singleObjectBTC[key])
    }

    return ( 
      <div className='displayTrendingCoinBox d-flex flex-column'>
        <div>
          <span className={ 'coinapi' + this.handlePriceChangeindex0(displayBTC) } >{ displayName[0] } $ : { displayBTC[0] }</span>
          <span className={ this.handleIronChange0(displayBTC) } ></span>
        </div>

        <div>
          <span className={ 'coinapi' + this.handlePriceChangeindex1(displayBTC) } >{displayName[1]} € : { displayBTC[1] }</span>
          <span className={ this.handleIronChange1(displayBTC) } ></span>
        </div>

        <div>
          <span className={ 'coinapi' + this.handlePriceChangeindex2(displayBTC) }>{ displayName[2] } ¥ : { displayBTC[2] }</span>
          <span className={ this.handleIronChange2(displayBTC) }></span>
        </div>
      </div>
     );
  }
}
 
export default BtcTrendingPrice;