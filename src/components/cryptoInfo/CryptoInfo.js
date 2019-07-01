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

  componentDidUpdate() {
    this.scrollFunction()
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

  scrollFunction = () => {
    if (document.body.scrollTop < 500 || document.documentElement.scrollTop < 500) {
      document.getElementById("myBtn").style.display = "block";
    } else {
      document.getElementById("myBtn").style.display = "none";
    }
  }
  
  // When the user clicks on the button, scroll to the top of the document
  topFunction = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }


  render() {
    let { allCoinListData } = this.state;

    let displayCoinList = allCoinListData.map((value, index) => {
      let content = (
        <div key={ index }>
          <p><strong>Description:</strong> { value.bitcoin_description }</p>
          <p><strong>Algorithm:</strong> { value.bitcoin_algorithm }</p>
        </div> 
      )

      return (
        <div id="coinBox" key={ value.bitcoin_fullname }>
          <img  alt={ value.bitcoin_fullname }
                id='hoverImage'
                src={ value.bitcoin_imageurl }
                style={ { width: 210, height: 190 } }>
          </img>
          <p>{ value.bitcoin_fullname }</p>
          <button type="dashed"
                  onClick={ () => { this.postFavCoin(index); this.openNotification() } }>Add to Fav
          </button>

          <Popover content={ content } title={ value.bitcoin_fullname }>
            <button>More Info</button>
          </Popover>
        </div>
      )
    });

    return (
        <div className="coinListBox">
          <button onClick={ this.topFunction } id="myBtn" title="Go to top">TOP</button>
          { displayCoinList }
          {/* <BackTop></BackTop> */}
        </div>
    );
  }
}

// IMPORT Charts REDUCER SINCE WE HAVE MULT REDUCER SET-UP
const mapStateToProps = (state) => ({ ...state.allCoinList })

export default connect(mapStateToProps, { getAllCoinData }) (CryptoInfo);