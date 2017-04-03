import CSSModules from 'react-css-modules'
import React from 'react'

import styles from './uploadDetail.css'
import Tabs from '../../../../../common/Tabs'
import HeaderTable from '../../../../../common/HeaderTable'

const tabs = (sample) => {
  let defaultHeader = ['Original Key', 'Original Value', 'SESAR Key', 'SESAR Value']
  return [{
    name: 'Description',
    content: {
      header: defaultHeader,
      data: filterSample(sample, descriptionKeys)
    }
  },{
    name: 'Geolocation',
    content: {
      header: defaultHeader,
      data: filterSample(sample, geolocationKeys)
    }
  }, {
    name: 'Collection',
    content: {
      header: defaultHeader,
      data: filterSample(sample, collectionKeys)
    }
  }, {
    name: 'Curation',
    content: {
      header: defaultHeader,
      data: filterSample(sample, curationKeys)
    }
  }, {
    name: 'Parent',
    content: {
      header: defaultHeader,
      data: filterSample(sample, parentKeys)
    }
  },{
    name: 'Not Mapped',
    content: {
      header: ['Original Key', 'Original Value'],
      data: filterSample(sample, [undefined])
    }
  }].filter((tag) => tag.content.data.length > 0)
}

const filterSample = (sample, keys) => {
  let filter = sample.filter((field) => keys.includes(field.key))
  return filter.map((field) => Object.keys(field).map((key) => field[key]))
}

const descriptionKeys = [
  'user_code',
  'sample_type',
  'name',
  'material',
  'igsn',
  'is_private',
  'publish_date',
  'classification',
  'classification_comment',
  'field_name',
  'description',
  'age_min',
  'age_max',
  'age_unit',
  'geological_age',
  'geological_unit',
  'collection_method',
  'collection_method_descr',
  'size',
  'size_unit',
  'sample_comment',
  'purpose'
]

const geolocationKeys = [
  'latitude',
  'longitude',
  'latitude_end',
  'longitude_end',
  'elevation',
  'elevation_end',
  'elevation_unit',
  'vertical_datum',
  'northing',
  'easting',
  'zone',
  'navigation_type',
  'primary_location_type',
  'primary_location_name',
  'location_description',
  'locality',
  'locality_description',
  'country',
  'province',
  'county',
  'city'
]

const collectionKeys = [
  'cruise_field_prgrm',
  'platform_type',
  'platform_name',
  'platform_descr',
  'launch_platform_name',
  'launch_id',
  'launch_type_name',
  'collector',
  'collector_detail',
  'collection_start_date',
  'collection_end_date',
  'collection_date_precision',
]

const curationKeys = [
  'current_archive',
  'current_archive_contact',
  'original_archive',
  'original_archive_contact'
]

const parentKeys = [
  'parent_igsn',
  'depth_min',
  'depth_max',
  'depth_scale',
  'sample_other_names'
]


var header = ['test1', 'test2']
var data = [['v1','v2'],['v3','v4']]

const UploadDetail = ({sample}) => (
  <div styleName='uploadDetail'>
    <Tabs>
      {tabs(sample).map((tab, i) =>
        <HeaderTable key={i} label={tab.name} header={tab.content.header} data={tab.content.data}/>
      )}
    </Tabs>
  </div>
)

export default CSSModules(UploadDetail, styles)
