// code for a webworker so that user JS code can be run in a separate
// thread from the main application. This disables the users ability
// to access the application's global scope.
import * as defaultMappingLogic from './defaultMappingLogic'
import {csvParse} from 'd3-dsv'

// sandbox only recieves one message which tells it which files
// will be used and how. Data is stored in e.data
onmessage = (e) => {

  // This callback chain contains all the logic of the webworker
  readSourceMap(e.data.sourceMap, (err, map, logic) => {
    logic = Object.assign({}, defaultMappingLogic, logic);

    // once the sourceMap is read, get the source data
    readSourceData(e.data.sourceFormat, e.data.sourceFiles, (err, rawSamples) => {

      //once the source data is available, the mapping is performed
      let samples = []
      for(let i=0; i<rawSamples.length; i++) {
        for(let originalKey in rawSamples[i]) {
          if(map[originalKey]){
            for(let j=0; j<map[originalKey].length; j++) {
              console.log(map[originalKey][j])
            }
          }
        }
      }

    })
  })
}

// Read read source map. callback(err, map, logic)
const readSourceMap = (mapFile, callback) => {
  let reader = new FileReader()
  reader.onload = (e) => {
    let fileContents = Function(e.target.result)()
    return callback(null, fileContents.map, fileContents.mappingLogic)
  }
  reader.readAsText(mapFile)
}

// read source data using the proper loader
const readSourceData = (format, files, callback) => {
  switch(format){
    case '.csv':
      return loadCSV(files, callback)
    default:
      return callback('ERROR')
  }
}

// loaders handle the logic for whatever file format is given

// Load CSV files by merging them
const loadCSV = (files, callback) => {

  let rawSamples = []
  let counter = 0

  for(let i=0; i<files.length; i++) {
    // closure reads each file and fires callback when completed
    ((file) => {

      // create a fileReader for each file
      let reader = new FileReader()

      // Because FileReader is asynchronous, there is no guaranteed order in
      // which each file will fire the onloadend event
      reader.onloadend = (e) => {
        let fileData = csvParse(e.target.result)

        // combine rows. This could be done at the very end for increased efficiency
        for(let j=0; j<fileData.length; j++) {
          rawSamples[j] = {...rawSamples[j], ...fileData[j]}
        }

        // the counter helps us know when all the files have been loaded
        counter++
        if(counter == files.length) {
          callback(null, rawSamples)
        }
      }
      reader.readAsText(file)
    })(files[i]) // end closure
  }
}
