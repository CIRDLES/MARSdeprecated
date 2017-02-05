import CSSModules from 'react-css-modules'
import React from 'react'

import styles from './uploadList.css'
import Panel from '../../../../../common/Panel'

var test = []
for (var i=0; i<25; i++) {
  test.push(<p key={i}>test</p>)
}

const UploadList = ({uploadSamples}) => (
  <div styleName='uploadList'>
    <Panel name='Samples' style={{height: '100%'}}>
      <div>
        {uploadSamples.map((sample, i) => (
          <p key={i}>{sample.name.value}</p>
        ))}
      </div>
    </Panel>
  </div>
)

export default CSSModules(UploadList, styles)
