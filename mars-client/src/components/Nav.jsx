import React from 'react'
import {Link} from 'react-router'

const Nav = () => (
  <ul>
    <li><Link to="/">Welcome</Link></li>
    <li><Link to="/about">About</Link></li>
    <li><Link to="/login">Login</Link></li>
  </ul>
)

export default Nav
