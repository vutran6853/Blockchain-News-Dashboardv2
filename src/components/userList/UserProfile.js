import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

class UserProfile extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      userData: [],
      // toggleEditButton: false,
      newName: '',
      newEmail: ''
     }

  }

  componentDidMount() {
    axios.get(`/api/user/${ this.props.match.params.id }`)
    .then((response) => this.setState({ userData: response.data }))
    .catch((err) => console.log(`Unable to fetch data at getUserByID() ${ err }`));
  }

  setNewName = (passValue) => {
    this.setState({ newName: passValue })
  }

  setNewEmail = (passValue) => {
    this.setState({ newEmail: passValue })
  }


  render() {
    console.log('this', this)

    let { userData } = this.state;

    let displayEditInfo = userData.map((value, index) => {
      return (
        <div key={ index }>
          <p>Name</p>
          <input placeholder='New Name:' onChange={ (e) => this.setNewName(e.target.value) }></input>
          <p>Email</p>
          <input placeholder='New Email:' onChange={ (e) => this.setNewEmail(e.target.value) }></input>
          <button onClick={ () => this.postUpdateInfo(this.props.handleGetUserID) }>Submit</button>
        </div>
      )
    });

    return (
      <div>
        <p>UserProfile</p>
        { displayEditInfo }

      </div>
    )
  }
}

// const mapStateToProps = function(state) {
//   return state
// }
export default connect()(UserProfile);