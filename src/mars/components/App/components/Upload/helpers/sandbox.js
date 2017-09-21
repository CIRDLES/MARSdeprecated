// code for a webworker so that user JS code can be run in a separate
// thread from the main application. This disables the users ability
// to access the application's global scope.
import {csvParse} from 'd3-dsv'

// sandbox only recieves one message which tells it which files
// will be used and how. Data is stored in e.data
onmessage = (e) => {

  if(e.data.type == 'map') {
    // This callback chain contains all the logic of the webworker
    readSourceMap(e.data.sourceMap, (err, map, logic) => {

      // once the sourceMap is read, get the source data
      readSourceData(e.data.sourceFormat, e.data.sourceFiles, map, logic, (err, samples) => {
        postMessage(samples)
        close()
      })
    })
  } else if (e.data.type == 'combine') {
    readSourceMap(e.data.sourceMap[0], (err, map, logic, combinations) => {
      let combinedSamples = combineFields(combinations, map, e.data.uploadSamples)
      postMessage(combinedSamples)
      close()
    })
  }
}

// Read read source map. callback(err, map, logic)
const readSourceMap = (mapFile, callback) => {
  let reader = new FileReader()
  reader.onload = (e) => {
    let fileContents = Function(e.target.result)() // rather than using eval, create a Function using the mapping file contents as the body
    return callback(null, fileContents.map, fileContents.logic, fileContents.combinations)
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

// combine fields where necessary. This occurs only after the user clicks the upload button
// to upload their samples to SESAR
const combineFields = (combinations, map, uploadSamples) => {
  for(let i=0; i<uploadSamples.length; i++) {
    for(let key in map) {
      if(Array.isArray(map[key])) {
        let filter = uploadSamples[i].filter((value) => map[key].includes(value.originalKey))
        let inverse = uploadSamples[i].filter((value) => !map[key].includes(value.originalKey))
        if(filter.length>1) {
          let reduction = filter.reduce((acc, field) => acc.concat([field.value]), [])
          if(combinations[key]) {
            let newField = {key, value: combinations[key](reduction)}
            inverse.push(newField)
            uploadSamples[i] = inverse
          }
        } else if(filter.length == 1) {
          inverse.concat(filter)
          uploadSamples[i] = inverse
        }
      }
    }
  }
  return uploadSamples
}

// **********************************************************
// loaders handle the logic for whatever file format is given
// **********************************************************

// createField is a helper function for all the loaders that builds each field
// for MARS
const createField = (key, originalValue, originalKey, logic) => {
  if(!key) {
    return {
      originalKey,
      originalValue
    }
  }

  return {
    originalKey,
    originalValue,
    key,
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
        csvParse(e.target.result, (d, i) => {
          if(!samples[i]) {samples[i] = []}
          for(let key in map) {
            if(Array.isArray(map[key])) {
              for(let j=0; j<map[key].length; j++) {
                if(d[map[key][j]]) {
                  samples[i].push(createField(key, d[map[key][j]], map[key][j], logic))
                  delete d[map[key][i]]
                }
              }
            } else if(d[map[key]]){
              samples[i].push(createField(key, d[map[key]], map[key], logic))
              delete d[map[key]]
            }
          }
          // Get the unmapped samples
          for(let key in d) {
            d[key] ? samples[i].push(createField(undefined, d[key], key, logic)) : false
          }
        })

        // the counter helps us know when all the files have been loaded by counting
        // the number of loadend events that are fired
        counter++
        if(counter == files.length) {

          // filter repeats with hash tables
          for(let i=0; i<samples.length; i++) {
            let seen = {}
            samples[i] = samples[i].filter(field => seen.hasOwnProperty(field.originalKey) ? false : (seen[field.originalKey]) = true)
          }
          callback(null, samples)
        }
      }
      reader.readAsText(file)
    })(files[i]) // end closure
  }
}
