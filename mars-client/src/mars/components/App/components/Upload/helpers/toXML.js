
const toXML = (sample) => {

  //create document
  let doc = document.implementation.createDocument('http://app.geosamples.org','samples', null)
  doc.documentElement.setAttributeNS('http://www.w3.org/2001/XMLSchema-instance', 'xsi:schemaLocation', 'http://app.geosamples.org/samplev2.xsd')

  //create sample
  let sampleNode = document.createElementNS('http://app.geosamples.org', 'sample')
  doc.documentElement.appendChild(sampleNode)

  //TEST: ADD REQUIRED attributes
  sampleNode.appendChild(document.createElementNS('http://app.geosamples.org', 'user_code')).appendChild(document.createTextNode('IE517'))
  sampleNode.appendChild(document.createElementNS('http://app.geosamples.org', 'sample_type')).appendChild(document.createTextNode('Individual Sample'))
  sampleNode.appendChild(document.createElementNS('http://app.geosamples.org', 'material')).appendChild(document.createTextNode('Rock'))

  //add attributes
  for(let j=0; j<sample.length; j++) {
    if(sample[j].key) {
      let node = document.createElementNS('http://app.geosamples.org', sample[j].key)
      node.appendChild(document.createTextNode(sample[j].value))
      sampleNode.appendChild(node)
    }
  }

  return doc
}

export default toXML
