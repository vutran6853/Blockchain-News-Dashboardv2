import React, { Component } from 'react';
import axios from 'axios';

class EditUser extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      userData: [],
      toggleEditButton: false,
      newName: '',
      newEmail: ''
     }

  }

  getUserByID = (id) => {
    axios.get(`/api/user/${ id }`)
    .then((response) => this.setState({ userData: response.data }))
    .catch((err) => console.log(`Unable to fetch data at getUserByID() ${ err }`));
  }

  setNewName = (passValue) => {
    this.setState({ newName: passValue })
  }

  setNewEmail = (passValue) => {
    this.setState({ newEmail: passValue })
  }
  
  postUpdateInfo = (id) => {
    let { newName } = this.state;

    axios.put(`/api/user?id=${ id }&newname=${ newName }`)
    .then((response) => {
      console.log(response)
      // this.setState({ userData: response.data })
    })
    .catch((err) => console.log(err));
  }

  render() { 
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
          <button color='success' 
                  style={ { height: '5px', paddingBottom: '20px' } }
                  onClick={ () => { this.getUserByID(this.props.handleGetUserID)
                                    // this.handleEditUser()
                  } }>Edit User
          </button>
          { displayEditInfo }
        </div>
    );
  }
}
 
export default EditUser;