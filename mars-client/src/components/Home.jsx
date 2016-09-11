import React, {PropTypes} from 'react'
import Nav from './Nav'

const Home = ({children}) => (
  <div>
    <Nav/>
    <h1>MARS</h1>
    {children}
  </div>
)

Home.propTypes = {
  children: PropTypes.object.isRequired // Route children
}

export default Home
