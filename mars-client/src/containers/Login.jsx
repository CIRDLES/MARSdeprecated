import {connect} from 'react-redux'
import login from '../components/Login'
import {
  changeUsername,
  changePassword,
  fetchUsercode
} from '../actions/userActions'

const mapStateToProps = (state) => {
  const user = state.user.toJS()
  return {
    username: user.username,
    password: user.password,
    error: user.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onChangeUsername: (e) => {
      dispatch(changeUsername(e.target.value))
    },
    onChangePassword: (e) => {
      dispatch(changePassword(e.target.value))
    },
    onClickLogin: (username, password, router, e) => {
      e.preventDefault()
      dispatch(fetchUsercode(username, password))
        .then(usercode => {
          if(usercode) {
            localStorage.usercode = usercode  // update browser storage
            localStorage.username = username
            localStorage.password = password // this may not be best practice
            router.push('/')
          }
        })
    }
  }
}

const Login = connect(
  mapStateToProps,
  mapDispatchToProps
)(login)

export default Login
