import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as types from '../../../../../ducks/user.js';

class Logout extends Component {
  componentWillMount() {
    this.props.dispatch(types.logout())
  }

  render() {
    this.props.history.push('/login')
    return null
  }
}

export default connect()(Logout);
