import React from 'react'

import classes from './index.module.scss'

interface RadioButtonProps {
  label: string
  value: string
  isSelected: boolean
  onRadioChange: (value: string) => void
  groupName: string
}

export const RadioButton: React.FC<RadioButtonProps> = ({
  label,
  value,
  isSelected,
  onRadioChange,
  groupName,
}) => {
  const handleRadioChange = () => {
    onRadioChange(value)
  }

  return (
    <label
      className={
        'flex flex-row items-center gap-3 whitespace-nowrap cursor-pointer px-3 py-[6px] font-semibold text-brand-black leading-headingLH1'
      }
    >
      <input
        type="radio"
        checked={isSelected}
        onChange={handleRadioChange}
        className={classes.radio}
        name={groupName}
      />
      {label}
    </label>
  )
}
