'use strict';

import React , { Component } from 'react';
import { connect } from 'react-redux';
import { meFromToken } from 'shared/modules/user';
import baseStyles from 'shared/styles/baseStyles';

class App extends Component {
  componentWillMount() {
    this.props.loadUserFromToken()
  }
  render() {
    baseStyles();
    return (
      <div>
        <div id="map" />
        {this.props.children}
      </div>
    );
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    loadUserFromToken: () => {
      let token = typeof(localStorage) !== 'undefined' ? localStorage.getItem('jwtTokenBusiness') : null
      if (!token || token === '') {// if there is no token, dont bother
        return
      }
      // fetch user from token (if server deems it's valid token)
      dispatch(meFromToken(dispatch, token))
    }
  }
}

export default connect(null, mapDispatchToProps)(App);
