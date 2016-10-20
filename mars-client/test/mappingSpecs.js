import {expect} from 'chai'
import * as core from '../src/core/mappingCore'
import {Map, List} from 'immutable'

import test from '../src/reducers/mappingReducer'


describe('Default Mappings', () => {

  describe('Core state logic', () => {

    it('Initialize user_code', () => {
      const state = Map({})
      const value = 'TIN'
      const nextState = core.initUserCode(state, value, 'ORIG_USER_CODE')
      expect(nextState).to.equal(Map({
        user_code: Map({
          key: 'user_code',
          value: value,
          originalKey: 'ORIG_USER_CODE',
          originalValue: value
        })
      }))
    })

    it('Initialize sample_type', () => {
      const state = Map({})
      const value = 'Core'
      const nextState = core.initSampleType(state, value, 'ORIG_SAMPLE_TYPE')
      expect(nextState).to.equal(Map({
        sample_type: Map({
          key: 'sample_type',
          value,
          originalKey: 'ORIG_SAMPLE_TYPE',
          originalValue: value
        })
      }))
    })

    it('Initialize name', () => {
      const state = Map({})
      const value = 'sample1'
      const nextState = core.initName(state, value, 'ORIG_SAMPLE_NAME')
      expect(nextState).to.equal(Map({
        name: Map({
          key: 'name',
          value,
          originalKey: 'ORIG_SAMPLE_NAME',
          originalValue: value
        })
      }))
    })

    it('Initialize material', () => {
      const state = Map({})
      const value = 'Rock'
      const nextState = core.initMaterial(state, value, 'ORIG_SAMPLE_MATERIAL')
      expect(nextState).to.equal(Map({
        material: Map({
          key: 'material',
          value,
          originalKey: 'ORIG_SAMPLE_MATERIAL',
          originalValue: value
        })
      }))
    })

    it('Initialize igsn', () => {
      const state = Map({})
      const value = 'TIN000001'
      const nextState = core.initIgsn(state, value, 'ORIG_SAMPLE_IGSN')
      expect(nextState).to.equal(Map({
        igsn: Map({
          key: 'igsn',
          value,
          originalKey: 'ORIG_SAMPLE_IGSN',
          originalValue: value
        })
      }))
    })

    it('Initialize parent igsn', () => {
      const state = Map({})
      const value = 'TIN000002'
      const nextState = core.initParentIgsn(state, value, 'ORIG_SAMPLE_PARENT_IGSN')
      expect(nextState).to.equal(Map({
        parent_igsn: Map({
          key: 'parent_igsn',
          value,
          originalKey: 'ORIG_SAMPLE_PARENT_IGSN',
          originalValue: value
        })
      }))
    })

    it('Initialize is private', () => {
      const state = Map({})
      const value = '0'
      const nextState = core.initIsPrivate(state, value, 'ORIG_SAMPLE_IS_PRIVATE')
      expect(nextState).to.equal(Map({
        is_private: Map({
          key: 'is_private',
          value,
          originalKey: 'ORIG_SAMPLE_IS_PRIVATE',
          originalValue: value
        })
      }))
    })

    it('Initialize publish_date', () => {
      const state = Map({})
      const value = '2000-12-25'
      const nextState = core.initPublishDate(state, value, 'ORIG_SAMPLE_PUBLISH_DATE')
      expect(nextState).to.equal(Map({
        publish_date: Map({
          key: 'publish_date',
          value,
          originalKey: 'ORIG_SAMPLE_PUBLISH_DATE',
          originalValue: value
        })
      }))
    })

    it('Initialize classification', () => {
      const state = Map({})
      const value = 'Rock>Igneous'
      const nextState = core.initClassification(state, value, 'ORIG_SAMPLE_CLASSIFICATION')
      expect(nextState).to.equal(Map({
        classification: Map({
          key: 'classification',
          value,
          originalKey: 'ORIG_SAMPLE_CLASSIFICATION',
          originalValue: value
        })
      }))
    })

    describe('Initialize classification_comment with multiple options', () => {

      it('Initialize classification_comment as a single string', () => {
        const state = Map({})
        const value = 'A rock is a rock is a rock'
        const nextState = core.initClassificationComment(state, value, 'ORIG_SAMPLE_CLASSIFICATION_COMMENT')
        expect(nextState).to.equal(Map({
          classification_comment: Map({
            key: 'classification_comment',
            value,
            originalKey: 'ORIG_SAMPLE_CLASSIFICATION_COMMENT',
            originalValue: value
          })
        }))
      })

      it('Initialize classification_comment as a key-value pair if called again', () => {
        let state = Map({})
        const value1 = 'A rock1'
        const value2 = 'A rock2'
        const value3 = 'A rock3'
        state = core.initClassificationComment(state, value1, 'ORIG_SAMPLE_CLASSIFICATION_COMMENT1')
        state = core.initClassificationComment(state, value2, 'ORIG_SAMPLE_CLASSIFICATION_COMMENT2')
        const nextState = core.initClassificationComment(state, value3, 'ORIG_SAMPLE_CLASSIFICATION_COMMENT3')
        expect(nextState).to.equal(Map({
          classification_comment: List([
              Map({key: 'classification_comment', value: value1, originalKey: 'ORIG_SAMPLE_CLASSIFICATION_COMMENT1', originalValue: value1}),
              Map({key: 'classification_comment', value: value2, originalKey: 'ORIG_SAMPLE_CLASSIFICATION_COMMENT2', originalValue: value2}),
              Map({key: 'classification_comment', value: value3, originalKey: 'ORIG_SAMPLE_CLASSIFICATION_COMMENT3', originalValue: value3})
            ])
          })
        )
      })
    })

    it('Initialize field_name', () => {
      const state = Map({})
      const value = 'Taxonomy, informal classification of sample (whatever that means)'
      const nextState = core.initFieldName(state, value, 'ORIG_FIELD_NAME')
      expect(nextState).to.equal(Map({
        field_name: Map({
          key: 'field_name',
          value,
          originalKey: 'ORIG_FIELD_NAME',
          originalValue: value
        })
      }))
    })

    describe('Initialize description with multiple options', () => {

      it('Initialize description with a single value', () => {
        const state = Map({})
        const value = 'Description about the sample'
        const nextState = core.initDescription(state, value, 'ORIG_DESCRIPTION')
        expect(nextState).to.equal(Map({
          description: Map({
            key: 'description',
            value,
            originalKey: 'ORIG_DESCRIPTION',
            originalValue: value
          })
        }))
      })

      it('Initialize description as a key-value pair if called again', () => {
        let state = Map({})
        const value1 = 'description1'
        const value2 = 'description2'
        const value3 = 'description3'
        state = core.initDescription(state, value1, 'ORIG_SAMPLE_DESCRIPTION1')
        state = core.initDescription(state, value2, 'ORIG_SAMPLE_DESCRIPTION2')
        const nextState = core.initDescription(state, value3, 'ORIG_SAMPLE_DESCRIPTION3')
        expect(nextState).to.equal(Map({
          description: List([
              Map({key: 'description', value: value1, originalKey: 'ORIG_SAMPLE_DESCRIPTION1', originalValue: value1}),
              Map({key: 'description', value: value2, originalKey: 'ORIG_SAMPLE_DESCRIPTION2', originalValue: value2}),
              Map({key: 'description', value: value3, originalKey: 'ORIG_SAMPLE_DESCRIPTION3', originalValue: value3})
            ])
          })
        )
      })

    })

    it('Initialize age_min', () => {
      const state = Map({})
      const value = 10
      const nextState = core.initAgeMin(state, value, 'ORIG_SAMPLE_AGE_MIN')
      expect(nextState).to.equal(Map({
        age_min: Map({
          key: 'age_min',
          value,
          originalKey: 'ORIG_SAMPLE_AGE_MIN',
          originalValue: value
        })
      }))
    })

    it('Initialize age_max', () => {
      const state = Map({})
      const value = 10
      const nextState = core.initAgeMax(state, value, 'ORIG_SAMPLE_AGE_MAX')
      expect(nextState).to.equal(Map({
        age_max: Map({
          key: 'age_max',
          value,
          originalKey: 'ORIG_SAMPLE_AGE_MAX',
          originalValue: value
        })
      }))
    })

    it('Initialize age_unit', () => {
      const state = Map({})
      const value = 'years'
      const nextState = core.initAgeUnit(state, value, 'ORIG_SAMPLE_AGE_UNIT')
      expect(nextState).to.equal(Map({
        age_unit: Map({
          key: 'age_unit',
          value,
          originalKey: 'ORIG_SAMPLE_AGE_UNIT',
          originalValue: value
        })
      }))
    })

    it('Initialize geological_age', () => {
      const state = Map({})
      const value = 10
      const nextState = core.initGeologicalAge(state, value, 'ORIG_SAMPLE_GEOLOGICAL_AGE')
      expect(nextState).to.equal(Map({
        geological_age: Map({
          key: 'geological_age',
          value,
          originalKey: 'ORIG_SAMPLE_GEOLOGICAL_AGE',
          originalValue: value
        })
      }))
    })

    it('Initialize geological_unit', () => {
      const state = Map({})
      const value = 'years'
      const nextState = core.initGeologicalUnit(state, value, 'ORIG_SAMPLE_GEOLOGICAL_UNIT')
      expect(nextState).to.equal(Map({
        geological_unit: Map({
          key: 'geological_unit',
          value,
          originalKey: 'ORIG_SAMPLE_GEOLOGICAL_UNIT',
          originalValue: value
        })
      }))
    })

    it('Initialize collection_method', () => {
      const state = Map({})
      const value = 'Dredging'
      const nextState = core.initCollectionMethod(state, value, 'ORIG_SAMPLE_COLLECTION_METHOD')
      expect(nextState).to.equal(Map({
        collection_method: Map({
          key: 'collection_method',
          value,
          originalKey: 'ORIG_SAMPLE_COLLECTION_METHOD',
          originalValue: value
        })
      }))
    })

    describe('Initialize collection_method_descr with multiple options', () => {

      it('Initialize collection_method_descr with a single value', () => {
        const state = Map({})
        const value = 'Description about the collection method'
        const nextState = core.initCollectionMethodDescr(state, value, 'ORIG_COLLECTION_METHOD_DESCRIPTION')
        expect(nextState).to.equal(Map({
          collection_method_descr: Map({
            key: 'collection_method_descr',
            value,
            originalKey: 'ORIG_COLLECTION_METHOD_DESCRIPTION',
            originalValue: value
          })
        }))
      })

      it('Initialize description as a key-value pair if called again', () => {
        let state = Map({})
        const value1 = 'description1'
        const value2 = 'description2'
        const value3 = 'description3'
        state = core.initCollectionMethodDescr(state, value1, 'ORIG_COLLECTION_METHOD_DESCRIPTION1')
        state = core.initCollectionMethodDescr(state, value2, 'ORIG_COLLECTION_METHOD_DESCRIPTION2')
        const nextState = core.initCollectionMethodDescr(state, value3, 'ORIG_COLLECTION_METHOD_DESCRIPTION3')
        expect(nextState).to.equal(Map({
          collection_method_descr: List([
              Map({key: 'collection_method_descr', value: value1, originalKey: 'ORIG_COLLECTION_METHOD_DESCRIPTION1', originalValue: value1}),
              Map({key: 'collection_method_descr', value: value2, originalKey: 'ORIG_COLLECTION_METHOD_DESCRIPTION2', originalValue: value2}),
              Map({key: 'collection_method_descr', value: value3, originalKey: 'ORIG_COLLECTION_METHOD_DESCRIPTION3', originalValue: value3})
            ])
          })
        )
      })

    })

    it('Initialize size', () => {
      const state = Map({})
      const value = 10
      const nextState = core.initSize(state, value, 'ORIG_SAMPLE_SIZE')
      expect(nextState).to.equal(Map({
        size: Map({
          key: 'size',
          value,
          originalKey: 'ORIG_SAMPLE_SIZE',
          originalValue: value
        })
      }))
    })

    it('Initialize size_unit', () => {
      const state = Map({})
      const value = 'meters'
      const nextState = core.initSizeUnit(state, value, 'ORIG_SAMPLE_SIZE_UNIT')
      expect(nextState).to.equal(Map({
        size_unit: Map({
          key: 'size_unit',
          value,
          originalKey: 'ORIG_SAMPLE_SIZE_UNIT',
          originalValue: value
        })
      }))
    })

    describe('Initialize sample_comment with multiple options', () => {

      it('Initialize sample_comment with a single value', () => {
        const state = Map({})
        const value = 'Comment about the sample'
        const nextState = core.initSampleComment(state, value, 'ORIG_SAMPLE_COMMENT')
        expect(nextState).to.equal(Map({
          sample_comment: Map({
            key: 'sample_comment',
            value,
            originalKey: 'ORIG_SAMPLE_COMMENT',
            originalValue: value
          })
        }))
      })

      it('Initialize sample_comment as a list if called again', () => {
        let state = Map({})
        const value1 = 'comment1'
        const value2 = 'comment2'
        const value3 = 'comment3'
        state = core.initSampleComment(state, value1, 'ORIG_SAMPLE_COMMENT1')
        state = core.initSampleComment(state, value2, 'ORIG_SAMPLE_COMMENT2')
        const nextState = core.initSampleComment(state, value3, 'ORIG_SAMPLE_COMMENT3')
        expect(nextState).to.equal(Map({
          sample_comment: List([
              Map({key: 'sample_comment', value: value1, originalKey: 'ORIG_SAMPLE_COMMENT1', originalValue: value1}),
              Map({key: 'sample_comment', value: value2, originalKey: 'ORIG_SAMPLE_COMMENT2', originalValue: value2}),
              Map({key: 'sample_comment', value: value3, originalKey: 'ORIG_SAMPLE_COMMENT3', originalValue: value3})
            ])
          })
        )
      })

    })

    it('Initialize purpose', () => {
      const state = Map({})
      const value = 'geochronology'
      const nextState = core.initPurpose(state, value, 'ORIG_SAMPLE_PURPOSE')
      expect(nextState).to.equal(Map({
        purpose: Map({
          key: 'purpose',
          value,
          originalKey: 'ORIG_SAMPLE_PURPOSE',
          originalValue: value
        })
      }))
    })

    it('Initialize latitude', () => {
      const state = Map({})
      const value = 1.00
      const nextState = core.initLatitude(state, value, 'ORIG_SAMPLE_LATITUDE')
      expect(nextState).to.equal(Map({
        latitude: Map({
          key: 'latitude',
          value,
          originalKey: 'ORIG_SAMPLE_LATITUDE',
          originalValue: value
        })
      }))
    })

    it('Initialize longitude', () => {
      const state = Map({})
      const value = 1.00
      const nextState = core.initLongitude(state, value, 'ORIG_SAMPLE_LONGITUDE')
      expect(nextState).to.equal(Map({
        longitude: Map({
          key: 'longitude',
          value,
          originalKey: 'ORIG_SAMPLE_LONGITUDE',
          originalValue: value
        })
      }))
    })

    it('Initialize latitude_end', () => {
      const state = Map({})
      const value = 2.00
      const nextState = core.initLatitudeEnd(state, value, 'ORIG_SAMPLE_LATITUDE_END')
      expect(nextState).to.equal(Map({
        latitude_end: Map({
          key: 'latitude_end',
          value,
          originalKey: 'ORIG_SAMPLE_LATITUDE_END',
          originalValue: value
        })
      }))
    })

    it('Initialize longitude_end', () => {
      const state = Map({})
      const value = 2.00
      const nextState = core.initLongitudeEnd(state, value, 'ORIG_SAMPLE_LONGITUDE_END')
      expect(nextState).to.equal(Map({
        longitude_end: Map({
          key: 'longitude_end',
          value,
          originalKey: 'ORIG_SAMPLE_LONGITUDE_END',
          originalValue: value
        })
      }))
    })

    it('Initialize elevation', () => {
      const state = Map({})
      const value = 1.00
      const nextState = core.initElevation(state, value, 'ORIG_SAMPLE_ELEVATION')
      expect(nextState).to.equal(Map({
        elevation: Map({
          key: 'elevation',
          value,
          originalKey: 'ORIG_SAMPLE_ELEVATION',
          originalValue: value
        })
      }))
    })

    it('Initialize elevation_end', () => {
      const state = Map({})
      const value = 2.00
      const nextState = core.initElevationEnd(state, value, 'ORIG_SAMPLE_ELEVATION_END')
      expect(nextState).to.equal(Map({
        elevation_end: Map({
          key: 'elevation_end',
          value,
          originalKey: 'ORIG_SAMPLE_ELEVATION_END',
          originalValue: value
        })
      }))
    })

    it('Initialize elevation_unit', () => {
      const state = Map({})
      const value = 'meters'
      const nextState = core.initElevationUnit(state, value, 'ORIG_SAMPLE_ELEVATION_UNIT')
      expect(nextState).to.equal(Map({
        elevation_unit: Map({
          key: 'elevation_unit',
          value,
          originalKey: 'ORIG_SAMPLE_ELEVATION_UNIT',
          originalValue: value
        })
      }))
    })

    it('Initialize vertical_datum', () => {
      const state = Map({})
      const value = 'NAVD88'
      const nextState = core.initVerticalDatum(state, value, 'ORIG_SAMPLE_VERTICAL_DATUM')
      expect(nextState).to.equal(Map({
        vertical_datum: Map({
          key: 'vertical_datum',
          value,
          originalKey: 'ORIG_SAMPLE_VERTICAL_DATUM',
          originalValue: value
        })
      }))
    })

    it('Initialize northing', () => {
      const state = Map({})
      const value = 2.00
      const nextState = core.initNorthing(state, value, 'ORIG_SAMPLE_NORTHING')
      expect(nextState).to.equal(Map({
        northing: Map({
          key: 'northing',
          value,
          originalKey: 'ORIG_SAMPLE_NORTHING',
          originalValue: value
        })
      }))
    })

    it('Initialize easting', () => {
      const state = Map({})
      const value = 2.00
      const nextState = core.initEasting(state, value, 'ORIG_SAMPLE_EASTING')
      expect(nextState).to.equal(Map({
        easting: Map({
          key: 'easting',
          value,
          originalKey: 'ORIG_SAMPLE_EASTING',
          originalValue: value
        })
      }))
    })

    it('Initialize zone', () => {
      const state = Map({})
      const value = "11N"
      const nextState = core.initZone(state, value, 'ORIG_SAMPLE_ZONE')
      expect(nextState).to.equal(Map({
        zone: Map({
          key: 'zone',
          value,
          originalKey: 'ORIG_SAMPLE_ZONE',
          originalValue: value
        })
      }))
    })

    it('Initialize navigation_type', () => {
      const state = Map({})
      const value = 'GPS'
      const nextState = core.initNavigationType(state, value, 'ORIG_SAMPLE_NAVIGATION_TYPE')
      expect(nextState).to.equal(Map({
        navigation_type: Map({
          key: 'navigation_type',
          value,
          originalKey: 'ORIG_SAMPLE_NAVIGATION_TYPE',
          originalValue: value
        })
      }))
    })

    it('Initialize primary_location_type', () => {
      const state = Map({})
      const value = 'Volcanic Fissure'
      const nextState = core.initPrimaryLocationType(state, value, 'ORIG_SAMPLE_PRIMARY_LOCATION_TYPE')
      expect(nextState).to.equal(Map({
        primary_location_type: Map({
          key: 'primary_location_type',
          value,
          originalKey: 'ORIG_SAMPLE_PRIMARY_LOCATION_TYPE',
          originalValue: value
        })
      }))
    })

    it('Initialize primary_location_name', () => {
      const state = Map({})
      const value = "Mt. St. Helens"
      const nextState = core.initPrimaryLocationName(state, value, 'ORIG_SAMPLE_PRIMARY_LOCATION_NAME')
      expect(nextState).to.equal(Map({
        primary_location_name: Map({
          key: 'primary_location_name',
          value,
          originalKey: 'ORIG_SAMPLE_PRIMARY_LOCATION_NAME',
          originalValue: value
        })
      }))
    })

    describe('Initialize location_description with multiple options', () => {

      it('Initialize location_description with a single value', () => {
        const state = Map({})
        const value = 'An active composite volcano.'
        const nextState = core.initLocationDescription(state, value, 'ORIG_SAMPLE_LOCATION_DESCRIPTION')
        expect(nextState).to.equal(Map({
          location_description: Map({
            key: 'location_description',
            value,
            originalKey: 'ORIG_SAMPLE_LOCATION_DESCRIPTION',
            originalValue: value
          })
        }))
      })

      it('Initialize location_description as a list if called again', () => {
        let state = Map({})
        const value1 = 'location description1'
        const value2 = 'location description2'
        const value3 = 'location description3'
        state = core.initLocationDescription(state, value1, 'ORIG_SAMPLE_LOCATION_DESCRIPTION1')
        state = core.initLocationDescription(state, value2, 'ORIG_SAMPLE_LOCATION_DESCRIPTION2')
        const nextState = core.initLocationDescription(state, value3, 'ORIG_SAMPLE_LOCATION_DESCRIPTION3')
        expect(nextState).to.equal(Map({
          location_description: List([
              Map({key: 'location_description', value: value1, originalKey: 'ORIG_SAMPLE_LOCATION_DESCRIPTION1', originalValue: value1}),
              Map({key: 'location_description', value: value2, originalKey: 'ORIG_SAMPLE_LOCATION_DESCRIPTION2', originalValue: value2}),
              Map({key: 'location_description', value: value3, originalKey: 'ORIG_SAMPLE_LOCATION_DESCRIPTION3', originalValue: value3})
            ])
          })
        )
      })

    })

    it('Initialize locality', () => {
      const state = Map({})
      const value = "Cascades"
      const nextState = core.initLocality(state, value, 'ORIG_SAMPLE_LOCALITY')
      expect(nextState).to.equal(Map({
        locality: Map({
          key: 'locality',
          value,
          originalKey: 'ORIG_SAMPLE_LOCALITY',
          originalValue: value
        })
      }))
    })

    describe('Initialize locality_description with multiple options', () => {

      it('Initialize locality_description with a single value', () => {
        const state = Map({})
        const value = 'Description of locality'
        const nextState = core.initLocalityDescription(state, value, 'ORIG_SAMPLE_LOCALITY_DESCRIPTION')
        expect(nextState).to.equal(Map({
          locality_description: Map({
            key: 'locality_description',
            value,
            originalKey: 'ORIG_SAMPLE_LOCALITY_DESCRIPTION',
            originalValue: value
          })
        }))
      })

      it('Initialize locality_description as a list if called again', () => {
        let state = Map({})
        const value1 = 'locality description1'
        const value2 = 'locality description2'
        const value3 = 'locality description3'
        state = core.initLocalityDescription(state, value1, 'ORIG_SAMPLE_LOCALITY_DESCRIPTION1')
        state = core.initLocalityDescription(state, value2, 'ORIG_SAMPLE_LOCALITY_DESCRIPTION2')
        const nextState = core.initLocalityDescription(state, value3, 'ORIG_SAMPLE_LOCALITY_DESCRIPTION3')
        expect(nextState).to.equal(Map({
          locality_description: List([
              Map({key: 'locality_description', value: value1, originalKey: 'ORIG_SAMPLE_LOCALITY_DESCRIPTION1', originalValue: value1}),
              Map({key: 'locality_description', value: value2, originalKey: 'ORIG_SAMPLE_LOCALITY_DESCRIPTION2', originalValue: value2}),
              Map({key: 'locality_description', value: value3, originalKey: 'ORIG_SAMPLE_LOCALITY_DESCRIPTION3', originalValue: value3})
            ])
          })
        )
      })

    })

    it('Initialize country', () => {
      const state = Map({})
      const value = "USA"
      const nextState = core.initCountry(state, value, 'ORIG_SAMPLE_COUNTRY')
      expect(nextState).to.equal(Map({
        country: Map({
          key: 'country',
          value,
          originalKey: 'ORIG_SAMPLE_COUNTRY',
          originalValue: value
        })
      }))
    })

    it('Initialize province', () => {
      const state = Map({})
      const value = "Oregon"
      const nextState = core.initProvince(state, value, 'ORIG_SAMPLE_PROVINCE')
      expect(nextState).to.equal(Map({
        province: Map({
          key: 'province',
          value,
          originalKey: 'ORIG_SAMPLE_PROVINCE',
          originalValue: value
        })
      }))
    })

    it('Initialize county', () => {
      const state = Map({})
      const value = "Bainbridge"
      const nextState = core.initCounty(state, value, 'ORIG_SAMPLE_COUNTY')
      expect(nextState).to.equal(Map({
        county: Map({
          key: 'county',
          value,
          originalKey: 'ORIG_SAMPLE_COUNTY',
          originalValue: value
        })
      }))
    })

    it('Initialize city', () => {
      const state = Map({})
      const value = "Portland"
      const nextState = core.initCity(state, value, 'ORIG_SAMPLE_CITY')
      expect(nextState).to.equal(Map({
        city: Map({
          key: 'city',
          value,
          originalKey: 'ORIG_SAMPLE_CITY',
          originalValue: value
        })
      }))
    })

    it('Initialize cruise_field_prgrm', () => {
      const state = Map({})
      const value = "Cascades Expedition"
      const nextState = core.initCruiseFieldPrgrm(state, value, 'ORIG_SAMPLE_CRUISE_FIELD_PRGRM')
      expect(nextState).to.equal(Map({
        cruise_field_prgrm: Map({
          key: 'cruise_field_prgrm',
          value,
          originalKey: 'ORIG_SAMPLE_CRUISE_FIELD_PRGRM',
          originalValue: value
        })
      }))
    })

    it('Initialize platform_type', () => {
      const state = Map({})
      const value = "oil rig"
      const nextState = core.initPlatformType(state, value, 'ORIG_SAMPLE_PLATFORM_TYPE')
      expect(nextState).to.equal(Map({
        platform_type: Map({
          key: 'platform_type',
          value,
          originalKey: 'ORIG_SAMPLE_PLATFORM_TYPE',
          originalValue: value
        })
      }))
    })

    it('Initialize platform_name', () => {
      const state = Map({})
      const value = 'The Black Pearl'
      const nextState = core.initPlatformName(state, value, 'ORIG_SAMPLE_PLATFORM_NAME')
      expect(nextState).to.equal(Map({
        platform_name: Map({
          key: 'platform_name',
          value,
          originalKey: 'ORIG_SAMPLE_PLATFORM_NAME',
          originalValue: value
        })
      }))
    })

    describe('Initialize platform_descr with multiple options', () => {

      it('Initialize platform_descr with a single value', () => {
        const state = Map({})
        const value = 'Description of platform'
        const nextState = core.initPlatformDescr(state, value, 'ORIG_SAMPLE_PLATFORM_DESCR')
        expect(nextState).to.equal(Map({
          platform_descr: Map({
            key: 'platform_descr',
            value,
            originalKey: 'ORIG_SAMPLE_PLATFORM_DESCR',
            originalValue: value
          })
        }))
      })

      it('Initialize platform_descr as a list if called again', () => {
        let state = Map({})
        const value1 = 'platform description1'
        const value2 = 'platform description2'
        const value3 = 'platform description3'
        state = core.initPlatformDescr(state, value1, 'ORIG_SAMPLE_PLATFORM_DESCR1')
        state = core.initPlatformDescr(state, value2, 'ORIG_SAMPLE_PLATFORM_DESCR2')
        const nextState = core.initPlatformDescr(state, value3, 'ORIG_SAMPLE_PLATFORM_DESCR3')
        expect(nextState).to.equal(Map({
          platform_descr: List([
              Map({key: 'platform_descr', value: value1, originalKey: 'ORIG_SAMPLE_PLATFORM_DESCR1', originalValue: value1}),
              Map({key: 'platform_descr', value: value2, originalKey: 'ORIG_SAMPLE_PLATFORM_DESCR2', originalValue: value2}),
              Map({key: 'platform_descr', value: value3, originalKey: 'ORIG_SAMPLE_PLATFORM_DESCR3', originalValue: value3})
            ])
          })
        )
      })

    })

    it('Initialize launch_platform_name', () => {
      const state = Map({})
      const value = "Starship Enterprise"
      const nextState = core.initLaunchPlatformName(state, value, 'ORIG_SAMPLE_LAUNCH_PLATFORM_NAME')
      expect(nextState).to.equal(Map({
        launch_platform_name: Map({
          key: 'launch_platform_name',
          value,
          originalKey: 'ORIG_SAMPLE_LAUNCH_PLATFORM_NAME',
          originalValue: value
        })
      }))
    })

    it('Initialize launch_id', () => {
      const state = Map({})
      const value = "oil rig"
      const nextState = core.initLaunchId(state, value, 'ORIG_SAMPLE_LAUNCH_ID')
      expect(nextState).to.equal(Map({
        launch_id: Map({
          key: 'launch_id',
          value,
          originalKey: 'ORIG_SAMPLE_LAUNCH_ID',
          originalValue: value
        })
      }))
    })

    it('Initialize launch_type_name', () => {
      const state = Map({})
      const value = "oil rig"
      const nextState = core.initLaunchTypeName(state, value, 'ORIG_SAMPLE_LAUNCH_TYPE_NAME')
      expect(nextState).to.equal(Map({
        launch_type_name: Map({
          key: 'launch_type_name',
          value,
          originalKey: 'ORIG_SAMPLE_LAUNCH_TYPE_NAME',
          originalValue: value
        })
      }))
    })

    it('Initialize collector', () => {
      const state = Map({})
      const value = "Johnny Thunder"
      const nextState = core.initCollector(state, value, 'ORIG_SAMPLE_COLLECTOR')
      expect(nextState).to.equal(Map({
        collector: Map({
          key: 'collector',
          value,
          originalKey: 'ORIG_SAMPLE_COLLECTOR',
          originalValue: value
        })
      }))
    })

    describe('Initialize collector_detail with multiple options', () => {

      it('Initialize collector_deatil with a single value', () => {
        const state = Map({})
        const value = 'Details about the collector'
        const nextState = core.initCollectorDetail(state, value, 'ORIG_SAMPLE_COLLECTOR_DETAIL')
        expect(nextState).to.equal(Map({
          collector_detail: Map({
            key: 'collector_detail',
            value,
            originalKey: 'ORIG_SAMPLE_COLLECTOR_DETAIL',
            originalValue: value
          })
        }))
      })

      it('Initialize collector_detail as a list if called again', () => {
        let state = Map({})
        const value1 = 'detail1'
        const value2 = 'detail2'
        const value3 = 'detail3'
        state = core.initCollectorDetail(state, value1, 'ORIG_SAMPLE_COLLECTOR_DETAIL1')
        state = core.initCollectorDetail(state, value2, 'ORIG_SAMPLE_COLLECTOR_DETAIL2')
        const nextState = core.initCollectorDetail(state, value3, 'ORIG_SAMPLE_COLLECTOR_DETAIL3')
        expect(nextState).to.equal(Map({
          collector_detail: List([
              Map({key: 'collector_detail', value: value1, originalKey: 'ORIG_SAMPLE_COLLECTOR_DETAIL1', originalValue: value1}),
              Map({key: 'collector_detail', value: value2, originalKey: 'ORIG_SAMPLE_COLLECTOR_DETAIL2', originalValue: value2}),
              Map({key: 'collector_detail', value: value3, originalKey: 'ORIG_SAMPLE_COLLECTOR_DETAIL3', originalValue: value3})
            ])
          })
        )
      })

    })

    it('Initialize collection_start_date', () => {
      const state = Map({})
      const value = "2000-12-25"
      const nextState = core.initCollectionStartDate(state, value, 'ORIG_SAMPLE_COLLECTION_START_DATE')
      expect(nextState).to.equal(Map({
        collection_start_date: Map({
          key: 'collection_start_date',
          value,
          originalKey: 'ORIG_SAMPLE_COLLECTION_START_DATE',
          originalValue: value
        })
      }))
    })

    it('Initialize collection_end_date', () => {
      const state = Map({})
      const value = "2000-12-26"
      const nextState = core.initCollectionEndDate(state, value, 'ORIG_SAMPLE_COLLECTION_END_DATE')
      expect(nextState).to.equal(Map({
        collection_end_date: Map({
          key: 'collection_end_date',
          value,
          originalKey: 'ORIG_SAMPLE_COLLECTION_END_DATE',
          originalValue: value
        })
      }))
    })

    it('Initialize collection_date_precision', () => {
      const state = Map({})
      const value = 'day'
      const nextState = core.initCollectionDatePrecision(state, value, 'ORIG_SAMPLE_COLLECTION_DATE_PRECISION')
      expect(nextState).to.equal(Map({
        collection_date_precision: Map({
          key: 'collection_date_precision',
          value,
          originalKey: 'ORIG_SAMPLE_COLLECTION_DATE_PRECISION',
          originalValue: value
        })
      }))
    })

    it('Initialize current_archive', () => {
      const state = Map({})
      const value = 'College of Charleston'
      const nextState = core.initCurrentArchive(state, value, 'ORIG_SAMPLE_CURRENT_ARCHIVE')
      expect(nextState).to.equal(Map({
        current_archive: Map({
          key: 'current_archive',
          value,
          originalKey: 'ORIG_SAMPLE_CURRENT_ARCHIVE',
          originalValue: value
        })
      }))
    })

    it('Initialize current_archive_contact', () => {
      const state = Map({})
      const value = 'Rocky Bulwinkle'
      const nextState = core.initCurrentArchiveContact(state, value, 'ORIG_SAMPLE_CURRENT_ARCHIVE_CONTACT')
      expect(nextState).to.equal(Map({
        current_archive_contact: Map({
          key: 'current_archive_contact',
          value,
          originalKey: 'ORIG_SAMPLE_CURRENT_ARCHIVE_CONTACT',
          originalValue: value
        })
      }))
    })

    it('Initialize original_archive', () => {
      const state = Map({})
      const value = 'original_archive'
      const nextState = core.initOriginalArchive(state, value, 'ORIG_SAMPLE_ORIGINAL_ARCHIVE')
      expect(nextState).to.equal(Map({
        original_archive: Map({
          key: 'original_archive',
          value,
          originalKey: 'ORIG_SAMPLE_ORIGINAL_ARCHIVE',
          originalValue: value
        })
      }))
    })

    it('Initialize depth_min', () => {
      const state = Map({})
      const value = 10
      const nextState = core.initDepthMin(state, value, 'ORIG_SAMPLE_DEPTH_MIN')
      expect(nextState).to.equal(Map({
        depth_min: Map({
          key: 'depth_min',
          value,
          originalKey: 'ORIG_SAMPLE_DEPTH_MIN',
          originalValue: value
        })
      }))
    })

    it('Initialize depth_max', () => {
      const state = Map({})
      const value = '20'
      const nextState = core.initDepthMax(state, value, 'ORIG_SAMPLE_DEPTH_MAX')
      expect(nextState).to.equal(Map({
        depth_max: Map({
          key: 'depth_max',
          value,
          originalKey: 'ORIG_SAMPLE_DEPTH_MAX',
          originalValue: value
        })
      }))
    })

    it('Initialize depth_scale', () => {
      const state = Map({})
      const value = 'MBSF'
      const nextState = core.initDepthScale(state, value, 'ORIG_SAMPLE_DEPTH_SCALE')
      expect(nextState).to.equal(Map({
        depth_scale: Map({
          key: 'depth_scale',
          value,
          originalKey: 'ORIG_SAMPLE_DEPTH_SCALE',
          originalValue: value
        })
      }))
    })

    describe('Initialize sample_other_names with multiple options', () => {

      it('Initialize sample_other_names with a single value', () => {
        const state = Map({})
        const value = 'name'
        const nextState = core.initSampleOtherNames(state, value, 'ORIG_SAMPLE_OTHER_NAME')
        expect(nextState).to.equal(Map({
          sample_other_names: Map({
            key: 'sample_other_names',
            value,
            originalKey: 'ORIG_SAMPLE_OTHER_NAME',
            originalValue: value
          })
        }))
      })

      it('Initialize collector_detail as a list if called again', () => {
        let state = Map({})
        const value1 = 'detail1'
        const value2 = 'detail2'
        const value3 = 'detail3'
        state = core.initSampleOtherNames(state, value1, 'ORIG_SAMPLE_OTHER_NAME1')
        state = core.initSampleOtherNames(state, value2, 'ORIG_SAMPLE_OTHER_NAME2')
        const nextState = core.initSampleOtherNames(state, value3, 'ORIG_SAMPLE_OTHER_NAME3')
        expect(nextState).to.equal(Map({
          sample_other_names: List([
              Map({key: 'sample_other_names', value: value1, originalKey: 'ORIG_SAMPLE_OTHER_NAME1', originalValue: value1}),
              Map({key: 'sample_other_names', value: value2, originalKey: 'ORIG_SAMPLE_OTHER_NAME2', originalValue: value2}),
              Map({key: 'sample_other_names', value: value3, originalKey: 'ORIG_SAMPLE_OTHER_NAME3', originalValue: value3})
            ])
          })
        )
      })

    })

  })

})
