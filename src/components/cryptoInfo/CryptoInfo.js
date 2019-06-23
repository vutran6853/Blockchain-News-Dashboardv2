import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getAllCoinData } from '../../ducks/allBitcoinListReducer';
import { Card, Button, Popover, notification, BackTop } from 'antd';
import axios from 'axios';
import './cryptoInfo.css';

class CryptoInfo extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      allCoinListData: [],
      favoriteID: []
     }
  }
  
  // GET DATA FROM REDUX AND STORE TO LOCAL STATE
  componentDidMount() {
    this.props.getAllCoinData()
    .then((response) => this.setState({ allCoinListData: response.value.data }))
    .catch((err) => console.log(`Unable to fetch data at getAllCoinData() ${ err }`));
  }

  // POST ID TO FAVORITE DB
  postFavCoin = (id) => {
    axios.post(`/api/favorite/${ id }/1`)
    .then((response) => {
      // console.log(response)
    })
  }

  openNotification = () => {
    notification.open({
      message: 'Complete',
      description: 'Add to Fav List ^.^'
    });
  };

  render() {
    let { allCoinListData } = this.state;

    let displayCoinList = allCoinListData.map((value, index) => {
      let content = (
        <div key={ index }>
          <p><strong>Description: </strong> { value.bitcoin_description }</p>
          <p><strong>Algorithm: </strong> { value.bitcoin_algorithm }</p>
        </div> 
      )

      return (
        <div id="coinBox" key={ value.bitcoin_fullname }>
            <Card style={ { width: 270, height: 290, padding: 10 } }
                  cover={ <img alt={ value.bitcoin_fullname }
                          id='hoverImage'  
                          src={ value.bitcoin_imageurl } 
                          style={ { width: 210, height: 190 } }/> }
            >
            <p>{ value.bitcoin_fullname }</p>
            <Button style={ { margin: 3 } } 
                    type="dashed"
                    onClick={ () => { this.postFavCoin(index)
                                      this.openNotification()} }>Add to Fav
            </Button>

            <Popover content={ content } title={ value.bitcoin_fullname }>
              <Button>More Info</Button>
            </Popover>
          </Card>
        </div>
      )
    });

    return (
        <div className="coinListBox">
          { displayCoinList }
          <BackTop></BackTop>
        </div>
     );
  }
}

// IMPORT Charts REDUCER SINCE WE HAVE MULT REDUCER SET-UP
const mapStateToProps = (state) => ({ ...state.allCoinList })

export default connect(mapStateToProps, { getAllCoinData }) (CryptoInfo);