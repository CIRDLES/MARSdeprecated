
const sampleMap = (valueObject, map) => {

  var sample = {
    user_code: localStorage.usercode,
    sample_type: 'Core',
    material: 'Rock'
  }

  // Iterate through value object
  for (var property in valueObject) {
    if (valueObject.hasOwnProperty(property) && valueObject[property] && map.hasOwnProperty(property)) {
      sample[map[property]] = valueObject[property]
    }
  }
  return sample
}

export default sampleMap
