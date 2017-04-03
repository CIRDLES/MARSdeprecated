import CSSModules from 'react-css-modules'
import React from 'react'
import {Link} from 'react-router'

import styles from './uploadList.css'
import Panel from '../../../../../common/Panel'

// later a user might have the option of filtering by different values
const filterBy = (samples, filter) => {
  return samples.map((sample) => sample.find((field) => field.key == filter).value)
}

const UploadList = ({uploadSamples}) => (
  <div styleName='uploadList'>
    <Panel name='Samples' style={{height: '100%'}}>
      <div>
        {filterBy(uploadSamples, 'name').map((sample, i) => (
          <Link styleName='listItem' activeClassName={styles.active} key={i} to={'/check/' + i}>{sample}</Link>
        ))}
      </div>
    </Panel>
  </div>
)

export default CSSModules(UploadList, styles)
