
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

}

return {map, logic}
