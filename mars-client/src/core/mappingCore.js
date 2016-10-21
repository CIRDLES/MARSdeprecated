import {Map, List} from 'immutable'

let mappingLogic = require('../server/defaultMappingLogic')

export const UPLOAD_SAMPLE_INITIAL_STATE = Map(mappingLogic.initialSample)

/////////////////////////////////////////////////////////
// consider moving these settings to another location
export const setMap = (mapFunctionLocation) => {
  let customLogic = require(mapFunctionLocation)
  mappingLogic = Object.assign({}, mappingLogic, customLogic)
}

export const resetMap = () => {
  let mappingLogic = require('../server/defaultMappingLogic')
}
/////////////////////////////////////////////////////////


export const initUserCode = (state, value, originalKey) => {
  return state.set('user_code', Map({
    key: 'user_code',
    value: mappingLogic.userCode(value),
    originalKey,
    originalValue: value
  }))
}

export const initSampleType = (state, value, originalKey) => {
  return state.set('sample_type', Map({
    key: 'sample_type',
    value: mappingLogic.sampleType(value),
    originalKey,
    originalValue: value
  }))
}

export const initName = (state, value, originalKey) => {
  return state.set('name', Map({
    key: 'name',
    value: mappingLogic.sampleName(value),
    originalKey,
    originalValue: value
  }))
}

export const initMaterial = (state, value, originalKey) => {
  return state.set('material', Map({
    key: 'material',
    value: mappingLogic.material(value),
    originalKey,
    originalValue: value
  }))
}

export const initIgsn = (state, value, originalKey) => {
  return state.set('igsn', Map({
    key: 'igsn',
    value: mappingLogic.igsn(value),
    originalKey,
    originalValue: value
  }))
}

export const initParentIgsn = (state, value, originalKey) => {
  return state.set('parent_igsn', Map({
    key: 'parent_igsn',
    value: mappingLogic.parentIgsn(value),
    originalKey,
    originalValue: value
  }))
}

export const initIsPrivate = (state, value, originalKey) => {
  return state.set('is_private', Map({
    key: 'is_private',
    value: mappingLogic.isPrivate(value),
    originalKey,
    originalValue: value
  }))
}

export const initPublishDate = (state, value, originalKey) => {
  return state.set('publish_date', Map({
    key: 'publish_date',
    value: mappingLogic.publishDate(value),
    originalKey,
    originalValue: value
  }))
}

export const initClassification = (state, value, originalKey) => {
  return state.set('classification', Map({
    key: 'classification',
    value: mappingLogic.classification(value),
    originalKey,
    originalValue: value
  }))
}

export const initClassificationComment = (state, value, originalKey) => {
  const keyValue = Map({
    key: 'classification_comment',
    value: mappingLogic.classificationComment(value),
    originalKey,
    originalValue: value
  })
  const classificationCommentValue = state.get('classification_comment')
  if(Map.isMap(classificationCommentValue)) {
    return state.set('classification_comment', List([classificationCommentValue, keyValue]))
  } else if(List.isList(classificationCommentValue)) {
    return state.set('classification_comment', classificationCommentValue.push(keyValue))
  } else {
    return state.set('classification_comment', keyValue)
  }
}

export const initFieldName = (state, value, originalKey) => {
  return state.set('field_name', Map({
    key: 'field_name',
    value: mappingLogic.fieldName(value),
    originalKey,
    originalValue: value
  }))
}

export const initDescription = (state, value, originalKey) => {
  const keyValue = Map({
    key: 'description',
    value: mappingLogic.description(value),
    originalKey,
    originalValue: value
  })
  const descriptionValue = state.get('description')
  if(Map.isMap(descriptionValue)) {
    return state.set('description', List([descriptionValue, keyValue]))
  } else if(List.isList(descriptionValue)) {
    return state.set('description', descriptionValue.push(keyValue))
  } else {
    return state.set('description', keyValue)
  }
}

export const initAgeMin = (state, value, originalKey) => {
  return state.set('age_min', Map({
    key: 'age_min',
    value: mappingLogic.ageMin(value),
    originalKey,
    originalValue: value
  }))
}

export const initAgeMax = (state, value, originalKey) => {
  return state.set('age_max', Map({
    key: 'age_max',
    value: mappingLogic.ageMax(value),
    originalKey,
    originalValue: value
  }))
}

export const initAgeUnit = (state, value, originalKey) => {
  return state.set('age_unit', Map({
    key: 'age_unit',
    value: mappingLogic.ageUnit(value),
    originalKey,
    originalValue: value
  }))
}

