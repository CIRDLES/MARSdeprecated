// ======================
// Scripps Helpers
// ======================

//creates a date from a string in the form YYYYDDMM
const scrippsDate = (scrippsValue) => {
  const y = scrippsValue.substr(0,4)
  const d = scrippsValue.substr(6,2)
  const m = scrippsValue.substr(4,2)
  return y + '-' + m + '-' + d + 'T00:00:00Z'
}

// convert mm to cm
const size = (scrippsValue, scrippsKey) => {
  return scrippsKey == 'CORED_LENGTH_MM' ? scrippsValue/10 : scrippsValue
}

// creates a key value string from originalKey and new value
const keyValueString = (scrippsValue, scrippsKey) => {
  return scrippsKey + ':' + scrippsValue
}

// creates a delimited list of values
const delimit = (valueArray) => {
  return valueArray.join(';')
}

// adds values together (specifically CORED_LENGTH and CORED_LENGTH_MM)
const summate = (valueArray) => {
  return valueArray.reduce((a,b) => a+Number(b), 0)
}

let map = {
  name: "SAMPLE",
  igsn: "IGSN",
  classification: "ROCK_LITH",
  field_name: ["LITH1", "TEXT1"],
  description: ["DESCRIPTION", "ROCK_MIN", "WEATH_META", "REMARK", "EXHAUST_CODE"],
  age_min: "ABSOLUTE_AGE_TOP",
  age_max: "ABSOLUTE_AGE_BOT",
  geological_age: "AGE",
  collection_method: "DEVICE",
  size: ["CORED_LENGTH", "CORED_LENGTH_MM"],
  size_unit: "CORED_LENGTH",  // get the size unit from the string
  sample_comment: ["STORAGE_METH", "CORED_DIAM_MM", "SAMPLE_COMMENTS", "WEIGHT", "CORED_DIAM"],
  latitude: "LAT",
  longitude: "LON",
  latitude_end: "END_LATMIN",
  longitude_end: "END_LON",
  elevation: "WATER_DEPTH",
  elevation_end: "END_WATER_DEPTH",
  primary_location_type: "PROVINCE",
  cruise_field_prgrm: "CRUISE",
  platform_name: "PLATFORM",
  collector: "PI",
  collection_start_date: "BEGIN_DATE",
  collection_end_date: "END_DATE",
  current_archive: "FACILITY_CODE",
  original_archive: "FACILITY_CODE"
}

let logic = {
  collection_start_date: scrippsDate,
  collection_end_date: scrippsDate,
  field_name: keyValueString,
  description: keyValueString,
  sample_comment: keyValueString,
  size: size
}

let combinations = {
  field_name: delimit,
  description: delimit,
  sample_comment: delimit,
  size: summate
}

return {map, logic, combinations}
