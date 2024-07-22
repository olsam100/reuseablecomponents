import React from 'react'
import './floatinginput.css'

const FloatingInput = () => {
  return (
    <div className='form-group'>
      <input
        type='text'
        name='firstname'
        id='firstname'
        required
        className='inputField'
        autoComplete='off'
      />
      <label htmlFor='firstname' className='formlabel'>
        First name
      </label>
    </div>
  )
}

export default FloatingInput
