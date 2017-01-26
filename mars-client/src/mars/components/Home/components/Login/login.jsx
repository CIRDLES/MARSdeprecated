import React, {PropTypes} from 'react'
import CSSModules from 'react-css-modules'
import styles from './login.css'

const Login = ({username, password, ui, onChangeUsername, onChangePassword, onLogin}) => {

  const handleChangeUsername = (e) => {
    e.preventDefault()
    onChangeUsername(e.target.value)
  }

  const handleChangePassword = (e) => {
    e.preventDefault()
    onChangePassword(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onLogin(username, password)
  }

  return (
    <div styleName='login'>
      <h1>GeoPass Login</h1>
      <form>
        <input type='email'
          placeholder='Email'
          value={username}
          onChange={handleChangeUsername}
        />
        <input
          type='password'
          placeholder='Password'
          value={password}
          onChange={handleChangePassword}
        />
      <input
          type='submit'
          value='Login'
          onClick={handleSubmit}
        />
      </form>
      <div className='error'>{ui.error}</div>
    </div>
  )
}

export default CSSModules(Login, styles)
