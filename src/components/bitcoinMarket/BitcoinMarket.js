import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getBitcoinData, getSevenDayInfo } from '../../ducks/bitcoinNewReducer';
import { getAllCoinData, getBitcoinImageData } from '../../ducks/allBitcoinListReducer';
import { Table } from 'reactstrap';
import BitcoinMarketTableNav from './BitcoinMarketTableNav';
import { Switch } from 'antd'
import Navbar from '../navbar/Navbar';
import './bitcoinMarket.css';

let lodash = require('lodash');

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
      id: 'Turn Lights On',
      current: 1
    }
    this.changeTheme = this.changeTheme.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
   this.timerID = setInterval( () => 
      this.props.getBitcoinData()
      .then((response) => {
        this.setState({ allBitcoinPrice: response.value.data.DISPLAY })
      }), 3000);

    this.props.getBitcoinImageData()
    .then((response) => {
      this.setState({ allbitcoinImageArray: response.value.data ? response.value.data.map((value, index) => {
        return value.bitcoin_imageurl
       }) : null })
    });
  }

  // GET PREVPRO AND PREVSTATE TO CHECK AND COMPARE DATA
  componentDidUpdate(prevProps, prevState) {
    if(prevProps != this.props && prevProps.bitcoinNew.bitcoinData.data) {
      let prevPropsData = prevProps.bitcoinNew.bitcoinData.data.RAW;
      let propsData = this.props.bitcoinNew.bitcoinData.data.RAW;
      let multMapPrevPropsData = lodash.map(prevPropsData)
      let multMapPropsData = lodash.map(propsData)

      let singlePricePrevProps = []
      multMapPrevPropsData.map((value, index) => {
        singlePricePrevProps.push(value.USD.PRICE)
      });

      let singlePricePropsData = []
      multMapPropsData.map((value, index) => {
        singlePricePropsData.push(value.USD.PRICE)
      });

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

  findpicforlistcoin(fromsymbol) {
    let { allbitcoinImageArray } = this.state
    let fitlerimage = allbitcoinImageArray.forEach((element, index) => {
      // console.log(element.bitcoin_fullname.match(/\(([^()]+)\)/)['1'])
    })
  }

  handlePriceChange(num) {
    let { isHighPriceMap } = this.state
    if(isHighPriceMap[num] === true) {
      return 'highPriceBox'
    } else if(isHighPriceMap[num] === false) {
      return 'lowPriceBox'
    }
    return ''
  }

  handleIronChange(num) {
    let { isHighPriceMap } = this.state
    if(isHighPriceMap[num] === true) {
      return 'arrow-up'
    } else if(isHighPriceMap[num] === false) {
      return 'arrow-down'
    }
    return ''
  }

  changeTheme(value) {
    this.setState({ id: value ? 'Turn_Lights_On' : 'Turn_Lights_off' })
  }

  handleClick(e) {
    this.setState({ current: e.key })
  }

  applyJitter(float) {
    let rand = Math.random();

    if(rand > .666) {
      return float + 0.1;
    } else if ( rand < .333) {
      return float - 0.1;
    } else {
      return float;
    }
  }

  render() {
    let { allBitcoinPrice, allbitcoinImageArray } = this.state
    let mapDisplay = lodash.map(allBitcoinPrice)
    let mapImage = lodash.map(allbitcoinImageArray)
    let singleObjectCoinInfo = []             // <- ALL SINGLE OBJECT ARRAY STORE
    let singleObjectImage = [] 

   let loopMainCyproList = mapDisplay.forEach((value, index) => {       // LOOP EACH OBJECT INTO SINGLE OBJECT
      singleObjectCoinInfo.push(value.USD)
    });

   let displayCyproList = singleObjectCoinInfo.map((value, index) => {
      return(
        <tbody>
          <tr key={ index }>
            <td><strong>{ index }</strong></td>
            <td><img src={ this.state.allbitcoinImageArray[index] } ></img></td>
            <td>{ value.FROMSYMBOL }</td>
            <td>
              <span className={ 'priceBox ' + this.handlePriceChange(index) }>{ value.PRICE }</span>
              <span className={ this.handleIronChange(index) } ></span>
            </td>
            <td>{ value.HIGH24HOUR }</td>
            <td>{ value.LOWDAY }</td>
            <td>{ value.MKTCAP }</td>
            <td><span className='changeprice24Box' >{ value.CHANGEPCT24HOUR }%</span></td>
          </tr>
        </tbody>
      )
    });

    return ( 
      <div >
        {/* <Navbar/> */}
           <Table className='cryptoMarketTable m-0' responsive size="sm" bordered hover id={ this.state.id } onClick={ this.handleClick }   selectedKeys={ [this.state.current] }  >
              <BitcoinMarketTableNav/>
                { displayCyproList }
          </Table>
          <div className='switchToggleBackgroundColor'>
              <Switch checked={ this.state.id === 'Turn_Lights_On'}
                      onChange={ this.changeTheme }
                      checkedChildren="Turn Lights On"
                      unCheckedChildren="Turn Lights off"/>
          </div>
      </div>
     );
  }
}

function mapStateToProps(state) {
  return state
}

export default connect(mapStateToProps, { getBitcoinData, getSevenDayInfo, getAllCoinData, getBitcoinImageData } )(BitcoinMarket);