import CSSModules from 'react-css-modules'
import React from 'react'

import styles from './uploadDetail.css'
import Panel from '../../../../../common/Panel'

const UploadDetail = () => (
  <div styleName='uploadDetail'>
    <Panel name='Upload Detail' style={{height: '100%'}}>
      <p>A custom panel needs to be created here.</p>
    </Panel>
  </div>
)

export default CSSModules(UploadDetail, styles)
