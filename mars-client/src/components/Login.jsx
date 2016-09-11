import React, {PropTypes} from 'react'
import {withRouter} from 'react-router'

const Login = ({router, username, password, error, onChangeUsername, onChangePassword, onClickLogin}) => (
  <div>
    <h2>Login</h2>
    <form>
      <input type="email"
        placeholder="Email"
        value={username}
        onChange={onChangeUsername}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={onChangePassword}
      />
    <input
        type="submit"
        value="Login"
        onClick={onClickLogin.bind(this, username, password, router)}
      />
    </form>
    <div>{error}</div>
  </div>
)


Login.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  error: PropTypes.string,
  onChangeUsername: React.PropTypes.func.isRequired,
  onChangePassword: React.PropTypes.func.isRequired,
  onClickLogin: React.PropTypes.func.isRequired,
}

export default withRouter(Login)
