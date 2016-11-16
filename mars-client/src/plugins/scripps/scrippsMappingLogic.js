export const ORG_SAMPLE_INITIAL_STATE = {}

// DEVICE
export const collectionMethod = (value) => {
  switch (value) {
    case 'core (undifferentiated)':
      return 'Coring'
    case 'core, box': // (G)
      return 'Coring>BoxCorer'
    case 'core, camera mounted': // (H)
      return 'Coring>CameraMounted'
    case 'core, dart': // (N)
      // TODO: find out what this means
      return 'Unknown'
    case 'core, free-fall': // (E)
      return 'Coring>FreeFallCorer'
    case 'core, gravity': // (D)
      return 'Coring>GravityCorer'
    case 'core, hand-held': // (J)
      return 'Coring>HandHeldCorer'
    case 'core, kastenlot': // (P)
      return 'Coring>KastenlotCorer'
    case 'core, multicorer': // (O)
      return 'Coring>MultiCorer'
    case 'core, piston': // (C)
      return 'Coring>PistonCorer'
    case 'core, piston(giant)': // (V)
      return 'Coring>PistonCorer>Giant'
    case 'core, submersible mounted': // (I)
      return 'Coring>SubmersibleMountedCorer'
    case 'core, vibrating': // (F)
      return 'Coring>VibratingCorer'
    case 'core, trigger wt.': // (T)
      return 'Coring>TriggerWeightCorer'
    case 'downhole coring': // (x)
      //TODO: find out what this maps to
      return 'Unknown'
    case 'dredge, rock': // (R)
      return 'Dredging'
    case 'drill (undifferentiated)':
      return 'Coring>DrillCorer'
    case 'drill, rock': // (L)
      return 'Coring>DrillCorer'
    case 'drill, sediment': // (K)
      return 'Coring>DrillCorer'
    case 'grab': // (A)
      return 'Grab'
    case 'grab, ROV': // (Y)
      return 'Grab>ROV'
    case 'probe': // (w)
      return 'Probe'
    case 'suspended sediment': // (M)
      return 'Suspended sediment'
    case 'trap, sediment': // (S)
      return 'Sediment trap'
    case 'trawl': // (3)
      //TODO: find out what this maps to
      return 'Unknown'
    case 'unknown device': // (U)
      return 'Unknown'
    default:
      return 'Unknown'
  }
}

// BEGIN_DATE
export const collectionStartDate = (value) => {
  return scrippsDate(value).toISOString()
}

// END_DATE
export const collectionEndDate = (value) => {
  return scrippsDate(value).toISOString()
}

// WATER_DEPTH
export const elevation = (value) => {
  return -1 * value
}

// END_WATER_DEPTH
export const elevationEnd = (value) => {
  return -1 * value
}

// CORED_LENGTH, CORED_LENGTH_MM, CORED_DIAM, CORED_DIAM_MM
export const size = (value, originalKey) => {
  if(originalKey == 'CORED_LENGTH'){
    console.log('CORED_LENGTH')
    return value
  } else {
    //console.log('called')
    return value / 10
  }
}

// CORED_LENGTH, CORED_LENGTH_MM, CORED_DIAM, CORED_DIAM_MM
export const sizeUnit = (value) => {
  return 'CM'
}


// ======================
// Scripps Helpers
// ======================

//creates a date from a string in the form YYYYDDMM
const scrippsDate = (scrippsValue) => {
  const y = scrippsValue.substr(0,4)
  const m = scrippsValue.substr(6,2)
  const d = scrippsValue.substr(4,2)
  return new Date(y, m, d)
}
