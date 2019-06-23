import React, { Component } from 'react';
// import UserList from './userList';
import axios from 'axios';
import { notification } from 'antd';
// import { Button } from 'reactstrap';

class UserFavCoinList extends Component {
  constructor(props) {
    super(props);

    // LOCAL STATE IF NEEDED
    this.state = {
      favListData: [],
      allCoinListData: [],
      singleUserFavList: [],
      theme: 'dark',
      current: 1,
    }
  } 

  openNotification = () => {
    notification.open({
      message: 'Complete',
      description: `Remove Coin from  Fav List !` ,
    });
  };

  // GET FAVORITE COIN FROM USER ID
  handleGetFav = (id) => {
    axios.get(`/api/user2/${id + 1}`)
    .then((response) => this.setState({ favListData: response.data }))
    .catch((error) => console.log('Front End error', error));
  }

  // FUNCTION TO REMOVE COIN FROM UNIQUE USER   
  //  AND RENDER LOCAL STATE UPDATE LIST
  handleDeleteFavCoin = (coinindex, userid ) => {
    // console.log('COIN INDEX: ', coinindex, 'USER INDEX: ', userid)
    axios.delete(`/api/favorite/${ coinindex }/${ userid + 1 }`)
    .then((response) => {
      // console.log(response)
    })
    .catch((error) => console.log('Oh Fail to Delete', error));

    axios.get(`/api/user2/${userid + 1}`)
    .then((response) => this.setState({ favListData: response.data }))
    .catch((error) => console.log('Oh Fail', error));
  }

  render() { 
    let displayFavCoinList = this.state.favListData.map((value, index) => {
      return (
        <div className='favCoinListBox' key={ index }>
          <p><strong>Name: </strong>{ value.bitcoin_fullname }</p>
          <div className='imageBox'>
            <img src={ value.bitcoin_imageurl }></img>
              <button style={ { height: '5px', paddingBottom: '20px' } }
                      onClick={ () => { this.handleDeleteFavCoin(value.bitcoinlist_id,this.props.handleGetFavId)
                                      { this.openNotification() }
                      } }>Delete Coin
              </button>
          </div>
          <p><strong>Algorithm: </strong>{ value.bitcoin_algorithm }</p>
        </div>
      )
    });
   
    return ( 
        <div className='userListMap'>
          <button style={ { height: '5px', paddingBottom: '20px' } } 
                  onClick={ () => { this.handleGetFav(this.props.handleGetFavId) } }>Get Fav
          </button>
          <span>{ displayFavCoinList }</span>        
        </div>
    );
  }
}
 
export default UserFavCoinList;