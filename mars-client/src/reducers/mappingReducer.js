import * as actions from '../actionTypes'
import * as core from '../core/mappingCore'

export default function sampleToUpload(state = core.UPLOAD_SAMPLE_INITIAL_STATE, action) {
  switch(action.type) {
    case actions.INIT_SAMPLE_USERCODE:
      return core.initUserCode(state, action.value, action.originalKey)
    case actions.INIT_SAMPLE_SAMPLE_TYPE:
      return core.initSampleType(state, action.value, action.originalKey)
    case actions.INIT_SAMPLE_NAME:
      return core.initName(state, action.value, action.originalKey)
    case actions.INIT_SAMPLE_MATERIAL:
      return core.initMaterial(state, action.value, action.originalKey)
    case actions.INIT_SAMPLE_IGSN:
      return core.initIgsn(state, action.value, action.originalKey)
    case actions.INIT_SAMPLE_IS_PRIVATE:
      return core.initIsPrivate(state, action.value, action.originalKey)
    case actions.INIT_SAMPLE_PUBLISH_DATE:
      return core.initPublishDate(state, action.value, action.originalKey)
    case actions.INIT_SAMPLE_CLASSIFICATION:
      return core.initClassification(state, action.value, action.originalKey)
    case actions.INIT_SAMPLE_CLASSIFICATION_COMMENT:
      return core.initClassificationComment(state, action.value, action.originalKey)
    case actions.INIT_SAMPLE_FIELD_NAME:
      return core.initFieldName(state, action.value, action.originalKey)
    case actions.INIT_SAMPLE_DESCRIPTION:
      return core.initDescription(state, action.value, action.originalKey)
    case actions.INIT_SAMPLE_AGE_MIN:
      return core.initAgeMin(state, action.value, action.originalKey)
    case actions.INIT_SAMPLE_AGE_MAX:
      return core.initAgeMax(state, action.value, action.originalKey)
    case actions.INIT_SAMPLE_AGE_UNIT:
      return core.initAgeUnit(state, action.value, action.originalKey)
    case actions.INIT_SAMPLE_GEOLOGICAL_AGE:
      return core.initGeologicalAge(state, action.value, action.originalKey)
    case actions.INIT_SAMPLE_GEOLOGICAL_UNIT:
      return core.initGeologicalUnit(state, action.value, action.originalKey)
    case actions.INIT_SAMPLE_COLLECTION_METHOD:
      return core.initCollectionMethod(state, action.value, action.originalKey)
    case actions.INIT_SAMPLE_COLLECTION_METHOD_DESCR:
      return core.initCollectionMethodDescr(state, action.value, action.originalKey)
    case actions.INIT_SAMPLE_SIZE:
      return core.initSize(state, action.value, action.originalKey)
    case actions.INIT_SAMPLE_SIZE_UNIT:
      return core.initSizeUnit(state, action.value, action.originalKey)
    case actions.INIT_SAMPLE_SAMPLE_COMMENT:
      return core.initSampleComment(state, action.value, action.originalKey)
    case actions.INIT_SAMPLE_PURPOSE:
      return core.initSamplePurpose(state, action.value, action.originalKey)
    case actions.INIT_SAMPLE_LATITUDE:
      return core.initLatitude(state, action.value, action.originalKey)
    case actions.INIT_SAMPLE_LONGITUDE:
      return core.initLongitude(state, action.value, action.originalKey)
    case actions.INIT_SAMPLE_LATITUDE_END:
      return core.initLatitudeEnd(state, action.value, action.originalKey)
    case actions.INIT_SAMPLE_LONGITUDE_END:
      return core.initLongitudeEnd(state, action.value, action.originalKey)
    case actions.INIT_SAMPLE_ELEVATION:
      return core.initElevation(state, action.value, action.originalKey)
    case actions.INIT_SAMPLE_ELEVATION_END:
      return core.initElevationEnd(state, action.value, action.originalKey)
    case actions.INIT_SAMPLE_VERTICAL_DATUM:
      return core.initVerticalDatum(state, action.value, action.originalKey)
    case actions.INIT_SAMPLE_NORTHING:
      return core.initNorthing(state, action.value, action.originalKey)
    case actions.INIT_SAMPLE_EASTING:
      return core.initEasting(state, action.value, action.originalKey)
    case actions.INIT_SAMPLE_ZONE:
      return core.initZone(state, action.value, action.originalKey)
    case actions.INIT_SAMPLE_NAVIGATION_TYPE:
      return core.initNavigationType(state, action.value, action.originalKey)
    case actions.INIT_SAMPLE_PRIMARY_LOCATION_TYPE:
      return core.initPrimaryLocationType(state, action.value, action.originalKey)
    case actions.INIT_SAMPLE_PRIMARY_LOCATION_NAME:
      return core.initPrimaryLocationName(state, action.value, action.originalKey)
    case actions.INIT_SAMPLE_LOCATION_DESCRIPTION:
      return core.initLocationDescription(state, action.value, action.originalKey)
    case actions.INIT_SAMPLE_LOCALITY:
      return core.initLocality(state, action.value, action.originalKey)
    case actions.INIT_SAMPLE_LOCALITY_DESCRIPTION:
      return core.initLocalityDescription(state, action.value, action.originalKey)
    case actions.INIT_SAMPLE_COUNTRY:
      return core.initCountry(state, action.value, action.originalKey)
    case actions.INIT_SAMPLE_PROVINCE:
      return core.initProvince(state, action.value, action.originalKey)
    case actions.INIT_SAMPLE_COUNTY:
      return core.initCounty(state, action.value, action.originalKey)
    case actions.INIT_SAMPLE_CITY:
      return core.initCity(state, action.value, action.originalKey)
    case actions.INIT_SAMPLE_CRUISE_FIELD_PRGRM:
      return core.initCruiseFieldPrgrm(state, action.value, action.originalKey)
    case actions.INIT_SAMPLE_PLATFORM_TYPE:
      return core.initPlatformType(state, action.value, action.originalKey)
    case actions.INIT_SAMPLE_PLATFORM_NAME:
      return core.initPlatformName(state, action.value, action.originalKey)
    case actions.INIT_SAMPLE_PLATFORM_DESCR:
      return core.initPlatformDescr(state, action.value, action.originalKey)
    case actions.INIT_SAMPLE_LAUNCH_PLATFORM_NAME:
      return core.initLaunchPlatformName(state, action.value, action.originalKey)
    case actions.INIT_SAMPLE_LAUNCH_ID:
      return core.initLaunchId(state, action.value, action.originalKey)
    case actions.INIT_SAMPLE_LAUNCH_TYPE_NAME:
      return core.initLaunchTypeName(state, action.value, action.originalKey)
    case actions.INIT_SAMPLE_COLLECTOR:
      return core.initCollector(state, action.value, action.originalKey)
    case actions.INIT_COLLECTOR_DETAIL:
      return core.initCollectorDetail(state, action.value, action.originalKey)
    case actions.INIT_SAMPLE_COLLECTION_START_DATE:
      return core.initCollectionStartDate(state, action.value, action.originalKey)
    case actions.INIT_SAMPLE_COLLECTION_END_DATE:
      return core.initCollectionEndDate(state, action.value, action.originalKey)
    case actions.INIT_SAMPLE_COLLECTION_DATE_PRECISION:
      return core.initCollectionDatePrecision(state, action.value, action.originalKey)
    case actions.INIT_SAMPLE_CURRENT_ARCHIVE:
      return core.initCurrentArchive(state, action.value, action.originalKey)
    case actions.INIT_SAMPLE_CURRENT_ARCHIVE_CONTACT:
      return core.initCurrentArchiveContact(state, action.value, action.originalKey)
    case actions.INIT_SAMPLE_ORIGINAL_ARCHIVE:
      return core.initOriginalArchive(state, action.value, action.originalKey)
    case actions.INIT_SAMPLE_DEPTH_MIN:
      return core.initDepthMin(state, action.value, action.originalKey)
    case actions.INIT_SAMPLE_DEPTH_MAX:
      return core.initDepthMax(state, action.value, action.originalKey)
    case actions.INIT_SAMPLE_DEPTH_SCALE:
      return core.initDepthScale(state, action.value, action.originalKey)
    case actions.INIT_SAMPLE_OTHER_NAMES:
      return core.initOtherNames(state, action.value, action.originalKey)
    default:
      return state
  }
}
