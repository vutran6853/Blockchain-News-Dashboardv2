import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import DashBoard from './components/dashboard/DashBoard';
import BitcoinMarket from './components/bitcoinMarket/BitcoinMarket';
import Charts from './components/charts/Charts';
import UserList from './components/userList/UserList';
import CryptoInfo from './components/cryptoInfo/CryptoInfo';
import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';
// import UserProfile from './components/userList/UserProfile';


export default (
    <Switch>
      <Route exact path='/' component={ DashBoard } ></Route>
      <Route path='/bitcoinMarket' component={ BitcoinMarket } ></Route>
      <Route path='/charts' component={ Charts } ></Route>
      <Route path='/userList' component={ UserList } ></Route>
      {/* <Route path='/:id' component={ UserProfile } ></Route> */}
      <Route path='/cryptoInfo' component={ CryptoInfo } ></Route>  
      <Route path='/login' component={ Login } ></Route>
      <Route path='/signUp' component={ SignUp } ></Route>
    </Switch>
)

