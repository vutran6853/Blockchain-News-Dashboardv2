import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getChartsData } from '../../ducks/chartsReducer';
import { getBitcoinData } from '../../ducks/bitcoinNewReducer';
import TopCoinChart from './horizontalChart';
import BitcoinVolume24 from './BitcoinVolume24';
import { Container} from 'reactstrap';
import NavBarHeader from '../dashboard/NavBarHeader';
import LineChart from './LineChart';
import './charts.css'

class Charts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({ dropdownOpen: !this.state.dropdownOpen });
  }
  
  render() { 
    return ( 
      <div className='container-fluid m-0 p-0'>
        {/* <NavBarHeader/> */}
          <Container>
            <LineChart/>
            <TopCoinChart/>
            <BitcoinVolume24/>
          </Container>
      </div>
     );
  }
}

// IMPORT Charts REDUCER SINCE WE HAVE MULT REDUCER SET-UP
const mapStateToProps = (state) => ({ ...state.charts, ...state.bitcoinNew })

export default connect(mapStateToProps, { getChartsData, getBitcoinData })  (Charts);