import React, { useState } from 'react'
import './checkbox.css'

const checkMark = (
  <svg
    width='14'
    height='12'
    viewBox='0 0 14 12'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M3.97297 10.774L0.499975 7.29996C0.34066 7.14078 0.214276 6.95177 0.128047 6.74372C0.0418191 6.53567 -0.00256348 6.31267 -0.00256348 6.08746C-0.00256348 5.86225 0.0418191 5.63925 0.128047 5.4312C0.214276 5.22315 0.34066 5.03414 0.499975 4.87496C0.821714 4.55369 1.2578 4.37325 1.71247 4.37325C2.16715 4.37325 2.60324 4.55369 2.92497 4.87496L5.09997 7.04796C5.14382 7.09156 5.20314 7.11604 5.26497 7.11604C5.32681 7.11604 5.38613 7.09156 5.42997 7.04796L11.07 1.40796C11.3917 1.0867 11.8278 0.90625 12.2825 0.90625C12.7371 0.90625 13.1732 1.0867 13.495 1.40796C13.6543 1.56714 13.7807 1.75615 13.8669 1.9642C13.9531 2.17225 13.9975 2.39525 13.9975 2.62046C13.9975 2.84567 13.9531 3.06867 13.8669 3.27672C13.7807 3.48477 13.6543 3.67378 13.495 3.83296L6.55497 10.774C6.21255 11.1163 5.74817 11.3086 5.26397 11.3086C4.77978 11.3086 4.3154 11.1163 3.97297 10.774Z'
      fill='white'
    />
  </svg>
)

const Checkbox = ({ label, value, onChange }) => {
  return (
    <label className='checkboxContainer'>
      <input
        type='checkbox'
        checked={value}
        onChange={onChange}
        className='hidden'
      />
      <span className={`checkbox ${value ? 'activeCheckbox' : 'notActive'}`}>
        {value && checkMark}
      </span>
      <span className='font-regular text-textWithoutOpacity text-[1.5rem] leading-[2.25rem]'>
        {label}
      </span>
    </label>
  )
}

export default Checkbox

const checkboxItems = [
  {
    id: 1,
    label: 'A new message is received',
  },
  {
    id: 2,
    label: 'Activity in anything assigned to you',
  },
  {
    id: 3,
    label: 'Activity in all unassigned conversations',
  },
  {
    id: 4,
    label: 'A message you sent failed to be delivered',
  },
  {
    id: 5,
    label: 'You are mentioned on a comment',
  },
]

// using the Component
const App = () => {
  const [checkboxValues, setCheckboxValues] = useState(
    checkboxItems.reduce((acc, item) => {
      acc[item.id] = false
      return acc
    }, {})
  )

  const handleCheckboxChange = (id) => {
    setCheckboxValues((prevValues) => ({
      ...prevValues,
      [id]: !prevValues[id],
    }))
  }

  return (
    <div className='checkboxItem'>
      {checkboxItems.map(({ id, label }) => (
        <Checkbox
          key={id}
          value={checkboxValues[id]}
          onChange={() => handleCheckboxChange(id)}
          label={label}
        />
      ))}
    </div>
  )
}
