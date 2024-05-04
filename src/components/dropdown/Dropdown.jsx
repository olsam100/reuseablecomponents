import React, { useState } from 'react'
import Dropdown from '.'

const dropdownOtions = [
  {
    title: 'department',
    value: 'department',
  },
  {
    title: 'faculty',
    value: 'faculty',
  },
  {
    title: 'engineering',
    value: 'engineering',
  },
]

const DropdownWrapper = () => {
  const [selectedOption, setSelectedOption] = useState(null)

  const handleSelectOption = (option) => {
    setSelectedOption(option)
  }
  return (
    <Dropdown isOpen={true} value={selectedOption}>
      {dropdownOtions.map(({ ...rest }) => (
        <Dropdown.Option
          key={rest.value}
          onSelect={() => handleSelectOption(rest.value)}
        >
          {rest.title}
        </Dropdown.Option>
      ))}
    </Dropdown>
  )
}

export default DropdownWrapper
