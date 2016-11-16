
// This file contains logic for dynamically loading maps and mapping
// scripts to the program.

const MODULE_LOCATION = '../plugins'
const req = require.context('../plugins', true, /index\.js$/)

// This function returns an array of the organization names
// associated with the mappings. These names come directly
// from the directory tree.
export function listModules() {
  return req.keys().map((path) => {
    return path.replace(/\.\//, '').replace(/\/index\.js$/, '')
  })
}

export function loadModule(filename) {
  let req = require.context('../plugins', true, /index\.js$/)
  console.log(req.keys())
  let mappingModule = req(req.keys()[0]).default()
  let mappingLogic = mappingModule.mappingLogic
  let map = mappingModule.map

  console.log(map)
}
