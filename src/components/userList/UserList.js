import React, { Component } from 'react';
import { getUserData } from '../../ducks/userReducer';
// import { getAllCoinData } from '../../ducks/allBitcoinListReducer';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import UserFavCoinList from './UserFavCoinList';
import EditUser from './EditUser';
import './user.css';
import axios from 'axios';

class UserList extends Component {
  constructor(props) {
    super(props)

    // LOCAL STATE IF NEEDED
    this.state = {
      userData: [],
      // allCoinListData: [],
      favListData: []
    }
  }

  componentDidMount() {
    this.props.getUserData()
  } 

  handleGetFav = (id) => {
    console.log('INDEX: ', (id + 1))
    
    axios.get(`/api/user2/${id + 1}`)
    .then((response) => {
      console.log(response)
      this.setState({ favListData: response.data })
    })
  }

  render() {
    let displayList = this.props.userData.map((value) => {
      return (
          <div key={ value.user_id } className="userList-item">
            <img src={ value.user_url } ></img>
            <p>{ value.user_firstname } { value.user_lastname }</p>
            <Link to={ `/${ value.user_id }` }>
              <button>view profile</button>
            </Link>
            {/* <p>{ value.user_email }</p> */}
            {/* <UserFavCoinList handleGetFavId={ value.user_id } /> */}
            {/* <EditUser handleGetUserID={ value.user_id } /> */}
          </div>
      )
    });

    return (
        <div className="userList-container">
            { displayList }
        </div>
    );
  }
}

// IMPORT USER REDUCER SINCE WE HAVE MULT REDUCER SET-UP
const mapStateToProps = (state) => ({ ...state.user, ...state.allCoinListData })

export default connect(mapStateToProps, { getUserData })(UserList);