
const toXML = (samples, usercode) => {

  //create document
  let doc = document.implementation.createDocument('http://app.geosamples.org','samples', null)
  doc.documentElement.setAttributeNS('http://www.w3.org/2001/XMLSchema-instance', 'xsi:schemaLocation', 'http://app.geosamples.org/samplev2.xsd')

  for(let i=0; i<samples.length; i++) {

    //create sample
    let sampleNode = document.createElementNS('http://app.geosamples.org', 'sample')
    sampleNode.appendChild(document.createElementNS('http://app.geosamples.org', 'user_code')).appendChild(document.createTextNode(usercode))
    doc.documentElement.appendChild(sampleNode)

    //TEST: ADD REQUIRED attributes
    sampleNode.appendChild(document.createElementNS('http://app.geosamples.org', 'sample_type')).appendChild(document.createTextNode('Core'))
    sampleNode.appendChild(document.createElementNS('http://app.geosamples.org', 'material')).appendChild(document.createTextNode('Rock'))
    sampleNode.appendChild(document.createElementNS('http://app.geosamples.org', 'elevation_unit')).appendChild(document.createTextNode('meters'))

    //add attributes
    for(let j=0; j<samples[i].length; j++) {
      if(samples[i][j].key) {
        let node = document.createElementNS('http://app.geosamples.org', samples[i][j].key)
        node.appendChild(document.createTextNode(samples[i][j].value))
        sampleNode.appendChild(node)
      }
    }
  }

  return doc
}

export default toXML
