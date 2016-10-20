import React from 'react'
import dataMap from '../../maps/scripps.json'
import sampleMap from '../lib/sampleMap'
import {Link} from 'react-router'

const SelectCSV = ({onUpload}) => (
  <div>
    <h3>Select CSVs</h3>
    <input type="file" name="files[]" accept="*.csv" multiple onChange={onUpload}/>
    <br/>
    <Link to="/check">Next</Link>
  </div>
)

export default SelectCSV
