import React from 'react'

const Indicator = ({ text, ent, action }) => {
  return (
    <div className='entity'>
      <div>
        <span className='selectedtext'>Selected text:</span>
        {text}
      </div>
      <div className='selectedentity'>
        <span>Selected entity: </span> {ent}
      </div>
    </div>
  )
}

export default Indicator