export const initGeologicalAge = (state, value, originalKey) => {
  return state.set('geological_age', Map({
    key: 'geological_age',
    value: mappingLogic.geologicalAge(value),
    originalKey,
    originalValue: value
  }))
}

export const initGeologicalUnit = (state, value, originalKey) => {
  return state.set('geological_unit', Map({
    key: 'geological_unit',
    value: mappingLogic.geologicalUnit(value),
    originalKey,
    originalValue: value
  }))
}

export const initCollectionMethod = (state, value, originalKey) => {
  return state.set('collection_method', Map({
    key: 'collection_method',
    value: mappingLogic.collectionMethod(value),
    originalKey,
    originalValue: value
  }))
}

export const initCollectionMethodDescr = (state, value, originalKey) => {
  const keyValue = Map({
    key: 'collection_method_descr',
    value: mappingLogic.collectionMethodDescr(value),
    originalKey,
    originalValue: value
  })
  const collectionMehtodDescrValue = state.get('collection_method_descr')
  if(Map.isMap(collectionMehtodDescrValue)) {
    return state.set('collection_method_descr', List([collectionMehtodDescrValue, keyValue]))
  } else if(List.isList(collectionMehtodDescrValue)) {
    return state.set('collection_method_descr', collectionMehtodDescrValue.push(keyValue))
  } else {
    return state.set('collection_method_descr', keyValue)
  }
}

export const initSize = (state, value, originalKey) => {
  return state.set('size', Map({
    key: 'size',
    value: mappingLogic.sampleSize(value),
    originalKey,
    originalValue: value
  }))
}

export const initSizeUnit = (state, value, originalKey) => {
  return state.set('size_unit', Map({
    key: 'size_unit',
    value: mappingLogic.sizeUnit(value),
    originalKey,
    originalValue: value
  }))
}

export const initSampleComment = (state, value, originalKey) => {
  const keyValue = Map({
    key: 'sample_comment',
    value: mappingLogic.sampleComment(value),
    originalKey,
    originalValue: value
  })
  const sampleCommentValue = state.get('sample_comment')
  if(Map.isMap(sampleCommentValue)) {
    return state.set('sample_comment', List([sampleCommentValue, keyValue]))
  } else if(List.isList(sampleCommentValue)) {
    return state.set('sample_comment', sampleCommentValue.push(keyValue))
  } else {
    return state.set('sample_comment', keyValue)
  }
}

export const initPurpose = (state, value, originalKey) => {
  return state.set('purpose', Map({
    key: 'purpose',
    value: mappingLogic.sampleComment(value),
    originalKey,
    originalValue: value
  }))
}

export const initLatitude = (state, value, originalKey) => {
  return state.set('latitude', Map({
    key: 'latitude',
    value: mappingLogic.latitude(value),
    originalKey,
    originalValue: value
  }))
}

export const initLongitude = (state, value, originalKey) => {
  return state.set('longitude', Map({
    key: 'longitude',
    value: mappingLogic.longitude(value),
    originalKey,
    originalValue: value
  }))
}

export const initLatitudeEnd = (state, value, originalKey) => {
  return state.set('latitude_end', Map({
    key: 'latitude_end',
    value: mappingLogic.latitudeEnd(value),
    originalKey,
    originalValue: value
  }))
}

export const initLongitudeEnd = (state, value, originalKey) => {
  return state.set('longitude_end', Map({
    key: 'longitude_end',
    value: mappingLogic.longitudeEnd(value),
    originalKey,
    originalValue: value
  }))
}

export const initElevation = (state, value, originalKey) => {
  return state.set('elevation', Map({
    key: 'elevation',
    value: mappingLogic.elevation(value),
    originalKey,
    originalValue: value
  }))
}

export const initElevationEnd = (state, value, originalKey) => {
  return state.set('elevation_end', Map({
    key: 'elevation_end',
    value: mappingLogic.elevationEnd(value),
    originalKey,
    originalValue: value
  }))
}

export const initElevationUnit = (state, value, originalKey) => {
  return state.set('elevation_unit', Map({
    key: 'elevation_unit',
    value: mappingLogic.elevationUnit(value),
    originalKey,
    originalValue: value
  }))
}

export const initVerticalDatum = (state, value, originalKey) => {
  return state.set('vertical_datum', Map({
    key: 'vertical_datum',
    value: mappingLogic.verticalDatum(value),
    originalKey,
    originalValue: value
  }))
}

