import {connect} from 'react-redux'
import {hashHistory} from 'react-router'

import * as actions from './ducks/user'
import Mars from './mars'

const mapStateToProps = (state) => {
  return {
    username: state.user.get('username'),
    password: state.user.get('password'),
    usercode: state.user.get('usercode'),
    ui: {
      loading: state.user.getIn(['ui', 'loading']),
      error: state.user.getIn(['ui', 'error'])
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onChangeUsername: (username) => {
      dispatch(actions.changeUsername(username))
    },
    onChangePassword: (password) => {
      dispatch(actions.changePassword(password))
    },
    onLogin: (username, password) => {
      dispatch(actions.login(username, password))
      .then(usercode => {
        if(usercode) {
          hashHistory.push('/')
        }
      })
    }
  }
}


const mergeProps = (stateProps, dispatchProps, ownProps) => {
  return {
    ...ownProps,
    user: {
      ...stateProps,
      ...dispatchProps
    }
  }
}

const MarsContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(Mars)

export default MarsContainer
