import {Map} from 'immutable'

export const ORG_SAMPLE_INITIAL_STATE = Map({})

export function userCode(value) {
  return value + "lkdjfl"
}

// FACILITY_CODE
export const originalArchive = (state, value) => {
  return state.set('original_archive', value)
}

// FACILITY_CODE
export const currentArchive = (state, value) => {
  return state.set('current_archive', value)
}

// PLATFORM
export const platform = (state, value) => {
  return state.set('platform_name', value)
}

// CRUISE
export const cruiseFieldPrgrm = (state, value) => {
  return state.set('cruise_field_prgrm', value)
}

// SAMPLE
export const name = (state, value) => {
  return state.set('name', value)
}

// DEVICE
export const collectionMethod = (state, value) => {
  switch (value) {
    case 'core (undifferentiated)':
      return state.set('collection_method', 'Coring')
    case 'core, box (G)':
      return state.set('collection_method', 'Coring>BoxCorer')
    case 'core, camera mounted (H)':
      return state.set('collection_method', 'Coring>CameraMounted')
    case 'core, dart (N)':
      // TODO: find out what this means
      return state
    case 'core, free-fall (E)':
      return state.set('collection_method', 'Coring>FreeFallCorer')
    case 'core, gravity (D)':
      return state.set('collection_method', 'Coring>GravityCorer')
    case 'core, hand-held (J)':
      return state.set('collection_method', 'Coring>HandHeldCorer')
    case 'core, kastenlot (P)':
      return state.set('collection_method', 'Coring>KastenlotCorer')
    case 'core, multicorer (O)':
      return state.set('collection_method', 'Coring>MultiCorer')
    case 'core, piston (C)':
      return state.set('collection_method', 'Coring>PistonCorer')
    case 'core, piston(giant) (V)':
      return state.set('collection_method', 'Coring>PistonCorer>Giant')
    case 'core, submersible mounted (I)':
      return state.set('collection_method', 'Coring>SubmersibleMountedCorer')
    case 'core, vibrating (F)':
      return state.set('collection_method', 'Coring>VibratingCorer')
    case 'core, trigger wt. (T)':
      return state.set('collection_method', 'Coring>TriggerWeightCorer')
    case 'downhole coring (X)':
      //TODO: find out what this maps to
      return state
    case 'dredge, rock (R)':
      return state.set('collection_method', 'Dredging')
    case 'drill (undifferentiatd)':
      return state.set('collection_method', 'Coring>DrillCorer')
    case 'drill, rock (L)':
      return state.set('collection_method', 'Coring>DrillCorer')
    case 'drill, sediment (K)':
      return state.set('collection_method', 'Coring>DrillCorer')
    case 'grab (A)':
      return state.set('collection_method', 'Grab')
    case 'grab, ROV (Y)':
      return state.set('collection_method', 'Grab>ROV')
    case 'probe (W)':
      return state.set('collection_method', 'Probe')
    case 'suspended sediment (M)':
      return state.set('collection_method', 'Suspended sediment')
    case 'trap, sediment (S)':
      return state.set('collection_method', 'Sediment trap')
    case 'trawl (3)':
      //TODO: find out what this maps to
      return state
    case 'unknown device (U)':
      return state.set('collection_method', 'Unknown')
    default:
      return state.set('collection_method', 'Unknown')
  }
}

// BEGIN_DATE
export const collectionStartDate = (state, value) => {
  return state.set('collection_start_date', value.toISOString().substr(0,10))
}

// END_DATE
export const collectionEndDate = (state, value) => {
  return state.set('collection_end_date', value.toISOString().substr(0,10))
}

// LAT
export const latitude = (state, value) => {
  return state.set('latitude', value)
}

// END_LATMIN
export const latitudeEnd = (state, value) => {
  return state.set('latitude_end', value)
}

// LON
export const longitude = (state, value) => {
  return state.set('longitude', value)
}

// END_LON
export const longitudeEnd = (state, value) => {
  return state.set('longitude_end', value)
}

// WATER_DEPTH
export const elevation = (state, value) => {
  return state.set('elevation', (-1 * parseFloat(value)).toString())
}

// END_WATER_DEPTH
export const elevationEnd = (state, value) => {
  return state.set('elevation_end', (-1 * parseFloat(value)).toString())
}

// CORED_LENGTH, CORED_LENGTH_MM, CORED_DIAM, CORED_DIAM_MM
export const size = (state, value) => {
  //TODO: Implement this function
  return state
}

// CORED_LENGTH, CORED_LENGTH_MM, CORED_DIAM, CORED_DIAM_MM
export const sizeUnit = (state, value) => {
  //TODO: Implement this function
  return state
}

// PI
export const collector = (state, value) => {
  return state.set('collector', value)
}

// PI
export const chiefScientist = (state, value) => {
  return state.set('chief_scientist', value)
}

// PROVINCE
export const primaryLocationType = (state, value) => {
  // TODO: SESAR has a suggested list. Mapping from NOAA's constrained list?
  return state.set('primary_location_type', value)
}

// IGSN
export const igsn = (state, value) => {
  return state.set('igsn', value)
}

// SAMPLE_COMMENTS
export const sampleComments = (state, key, value) => {
  if(state.get('sample_comments')) {
    state = state.set('sample_comments', state.get('sample_comments') + ', ' + key + ':' + value)
  } else {
    state.set('sample_comments', key + ':' + value)
  }
}

// STORAGE_METH
export const comment = (state, key, value) => {
  if(state.get('comment')) {
    state = state.set('comment', state.get('comment') + ', ' + key + ':' + value)
  } else {
    state = state.set('comment', '' + key + ':' + value)
  }
  return state
}

// ======================
// Scripps Helpers
// ======================

//creates a date from a string in the form YYYYDDMM
const scrippsDate = (date) => {
  const y = scrippsValue.substr(0,4)
  const m = scrippsValue.substr(6,2)
  const d = scrippsValue.substr(4,2)
  return new Date(y, m, d)
}