export const initNorthing = (state, value, originalKey) => {
  return state.set('northing', Map({
    key: 'northing',
    value: mappingLogic.northing(value),
    originalKey,
    originalValue: value
  }))
}

export const initEasting = (state, value, originalKey) => {
  return state.set('easting', Map({
    key: 'easting',
    value: mappingLogic.easting(value),
    originalKey,
    originalValue: value
  }))
}

export const initZone = (state, value, originalKey) => {
  return state.set('zone', Map({
    key: 'zone',
    value: mappingLogic.zone(value),
    originalKey,
    originalValue: value
  }))
}

export const initNavigationType = (state, value, originalKey) => {
  return state.set('navigation_type', Map({
    key: 'navigation_type',
    value: mappingLogic.navigationType(value),
    originalKey,
    originalValue: value
  }))
}

export const initPrimaryLocationType = (state, value, originalKey) => {
  return state.set('primary_location_type', Map({
    key: 'primary_location_type',
    value: mappingLogic.primaryLocationType(value),
    originalKey,
    originalValue: value
  }))
}

export const initPrimaryLocationName = (state, value, originalKey) => {
  return state.set('primary_location_name', Map({
    key: 'primary_location_name',
    value: mappingLogic.primaryLocationName(value),
    originalKey,
    originalValue: value
  }))
}

export const initLocationDescription = (state, value, originalKey) => {
  const keyValue = Map({
    key: 'location_description',
    value: mappingLogic.locationDescription(value),
    originalKey,
    originalValue: value
  })
  const locationDescriptionValue = state.get('location_description')
  if(Map.isMap(locationDescriptionValue)) {
    return state.set('location_description', List([locationDescriptionValue, keyValue]))
  } else if(List.isList(locationDescriptionValue)) {
    return state.set('location_description', locationDescriptionValue.push(keyValue))
  } else {
    return state.set('location_description', keyValue)
  }
}

export const initLocality = (state, value, originalKey) => {
  return state.set('locality', Map({
    key: 'locality',
    value: mappingLogic.locality(value),
    originalKey,
    originalValue: value
  }))
}

export const initLocalityDescription = (state, value, originalKey) => {
  const keyValue = Map({
    key: 'locality_description',
    value: mappingLogic.localityDescription(value),
    originalKey,
    originalValue: value
  })
  const localityDescriptionValue = state.get('locality_description')
  if(Map.isMap(localityDescriptionValue)) {
    return state.set('locality_description', List([localityDescriptionValue, keyValue]))
  } else if(List.isList(localityDescriptionValue)) {
    return state.set('locality_description', localityDescriptionValue.push(keyValue))
  } else {
    return state.set('locality_description', keyValue)
  }
}

export const initCountry = (state, value, originalKey) => {
  return state.set('country', Map({
    key: 'country',
    value: mappingLogic.country(value),
    originalKey,
    originalValue: value
  }))
}

export const initProvince = (state, value, originalKey) => {
  return state.set('province', Map({
    key: 'province',
    value: mappingLogic.province(value),
    originalKey,
    originalValue: value
  }))
}

export const initCounty = (state, value, originalKey) => {
  return state.set('county', Map({
    key: 'county',
    value: mappingLogic.county(value),
    originalKey,
    originalValue: value
  }))
}

export const initCity = (state, value, originalKey) => {
  return state.set('city', Map({
    key: 'city',
    value: mappingLogic.city(value),
    originalKey,
    originalValue: value
  }))
}

export const initCruiseFieldPrgrm = (state, value, originalKey) => {
  return state.set('cruise_field_prgrm', Map({
    key: 'cruise_field_prgrm',
    value: mappingLogic.cruiseFieldPrgrm(value),
    originalKey,
    originalValue: value
  }))
}

export const initPlatformType = (state, value, originalKey) => {
  return state.set('platform_type', Map({
    key: 'platform_type',
    value: mappingLogic.platformType(value),
    originalKey,
    originalValue: value
  }))
}

export const initPlatformName = (state, value, originalKey) => {
  return state.set('platform_name', Map({
    key: 'platform_name',
    value: mappingLogic.platformName(value),
    originalKey,
    originalValue: value
  }))
}

export const initPlatformDescr = (state, value, originalKey) => {
  const keyValue = Map({
    key: 'platform_descr',
    value: mappingLogic.platformDescr(value),
    originalKey,
    originalValue: value
  })
  const platformDescrValue = state.get('platform_descr')
  if(Map.isMap(platformDescrValue)) {
    return state.set('platform_descr', List([platformDescrValue, keyValue]))
  } else if(List.isList(platformDescrValue)) {
    return state.set('platform_descr', platformDescrValue.push(keyValue))
  } else {
    return state.set('platform_descr', keyValue)
  }
}

