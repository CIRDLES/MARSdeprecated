import CSSModules from 'react-css-modules'
import React from 'react'

import styles from './headerTable.css'

const HeaderTable = ({header,data}) => (
  <table styleName='headerTable'>
    <thead>
      <tr>
        {header.map((head, i) => (
          <th key={i}>{head}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      {data.map((row, i) => (
        <tr key={i}>
          {row.map((item, j) => (
            <td key={j}>{item}</td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
)

export default CSSModules(HeaderTable, styles)
