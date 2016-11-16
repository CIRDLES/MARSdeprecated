import {csvParse} from 'd3-dsv'

// This file contains logic for getting data from various sources. All of the
// methods in this file should return a Promise object that resolves to an array
// of raw sample data.
//
// The resolved data should ALWAYS have the below format. Keys should match the
// key values used for the organization (the same keys as used in the JSON map).
// The data values should be raw data without any manipulation.
// [
//  {Name: 'Bulwinkle', Material: 'Moose', ...},
//  {Name: 'Rocky', Material: 'squirrel', ...}
//  ...
// ]


// ==============================
// ******* csvFileReader ********
// ==============================

// This function processes multiple CSV files. It utilizes D3's csvParse method
// to convert the data into lists of objects with the CSV column names as keys.
// The rows from separate files are combined to form one object. This is because
// Excel spreadsheets with multiple sheets can only be saved to CSV by saving a
// new file for each sheet (the tabs for switching between Excel sheets are
// along the bottom of an Excel document). Therefore, if you would like to upload
// multiple files where the rows are not combined, you must call this function
// multiple times.

// One complication may arise when this function is called, because JavaScript's
// FileReader object is asynchronous. Therefore, there is no way of knowing,
// in the event that two files contian the same column with different data,
// which data will be written to the key.
// TODO: handle different data values between files
export function csvFilesReader(files) {
  let totalData = []
  let counter = 0

  return new Promise((resolve, reject) => {
    // iterate through the selected files
    for(let i=0; i<files.length; i++) {
      ((file) => {
        let reader = new FileReader() // create a FileReader for each file
        // Because FileReader is asynchronous, there is no guaranteed order in
        // which each file will fire the onloadend event
        reader.onloadend = (e) => {
          // TODO: handle loading errors
          let fileData = csvParse(e.target.result) // D3's csvParse method
          for(let j=0; j<fileData.length; j++) {
            totalData[j] = {...totalData[j], ...fileData[j]} //combine CSV rows
          }
          // counter is used to know when all of the files have fired onloadend
          counter++
          if(counter == files.length) {
            resolve(totalData)
          }
        }
        reader.readAsText(file)
      })(files[i]) // Immediately-Invoked Function Expression (IIFE)
    }
  })
}
