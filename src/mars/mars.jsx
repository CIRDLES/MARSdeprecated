import React from 'react'

const Mars = ({children, user}) => (
  <div>
    {React.cloneElement(children,{user})}
  </div>
)

export default Mars
