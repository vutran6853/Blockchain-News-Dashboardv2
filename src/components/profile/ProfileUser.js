import React, { Component } from 'react';
import './profile.css';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';

class ProfileUser extends Component {
  constructor(props) {
    super(props);
  }

  render() { 
    return ( 
      <div className='container profileBox'>
        <Link to='/'>
          <Button>Home</Button>
        </Link>

        <Link to='/bitcoinNews'>
            <Button>BitcoinMarket</Button>
        </Link>

        <Link to='/charts'>
            <Button>charts</Button>
        </Link>

        <Link to='/userList'>
            <Button>userList</Button>
        </Link>

        <Link to='/todoProject'>
            <Button>todoProject</Button>
        </Link>
      </div>
     );
  }
}
 
export default ProfileUser;