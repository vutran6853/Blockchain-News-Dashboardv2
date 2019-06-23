import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './auth.css';

class Login extends Component {
  constructor(props) {
    super(props)

      this.state = {
        email: '',
        password: ''
      }
  } 

  submitForm = (e) => {
    e.preventDefault();
    console.log('hit here')
    if(this.state.email !== '' && this.state.password !== '') {
      console.log(true)
    } else {
      console.log(false)

    }
  }

  handleChangeSumit = () => {
    let { email } = this.state
    axios.post(`/api/user/login`, { email })
    .then((response) => {
      console.log(response)
    })
  }

  setUserEmail = (event) => {
    this.setState({ email: event.target.value })
  }

  setUserPassword = (event) => {
    this.setState({ password: event.target.value })
  }

  render() {
    return (
      <div className="form-container">
        <form className="form-item">
          <label>
            <strong>Email</strong>
          </label>
          <input required={ true } 
                 type="email" 
                 placeholder="Enter your Email"
                 onChange={ (e) => this.setUserEmail(e) }>
          </input>
          
          <label>
            <strong>Password</strong>
          </label>
          <input required={ true } 
                 type="password" 
                 placeholder="Enter your password"
                 onChange={ (e) => this.setUserPassword(e) }>
          </input>

          <div className="button-item">
            <button onClick={ this.submitForm }>Submit</button>
            <Link to='/signUp'>
              <button>Sign up</button>
            </Link>
          </div>
        </form>
      </div>
    )
  }
}

export default Login;

