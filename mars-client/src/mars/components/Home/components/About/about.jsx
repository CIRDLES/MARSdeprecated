import React from 'react'
import CSSModules from 'react-css-modules'
import styles from './about.css'

const About = () => (
  <div styleName='about'>
    <div styleName='logo'></div>
    <p>
      Middleware for Assisting the Registration of Samples (MARS) is a project
      of Working Group 4 of the Internet of Samples (iSamples) NSF-funded
      Research Coordination Network (RCN). MARS is being developed to explore
      the automation of registering legacy samples at SESAR (System for Earth
      Sample Registration) with pertinent metadata and a IGSN (International
      GeoSample Number). The initial targeted repository is the cores collection
      of Scripps Institution of Oceanography.
    </p>
  </div>
)

export default CSSModules(About, styles)
