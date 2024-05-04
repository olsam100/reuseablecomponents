import React from 'react'
import './styles.css'

const Dropdown = ({ children, isOpen, value }) => {
  return (
    <div className='dropdown'>
      <span>Name option</span>
      <div>{value ? value : 'Select option'}</div>
      {isOpen && <div className='dropdown-content'>{children}</div>}
    </div>
  )
}

Dropdown.Option = ({ children, onSelect }) => (
  <div className='option' onClick={onSelect}>
    {children}
  </div>
)

export default Dropdown
