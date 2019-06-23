import React, { Component } from 'react';
import Charts from '../charts/Charts';
import bitcoinMarket from '../bitcoinMarket/BitcoinMarket';
// import Profile from '../profile/ProfileUser';
import Weather from '../weather/Weather';
import cryptoInfo from '../cryptoInfo/CryptoInfo';
import { Link } from 'react-router-dom';
import image from './cryptozone1.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, ListGroupItem } from 'reactstrap';
import './dashboard.css';

class NavBarHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
  }

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    return ( 
          <Navbar className='navbarBox' expand="md">
          {/* <NavbarBrand href="/">
            <div id='logo1' >
              <img src={ image } ></img>
            </div>

          </NavbarBrand> */}
          <NavbarToggler onClick={ this.toggle }/>
            <Collapse isOpen={ this.state.isOpen } navbar>
              <Nav className="justify-content-md-center container" navbar  color="dark" >
                <Link to='/'>
                  <ListGroupItem action className='body1'>
                    Home
                  </ListGroupItem>
                </Link>

                <Link to='/bitcoinMarket'>
                  <ListGroupItem action className='body1'>
                    CryptoMarket
                  </ListGroupItem>
                </Link>

                <Link to='/charts'>
                  <ListGroupItem action className='body1'>
                    CryptoCharts
                  </ListGroupItem>
                </Link>

                <Link to='/userList'>
                  <ListGroupItem action className='body1'>
                    CryptoUser
                  </ListGroupItem>
                </Link>

                <Link to='/cryptoInfo'>
                  <ListGroupItem action className='body1'>
                    CryptoInfo
                  </ListGroupItem>
                </Link>
                
                <Link to='/LoginSignUp'>
                  <ListGroupItem action className='body1'>
                    Login/SignUp
                  </ListGroupItem>
                </Link>

              </Nav>
            </Collapse>
          </Navbar>
    );
  }
}
 
export default NavBarHeader;