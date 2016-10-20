// The functions in this file can be overridden by separate mapping functions
// defined by an organization. This allows an organization to convert their
// field formats to the formats required by SESAR

// override this object if all of the samples uploaded from an organization will
// have the same value for a SESAR field. For example, if every sample has the same
// size_unit
export const initialSample = {}

// override these functions to manipulate format
export const userCode = (value) => value
export const sampleType = (value) => value
export const sampleName = (value) => value // SESAR uses "name", but name is a JavaScript property
export const material = (value) => value
export const igsn = (value) => value
export const parentIgsn = (value) => value
export const isPrivate = (value) => value
export const publishDate = (value) => value
export const classification = (value) => value
export const fieldName = (value) => value
export const ageMin = (value) => value
export const ageMax = (value) => value
export const ageUnit = (value) => value
export const geologicalAge = (value) => value
export const geologicalUnit = (value) => value
export const collectionMethod = (value) => value
export const sampleSize = (value) => value // SESAR uses "size", but size is a Javascript property
export const sizeUnit = (value) => value
export const purpose = (value) => value
export const latitude = (value) => value
export const longitude = (value) => value
export const latitudeEnd = (value) => value
export const longitudeEnd = (value) => value
export const elevation = (value) => value
export const elevationEnd = (value) => value
export const elevationUnit = (value) => value
export const verticalDatum = (value) => value
export const northing = (value) => value
export const easting = (value) => value
export const zone = (value) => value
export const navigationType = (value) => value
export const primaryLocationType = (value) => value
export const primaryLocationName = (value) => value
export const locality = (value) => value
export const country = (value) => value
export const province = (value) => value
export const county = (value) => value
export const city = (value) => value
export const cruiseFieldPrgrm = (value) => value
export const platformType = (value) => value
export const platformName = (value) => value
export const launchPlatformName = (value) => value
export const launchId = (value) => value
export const launchTypeName = (value) => value
export const collector = (value) => value
export const collectionStartDate = (value) => value
export const collectionEndDate = (value) => value
export const collectionDatePrecision = (value) => value
export const currentArchive = (value) => value
export const currentArchiveContact = (value) => value
export const originalArchive = (value) => value
export const depthMin = (value) => value
export const depthMax = (value) => value
export const depthScale = (value) => value
export const sampleOtherNames = (value) => value

// can be called multiple times during initialization to create
// a list of key value pairs
export const classificationComment = (value) => value
export const description = (value) => value
export const sampleComment = (value) => value
export const collectionMethodDescr = (value) => value
export const locationDescription = (value) => value
export const localityDescription = (value) => value
export const platformDescr = (value) => value
export const collectorDetail = (value) => value
