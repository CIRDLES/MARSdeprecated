import FontAwesome from 'react-fontawesome'
import CSSModules from 'react-css-modules'
import React, {Component} from 'react'

import styles from './fileInput.css'

// class FileInput extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {files: onChange: ()=>{}}
//   }
//
//   localOnChange(e, onChange) {
//     let fileNames = []
//     for(let i=0; i<e.target.files.length; i++) {
//       fileNames.push(e.target.files[i].name)
//     }
//     this.setState({fileNames})
//     onChange(e)
//   }
//
//   render() {
//     return (
//       <div>
//         <input
//           accept={this.state.accept}
//           multiple={this.state.multiple}
//           type='file' id='file'
//           onChange={(e) => this.localOnChange(e, this.state.onChange)} styleName='fileInput'
//           />
//         <label htmlFor='file' styleName='fileInputLabel'>
//           Choose a File
//         </label>
//         <div>
//           {this.state.fileNames.map((file, i) => {
//             if(i>0){return <span key={i}>, {file}</span>}
//             else{return <span key={i}>{file}</span>}
//           })}
//         </div>
//       </div>
//     )
//   }
// }

const FileInput = ({accept, multiple, onChange, files, faIcon}) => {

  let buttonContent
  if(files && files.length === 1) {
    buttonContent = files[0].name
  } else if(files && files.length > 1) {
    buttonContent = files.length + ' files chosen'
  } else {
    if(multiple) {
      buttonContent = 'Choose some Files'
    }else {
      buttonContent = 'Choose a File'
    }
  }

  let icon = ''
  if(faIcon){
    icon = <FontAwesome styleName='icon' name={faIcon}/>
  }

  return (
    <div>

      <label styleName='fileInputLabel'>
        <input
          accept={accept}
          multiple={multiple}
          type='file'
          id='file'
          onChange={onChange}
          styleName='fileInput'/>
        {icon}
        {buttonContent}
      </label>
    </div>
  )
}

export default CSSModules(FileInput, styles)
