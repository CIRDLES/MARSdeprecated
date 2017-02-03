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
    readSourceData(e.data.sourceFormat, e.data.sourceFiles, map, logic, (err, samples) => {
      postMessage(samples)
      close()
    })
  })
}

// Read read source map. callback(err, map, logic)
const readSourceMap = (mapFile, callback) => {
  let reader = new FileReader()
  reader.onload = (e) => {
    let fileContents = Function(e.target.result)() // rather than using eval, create a Function using the mapping file contents as the body
    return callback(null, fileContents.map, fileContents.mappingLogic)
  }
  reader.readAsText(mapFile)
}

// read source data using the proper loader
const readSourceData = (format, files, map, logic, callback) => {
  switch(format){
    case '.csv':
      return loadCSV(files, map, logic, callback)
    default:
      return callback('ERROR')
  }
}

// **********************************************************
// loaders handle the logic for whatever file format is given
// **********************************************************

// createField is a helper function for all the loaders that builds each field
// for MARS
const createField = (key, originalValue, originalKey, logic) => {
  return {
    key,
    originalValue,
    originalKey,
    value: logic[key] ? logic[key](originalValue, originalKey) : originalValue
  }
}

// Load CSV files by merging them
const loadCSV = (files, map, logic, callback) => {

  let samples = []
  let counter = 0

  for(let i=0; i<files.length; i++) {
    // closure reads each file and fires callback when completed
    ((file) => {

      // create a fileReader for each file
      let reader = new FileReader()

      // Because FileReader is asynchronous, there is no guaranteed order in
      // which each file will fire the onloadend event
      reader.onloadend = (e) => {
        // csvParse is a D3 function that loads a csv string. It takes a function
        // which handles the logic for mapping each individual sample
        let fileData = csvParse(e.target.result, (d) => {
          let mappedSample = {}

          // for every value in the map of the mapping file
          for(let key in map) {
            if(Array.isArray(map[key])) {
              let fieldArray = []
              for(let i=0; i<map[key].length; i++) {
                if(d[map[key][i]]){fieldArray.push(createField(key, d[map[key][i]], map[key][i], logic))}
              }
              if(fieldArray.length > 0){mappedSample[key] = fieldArray}
            } else {
              if(d[map[key]]){mappedSample[key] = createField(key, d[map[key]], map[key], logic)}
            }
          }
          return mappedSample
        })

        // combine rows. This could be done at the very end for increased efficiency
        for(let j=0; j<fileData.length; j++) {
          samples[j] = {...samples[j], ...fileData[j]}
        }

        // the counter helps us know when all the files have been loaded by counting
        // the number of loadend events that are fired
        counter++
        if(counter == files.length) {
          callback(null, samples)
        }
      }
      reader.readAsText(file)
    })(files[i]) // end closure
  }
}
