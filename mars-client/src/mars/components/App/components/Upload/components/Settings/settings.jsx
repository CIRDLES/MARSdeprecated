import CSSModules from 'react-css-modules'
import React,{Component} from 'react'

import Dropdown from '../../../../../common/Dropdown'
import FileInput from '../../../../../common/FileInput'
import Panel from '../../../common/Panel'
import styles from './settings.css'

const Settings = ({sourceMap, onChangeMapping, sourceFormat, onChangeFormat, sourceFiles, onChangeFiles, onProceed}) => {

  const options = [{name: 'CSV', value: '.csv'}]

  const handleOnChangeMap = (e) => {
    e.preventDefault()
    onChangeMapping(e.target.files)
  }

  const handleOnChangeFormat = (e) => {
    e.preventDefault()
    onChangeFormat(e.target.value)
  }

  const handleOnChangeSourceFiles = (e) => {
    e.preventDefault()
    onChangeFiles(e.target.files)
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()
    // let reader = new FileReader()
    // reader.onload = (e) => {
    //   console.log(e.target.result)
    // }
    // reader.readAsText(sourceMap[0])
    onProceed(sourceMap[0], sourceFormat, sourceFiles)
  }

  const displayFileChooser = () => {
    // other formats may require other input sources (besides from files)
    if(sourceFormat === '.csv') {
      return (
        <div styleName='fileChooser'>
          <div styleName='selectFiles'>Select File(s)</div>
          <FileInput accept={sourceFormat} faIcon={'upload'} files={sourceFiles} multiple={true} onChange={handleOnChangeSourceFiles}/>
        </div>
      )
    } // else {other formats}
  }

  const displayProceed = () => {
    if(sourceFormat === '.csv' && sourceFiles && sourceMap) {
      return (
        <div styleName='submitSection'>
          <input styleName='submitButton' type='submit' value='Proceed' onClick={handleOnSubmit}/>
        </div>
      )
    }
  }

  return (
    <div styleName='upload'>
      <Panel name='Upload Setup'>
        <form styleName='content'>
          <div styleName='text'>Select your Mapping</div>
          <FileInput accept={'.js'} faIcon={'cogs'} files={sourceMap} multiple={false} onChange={handleOnChangeMap}/>
          <label styleName='text' id='formatSelect'>Choose your Format</label>
          <div styleName='center'>
            <Dropdown htmlfor='formatSelect' options={options} value={sourceFormat} onChange={handleOnChangeFormat}/>
          </div>
          {displayFileChooser()}
          {displayProceed()}
        </form>
      </Panel>
    </div>
  )
}


export default CSSModules(Settings, styles)