export const initLaunchPlatformName = (state, value, originalKey) => {
  return state.set('launch_platform_name', Map({
    key: 'launch_platform_name',
    value: mappingLogic.launchPlatformName(value),
    originalKey,
    originalValue: value
  }))
}

export const initLaunchId = (state, value, originalKey) => {
  return state.set('launch_id', Map({
    key: 'launch_id',
    value: mappingLogic.launchId(value),
    originalKey,
    originalValue: value
  }))
}

export const initLaunchTypeName = (state, value, originalKey) => {
  return state.set('launch_type_name', Map({
    key: 'launch_type_name',
    value: mappingLogic.launchTypeName(value),
    originalKey,
    originalValue: value
  }))
}

export const initCollector = (state, value, originalKey) => {
  return state.set('collector', Map({
    key: 'collector',
    value: mappingLogic.collector(value),
    originalKey,
    originalValue: value
  }))
}

export const initCollectorDetail = (state, value, originalKey) => {
  const keyValue = Map({
    key: 'collector_detail',
    value: mappingLogic.collectorDetail(value),
    originalKey,
    originalValue: value
  })
  const collectorDetailValue = state.get('collector_detail')
  if(Map.isMap(collectorDetailValue)) {
    return state.set('collector_detail', List([collectorDetailValue, keyValue]))
  } else if(List.isList(collectorDetailValue)) {
    return state.set('collector_detail', collectorDetailValue.push(keyValue))
  } else {
    return state.set('collector_detail', keyValue)
  }
}

export const initCollectionStartDate = (state, value, originalKey) => {
  return state.set('collection_start_date', Map({
    key: 'collection_start_date',
    value: mappingLogic.collectionStartDate(value),
    originalKey,
    originalValue: value
  }))
}

export const initCollectionEndDate = (state, value, originalKey) => {
  return state.set('collection_end_date', Map({
    key: 'collection_end_date',
    value: mappingLogic.collectionEndDate(value),
    originalKey,
    originalValue: value
  }))
}

export const initCollectionDatePrecision = (state, value, originalKey) => {
  return state.set('collection_date_precision', Map({
    key: 'collection_date_precision',
    value: mappingLogic.collectionDatePrecision(value),
    originalKey,
    originalValue: value
  }))
}

export const initCurrentArchive = (state, value, originalKey) => {
  return state.set('current_archive', Map({
    key: 'current_archive',
    value: mappingLogic.currentArchive(value),
    originalKey,
    originalValue: value
  }))
}

export const initCurrentArchiveContact = (state, value, originalKey) => {
  return state.set('current_archive_contact', Map({
    key: 'current_archive_contact',
    value: mappingLogic.currentArchiveContact(value),
    originalKey,
    originalValue: value
  }))
}

export const initOriginalArchive = (state, value, originalKey) => {
  return state.set('original_archive', Map({
    key: 'original_archive',
    value: mappingLogic.originalArchive(value),
    originalKey,
    originalValue: value
  }))
}

export const initDepthMin = (state, value, originalKey) => {
  return state.set('depth_min', Map({
    key: 'depth_min',
    value: mappingLogic.depthMin(value),
    originalKey,
    originalValue: value
  }))
}

export const initDepthMax = (state, value, originalKey) => {
  return state.set('depth_max', Map({
    key: 'depth_max',
    value: mappingLogic.depthMax(value),
    originalKey,
    originalValue: value
  }))
}

export const initDepthScale = (state, value, originalKey) => {
  return state.set('depth_scale', Map({
    key: 'depth_scale',
    value: mappingLogic.depthScale(value),
    originalKey,
    originalValue: value
  }))
}

export const initSampleOtherNames = (state, value, originalKey) => {
  const keyValue = Map({
    key: 'sample_other_names',
    value: mappingLogic.sampleOtherNames(value),
    originalKey,
    originalValue: value
  })
  const sampleOtherNamesValue = state.get('sample_other_names')
  if(Map.isMap(sampleOtherNamesValue)) {
    return state.set('sample_other_names', List([sampleOtherNamesValue, keyValue]))
  } else if(List.isList(sampleOtherNamesValue)) {
    return state.set('sample_other_names', sampleOtherNamesValue.push(keyValue))
  } else {
    return state.set('sample_other_names', keyValue)
  }
}
