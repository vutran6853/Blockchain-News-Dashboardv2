import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './auth.css';

class SignUp extends Component {
  constructor(props) {
    super(props) 

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    }
  }

  submitForm = (e) => {
    e.preventDefault();
    console.log('hit here')
  }

  setUserInfo = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }
  // handleSumit = () => {
  //   let { firstName, lastName, email, password } = this.state;

  //   axios.post(`/api/user`, { firstName, lastName, email, password })
  // };
  
  render() {
    return (
      <div className="form-container">
        <label><strong>Register Page</strong></label>

        <form className="form-item">
          <label>
            <strong>First Name</strong>
          </label>
          <input type="name"
                  name="firstName"
                  onChange={ (e) => this.setUserInfo(e) }
                  placeholder="Enter your first name">
          </input>
          
          <label>
            <strong>Last Name</strong>
          </label>
          <input type="name"
                  name="lastName"
                  onChange={ (e) => this.setUserInfo(e) }
                  placeholder="Enter your last name">
          </input>

          <label>
            <strong>Email</strong>
          </label>
          <input required={ true }
                  type="email"
                  name="email"
                  onChange={ (e) => this.setUserInfo(e) }
                  placeholder="Enter your email">
          </input>

          <label>
            <strong>Password</strong>
          </label>
          <input required={ true }
                  type="password"
                  name="password"
                  onChange={ (e) => this.setUserInfo(e) }
                  placeholder="Enter new password">
          </input>

          <div className="button-item">
            <button onClick={ this.submitForm }>Submit</button>
            <Link to='/login'>
              <p>Already have an account?</p>
              <button>Sign In</button>
            </Link>
          </div>
        </form>
      </div>
    )
  }
}

export default SignUp;